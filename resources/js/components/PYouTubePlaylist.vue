<script setup>
import { computed, ref, useTemplateRef } from 'vue'

const mediaEl = useTemplateRef('video')
const loaded = ref(false)
const modifier = computed(() => (loaded.value ? '-loaded' : ''))

const playPause = () => {
  loaded.value = true

  const iframe = mediaEl.value.querySelector('iframe')
  if (iframe && iframe.getAttribute('tabindex') === -1) {
    iframe.removeAttribute('tabindex')
  }
}
</script>

<template>
  <div ref="video" class="p-youtube-playlist-wrapper">
    <slot name="default" />
  </div>
  <slot name="placeholder" v-bind="{ playPause, loaded, modifier }">
    <button @click="playPause">play</button>
  </slot>
</template>

<style scoped>
.p-youtube-playlist-wrapper {
  container-type: size;
}
</style>
