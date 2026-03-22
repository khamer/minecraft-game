# Minecraft Puzzler — Design Spec
_Date: 2026-03-22_

## Overview

A single-page Vue web game where players collect Minecraft blocks across three increasingly large stages. Each stage presents a grid of blocks to gather; the player clicks each block to mark it collected, then advances when all are checked off. After completing all three stages, a success screen appears with a Play Again option.

---

## Game Rules

- **Stage 1:** 2×2 grid — 4 overworld blocks
- **Stage 2:** 3×3 grid — 8 overworld blocks + 1 nether block (9 total)
- **Stage 3:** 4×4 grid — 14 overworld blocks + 2 nether blocks (16 total)
- All items are **unique across all three stages** — no block repeats between stages
- Players **click individual items** to mark them collected (dimmed, strikethrough, ✓ overlay)
- The **Stage Complete button is disabled** until every item in the current stage is checked off
- After Stage 3 completes, a **success screen** is shown with a Play Again button that resets the game

---

## Architecture

### File Structure

```
resources/js/
  data/
    materials.js          # OVERWORLD_POOL (~400) and NETHER_POOL (~100) arrays
  composables/
    useGame.js            # All game state and logic
  components/
    MinecraftPuzzler.vue  # Top-level shell, switches between game and success screen
    GameBoard.vue         # Current stage grid + Complete button
    MaterialItem.vue      # Single block: texture + name, click to check off
public/
  index.html              # Game HTML page, mounts Vue app
  textures/               # Downloaded 16×16 block PNGs (via download script)
scripts/
  download-textures.sh    # Fetches all textures from InventivetalentDev/minecraft-assets
```

### Integration with existing entry point

`MinecraftPuzzler` is added to the `components` object in the existing `resources/js/index.js`:

```js
// resources/js/index.js (existing pattern — add one line)
MinecraftPuzzler: defineAsyncComponent(() => import('./components/MinecraftPuzzler.vue')),
```

The Vue app is already mounted on `#app`. `public/index.html` places `<minecraft-puzzler></minecraft-puzzler>` inside that `#app` div.

### `public/index.html` structure

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Minecraft Puzzler</title>
  <!-- Vite injects hashed CSS/JS from dist/ in production via manifest -->
  <!-- In dev, Vite serves directly -->
  <script type="module" src="/resources/js/index.js"></script>
</head>
<body>
  <div id="app">
    <minecraft-puzzler></minecraft-puzzler>
  </div>
</body>
</html>
```

---

## Data Shape

```js
// materials.js
// Each entry: id (string, unique), name (display string), texture (PNG filename in /textures/),
// pool ('overworld' | 'nether') — used by MaterialItem for nether styling
export const OVERWORLD_POOL = [
  { id: 'grass_block', name: 'Grass Block', texture: 'grass_block_top.png', pool: 'overworld' },
  { id: 'stone',       name: 'Stone',       texture: 'stone.png',           pool: 'overworld' },
  // ... ~400 total
]

