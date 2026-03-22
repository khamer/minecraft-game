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

  // Try to use Wistia API if available
  if (window.Wistia && iframe) {
    const wistiaEmbed = window.Wistia.api(iframe)
    if (wistiaEmbed) {
      wistiaEmbed.play()
    }
  }
}
</script>

<template>
  <div ref="video">
    <slot name="default" />
  </div>
  <slot name="placeholder" v-bind="{ playPause, loaded, modifier }">
    <button @click="playPause">play</button>
  </slot>
</template>

<style scoped>
div {
  container-type: size;
}
</style>
