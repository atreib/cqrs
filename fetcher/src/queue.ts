import { connect } from "amqplib";
import { sleep } from "./utils";

let QUEUE_NAME = process.env.QUEUE_NAME ?? "projects";

export const sendMessage = async (message: string) => {
    const conn = await connect("amqp://localhost");
    const channel = await conn.createChannel();
    await channel.assertQueue(QUEUE_NAME, { durable: true });
    channel.sendToQueue(QUEUE_NAME, Buffer.from(message));
    await sleep(300);
    conn.close();
}