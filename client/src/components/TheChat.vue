<script lang="ts" setup>
import { computed, ref } from "vue";
import { Message } from "../typings";
import getId from "../utils/getId";

const messages = ref<Message[]>([]);
const message = ref("");
const userName = ref("");

const id = computed(() => getId(messages.value));

function addMessage() {
  if (message.value === "") return;

  const newMessage = {
    id: id.value,
    message: message.value,
    userName: userName.value,
  };

  messages.value.push(newMessage);
}
</script>

<template>
  <section class="chat">
    <div class="chat__message" v-for="message in messages" :key="message.id">
      <p class="chat__message-sender">{{ message.userName }}</p>
      <p class="chat__message-content">{{ message.message }}</p>
    </div>
    <div class="chat__message-create">
      <input class="chat__input" v-model="message" />
      <button class="chat__button" @click="addMessage">
        <span class="material-symbols-outlined"> send </span>
      </button>
    </div>
  </section>
</template>

<style scoped>
.chat {
  background: #fff;
  max-width: 600px;
  height: 95%;
  width: 100%;
  border-radius: 8px;
  position: relative;
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
  padding: 0 16px;
}
</style>
