import { start } from "./infra/kafka/consumer";

start().then(() => {
  console.log("Consumer Kafka is running");
});
