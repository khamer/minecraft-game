<!-- resources/js/components/MaterialItem.vue -->
<template>
  <div
    class="item"
    :class="{ checked: checked, nether: item.pool === 'nether' }"
    @click="$emit('toggle')"
  >
    <img
      :src="'/textures/' + item.texture"
      :alt="item.name"
      width="48"
      height="48"
      class="item-texture"
      @error="onImgError"
    />
    <div class="item-name">{{ item.name }}</div>
    <span v-if="checked" class="checkmark">✓</span>
  </div>
</template>

<script>
const PLACEHOLDER = 'data:image/gif;base64,R0lGODlhAQABAPAAAHV1df///yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=='

export default {
  name: 'MaterialItem',
  props: {
    item:    { type: Object,  required: true },
    checked: { type: Boolean, default: false },
  },
  emits: ['toggle'],
  methods: {
    onImgError(e) {
      if (e.target.src.startsWith('data:')) return  // guard against recursive firing
      e.target.src = PLACEHOLDER
    },
  },
}
</script>

<style scoped>
.item {
  background: #2a2a2a;
  border: 2px solid #444;
  padding: 8px 4px 6px;
  text-align: center;
  cursor: pointer;
  position: relative;
  user-select: none;
  transition: border-color 0.1s;
}
.item:hover {
  border-color: #888;
}
.item.nether:hover {
  border-color: #b52222;
}
.item.nether {
  border-color: #8B1A1A;
  background: #2a1a1a;
}
.item.nether .item-name {
  color: #FF6B35;
}
.item.checked {
  opacity: 0.4;
}
.item.checked .item-name {
  text-decoration: line-through;
}
.item-texture {
  display: block;
  width: 48px;
  height: 48px;
  margin: 0 auto 4px;
  image-rendering: pixelated;
}
.item-name {
  color: #ddd;
  font-size: 14px;
  line-height: 1.1;
  font-family: 'VT323', monospace;
}
.checkmark {
  position: absolute;
  top: 2px;
  right: 4px;
  color: #5EFF5E;
  font-size: 16px;
  line-height: 1;
}
</style>
