<script setup>
import { register } from 'swiper/element/bundle'
import { ref, useTemplateRef } from 'vue'

register()

const swiper = ref(null)
const slides = ref([])
const swiperEl = useTemplateRef('swiper')

const init = e => {
  slides.value = e.target.swiper?.slides
  console.log(e.target, e.target?.swiper, swiperEl.value)
}
</script>
<template>
  <swiper-container ref="swiper" v-bind="$attrs" @swiperafterinit="init">
    <slot />
  </swiper-container>

  <ul>
    <li v-for="(slide, i) of slides" :key="i">
      {{ i }}
    </li>
  </ul>
</template>
