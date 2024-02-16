import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { AppService } from './app.service';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 마이크로서비스 추가
  app.connectMicroservice({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: ['localhost:9092'],
      },
      consumer: {
        groupId: 'eklee-group-0',
      },
    },
  });

  const service = app.get(AppService);
  // 메시지 구독
  await service.subscribeToMessage();
  // 마이크로서비스 실행
  await app.startAllMicroservices();
  // HTTP(S) 서버 실행
  await app.listen(3000);
}

bootstrap();