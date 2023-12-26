<script setup>
import { ref } from "vue";
const userName = ref("");

const emit = defineEmits(["setUserName"]);

defineProps({
  open: Boolean,
});

function sendUserName() {
  if (userName.value === "") return;

  emit("setUserName", userName.value);
}
</script>

<template>
  <div v-if="open" class="modal">
    <div class="modal__content">
      <h2 class="modal__title">Hello to continue type your username</h2>

      <div class="modal__input-wrapper">
        <input type="text" v-model="userName" />
        <button @click="sendUserName">Continue</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal {
  position: fixed;
  z-index: 999;
  background: rgba(0, 0, 0, 0.5);
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;

  display: flex;
  align-items: center;
  justify-content: center;
}

.modal__input-wrapper {
  display: flex;
  flex-wrap: wrap;
  height: 60px;
  width: 100%;
}

.modal__input-wrapper button,
.modal__input-wrapper input {
  width: 100%;
}

.modal__title {
  color: #fff;
}
</style>
