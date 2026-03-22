// resources/js/composables/useGame.js
import { ref, computed } from 'vue'
import { OVERWORLD_POOL, NETHER_POOL } from '../data/materials.js'

// Fisher-Yates shuffle — returns a new shuffled array, does not mutate input
function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function generateStages() {
  const overworld = shuffle(OVERWORLD_POOL)
  const nether    = shuffle(NETHER_POOL)

  // Stage 1: 4 overworld
  const stage1 = overworld.slice(0, 4)

  // Stage 2: 8 overworld + 1 nether = 9 total
  const stage2 = [...overworld.slice(4, 12), ...nether.slice(0, 1)]

  // Stage 3: 14 overworld + 2 nether = 16 total
  const stage3 = [...overworld.slice(12, 26), ...nether.slice(1, 3)]

  return [stage1, stage2, stage3]
}

// Module-level singleton state — intentional for a single-instance game
const stageArrays = ref([[], [], []])
const stage       = ref(1)           // 1 | 2 | 3 | 'success'
const checkedIds  = ref(new Set())

// Computed
const currentItems = computed(() => stageArrays.value[stage.value - 1] ?? [])
const allChecked   = computed(() => checkedIds.value.size === currentItems.value.length)

function toggleItem(id) {
  const next = new Set(checkedIds.value)
  if (next.has(id)) {
    next.delete(id)
  } else {
    next.add(id)
  }
  checkedIds.value = next  // reassign to trigger Vue reactivity on Set
}

function completeStage() {
  checkedIds.value = new Set()  // clear BEFORE advancing stage
  if (stage.value === 3) {
    stage.value = 'success'
  } else {
    stage.value = stage.value + 1
  }
}

function reset() {
  // Repopulate stageArrays BEFORE resetting stage, so currentItems computed
  // doesn't transiently read old data
  stageArrays.value = generateStages()
  checkedIds.value  = new Set()
  stage.value       = 1
}

// Initialize on module load
reset()

export function useGame() {
  return { stage, currentItems, checkedIds, allChecked, toggleItem, completeStage, reset }
}
