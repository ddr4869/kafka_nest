## Kafka 적용 : NestJS

main.ts

```tsx
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
**import { Transport } from '@nestjs/microservices';**

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 마이크로서비스 추가
  app.**connectMicroservice**({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: ['localhost:9092', 'localhost:9093'],
      },
      consumer: {
        **groupId: 'eklee-group-0',**
      },
    },
  });

  // 마이크로서비스 실행
  await app.**startAllMicroservices**();
  // HTTP(S) 서버 실행
  await app.listen(3000);
}

bootstrap();
```

- **connectMicroservice, startAllMicroservices로 마이크로서비스 실행**
- broker address & consumer groupId 세팅

app.module.ts

```tsx
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
**import { ClientsModule, Transport } from '@nestjs/microservices';**

@Module({
  imports: [
    **ClientsModule.register([
      {
        name: 'KAFKA',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'eklee-server-1',
            brokers: ['localhost:9092', 'localhost:9093'],
          },
          consumer: {
            groupId: 'eklee-group-0',
          }
        }
      }
    ])
  ],**
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

```

app.controller.ts

```tsx
import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import {
  **ClientKafka,
  Ctx,
  KafkaContext,
  MessagePattern,
  Payload,**
} from '@nestjs/microservices';

@Controller()
export class AppController {

  constructor(@Inject('KAFKA') private readonly kafkaProducer: ClientKafka) {}

  @Get()
  async sendMessage() {
    const message = { value: 'hello world' };
    await this.kafkaProducer.emit('**eklee**', message); -> Topic : eklee
    return message
  }
  
  @MessagePattern('**eklee**')
  readMessage(@Payload() message: any, @Ctx() context: KafkaContext) {
    const originalMessage = context.getMessage();
    const response = originalMessage.value;

    console.log(originalMessage.value);
    //console.log(message);
    return response;
  }
}
```

- Topic : eklee
- 이제 localhost:3000으로 Get 요청 시 hello world가 eklee 토픽 Consumer에게 전달된다.
- eklee 토픽 Producer가 메세지를 보내면, 서버에 console.log(originalMessage.value);로 보낸 메세지가 로그로 뜰 것이다.

## MicroService에 적용

- api-gateway → billing → auth
1. api-gateway
    1. main
    
    ```tsx
    // main
    import { NestFactory } from '@nestjs/core';
    import { AppModule } from './app.module';
    import { AppService } from './app.service';
    async function bootstrap() {
      const app = await NestFactory.create(AppModule);
      const service = app.get(AppService);
      //service.kafkaResponse();
      await app.listen(3000);
    }
    bootstrap();
    ```
    
    b. module
    
    ```tsx
    import { Module } from '@nestjs/common';
    import { ClientsModule, Transport } from '@nestjs/microservices';
    import { AppController } from './app.controller';
    import { AppService } from './app.service';
    
    @Module({
      imports: [
        ClientsModule.register([
          {
            name: '**BILLING_SERVICE**',
            transport: Transport.KAFKA,
            options: {
              client: {
                clientId: 'billing',
                brokers: ['localhost:9092'],
              },
              consumer: {
                groupId: 'billing-consumer',
              },
            },
          },
        ]),
      ],
      controllers: [AppController],
      providers: [AppService],
    })
    export class AppModule {}
    ```
    
    - `ClientsModule.register` 로 microservice 모듈 등록
    - name엔@Inject()에 들어갈 이름 세팅
    - Kafka Client / consumer 등록
    
    c. Service
    
    ```tsx
    import { Inject, Injectable } from '@nestjs/common';
    import { ClientKafka } from '@nestjs/microservices';
    @Injectable()
    export class AppService {
      constructor(
        @Inject('**BILLING_SERVICE**') 
    		private readonly billingClient: ClientKafka,
      ) {}
    
      createOrder({ userId, price }: CreateOrderRequest) {
        return this.billingClient.emit(
          '**order_created**',
          new OrderCreatedEvent('123', userId, price),
        );
      }
    ```
    
    - `ClientKafka.emit(**pattern**, data)`  : kafka의 patter에 이벤트 메세지 데이터 전달
        - **`pattern` 에 맞는 `@EventPattern` 데코레이터를 통해 마이크로서비스간 이벤트 수신이 가능하다.**
    
2. billing
    1. main
    
    ```tsx
    async function bootstrap() {
      const app = await NestFactory.createMicroservice<MicroserviceOptions>(
        AppModule,
        {
          transport: Transport.KAFKA,
          options: {
            client: {
              brokers: ['localhost:9092'],
            },
            consumer: {
              groupId: 'billing-consumer',
            },
          },
        },
      );
      app.listen();
    }
    bootstrap();
    ```
    
    - `NestFactory.createMicroservice<MicroserviceOptions>(module, options)`
        - 마이크로서비스 모듈 등록
    
    b. module
    
    ```tsx
    import { Module } from '@nestjs/common';
    import { ClientsModule, Transport } from '@nestjs/microservices';
    import { AppController } from './app.controller';
    import { AppService } from './app.service';
    
    @Module({
      imports: [
        ClientsModule.register([
          {
            name: '**AUTH_SERVICE**',
            transport: Transport.KAFKA,
            options: {
              client: {
                clientId: 'auth',
                brokers: ['localhost:9092'],
              },
              consumer: {
                groupId: 'auth-consumer',
              },
            },
          },
        ]),
      ],
      controllers: [AppController],
      providers: [AppService],
    })
    export class AppModule {}
    ```
    
    c. service
    
    ```tsx
    @Inject('AUTH_SERVICE') 
    private readonly authClient: ClientKafka,
    
    @EventPattern('**order_created**')
      handleOrderCreated(data: any) {
        console.log('Order created test: ', data.value);
        this.appService.handleOrderCreated(data.value);
      }
    
    handleOrderCreated(orderCreatedEvent: OrderCreatedEvent) {
        console.log('orderCreatedEvent.userId:',orderCreatedEvent.userId);
        this.authClient
          .send('**get_user**', new GetUserRequest(orderCreatedEvent.userId))
          .subscribe((user) => {
            console.log('user: ', user);
            console.log(
              `Billing user with stripe ID ${user.stripeUserId} a price of $${orderCreatedEvent.price}...`,
            );
          });
      }
    ```
    
    - `@EventPattern` : **api-gatewa의 emit에서 받은 패턴의 메세지로 작업 수행**
    - `ClientKafka.send(pattern, data)` : request-response 메세지 데이터 전송, emit과 유사
    - `subscribe((value:T) → void)` : `ClientKafka.send(pattern, data)` 의 return으로 얻은 데이터로 로직 수행 가능

1. Auth
    1. main, module 생략
    2. service
    
    ```tsx
    @MessagePattern('**get_user**')
      getUser(data: any) {
        console.log("MessagePattern get_user: ", data.value)
        ***return this.appService.getUser(data.value);***
      }
    ```
    
    - 위의 subscribe에서 **`this.appService.getUser(data.value)` 의 데이터를 읽어 처리할 수 있다.**