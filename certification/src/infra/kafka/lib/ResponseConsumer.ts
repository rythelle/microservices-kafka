import {
    Kafka,
    Message,
    Producer,
    ProducerBatch,
    TopicMessages,
  } from "kafkajs";
  
  interface CustomMessageFormat {
    a: string;
  }
  
  export default class ProducerFactoryResponse {
    private producer: Producer;
  
    //Instance of producer
    constructor() {
      this.producer = this.createProducer();
    }
  
    //Connect to producer
    public async start(): Promise<void> {
      try {
        await this.producer.connect();
      } catch (error) {
        console.log("Error connecting the producer: ", error);
      }
    }
  
    public async shutdown(): Promise<void> {
      await this.producer.disconnect();
    }
  
    public async sendBatch(messages: Array<CustomMessageFormat>): Promise<void> {
      const kafkaMessages: Array<Message> = messages.map((message) => {
        return {
          value: JSON.stringify(message),
        };
      });
  
      const topicMessages: TopicMessages = {
        topic: "certificate-response",
        messages: kafkaMessages,
      };
  
      const batch: ProducerBatch = {
        topicMessages: [topicMessages],
      };
  
      await this.producer.sendBatch(batch);
    }
  
    //Create producer
    private createProducer(): Producer {
      const kafka = new Kafka({
        clientId: "certification",
        brokers: ["localhost:9092"],
        retry: {
          initialRetryTime: 300,
          retries: 5,
        },
      });
  
      // const admin = kafka.admin();
  
      // admin.connect();
  
      // this.start();
  
      // admin.createTopics({
      //   waitForLeaders: true,
      //   topics: [{ topic: "certificate" }],
      // });
      return kafka.producer();
    }
  }
  