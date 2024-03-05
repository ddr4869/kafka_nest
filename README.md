## Kafka 클러스터 구성하기

`~/go/src/github.com/kafka_2.13-3.3.1`

1. zookeeper로 kafka 시작
    1. `bin/zookeeper-server-start.sh config/zookeeper.properties` - zookeeper
    2. `bin/kafka-server-start.sh config/server.properties` - broker
    

2. Topic 생성

- event를 생성하기 전, 토픽이 존재하여야 한다.
1. 토픽 생성
    
    `bin/kafka-topics.sh --create --topic eklee --bootstrap-server [localhost:9092](http://localhost:9092)` 
    
    - `eklee`라는 토픽을 생성한다.
2. 토픽 조회
    
    `bin/kafka-topics.sh --describe --topic eklee --bootstrap-server localhost:9092`
    
    ```tsx
    Topic: quickstart-events        TopicId: NPmZHyhbR9y00wMglMH2sg PartitionCount: 1       ReplicationFactor: 1	Configs:
        Topic: quickstart-events Partition: 0    Leader: 0   Replicas: 0 Isr: 0
    ```
    

3. 토픽에 event 쓰기
    
    ```tsx
    bin/kafka-console-producer.sh --topic quickstart-events --bootstrap-server localhost:9092
    
    This is my first event
    This is my second event
    // Ctrl + c 로 마침
    ```
    

4. event 읽기
    
    ```tsx
    bin/kafka-console-consumer.sh --topic quickstart-events --from-beginning --bootstrap-server localhost:9092
    
    >This is my first event
    >This is my second event
    ```
