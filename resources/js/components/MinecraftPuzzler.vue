<!-- resources/js/components/MinecraftPuzzler.vue -->
<template>
  <div class="puzzler-wrap">
    <div class="puzzler-panel">
      <div class="puzzler-title">PUZZLER</div>

      <!-- Game board -->
      <!-- v-if guard ensures GameBoard only receives numeric stage values (1|2|3) -->
      <GameBoard
        v-if="stage !== 'success'"
        :items="currentItems"
        :checked-ids="checkedIds"
        :all-checked="allChecked"
        :stage="stage"
        @toggle="toggleItem"
        @complete="completeStage"
      />

      <!-- Success screen -->
      <div v-else class="success">
        <div class="success-title">YOU WIN!</div>
        <div class="success-sub">All materials collected</div>
        <button class="btn-again" @click="reset">PLAY AGAIN</button>
      </div>
    </div>
  </div>
</template>

<script>
import GameBoard from './GameBoard.vue'
import { useGame } from '../composables/useGame.js'

export default {
  name: 'MinecraftPuzzler',
  components: { GameBoard },
  setup() {
    return useGame()
  },
}
</script>

<style scoped>
.puzzler-wrap {
  min-height: 100vh;
  background: #0d0d0d;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 40px 20px;
}

.puzzler-panel {
  background: #1c1c1c;
  border: 3px solid #555;
  width: 100%;
  max-width: 480px;
  padding: 24px 20px;
}

.puzzler-title {
  font-family: 'VT323', monospace;
  font-size: 36px;
  color: #5EFF5E;
  text-align: center;
  letter-spacing: 3px;
  text-shadow: 0 0 12px #3a3;
  margin-bottom: 16px;
}

/* Success screen */
.success {
  text-align: center;
  padding: 20px 0;
}
.success-title {
  font-family: 'VT323', monospace;
  font-size: 64px;
  color: #FFD700;
  letter-spacing: 4px;
  text-shadow: 0 0 20px #aa8800;
}
.success-sub {
  font-family: 'VT323', monospace;
  font-size: 22px;
  color: #aaa;
  margin: 8px 0 24px;
}
.btn-again {
  background: #7a3a7a;
  border: 3px solid #cc88ff;
  color: #cc88ff;
  font-family: 'VT323', monospace;
  font-size: 24px;
  letter-spacing: 2px;
  padding: 10px 28px;
  cursor: pointer;
  transition: background 0.1s;
}
.btn-again:hover {
  background: #9a5a9a;
}
</style>