export const NETHER_POOL = [
  { id: 'netherrack', name: 'Netherrack', texture: 'netherrack.png', pool: 'nether' },
  // ... ~100 total
]
```

The `pool` field is set at definition time in `materials.js`. `MaterialItem` reads `item.pool` to apply nether styling — no separate prop needed.

### Overworld Pool Coverage (~400 entries)
Sourced from Java Edition 1.21. Includes:
- Stone family: stone, granite, diorite, andesite, polished variants, stone bricks (normal/mossy/cracked/chiseled), smooth stone, calcite, tuff and tuff variants
- Deepslate family: deepslate, cobbled deepslate, polished deepslate, deepslate bricks/tiles (cracked variants), chiseled deepslate
- Dirt/soil: dirt, coarse dirt, rooted dirt, grass block, podzol, mycelium, mud, packed mud, farmland, dirt path
- Sand: sand, red sand, sandstone (normal/smooth/chiseled/cut), red sandstone variants
- Gravel
- Wood types (Oak, Birch, Spruce, Jungle, Acacia, Dark Oak, Mangrove, Cherry, Bamboo, Pale Oak): log, wood, stripped log, stripped wood, planks, leaves for each
- Ores (overworld): coal, iron, gold, diamond, emerald, lapis, redstone, copper — normal and deepslate variants
- Metal/mineral blocks: iron, gold, diamond, emerald, lapis, redstone, coal, copper (and copper oxidation stages + waxed variants)
- Terracotta: plain + 16 colors
- Glazed terracotta: 16 colors
- Concrete: 16 colors
- Concrete powder: 16 colors
- Wool: 16 colors
- Carpet: 16 colors
- Glass: plain, tinted + 16 stained colors; glass panes
- Prismarine: prismarine, prismarine bricks, dark prismarine, sea lantern
- Ice family: ice, packed ice, blue ice, snow block, powder snow
- Nature/plants: cactus, bamboo, dead bush, vine, lily pad, moss block, azalea, flowering azalea, big dripleaf, spore blossom, hanging roots, pointed dripstone, dripstone block, sculk, sculk catalyst, sculk sensor, sculk shrieker, amethyst block, budding amethyst
- Mushrooms: red/brown mushroom, red/brown mushroom block, mushroom stem
- Crops/food blocks: melon, pumpkin, carved pumpkin, jack o'lantern, hay bale, honeycomb block, honey block
- Functional blocks: crafting table, furnace, blast furnace, smoker, chest, trapped chest, ender chest, barrel, bookshelf, chiseled bookshelf, enchanting table, anvil variants, brewing stand, cauldron, jukebox, note block, TNT, dispenser, dropper, observer, piston, sticky piston, hopper, beacon, redstone lamp, target
- Miscellaneous: obsidian, sponge, wet sponge, slime block, bricks (clay bricks + mossy variants), bone block, purpur block/pillar (end, for variety), end stone (for variety), lodestone

Note: `crying_obsidian` belongs to the **Nether pool only** (dropped by ghasts; nether-associated). It is not in the overworld pool.

### Nether Pool Coverage (~100 entries)
- Base blocks: netherrack, soul sand, soul soil, glowstone, magma block, ancient debris, crying obsidian
- Nether brick family: nether bricks, red nether bricks, cracked nether bricks, chiseled nether bricks, nether brick stairs, nether brick slab, nether brick wall, red nether brick stairs, red nether brick slab, red nether brick wall
- Blackstone family: blackstone, gilded blackstone, polished blackstone, polished blackstone bricks, cracked polished blackstone bricks, chiseled polished blackstone, polished blackstone stairs, polished blackstone brick stairs, polished blackstone slab, polished blackstone brick slab, polished blackstone wall, polished blackstone brick wall
- Basalt family: basalt, smooth basalt, polished basalt
- Crimson wood: crimson stem, stripped crimson stem, crimson hyphae, stripped crimson hyphae, crimson planks, crimson nylium
- Warped wood: warped stem, stripped warped stem, warped hyphae, stripped warped hyphae, warped planks, warped nylium
- Fungi/plants: crimson fungus, warped fungus, shroomlight, nether wart block, warped wart block, nether sprouts, crimson roots, warped roots
- Ores: nether quartz ore, nether gold ore
- Crafted nether blocks: netherite block, nether quartz block (block of quartz), smooth quartz, quartz bricks, chiseled quartz, quartz pillar
- Miscellaneous: respawn anchor

---

## Composable: `useGame.js`

This composable uses module-level refs (shared singleton state) — intentional for a single-instance game. All state lives here; components only receive what they need via props.

```js
// Internal (not exported): the three pre-generated stage arrays
const stageArrays = ref([[], [], []])   // set on init and reset

// Exported reactive state
const stage = ref(1)                    // 1 | 2 | 3 | 'success'
const checkedIds = ref(new Set())

// Computed (exported)
const currentItems = computed(() => stageArrays.value[stage.value - 1] ?? [])
const allChecked = computed(() => checkedIds.value.size === currentItems.value.length)

// Methods
function toggleItem(id) { ... }   // add/remove from checkedIds; trigger Set reactivity by reassigning
function completeStage() { ... }  // clears checkedIds, then advances stage or sets 'success'
function reset() { ... }          // re-shuffles pools, re-slices into stageArrays, THEN sets stage to 1, clears checkedIds
                                  // stageArrays must be repopulated before stage is set, to avoid a transient stale currentItems read
