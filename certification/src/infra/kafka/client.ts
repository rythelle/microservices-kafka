import { Kafka, KafkaConfig } from "kafkajs";

//Define configuration of consumer
const config: KafkaConfig = {
  clientId: "certification",
  brokers: ["localhost:9092"],
};

//Instance of Kafka
export const kafka = new Kafka(config);
