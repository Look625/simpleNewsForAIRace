<template>
  <button :class="buttonClass" @click="onClick">
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
defineProps({
  buttonClass: {
    type: String,
    default: 'bg-blue-500 text-white'
  },
  onClick: {
    type: Function,
    default: () => {}
  }
});
</script>

<style scoped>
button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style> 