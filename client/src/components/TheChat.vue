<script lang="ts" setup>
import { computed, ref, Teleport } from "vue";
import ChatModal from "./ChatModal.vue";
import { Message } from "../../../shared/typings";
import { io } from "https://cdn.socket.io/4.7.2/socket.io.esm.min.js";

const socket = io();
const messages = ref<Message[]>([]);
const message = ref("");
const userName = ref("");
const sortedMessages = computed(() =>
  messages.value.sort((a, b) => b.id - a.id)
);

function addMessage() {
  if (message.value === "") return;

  const newMessage = {
    message: message.value,
    userName: userName.value,
  };

  socket.emit("newMessage", newMessage);
  message.value = "";
}

socket.on("newMessages", (newMessages: Message[]) => {
  messages.value = newMessages;
});

socket.on("initialMessages", (initialMessages: Message[]) => {
  messages.value = initialMessages;
});
</script>

<template>
  <section class="chat">
    <div class="chat__messages">
      <div
        class="chat__message"
        v-for="message in sortedMessages"
        :key="message.id"
      >
        <p class="chat__message-sender">{{ message.userName }}</p>
        <p class="chat__message-content">{{ message.message }}</p>
      </div>
      <div class="chat__message-create">
        <input
          class="chat__input"
          v-model="message"
          @keyup.enter="addMessage"
        />
        <button class="chat__button" @click="addMessage">
          <span class="material-symbols-outlined"> send </span>
        </button>
      </div>
    </div>
  </section>
  <Teleport to="body">
    <ChatModal
      :open="userName === ''"
      v-on:set-user-name="(name) => (userName = name)"
    />
  </Teleport>
</template>

<style scoped>
.chat__messages {
  height: 80%;
  overflow-y: scroll;
}
.chat {
  background: #fff;
  max-width: 600px;
  height: 95%;
  width: 100%;
  border-radius: 8px;
  position: relative;
}

.chat__message-sender {
  margin-bottom: 0;
}

.chat__message-content {
  margin-top: 0;
}

.chat__message-create {
  height: 60px;
  width: 100%;
  display: flex;
  position: absolute;
  bottom: 0;
}

.chat__input {
  width: 100%;
  font-size: 24px;
  border-bottom-left-radius: 8px;
}

.chat__button {
  border-bottom-right-radius: 8px;
  cursor: pointer;
}

.chat__message {
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
  align-items: flex-end;
  padding: 0 16px;
}

@media (max-width: 600px) {
  .chat {
    height: 100%;
    border-radius: 0;
  }
}
</style>
