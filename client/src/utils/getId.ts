import { Message } from "../typings/index.ts";

export default function getId(messages: Message[]) {
  if (messages.length === 0) {
    return 0;
  }

  const sortedMessages = messages.sort(
    (message1, message2) => message2.id - message1.id
  );

  return sortedMessages[0].id + 1;
}
