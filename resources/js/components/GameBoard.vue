<!-- resources/js/components/GameBoard.vue -->
<template>
  <div class="board">
    <div class="stage-label">Stage {{ stage }} of 3</div>

    <div class="grid" :style="gridStyle">
      <MaterialItem
        v-for="item in items"
        :key="item.id"
        :item="item"
        :checked="checkedIds.has(item.id)"
        @toggle="$emit('toggle', $event)"
      />
    </div>

    <button
      class="btn-complete"
      :disabled="!allChecked"
      @click="$emit('complete')"
    >
      STAGE COMPLETE
    </button>
  </div>
</template>

<script>
import MaterialItem from './MaterialItem.vue'

const COLS = { 1: 2, 2: 3, 3: 4 }

export default {
  name: 'GameBoard',
  components: { MaterialItem },
  props: {
    items:      { type: Array,   required: true },
    checkedIds: { type: Set,     required: true },
    allChecked: { type: Boolean, required: true },
    stage:      { type: Number,  required: true },
  },
  emits: ['toggle', 'complete'],
  computed: {
    gridStyle() {
      const cols = COLS[this.stage] ?? 2
      return { gridTemplateColumns: `repeat(${cols}, 1fr)` }
    },
  },
}
</script>

<style scoped>
.board {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.stage-label {
  color: #aaa;
  font-size: 20px;
  font-family: 'VT323', monospace;
  letter-spacing: 2px;
}

.grid {
  display: grid;
  gap: 10px;
  width: 100%;
}

.btn-complete {
  width: 100%;
  background: #3a7a3a;
  border: 3px solid #5EFF5E;
  color: #5EFF5E;
  font-family: 'VT323', monospace;
  font-size: 24px;
  letter-spacing: 2px;
  padding: 10px;
  cursor: pointer;
  transition: background 0.1s;
}
.btn-complete:hover:not(:disabled) {
  background: #4a9a4a;
}
.btn-complete:disabled {
  border-color: #444;
  color: #666;
  background: #222;
  cursor: not-allowed;
}
</style>
