<script setup>
import { useTemplateRef } from 'vue'

/**
 * PAccordion is a vue component for the <details> element. It uses the native <details> element
 * state to determine whether it's open or closed, and merely handles updating CSS properties
 * to allow the element to use transitions between dynamic closed and [open] heights.
 *
 * @param {string} summary - selector for the summary element.
 *                           Default: 'summary:first-of-type'
 */
const props = defineProps({
  summary: { type: String, default: 'summary:first-of-type' },
})
const details = useTemplateRef('details')

const handleToggle = event => {
  const el = event.currentTarget
  const summary = el.querySelector(props.summary)

  if (!summary) {
    return
  }

  if (!summary.contains(event.target)) {
    return
  }

  el.style.removeProperty('--accordion-height')

  if (!el.open) {
    const startingHeight = el.clientHeight

    el.style.setProperty('--accordion-transition-duration', 0)

    requestAnimationFrame(() => {
      const endingHeight = el.clientHeight

      el.style.removeProperty('--accordion-transition-duration')
      el.style.setProperty('--accordion-height', 0)

      requestAnimationFrame(() => {
        el.style.setProperty('--accordion-height', `${endingHeight - startingHeight}px`)
      })
    })
  }
}
</script>

<template>
  <details ref="details" class="accordion" @click="handleToggle">
    <slot />
  </details>
</template>
