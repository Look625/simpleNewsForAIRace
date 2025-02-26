<template>
  <div class="app min-h-screen bg-gray-100">
    <router-view></router-view>
    <TabBar />
  </div>
</template>

<script setup lang="ts">
import TabBar from '@/components/TabBar.vue'
</script> 