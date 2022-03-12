import { connect, Connection } from "amqplib";

let QUEUE_NAME = process.env.QUEUE_NAME ?? "projects";

export const consumeMessages = async (callback: (message: string) => Promise<void>) => {
    const conn = await connect("amqp://localhost");
    const channel = await conn.createChannel();
    await channel.assertQueue(QUEUE_NAME, { durable: true });
    channel.consume(QUEUE_NAME, function (msg) {
        if (msg) {
            callback(msg.content.toString())
                .then(() => console.log(`Project <${msg.content.toString()}> was processed`));
        };
    }, { noAck: true });
}