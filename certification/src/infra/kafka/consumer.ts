import {
  ConsumerSubscribeTopic,
  EachMessagePayload,
  TopicMessages,
} from "kafkajs";
import { kafka } from "./client";
import { makeCreationUserHandler } from "./factories/CreateUserHandlerFactory";

//Instance of consumer
export const consumer = kafka.consumer({
  groupId: "certification-group",
  allowAutoTopicCreation: true,
});

export async function start() {
  //Open the connection
  await consumer.connect();

  //define name of topic
  const topic: ConsumerSubscribeTopic = {
    topic: "certificate",
  };

  //Subscribe in topic
  await consumer.subscribe(topic);

  //Instance of procedure(response)
  const producer = kafka.producer();
  producer.connect();

  const creationUserHandler = makeCreationUserHandler();

  //Run consumer with message
  await consumer.run({
    async eachMessage(messagePayload: EachMessagePayload) {
      try {
        const { topic, partition, message } = messagePayload;

        const newMessage = JSON.parse(message.value!.toString());

        const response = await creationUserHandler(newMessage);

        // const topicMessages: TopicMessages = {
        //   topic: "response-certificate",
        //   messages: response,
        // };

        // producer.send(topicMessages);
      } catch (error) {
        console.log(error);
      }
    },
  });
}
