# Queue

- 리소스 집약적인 작업 수행의 경우 Queue에 추가 후 후에 처리함으로 백엔드 작업 처리를 확장할 수 있다.
- 모놀리틱한 작업을 마이크로한 아키텍처로 분할시킬 수 있다.
- 다양한 서비스 전반에 걸쳐 안정적인 통신 채널을 제공한다. 에러/상태 변화 등의 알림을 받을 수 있다.
- Nest에서는 @nestjs/bull 이라는 패키지를 제공하여 쉽게 queue를 구현할 수 있다.
    - bull은 Redis를 사용하여 작업 데이터를 유지한다

### Install / setup

```tsx
$ npm install --save @nestjs/bull bull

//app.module.tsJS
import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
  ],
})
export class AppModule {}
```

### Queue 등록

`BullModule.registerQueue()`

```tsx
BullModule.registerQueue({
  name: 'audio',
 { lifo: true }, // default는 FIFO
});
```

각각의 Queue에는 하나 이상의 `producer`, `consumer`, `listener`가 있을 수 있다.

### Producer

- `InjectQueue(queue_name)`  를 통해 대기열에 `job`을 추가한다.
    
    ```tsx
    import { Injectable } from '@nestjs/common';
    import { Queue } from 'bull';
    import { InjectQueue } from '@nestjs/bull';
    
    @Injectable()
    export class AudioService {
      constructor(@InjectQueue('audio') private audioQueue: Queue) {}
    }
    ```
    
- job Option
    - priority : 우선순위 set
    - delay : job이 실행될 딜레이 시간 set
    - lifo : fifo/lifo set, default는 fifo
    - attempts : 총 시도 수 set
    - repeat : cron에 따라 작업 반복
    - backoff : 작업이 실패할 경우 backoff 시도
    - timeout : 타임아웃 시간 set, milliseconds
    - jobId : job을 특정하고 싶을때 각각의 job에 id를 부여할 수 있다.
    

### **Consumers**

- queue에 추가된 작업을 처리하거나 이벤트를 수신한다.
- @Processor() 데코레이터로 Consumer 클래스를 선언한다.
- 클래스 안에서는 @Progress로 작업 핸들러를 선언한다.

```tsx
import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';

@Processor('audio')
export class AudioConsumer {
  @Process()
  async transcode(job: Job<unknown>) {
    let progress = 0;
    for (let i = 0; i < 100; i++) {
      await doSomething(job.data);
      progress += 1;
      await job.progress(progress);
    }
    return {};
  }
}
```

- `transcode` 는 queue에 `job` 이 있고, worker가 동작 가능한경우 호출된다,
- `job` 객체들과 상호 작용할 수 있는 여러 메서드들이 존재한다.
    - 위 예제에서 `progress` 는 작업 진행 상황을 업데이트한다.
- Request-scoped consumers
    - @Processor의 scope가 `Scope.REQUEST`인 경우, 각각의 job마다 새 인스턴스가 생성된다.
    - 이렇게 생성된 인스턴스들은 job이 완료된 후 gc로 처리된다.
        
        ```tsx
        @Processor({
          name: 'audio',
          scope: Scope.REQUEST,
        })
        ```
        

### Event Listeners

- `queue`나 `job`의 상태 변경이 일어날 때마다, `event set`을 생성한다.
- event listener은 consumer 클래스 내(`@Processor`)에서 선언되어야 한다.
- event를 수신하기 위해, 아래의 데코레이터들 중 하나를 사용한다.

```tsx
import { Processor, Process, OnQueueActive } from '@nestjs/bull';
import { Job } from 'bull';

@Processor('audio')
export class AudioConsumer {

  @OnQueueActive()
  onActive(job: Job) {
    console.log(
      `Processing job ${job.id} of type ${job.name} with data ${job.data}...`,
    );
  }
  ...
```

- Bull은 다수의 분산된 환경에서 작동하기 때문에, event의 지역성(locality)를 정의해야 한다.
- Local event listeners : 로컬 프로세스의 큐에서 작업이나 상태 변경이 트리거될 때 선언한다.
    - `@OnQueueWaiting(), @OnQueueActive() ..`
    - 인자로 `job Object`를 받는다.
- Global event listeners : 한 프로세스의 리스너가 다른 프로세스에 의해 트리거된 이벤트를 수신할 경우 선언한다.
    - `@OnQueueGlobalWaiting(), @OnQueueGlobalActive() ..`
    - 인자로 `jobId`를 받는다.

`@OnQueueActive()` : job이 시작할 때 호출

`@OnQueueCompleted()` : job이 완료될 때 호출

`job.returnvalue();` : `@Process`의 return 부분을 return한다.

`job.finished()` : job을 끝낸다.