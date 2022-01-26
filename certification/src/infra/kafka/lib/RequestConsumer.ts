import {
    Consumer,
    ConsumerSubscribeTopic,
    Kafka,
    EachMessagePayload,
  } from "kafkajs";
  
  import ProducerFactoryResponse from "./ResponseConsumer";
  
  export default class ConsumerFactory {
    private kafkaConsumer: Consumer;
  
    public constructor() {
      this.kafkaConsumer = this.createKafkaConsumer();
    }
  
    public async startConsumer(): Promise<void> {
      const topic: ConsumerSubscribeTopic = {
        topic: "certificate",
        fromBeginning: false,
      };
  
      try {
        await this.kafkaConsumer.connect();
        await this.kafkaConsumer.subscribe(topic);
  
        await this.kafkaConsumer.run({
          eachMessage: async (messagePayload: EachMessagePayload) => {
            const { topic, partition, message } = messagePayload;
            const prefix = `${topic}[${partition} | ${message.offset}] / ${message.timestamp}`;
            console.log(`- ${prefix} ${message.key}#${message.value}`);
  
            const producerFactoryResponse = new ProducerFactoryResponse();
  
            await producerFactoryResponse.start();
  
            // await producerFactoryResponse.sendBatch(message.value);
          },
        });
  
        // await this.shutdown();
      } catch (error) {
        console.log("Error: ", error);
      }
    }
  
    //   public async startBatchConsumer(): Promise<void> {
    //     const topic: ConsumerSubscribeTopic = {
    //       topic: "certificate",
    //       fromBeginning: false,
    //     };
  
    //     try {
    //       await this.kafkaConsumer.connect();
    //       await this.kafkaConsumer.subscribe(topic);
    //       await this.kafkaConsumer.run({
    //         eachBatch: async (eatchBatchPayload: EachBatchPayload) => {
    //           const { topic, partition, batch } = eachBatchPayload;
    //           for (const message of batch.messages) {
    //             const prefix = `${topic}[${partition} | ${message.offset}] / ${message.timestamp}`;
    //             console.log(`- ${prefix} ${message.key}#${message.value}`);
    //           }
    //         },
    //       });
    //     } catch (error) {
    //       console.log("Error: ", error);
    //     }
    //   }
  
    public async shutdown(): Promise<void> {
      await this.kafkaConsumer.disconnect();
    }
  
    private createKafkaConsumer(): Consumer {
      const kafka = new Kafka({
        clientId: "certification",
        brokers: ["localhost:9092"],
      });
  
      const consumer = kafka.consumer({ groupId: "certification-group" });
  
      return consumer;
    }
  }
  