```

**`completeStage()` must clear `checkedIds` before updating `stage`** so that `allChecked` evaluates correctly against the new stage's items.

**Stage generation** (called once on init and on `reset()`):
1. Shuffle a copy of `OVERWORLD_POOL` and `NETHER_POOL` independently (Fisher-Yates or similar)
2. Slice overworld using `.slice()`: `slice(0, 4)` → stage 1 (4 items), `slice(4, 12)` → stage 2 (8 items), `slice(12, 26)` → stage 3 (14 items)
3. Slice nether: `slice(0, 1)` → appended to stage 2 array, `slice(1, 3)` → appended to stage 3 array
4. Store all three stage arrays internally; `currentItems` is a computed that returns the array for the current `stage` number

**Column count mapping** (used in `GameBoard`):
- Stage 1 → 2 columns
- Stage 2 → 3 columns
- Stage 3 → 4 columns

Use a lookup object `{ 1: 2, 2: 3, 3: 4 }` rather than computing `stage + 1` (keeps the mapping explicit and safe if stages change).

---

## Components

### `MinecraftPuzzler.vue`
- Top-level shell
- Renders `<GameBoard>` when `stage` is 1/2/3
- Renders success screen when `stage === 'success'`: gold "YOU WIN!" heading, "All materials collected" subtitle, purple Play Again button that calls `reset()`
- Dark Minecraft background (`#1c1c1c`), `#555` borders

### `GameBoard.vue`
Props: `items[]`, `checkedIds` (Set), `allChecked` (Boolean), `stage` (Number)
Emits: `toggle(id)`, `complete`
- Derives column count from stage via lookup: `{ 1: 2, 2: 3, 3: 4 }[stage]`
- Renders a CSS grid: `grid-template-columns: repeat(N, 1fr)`
- Renders `<MaterialItem v-for="item in items" :key="item.id" :item="item" :checked="checkedIds.has(item.id)" @toggle="$emit('toggle', $event)">` — `:key="item.id"` is required (not index) so Vue replaces DOM nodes on stage transition rather than reusing them, preventing stale checked-state visuals
- "STAGE COMPLETE" button: `:disabled="!allChecked"`, visually muted (gray) when disabled

### `MaterialItem.vue`
Props: `item` (Object with `id`, `name`, `texture`, `pool`), `checked` (Boolean)
Emits: `toggle`
- `<img>` tag: `:src="'/textures/' + item.texture"`, `width="48"`, `height="48"`, CSS `image-rendering: pixelated`
- On `@error`: replace `src` with a gray placeholder data URI so broken textures degrade gracefully without a broken-image icon. The handler must guard against infinite re-firing: `if (e.target.src.startsWith('data:')) return`. Use a 1×1 solid gray data URI: `data:image/gif;base64,R0lGODlhAQABAPAAAHV1df///yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==` (scaled to 48×48 via CSS)
- Name below in VT323
- Nether styling when `item.pool === 'nether'`: `border-color: #8B1A1A`, `background: #2a1a1a`, name color `#FF6B35`
- Checked state: `opacity: 0.4`, `text-decoration: line-through`, green ✓ (`#5EFF5E`) overlay in top-right corner

---

## Textures

**Source:** `https://raw.githubusercontent.com/InventivetalentDev/minecraft-assets/1.21/assets/minecraft/textures/block/{filename}`

**Download script:** `scripts/download-textures.sh`
- Reads a hardcoded list of filenames (matching the `texture` fields in `materials.js`)
- Downloads each to `public/textures/` via `curl -f` (fail silently on 404)
- Skips files that already exist (idempotent re-runs)
- Reports per-file success/failure and a final summary count

**Rendering:** All `<img>` tags use `image-rendering: pixelated` so 16×16 sprites scale crisply to 48×48 display size. If a texture 404s at runtime, `@error` on the `<img>` swaps in the gray placeholder.

---

## Styling

- **Font:** VT323 (Google Fonts) — `@import` goes in `resources/styles/index.scss` (the existing CSS entry point), not inside a component, to avoid Flash of Unstyled Text
- **Background:** `#0d0d0d` page, `#1c1c1c` game panel
- **Borders:** `3px solid #555` on game panel; `2px solid #444` on items
- **Nether items:** `border-color: #8B1A1A`, `background: #2a1a1a`, name color `#FF6B35`
- **Checked items:** `opacity: 0.4`, strikethrough, green ✓ (`#5EFF5E`)
- **Complete button:** green (`#3a7a3a`) with bright green border; disabled state uses `#444` border and `#666` text with `cursor: not-allowed`
- **Success screen:** gold heading (`#FFD700`), purple Play Again button (`#7a3a7a` bg, `#cc88ff` border/text)

---

## Out of Scope

- Saving progress between sessions
- Timer or scoring
- Mobile-specific layout (should be playable but not optimized)
- End-dimension blocks as a fourth stage
