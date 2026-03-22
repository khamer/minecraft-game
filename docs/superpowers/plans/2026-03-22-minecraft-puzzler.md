# Minecraft Puzzler Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a Vue single-page game that presents randomized Minecraft block grids (2×2 → 3×3 → 4×4) for players to collect and check off, with a success screen after all three stages.

**Architecture:** Module-level `useGame.js` composable owns all state; three focused components (`MinecraftPuzzler`, `GameBoard`, `MaterialItem`) handle rendering. Block textures are 16×16 PNGs downloaded locally to `public/textures/` from InventivetalentDev/minecraft-assets.

**Tech Stack:** Vue 3 (options API root via existing `index.js`, SFC components), Vite, VT323 (Google Fonts), Sass (existing `index.scss`), vanilla CSS in `<style scoped>` blocks.

---

## File Map

| Action | File |
|--------|------|
| Create | `resources/js/data/materials.js` |
| Create | `resources/js/composables/useGame.js` |
| Create | `resources/js/components/MinecraftPuzzler.vue` |
| Create | `resources/js/components/GameBoard.vue` |
| Create | `resources/js/components/MaterialItem.vue` |
| Create | `scripts/download-textures.sh` |
| Create | `public/index.html` |
| Modify | `resources/js/index.js` (add one component line) |
| Modify | `resources/styles/index.scss` (add VT323 import) |

---

## Task 1: Directory scaffold and dev server check

**Files:**
- Create dirs: `resources/js/data/`, `resources/js/composables/`, `scripts/`, `public/textures/`

- [ ] **Step 1: Create directories**

```bash
mkdir -p resources/js/data resources/js/composables scripts public/textures
```

- [ ] **Step 2: Verify dev server starts**

```bash
npx vite --port 5173
```

Open `http://localhost:5173/` — expect the pronto pattern library or a blank page (no errors in terminal). Stop server with Ctrl+C.

- [ ] **Step 3: Commit scaffold**

```bash
git init
git add -A
git commit -m "chore: initial project scaffold"
```

(Skip `git init` if already a repo.)

---

## Task 2: Write `resources/js/data/materials.js`

**Files:**
- Create: `resources/js/data/materials.js`

- [ ] **Step 1: Write the complete materials file**

```js
// resources/js/data/materials.js
// pool: 'overworld' | 'nether' — drives nether styling in MaterialItem

export const OVERWORLD_POOL = [
  // --- Stone family ---
  { id: 'stone',                    name: 'Stone',                    texture: 'stone.png',                      pool: 'overworld' },
  { id: 'granite',                  name: 'Granite',                  texture: 'granite.png',                    pool: 'overworld' },
  { id: 'polished_granite',         name: 'Polished Granite',         texture: 'polished_granite.png',           pool: 'overworld' },
  { id: 'diorite',                  name: 'Diorite',                  texture: 'diorite.png',                    pool: 'overworld' },
  { id: 'polished_diorite',         name: 'Polished Diorite',         texture: 'polished_diorite.png',           pool: 'overworld' },
  { id: 'andesite',                 name: 'Andesite',                 texture: 'andesite.png',                   pool: 'overworld' },
  { id: 'polished_andesite',        name: 'Polished Andesite',        texture: 'polished_andesite.png',          pool: 'overworld' },
  { id: 'cobblestone',              name: 'Cobblestone',              texture: 'cobblestone.png',                pool: 'overworld' },
  { id: 'mossy_cobblestone',        name: 'Mossy Cobblestone',        texture: 'mossy_cobblestone.png',          pool: 'overworld' },
  { id: 'stone_bricks',             name: 'Stone Bricks',             texture: 'stone_bricks.png',               pool: 'overworld' },
  { id: 'mossy_stone_bricks',       name: 'Mossy Stone Bricks',       texture: 'mossy_stone_bricks.png',         pool: 'overworld' },
  { id: 'cracked_stone_bricks',     name: 'Cracked Stone Bricks',     texture: 'cracked_stone_bricks.png',       pool: 'overworld' },
  { id: 'chiseled_stone_bricks',    name: 'Chiseled Stone Bricks',    texture: 'chiseled_stone_bricks.png',      pool: 'overworld' },
  { id: 'smooth_stone',             name: 'Smooth Stone',             texture: 'smooth_stone.png',               pool: 'overworld' },
  { id: 'calcite',                  name: 'Calcite',                  texture: 'calcite.png',                    pool: 'overworld' },
  { id: 'tuff',                     name: 'Tuff',                     texture: 'tuff.png',                       pool: 'overworld' },
  { id: 'tuff_bricks',              name: 'Tuff Bricks',              texture: 'tuff_bricks.png',                pool: 'overworld' },
  { id: 'polished_tuff',            name: 'Polished Tuff',            texture: 'polished_tuff.png',              pool: 'overworld' },
  { id: 'chiseled_tuff',            name: 'Chiseled Tuff',            texture: 'chiseled_tuff.png',              pool: 'overworld' },
  { id: 'stone_brick_slab',         name: 'Stone Brick Slab',         texture: 'stone_bricks.png',               pool: 'overworld' },
  { id: 'stone_brick_stairs',       name: 'Stone Brick Stairs',       texture: 'stone_bricks.png',               pool: 'overworld' },
  { id: 'stone_brick_wall',         name: 'Stone Brick Wall',         texture: 'stone_bricks.png',               pool: 'overworld' },
  { id: 'cobblestone_slab',         name: 'Cobblestone Slab',         texture: 'cobblestone.png',                pool: 'overworld' },
  { id: 'cobblestone_stairs',       name: 'Cobblestone Stairs',       texture: 'cobblestone.png',                pool: 'overworld' },
  { id: 'cobblestone_wall',         name: 'Cobblestone Wall',         texture: 'cobblestone.png',                pool: 'overworld' },
  { id: 'mossy_cobblestone_wall',   name: 'Mossy Cobblestone Wall',   texture: 'mossy_cobblestone.png',          pool: 'overworld' },
  { id: 'mossy_stone_brick_wall',   name: 'Mossy Stone Brick Wall',   texture: 'mossy_stone_bricks.png',         pool: 'overworld' },
  { id: 'tuff_brick_slab',          name: 'Tuff Brick Slab',          texture: 'tuff_bricks.png',                pool: 'overworld' },
  { id: 'tuff_brick_stairs',        name: 'Tuff Brick Stairs',        texture: 'tuff_bricks.png',                pool: 'overworld' },
  { id: 'tuff_brick_wall',          name: 'Tuff Brick Wall',          texture: 'tuff_bricks.png',                pool: 'overworld' },
  { id: 'polished_tuff_slab',       name: 'Polished Tuff Slab',       texture: 'polished_tuff.png',              pool: 'overworld' },
  { id: 'polished_tuff_stairs',     name: 'Polished Tuff Stairs',     texture: 'polished_tuff.png',              pool: 'overworld' },
  { id: 'polished_tuff_wall',       name: 'Polished Tuff Wall',       texture: 'polished_tuff.png',              pool: 'overworld' },

  // --- Deepslate family ---
  { id: 'deepslate',                       name: 'Deepslate',                       texture: 'deepslate_top.png',                    pool: 'overworld' },
  { id: 'cobbled_deepslate',               name: 'Cobbled Deepslate',               texture: 'cobbled_deepslate.png',                pool: 'overworld' },
  { id: 'polished_deepslate',              name: 'Polished Deepslate',              texture: 'polished_deepslate.png',               pool: 'overworld' },
  { id: 'deepslate_bricks',               name: 'Deepslate Bricks',               texture: 'deepslate_bricks.png',                 pool: 'overworld' },
  { id: 'cracked_deepslate_bricks',       name: 'Cracked Deepslate Bricks',       texture: 'cracked_deepslate_bricks.png',         pool: 'overworld' },
  { id: 'deepslate_tiles',                name: 'Deepslate Tiles',                texture: 'deepslate_tiles.png',                  pool: 'overworld' },
  { id: 'cracked_deepslate_tiles',        name: 'Cracked Deepslate Tiles',        texture: 'cracked_deepslate_tiles.png',          pool: 'overworld' },
  { id: 'chiseled_deepslate',             name: 'Chiseled Deepslate',             texture: 'chiseled_deepslate.png',               pool: 'overworld' },
  { id: 'reinforced_deepslate',           name: 'Reinforced Deepslate',           texture: 'reinforced_deepslate.png',             pool: 'overworld' },
  { id: 'cobbled_deepslate_slab',         name: 'Cobbled Deepslate Slab',         texture: 'cobbled_deepslate.png',                pool: 'overworld' },
  { id: 'cobbled_deepslate_stairs',       name: 'Cobbled Deepslate Stairs',       texture: 'cobbled_deepslate.png',                pool: 'overworld' },
  { id: 'cobbled_deepslate_wall',         name: 'Cobbled Deepslate Wall',         texture: 'cobbled_deepslate.png',                pool: 'overworld' },
  { id: 'polished_deepslate_slab',        name: 'Polished Deepslate Slab',        texture: 'polished_deepslate.png',               pool: 'overworld' },
  { id: 'polished_deepslate_stairs',      name: 'Polished Deepslate Stairs',      texture: 'polished_deepslate.png',               pool: 'overworld' },
  { id: 'polished_deepslate_wall',        name: 'Polished Deepslate Wall',        texture: 'polished_deepslate.png',               pool: 'overworld' },
  { id: 'deepslate_brick_slab',           name: 'Deepslate Brick Slab',           texture: 'deepslate_bricks.png',                 pool: 'overworld' },
  { id: 'deepslate_brick_stairs',         name: 'Deepslate Brick Stairs',         texture: 'deepslate_bricks.png',                 pool: 'overworld' },
  { id: 'deepslate_brick_wall',           name: 'Deepslate Brick Wall',           texture: 'deepslate_bricks.png',                 pool: 'overworld' },
  { id: 'deepslate_tile_slab',            name: 'Deepslate Tile Slab',            texture: 'deepslate_tiles.png',                  pool: 'overworld' },
  { id: 'deepslate_tile_stairs',          name: 'Deepslate Tile Stairs',          texture: 'deepslate_tiles.png',                  pool: 'overworld' },
  { id: 'deepslate_tile_wall',            name: 'Deepslate Tile Wall',            texture: 'deepslate_tiles.png',                  pool: 'overworld' },

  // --- Dirt / soil ---
  { id: 'dirt',          name: 'Dirt',          texture: 'dirt.png',          pool: 'overworld' },
  { id: 'coarse_dirt',   name: 'Coarse Dirt',   texture: 'coarse_dirt.png',   pool: 'overworld' },
  { id: 'rooted_dirt',   name: 'Rooted Dirt',   texture: 'rooted_dirt.png',   pool: 'overworld' },
  { id: 'grass_block',   name: 'Grass Block',   texture: 'grass_block_top.png', pool: 'overworld' },
  { id: 'podzol',        name: 'Podzol',        texture: 'podzol_top.png',    pool: 'overworld' },
  { id: 'mycelium',      name: 'Mycelium',      texture: 'mycelium_top.png',  pool: 'overworld' },
  { id: 'mud',           name: 'Mud',           texture: 'mud.png',           pool: 'overworld' },
  { id: 'packed_mud',    name: 'Packed Mud',    texture: 'packed_mud.png',    pool: 'overworld' },
  { id: 'mud_bricks',    name: 'Mud Bricks',    texture: 'mud_bricks.png',    pool: 'overworld' },
  { id: 'mud_brick_slab',    name: 'Mud Brick Slab',    texture: 'mud_bricks.png', pool: 'overworld' },
  { id: 'mud_brick_stairs',  name: 'Mud Brick Stairs',  texture: 'mud_bricks.png', pool: 'overworld' },
  { id: 'mud_brick_wall',    name: 'Mud Brick Wall',    texture: 'mud_bricks.png', pool: 'overworld' },
  { id: 'farmland',      name: 'Farmland',      texture: 'farmland.png',      pool: 'overworld' },
  { id: 'dirt_path',     name: 'Dirt Path',     texture: 'dirt_path_top.png', pool: 'overworld' },

  // --- Sand family ---
  { id: 'sand',                    name: 'Sand',                    texture: 'sand.png',                    pool: 'overworld' },
  { id: 'red_sand',                name: 'Red Sand',                texture: 'red_sand.png',                pool: 'overworld' },
  { id: 'sandstone',               name: 'Sandstone',               texture: 'sandstone.png',               pool: 'overworld' },
  { id: 'smooth_sandstone',        name: 'Smooth Sandstone',        texture: 'smooth_sandstone.png',        pool: 'overworld' },
  { id: 'chiseled_sandstone',      name: 'Chiseled Sandstone',      texture: 'chiseled_sandstone.png',      pool: 'overworld' },
  { id: 'cut_sandstone',           name: 'Cut Sandstone',           texture: 'cut_sandstone.png',           pool: 'overworld' },
  { id: 'sandstone_slab',          name: 'Sandstone Slab',          texture: 'sandstone.png',               pool: 'overworld' },
  { id: 'sandstone_stairs',        name: 'Sandstone Stairs',        texture: 'sandstone.png',               pool: 'overworld' },
  { id: 'sandstone_wall',          name: 'Sandstone Wall',          texture: 'sandstone.png',               pool: 'overworld' },
  { id: 'red_sandstone',           name: 'Red Sandstone',           texture: 'red_sandstone.png',           pool: 'overworld' },
  { id: 'smooth_red_sandstone',    name: 'Smooth Red Sandstone',    texture: 'smooth_red_sandstone.png',    pool: 'overworld' },
  { id: 'chiseled_red_sandstone',  name: 'Chiseled Red Sandstone',  texture: 'chiseled_red_sandstone.png',  pool: 'overworld' },
  { id: 'cut_red_sandstone',       name: 'Cut Red Sandstone',       texture: 'cut_red_sandstone.png',       pool: 'overworld' },
  { id: 'red_sandstone_slab',      name: 'Red Sandstone Slab',      texture: 'red_sandstone.png',           pool: 'overworld' },
  { id: 'red_sandstone_stairs',    name: 'Red Sandstone Stairs',    texture: 'red_sandstone.png',           pool: 'overworld' },
  { id: 'red_sandstone_wall',      name: 'Red Sandstone Wall',      texture: 'red_sandstone.png',           pool: 'overworld' },

  // --- Gravel ---
  { id: 'gravel', name: 'Gravel', texture: 'gravel.png', pool: 'overworld' },

  // --- Granite / diorite / andesite stairs, slabs, walls ---
  { id: 'granite_slab',              name: 'Granite Slab',              texture: 'granite.png',           pool: 'overworld' },
  { id: 'granite_stairs',            name: 'Granite Stairs',            texture: 'granite.png',           pool: 'overworld' },
  { id: 'granite_wall',              name: 'Granite Wall',              texture: 'granite.png',           pool: 'overworld' },
  { id: 'polished_granite_slab',     name: 'Polished Granite Slab',     texture: 'polished_granite.png',  pool: 'overworld' },
  { id: 'polished_granite_stairs',   name: 'Polished Granite Stairs',   texture: 'polished_granite.png',  pool: 'overworld' },
  { id: 'diorite_slab',              name: 'Diorite Slab',              texture: 'diorite.png',           pool: 'overworld' },
  { id: 'diorite_stairs',            name: 'Diorite Stairs',            texture: 'diorite.png',           pool: 'overworld' },
  { id: 'diorite_wall',              name: 'Diorite Wall',              texture: 'diorite.png',           pool: 'overworld' },
  { id: 'polished_diorite_slab',     name: 'Polished Diorite Slab',     texture: 'polished_diorite.png',  pool: 'overworld' },
  { id: 'polished_diorite_stairs',   name: 'Polished Diorite Stairs',   texture: 'polished_diorite.png',  pool: 'overworld' },
  { id: 'andesite_slab',             name: 'Andesite Slab',             texture: 'andesite.png',          pool: 'overworld' },
  { id: 'andesite_stairs',           name: 'Andesite Stairs',           texture: 'andesite.png',          pool: 'overworld' },
  { id: 'andesite_wall',             name: 'Andesite Wall',             texture: 'andesite.png',          pool: 'overworld' },
  { id: 'polished_andesite_slab',    name: 'Polished Andesite Slab',    texture: 'polished_andesite.png', pool: 'overworld' },
  { id: 'polished_andesite_stairs',  name: 'Polished Andesite Stairs',  texture: 'polished_andesite.png', pool: 'overworld' },

  // --- Bricks ---
  { id: 'bricks',       name: 'Bricks',       texture: 'bricks.png', pool: 'overworld' },
  { id: 'brick_slab',   name: 'Brick Slab',   texture: 'bricks.png', pool: 'overworld' },
  { id: 'brick_stairs', name: 'Brick Stairs', texture: 'bricks.png', pool: 'overworld' },
  { id: 'brick_wall',   name: 'Brick Wall',   texture: 'bricks.png', pool: 'overworld' },
  { id: 'mossy_bricks', name: 'Mossy Bricks', texture: 'mossy_bricks.png', pool: 'overworld' },

  // --- Wood: Oak ---
  { id: 'oak_log',           name: 'Oak Log',           texture: 'oak_log.png',           pool: 'overworld' },
  { id: 'oak_wood',          name: 'Oak Wood',          texture: 'oak_wood.png',           pool: 'overworld' },
  { id: 'stripped_oak_log',  name: 'Stripped Oak Log',  texture: 'stripped_oak_log.png',   pool: 'overworld' },
  { id: 'stripped_oak_wood', name: 'Stripped Oak Wood', texture: 'stripped_oak_wood.png',  pool: 'overworld' },
  { id: 'oak_planks',        name: 'Oak Planks',        texture: 'oak_planks.png',         pool: 'overworld' },
  { id: 'oak_leaves',        name: 'Oak Leaves',        texture: 'oak_leaves.png',         pool: 'overworld' },

  // --- Wood: Birch ---
  { id: 'birch_log',           name: 'Birch Log',           texture: 'birch_log.png',           pool: 'overworld' },
  { id: 'birch_wood',          name: 'Birch Wood',          texture: 'birch_wood.png',           pool: 'overworld' },
  { id: 'stripped_birch_log',  name: 'Stripped Birch Log',  texture: 'stripped_birch_log.png',   pool: 'overworld' },
  { id: 'stripped_birch_wood', name: 'Stripped Birch Wood', texture: 'stripped_birch_wood.png',  pool: 'overworld' },
  { id: 'birch_planks',        name: 'Birch Planks',        texture: 'birch_planks.png',         pool: 'overworld' },
  { id: 'birch_leaves',        name: 'Birch Leaves',        texture: 'birch_leaves.png',         pool: 'overworld' },

  // --- Wood: Spruce ---
  { id: 'spruce_log',           name: 'Spruce Log',           texture: 'spruce_log.png',           pool: 'overworld' },
  { id: 'spruce_wood',          name: 'Spruce Wood',          texture: 'spruce_wood.png',           pool: 'overworld' },
  { id: 'stripped_spruce_log',  name: 'Stripped Spruce Log',  texture: 'stripped_spruce_log.png',   pool: 'overworld' },
  { id: 'stripped_spruce_wood', name: 'Stripped Spruce Wood', texture: 'stripped_spruce_wood.png',  pool: 'overworld' },
  { id: 'spruce_planks',        name: 'Spruce Planks',        texture: 'spruce_planks.png',         pool: 'overworld' },
  { id: 'spruce_leaves',        name: 'Spruce Leaves',        texture: 'spruce_leaves.png',         pool: 'overworld' },

  // --- Wood: Jungle ---
  { id: 'jungle_log',           name: 'Jungle Log',           texture: 'jungle_log.png',           pool: 'overworld' },
  { id: 'jungle_wood',          name: 'Jungle Wood',          texture: 'jungle_wood.png',           pool: 'overworld' },
  { id: 'stripped_jungle_log',  name: 'Stripped Jungle Log',  texture: 'stripped_jungle_log.png',   pool: 'overworld' },
  { id: 'stripped_jungle_wood', name: 'Stripped Jungle Wood', texture: 'stripped_jungle_wood.png',  pool: 'overworld' },
  { id: 'jungle_planks',        name: 'Jungle Planks',        texture: 'jungle_planks.png',         pool: 'overworld' },
  { id: 'jungle_leaves',        name: 'Jungle Leaves',        texture: 'jungle_leaves.png',         pool: 'overworld' },

  // --- Wood: Acacia ---
  { id: 'acacia_log',           name: 'Acacia Log',           texture: 'acacia_log.png',           pool: 'overworld' },
  { id: 'acacia_wood',          name: 'Acacia Wood',          texture: 'acacia_wood.png',           pool: 'overworld' },
  { id: 'stripped_acacia_log',  name: 'Stripped Acacia Log',  texture: 'stripped_acacia_log.png',   pool: 'overworld' },
  { id: 'stripped_acacia_wood', name: 'Stripped Acacia Wood', texture: 'stripped_acacia_wood.png',  pool: 'overworld' },
  { id: 'acacia_planks',        name: 'Acacia Planks',        texture: 'acacia_planks.png',         pool: 'overworld' },
  { id: 'acacia_leaves',        name: 'Acacia Leaves',        texture: 'acacia_leaves.png',         pool: 'overworld' },

  // --- Wood: Dark Oak ---
  { id: 'dark_oak_log',           name: 'Dark Oak Log',           texture: 'dark_oak_log.png',           pool: 'overworld' },
  { id: 'dark_oak_wood',          name: 'Dark Oak Wood',          texture: 'dark_oak_wood.png',           pool: 'overworld' },
  { id: 'stripped_dark_oak_log',  name: 'Stripped Dark Oak Log',  texture: 'stripped_dark_oak_log.png',   pool: 'overworld' },
  { id: 'stripped_dark_oak_wood', name: 'Stripped Dark Oak Wood', texture: 'stripped_dark_oak_wood.png',  pool: 'overworld' },
  { id: 'dark_oak_planks',        name: 'Dark Oak Planks',        texture: 'dark_oak_planks.png',         pool: 'overworld' },
  { id: 'dark_oak_leaves',        name: 'Dark Oak Leaves',        texture: 'dark_oak_leaves.png',         pool: 'overworld' },

  // --- Wood: Mangrove ---
  { id: 'mangrove_log',           name: 'Mangrove Log',           texture: 'mangrove_log.png',           pool: 'overworld' },
  { id: 'mangrove_wood',          name: 'Mangrove Wood',          texture: 'mangrove_wood.png',           pool: 'overworld' },
  { id: 'stripped_mangrove_log',  name: 'Stripped Mangrove Log',  texture: 'stripped_mangrove_log.png',   pool: 'overworld' },
  { id: 'stripped_mangrove_wood', name: 'Stripped Mangrove Wood', texture: 'stripped_mangrove_wood.png',  pool: 'overworld' },
  { id: 'mangrove_planks',        name: 'Mangrove Planks',        texture: 'mangrove_planks.png',         pool: 'overworld' },
  { id: 'mangrove_leaves',        name: 'Mangrove Leaves',        texture: 'mangrove_leaves.png',         pool: 'overworld' },
  { id: 'mangrove_roots',         name: 'Mangrove Roots',         texture: 'mangrove_roots_side.png',     pool: 'overworld' },
  { id: 'muddy_mangrove_roots',   name: 'Muddy Mangrove Roots',   texture: 'muddy_mangrove_roots_side.png', pool: 'overworld' },

  // --- Wood: Cherry (1.20) ---
  { id: 'cherry_log',           name: 'Cherry Log',           texture: 'cherry_log.png',           pool: 'overworld' },
  { id: 'cherry_wood',          name: 'Cherry Wood',          texture: 'cherry_wood.png',           pool: 'overworld' },
  { id: 'stripped_cherry_log',  name: 'Stripped Cherry Log',  texture: 'stripped_cherry_log.png',   pool: 'overworld' },
  { id: 'stripped_cherry_wood', name: 'Stripped Cherry Wood', texture: 'stripped_cherry_wood.png',  pool: 'overworld' },
  { id: 'cherry_planks',        name: 'Cherry Planks',        texture: 'cherry_planks.png',         pool: 'overworld' },
  { id: 'cherry_leaves',        name: 'Cherry Leaves',        texture: 'cherry_leaves.png',         pool: 'overworld' },

  // --- Wood: Bamboo (1.20) ---
  { id: 'bamboo_block',          name: 'Bamboo Block',          texture: 'bamboo_block_side.png', pool: 'overworld' },
  { id: 'stripped_bamboo_block', name: 'Stripped Bamboo Block', texture: 'stripped_bamboo_block_side.png', pool: 'overworld' },
  { id: 'bamboo_planks',         name: 'Bamboo Planks',         texture: 'bamboo_planks.png',     pool: 'overworld' },
  { id: 'bamboo_mosaic',         name: 'Bamboo Mosaic',         texture: 'bamboo_mosaic.png',     pool: 'overworld' },

  // --- Overworld ores ---
  { id: 'coal_ore',              name: 'Coal Ore',              texture: 'coal_ore.png',              pool: 'overworld' },
  { id: 'iron_ore',              name: 'Iron Ore',              texture: 'iron_ore.png',              pool: 'overworld' },
  { id: 'gold_ore',              name: 'Gold Ore',              texture: 'gold_ore.png',              pool: 'overworld' },
  { id: 'diamond_ore',           name: 'Diamond Ore',           texture: 'diamond_ore.png',           pool: 'overworld' },
  { id: 'emerald_ore',           name: 'Emerald Ore',           texture: 'emerald_ore.png',           pool: 'overworld' },
  { id: 'lapis_ore',             name: 'Lapis Ore',             texture: 'lapis_ore.png',             pool: 'overworld' },
  { id: 'redstone_ore',          name: 'Redstone Ore',          texture: 'redstone_ore.png',          pool: 'overworld' },
  { id: 'copper_ore',            name: 'Copper Ore',            texture: 'copper_ore.png',            pool: 'overworld' },
  { id: 'deepslate_coal_ore',    name: 'Deepslate Coal Ore',    texture: 'deepslate_coal_ore.png',    pool: 'overworld' },
  { id: 'deepslate_iron_ore',    name: 'Deepslate Iron Ore',    texture: 'deepslate_iron_ore.png',    pool: 'overworld' },
  { id: 'deepslate_gold_ore',    name: 'Deepslate Gold Ore',    texture: 'deepslate_gold_ore.png',    pool: 'overworld' },
  { id: 'deepslate_diamond_ore', name: 'Deepslate Diamond Ore', texture: 'deepslate_diamond_ore.png', pool: 'overworld' },
  { id: 'deepslate_emerald_ore', name: 'Deepslate Emerald Ore', texture: 'deepslate_emerald_ore.png', pool: 'overworld' },
  { id: 'deepslate_lapis_ore',   name: 'Deepslate Lapis Ore',   texture: 'deepslate_lapis_ore.png',   pool: 'overworld' },
  { id: 'deepslate_redstone_ore',name: 'Deepslate Redstone Ore',texture: 'deepslate_redstone_ore.png',pool: 'overworld' },
  { id: 'deepslate_copper_ore',  name: 'Deepslate Copper Ore',  texture: 'deepslate_copper_ore.png',  pool: 'overworld' },

  // --- Metal / mineral blocks ---
  { id: 'iron_block',     name: 'Iron Block',     texture: 'iron_block.png',     pool: 'overworld' },
  { id: 'gold_block',     name: 'Gold Block',     texture: 'gold_block.png',     pool: 'overworld' },
  { id: 'diamond_block',  name: 'Diamond Block',  texture: 'diamond_block.png',  pool: 'overworld' },
  { id: 'emerald_block',  name: 'Emerald Block',  texture: 'emerald_block.png',  pool: 'overworld' },
  { id: 'lapis_block',    name: 'Lapis Block',    texture: 'lapis_block.png',    pool: 'overworld' },
  { id: 'redstone_block', name: 'Redstone Block', texture: 'redstone_block.png', pool: 'overworld' },
  { id: 'coal_block',     name: 'Coal Block',     texture: 'coal_block.png',     pool: 'overworld' },
  { id: 'raw_iron_block', name: 'Raw Iron Block', texture: 'raw_iron_block.png', pool: 'overworld' },
  { id: 'raw_gold_block', name: 'Raw Gold Block', texture: 'raw_gold_block.png', pool: 'overworld' },
  { id: 'raw_copper_block', name: 'Raw Copper Block', texture: 'raw_copper_block.png', pool: 'overworld' },

  // --- Copper oxidation stages ---
  { id: 'copper_block',           name: 'Copper Block',           texture: 'copper_block.png',           pool: 'overworld' },
  { id: 'exposed_copper',         name: 'Exposed Copper',         texture: 'exposed_copper.png',         pool: 'overworld' },
  { id: 'weathered_copper',       name: 'Weathered Copper',       texture: 'weathered_copper.png',       pool: 'overworld' },
  { id: 'oxidized_copper',        name: 'Oxidized Copper',        texture: 'oxidized_copper.png',        pool: 'overworld' },
  { id: 'cut_copper',             name: 'Cut Copper',             texture: 'cut_copper.png',             pool: 'overworld' },
  { id: 'exposed_cut_copper',     name: 'Exposed Cut Copper',     texture: 'exposed_cut_copper.png',     pool: 'overworld' },
  { id: 'weathered_cut_copper',   name: 'Weathered Cut Copper',   texture: 'weathered_cut_copper.png',   pool: 'overworld' },
  { id: 'oxidized_cut_copper',    name: 'Oxidized Cut Copper',    texture: 'oxidized_cut_copper.png',    pool: 'overworld' },
  { id: 'waxed_copper_block',         name: 'Waxed Copper Block',         texture: 'copper_block.png',         pool: 'overworld' },
  { id: 'waxed_exposed_copper',       name: 'Waxed Exposed Copper',       texture: 'exposed_copper.png',       pool: 'overworld' },
  { id: 'waxed_weathered_copper',     name: 'Waxed Weathered Copper',     texture: 'weathered_copper.png',     pool: 'overworld' },
  { id: 'waxed_oxidized_copper',      name: 'Waxed Oxidized Copper',      texture: 'oxidized_copper.png',      pool: 'overworld' },
  { id: 'waxed_cut_copper',           name: 'Waxed Cut Copper',           texture: 'cut_copper.png',           pool: 'overworld' },
  { id: 'waxed_exposed_cut_copper',   name: 'Waxed Exposed Cut Copper',   texture: 'exposed_cut_copper.png',   pool: 'overworld' },
  { id: 'waxed_weathered_cut_copper', name: 'Waxed Weathered Cut Copper', texture: 'weathered_cut_copper.png', pool: 'overworld' },
  { id: 'waxed_oxidized_cut_copper',  name: 'Waxed Oxidized Cut Copper',  texture: 'oxidized_cut_copper.png',  pool: 'overworld' },

  // --- Terracotta (plain + 16 colors) ---
  { id: 'terracotta',             name: 'Terracotta',             texture: 'terracotta.png',             pool: 'overworld' },
  { id: 'white_terracotta',       name: 'White Terracotta',       texture: 'white_terracotta.png',       pool: 'overworld' },
  { id: 'orange_terracotta',      name: 'Orange Terracotta',      texture: 'orange_terracotta.png',      pool: 'overworld' },
  { id: 'magenta_terracotta',     name: 'Magenta Terracotta',     texture: 'magenta_terracotta.png',     pool: 'overworld' },
  { id: 'light_blue_terracotta',  name: 'Light Blue Terracotta',  texture: 'light_blue_terracotta.png',  pool: 'overworld' },
  { id: 'yellow_terracotta',      name: 'Yellow Terracotta',      texture: 'yellow_terracotta.png',      pool: 'overworld' },
  { id: 'lime_terracotta',        name: 'Lime Terracotta',        texture: 'lime_terracotta.png',        pool: 'overworld' },
  { id: 'pink_terracotta',        name: 'Pink Terracotta',        texture: 'pink_terracotta.png',        pool: 'overworld' },
  { id: 'gray_terracotta',        name: 'Gray Terracotta',        texture: 'gray_terracotta.png',        pool: 'overworld' },
  { id: 'light_gray_terracotta',  name: 'Light Gray Terracotta',  texture: 'light_gray_terracotta.png',  pool: 'overworld' },
  { id: 'cyan_terracotta',        name: 'Cyan Terracotta',        texture: 'cyan_terracotta.png',        pool: 'overworld' },
  { id: 'purple_terracotta',      name: 'Purple Terracotta',      texture: 'purple_terracotta.png',      pool: 'overworld' },
  { id: 'blue_terracotta',        name: 'Blue Terracotta',        texture: 'blue_terracotta.png',        pool: 'overworld' },
  { id: 'brown_terracotta',       name: 'Brown Terracotta',       texture: 'brown_terracotta.png',       pool: 'overworld' },
  { id: 'green_terracotta',       name: 'Green Terracotta',       texture: 'green_terracotta.png',       pool: 'overworld' },
  { id: 'red_terracotta',         name: 'Red Terracotta',         texture: 'red_terracotta.png',         pool: 'overworld' },
  { id: 'black_terracotta',       name: 'Black Terracotta',       texture: 'black_terracotta.png',       pool: 'overworld' },

  // --- Glazed terracotta (16 colors) ---
  { id: 'white_glazed_terracotta',      name: 'White Glazed Terracotta',      texture: 'white_glazed_terracotta.png',      pool: 'overworld' },
  { id: 'orange_glazed_terracotta',     name: 'Orange Glazed Terracotta',     texture: 'orange_glazed_terracotta.png',     pool: 'overworld' },
  { id: 'magenta_glazed_terracotta',    name: 'Magenta Glazed Terracotta',    texture: 'magenta_glazed_terracotta.png',    pool: 'overworld' },
  { id: 'light_blue_glazed_terracotta', name: 'Light Blue Glazed Terracotta', texture: 'light_blue_glazed_terracotta.png', pool: 'overworld' },
  { id: 'yellow_glazed_terracotta',     name: 'Yellow Glazed Terracotta',     texture: 'yellow_glazed_terracotta.png',     pool: 'overworld' },
  { id: 'lime_glazed_terracotta',       name: 'Lime Glazed Terracotta',       texture: 'lime_glazed_terracotta.png',       pool: 'overworld' },
  { id: 'pink_glazed_terracotta',       name: 'Pink Glazed Terracotta',       texture: 'pink_glazed_terracotta.png',       pool: 'overworld' },
  { id: 'gray_glazed_terracotta',       name: 'Gray Glazed Terracotta',       texture: 'gray_glazed_terracotta.png',       pool: 'overworld' },
  { id: 'light_gray_glazed_terracotta', name: 'Light Gray Glazed Terracotta', texture: 'light_gray_glazed_terracotta.png', pool: 'overworld' },
  { id: 'cyan_glazed_terracotta',       name: 'Cyan Glazed Terracotta',       texture: 'cyan_glazed_terracotta.png',       pool: 'overworld' },
  { id: 'purple_glazed_terracotta',     name: 'Purple Glazed Terracotta',     texture: 'purple_glazed_terracotta.png',     pool: 'overworld' },
  { id: 'blue_glazed_terracotta',       name: 'Blue Glazed Terracotta',       texture: 'blue_glazed_terracotta.png',       pool: 'overworld' },
  { id: 'brown_glazed_terracotta',      name: 'Brown Glazed Terracotta',      texture: 'brown_glazed_terracotta.png',      pool: 'overworld' },
  { id: 'green_glazed_terracotta',      name: 'Green Glazed Terracotta',      texture: 'green_glazed_terracotta.png',      pool: 'overworld' },
  { id: 'red_glazed_terracotta',        name: 'Red Glazed Terracotta',        texture: 'red_glazed_terracotta.png',        pool: 'overworld' },
  { id: 'black_glazed_terracotta',      name: 'Black Glazed Terracotta',      texture: 'black_glazed_terracotta.png',      pool: 'overworld' },

  // --- Concrete (16 colors) ---
  { id: 'white_concrete',      name: 'White Concrete',      texture: 'white_concrete.png',      pool: 'overworld' },
  { id: 'orange_concrete',     name: 'Orange Concrete',     texture: 'orange_concrete.png',     pool: 'overworld' },
  { id: 'magenta_concrete',    name: 'Magenta Concrete',    texture: 'magenta_concrete.png',    pool: 'overworld' },
  { id: 'light_blue_concrete', name: 'Light Blue Concrete', texture: 'light_blue_concrete.png', pool: 'overworld' },
  { id: 'yellow_concrete',     name: 'Yellow Concrete',     texture: 'yellow_concrete.png',     pool: 'overworld' },
  { id: 'lime_concrete',       name: 'Lime Concrete',       texture: 'lime_concrete.png',       pool: 'overworld' },
  { id: 'pink_concrete',       name: 'Pink Concrete',       texture: 'pink_concrete.png',       pool: 'overworld' },
  { id: 'gray_concrete',       name: 'Gray Concrete',       texture: 'gray_concrete.png',       pool: 'overworld' },
  { id: 'light_gray_concrete', name: 'Light Gray Concrete', texture: 'light_gray_concrete.png', pool: 'overworld' },
  { id: 'cyan_concrete',       name: 'Cyan Concrete',       texture: 'cyan_concrete.png',       pool: 'overworld' },
  { id: 'purple_concrete',     name: 'Purple Concrete',     texture: 'purple_concrete.png',     pool: 'overworld' },
  { id: 'blue_concrete',       name: 'Blue Concrete',       texture: 'blue_concrete.png',       pool: 'overworld' },
  { id: 'brown_concrete',      name: 'Brown Concrete',      texture: 'brown_concrete.png',      pool: 'overworld' },
  { id: 'green_concrete',      name: 'Green Concrete',      texture: 'green_concrete.png',      pool: 'overworld' },
  { id: 'red_concrete',        name: 'Red Concrete',        texture: 'red_concrete.png',        pool: 'overworld' },
  { id: 'black_concrete',      name: 'Black Concrete',      texture: 'black_concrete.png',      pool: 'overworld' },

  // --- Concrete powder (16 colors) ---
  { id: 'white_concrete_powder',      name: 'White Concrete Powder',      texture: 'white_concrete_powder.png',      pool: 'overworld' },
  { id: 'orange_concrete_powder',     name: 'Orange Concrete Powder',     texture: 'orange_concrete_powder.png',     pool: 'overworld' },
  { id: 'magenta_concrete_powder',    name: 'Magenta Concrete Powder',    texture: 'magenta_concrete_powder.png',    pool: 'overworld' },
  { id: 'light_blue_concrete_powder', name: 'Light Blue Concrete Powder', texture: 'light_blue_concrete_powder.png', pool: 'overworld' },
  { id: 'yellow_concrete_powder',     name: 'Yellow Concrete Powder',     texture: 'yellow_concrete_powder.png',     pool: 'overworld' },
  { id: 'lime_concrete_powder',       name: 'Lime Concrete Powder',       texture: 'lime_concrete_powder.png',       pool: 'overworld' },
  { id: 'pink_concrete_powder',       name: 'Pink Concrete Powder',       texture: 'pink_concrete_powder.png',       pool: 'overworld' },
  { id: 'gray_concrete_powder',       name: 'Gray Concrete Powder',       texture: 'gray_concrete_powder.png',       pool: 'overworld' },
  { id: 'light_gray_concrete_powder', name: 'Light Gray Concrete Powder', texture: 'light_gray_concrete_powder.png', pool: 'overworld' },
  { id: 'cyan_concrete_powder',       name: 'Cyan Concrete Powder',       texture: 'cyan_concrete_powder.png',       pool: 'overworld' },
  { id: 'purple_concrete_powder',     name: 'Purple Concrete Powder',     texture: 'purple_concrete_powder.png',     pool: 'overworld' },
  { id: 'blue_concrete_powder',       name: 'Blue Concrete Powder',       texture: 'blue_concrete_powder.png',       pool: 'overworld' },
  { id: 'brown_concrete_powder',      name: 'Brown Concrete Powder',      texture: 'brown_concrete_powder.png',      pool: 'overworld' },
  { id: 'green_concrete_powder',      name: 'Green Concrete Powder',      texture: 'green_concrete_powder.png',      pool: 'overworld' },
  { id: 'red_concrete_powder',        name: 'Red Concrete Powder',        texture: 'red_concrete_powder.png',        pool: 'overworld' },
  { id: 'black_concrete_powder',      name: 'Black Concrete Powder',      texture: 'black_concrete_powder.png',      pool: 'overworld' },

  // --- Wool (16 colors) ---
  { id: 'white_wool',      name: 'White Wool',      texture: 'white_wool.png',      pool: 'overworld' },
  { id: 'orange_wool',     name: 'Orange Wool',     texture: 'orange_wool.png',     pool: 'overworld' },
  { id: 'magenta_wool',    name: 'Magenta Wool',    texture: 'magenta_wool.png',    pool: 'overworld' },
  { id: 'light_blue_wool', name: 'Light Blue Wool', texture: 'light_blue_wool.png', pool: 'overworld' },
  { id: 'yellow_wool',     name: 'Yellow Wool',     texture: 'yellow_wool.png',     pool: 'overworld' },
  { id: 'lime_wool',       name: 'Lime Wool',       texture: 'lime_wool.png',       pool: 'overworld' },
  { id: 'pink_wool',       name: 'Pink Wool',       texture: 'pink_wool.png',       pool: 'overworld' },
  { id: 'gray_wool',       name: 'Gray Wool',       texture: 'gray_wool.png',       pool: 'overworld' },
  { id: 'light_gray_wool', name: 'Light Gray Wool', texture: 'light_gray_wool.png', pool: 'overworld' },
  { id: 'cyan_wool',       name: 'Cyan Wool',       texture: 'cyan_wool.png',       pool: 'overworld' },
  { id: 'purple_wool',     name: 'Purple Wool',     texture: 'purple_wool.png',     pool: 'overworld' },
  { id: 'blue_wool',       name: 'Blue Wool',       texture: 'blue_wool.png',       pool: 'overworld' },
  { id: 'brown_wool',      name: 'Brown Wool',      texture: 'brown_wool.png',      pool: 'overworld' },
  { id: 'green_wool',      name: 'Green Wool',      texture: 'green_wool.png',      pool: 'overworld' },
  { id: 'red_wool',        name: 'Red Wool',        texture: 'red_wool.png',        pool: 'overworld' },
  { id: 'black_wool',      name: 'Black Wool',      texture: 'black_wool.png',      pool: 'overworld' },

  // --- Glass (plain + tinted + 16 stained) ---
  { id: 'glass',                  name: 'Glass',                  texture: 'glass.png',                  pool: 'overworld' },
  { id: 'tinted_glass',           name: 'Tinted Glass',           texture: 'tinted_glass.png',           pool: 'overworld' },
  { id: 'white_stained_glass',    name: 'White Stained Glass',    texture: 'white_stained_glass.png',    pool: 'overworld' },
  { id: 'orange_stained_glass',   name: 'Orange Stained Glass',   texture: 'orange_stained_glass.png',   pool: 'overworld' },
  { id: 'magenta_stained_glass',  name: 'Magenta Stained Glass',  texture: 'magenta_stained_glass.png',  pool: 'overworld' },
  { id: 'light_blue_stained_glass', name: 'Light Blue Stained Glass', texture: 'light_blue_stained_glass.png', pool: 'overworld' },
  { id: 'yellow_stained_glass',   name: 'Yellow Stained Glass',   texture: 'yellow_stained_glass.png',   pool: 'overworld' },
  { id: 'lime_stained_glass',     name: 'Lime Stained Glass',     texture: 'lime_stained_glass.png',     pool: 'overworld' },
  { id: 'pink_stained_glass',     name: 'Pink Stained Glass',     texture: 'pink_stained_glass.png',     pool: 'overworld' },
  { id: 'gray_stained_glass',     name: 'Gray Stained Glass',     texture: 'gray_stained_glass.png',     pool: 'overworld' },
  { id: 'light_gray_stained_glass', name: 'Light Gray Stained Glass', texture: 'light_gray_stained_glass.png', pool: 'overworld' },
  { id: 'cyan_stained_glass',     name: 'Cyan Stained Glass',     texture: 'cyan_stained_glass.png',     pool: 'overworld' },
  { id: 'purple_stained_glass',   name: 'Purple Stained Glass',   texture: 'purple_stained_glass.png',   pool: 'overworld' },
  { id: 'blue_stained_glass',     name: 'Blue Stained Glass',     texture: 'blue_stained_glass.png',     pool: 'overworld' },
  { id: 'brown_stained_glass',    name: 'Brown Stained Glass',    texture: 'brown_stained_glass.png',    pool: 'overworld' },
  { id: 'green_stained_glass',    name: 'Green Stained Glass',    texture: 'green_stained_glass.png',    pool: 'overworld' },
  { id: 'red_stained_glass',      name: 'Red Stained Glass',      texture: 'red_stained_glass.png',      pool: 'overworld' },
  { id: 'black_stained_glass',    name: 'Black Stained Glass',    texture: 'black_stained_glass.png',    pool: 'overworld' },

  // --- Prismarine ---
  { id: 'prismarine',              name: 'Prismarine',              texture: 'prismarine.png',              pool: 'overworld' },
  { id: 'prismarine_bricks',       name: 'Prismarine Bricks',       texture: 'prismarine_bricks.png',       pool: 'overworld' },
  { id: 'dark_prismarine',         name: 'Dark Prismarine',         texture: 'dark_prismarine.png',         pool: 'overworld' },
  { id: 'sea_lantern',             name: 'Sea Lantern',             texture: 'sea_lantern.png',             pool: 'overworld' },
  { id: 'prismarine_slab',         name: 'Prismarine Slab',         texture: 'prismarine.png',              pool: 'overworld' },
  { id: 'prismarine_stairs',       name: 'Prismarine Stairs',       texture: 'prismarine.png',              pool: 'overworld' },
  { id: 'prismarine_brick_slab',   name: 'Prismarine Brick Slab',   texture: 'prismarine_bricks.png',       pool: 'overworld' },
  { id: 'prismarine_brick_stairs', name: 'Prismarine Brick Stairs', texture: 'prismarine_bricks.png',       pool: 'overworld' },
  { id: 'dark_prismarine_slab',    name: 'Dark Prismarine Slab',    texture: 'dark_prismarine.png',         pool: 'overworld' },
  { id: 'dark_prismarine_stairs',  name: 'Dark Prismarine Stairs',  texture: 'dark_prismarine.png',         pool: 'overworld' },

  // --- Ice / snow ---
  { id: 'ice',        name: 'Ice',        texture: 'ice.png',        pool: 'overworld' },
  { id: 'packed_ice', name: 'Packed Ice', texture: 'packed_ice.png', pool: 'overworld' },
  { id: 'blue_ice',   name: 'Blue Ice',   texture: 'blue_ice.png',   pool: 'overworld' },
  { id: 'snow_block', name: 'Snow Block', texture: 'snow.png',       pool: 'overworld' },

  // --- Nature / plants ---
  { id: 'cactus',             name: 'Cactus',             texture: 'cactus_side.png',          pool: 'overworld' },
  { id: 'dead_bush',          name: 'Dead Bush',          texture: 'dead_bush.png',            pool: 'overworld' },
  { id: 'vine',               name: 'Vine',               texture: 'vine.png',                 pool: 'overworld' },
  { id: 'lily_pad',           name: 'Lily Pad',           texture: 'lily_pad.png',             pool: 'overworld' },
  { id: 'moss_block',         name: 'Moss Block',         texture: 'moss_block.png',           pool: 'overworld' },
  { id: 'azalea',             name: 'Azalea',             texture: 'azalea_top.png',           pool: 'overworld' },
  { id: 'flowering_azalea',   name: 'Flowering Azalea',   texture: 'flowering_azalea_top.png', pool: 'overworld' },
  { id: 'spore_blossom',      name: 'Spore Blossom',      texture: 'spore_blossom.png',        pool: 'overworld' },
  { id: 'dripstone_block',    name: 'Dripstone Block',    texture: 'dripstone_block.png',      pool: 'overworld' },
  { id: 'sculk',              name: 'Sculk',              texture: 'sculk.png',                pool: 'overworld' },
  { id: 'sculk_catalyst',     name: 'Sculk Catalyst',     texture: 'sculk_catalyst_bottom.png',pool: 'overworld' },
  { id: 'sculk_sensor',       name: 'Sculk Sensor',       texture: 'sculk_sensor_bottom.png',  pool: 'overworld' },
  { id: 'sculk_shrieker',     name: 'Sculk Shrieker',     texture: 'sculk_shrieker_bottom.png',pool: 'overworld' },
  { id: 'amethyst_block',     name: 'Amethyst Block',     texture: 'amethyst_block.png',       pool: 'overworld' },
  { id: 'budding_amethyst',   name: 'Budding Amethyst',   texture: 'budding_amethyst.png',     pool: 'overworld' },
  { id: 'dried_kelp_block',   name: 'Dried Kelp Block',   texture: 'dried_kelp_side.png',      pool: 'overworld' },
  { id: 'sponge',             name: 'Sponge',             texture: 'sponge.png',               pool: 'overworld' },
  { id: 'wet_sponge',         name: 'Wet Sponge',         texture: 'wet_sponge.png',           pool: 'overworld' },

  // --- Mushrooms ---
  { id: 'red_mushroom_block',   name: 'Red Mushroom Block',   texture: 'red_mushroom_block.png',   pool: 'overworld' },
  { id: 'brown_mushroom_block', name: 'Brown Mushroom Block', texture: 'brown_mushroom_block.png', pool: 'overworld' },
  { id: 'mushroom_stem',        name: 'Mushroom Stem',        texture: 'mushroom_stem.png',        pool: 'overworld' },

  // --- Crops / food blocks ---
  { id: 'melon',          name: 'Melon',          texture: 'melon_side.png',     pool: 'overworld' },
  { id: 'pumpkin',        name: 'Pumpkin',        texture: 'pumpkin_side.png',   pool: 'overworld' },
  { id: 'carved_pumpkin', name: 'Carved Pumpkin', texture: 'carved_pumpkin.png', pool: 'overworld' },
  { id: 'jack_o_lantern', name: "Jack o'Lantern",  texture: 'jack_o_lantern.png', pool: 'overworld' },
  { id: 'hay_block',      name: 'Hay Block',      texture: 'hay_block_side.png', pool: 'overworld' },
  { id: 'honeycomb_block',name: 'Honeycomb Block', texture: 'honeycomb_block.png',pool: 'overworld' },
  { id: 'honey_block',    name: 'Honey Block',    texture: 'honey_block_top.png',pool: 'overworld' },
  { id: 'bone_block',     name: 'Bone Block',     texture: 'bone_block_side.png',pool: 'overworld' },

  // --- Functional blocks ---
  { id: 'crafting_table',    name: 'Crafting Table',    texture: 'crafting_table_top.png',       pool: 'overworld' },
  { id: 'furnace',           name: 'Furnace',           texture: 'furnace_front_off.png',        pool: 'overworld' },
  { id: 'blast_furnace',     name: 'Blast Furnace',     texture: 'blast_furnace_front_off.png',  pool: 'overworld' },
  { id: 'smoker',            name: 'Smoker',            texture: 'smoker_front_off.png',         pool: 'overworld' },
  { id: 'barrel',            name: 'Barrel',            texture: 'barrel_top.png',               pool: 'overworld' },
  { id: 'bookshelf',         name: 'Bookshelf',         texture: 'bookshelf.png',                pool: 'overworld' },
  { id: 'chiseled_bookshelf',name: 'Chiseled Bookshelf',texture: 'chiseled_bookshelf.png',       pool: 'overworld' },
  { id: 'enchanting_table',  name: 'Enchanting Table',  texture: 'enchanting_table_top.png',     pool: 'overworld' },
  { id: 'anvil',             name: 'Anvil',             texture: 'anvil_top.png',                pool: 'overworld' },
  { id: 'note_block',        name: 'Note Block',        texture: 'note_block.png',               pool: 'overworld' },
  { id: 'jukebox',           name: 'Jukebox',           texture: 'jukebox_top.png',              pool: 'overworld' },
  { id: 'tnt',               name: 'TNT',               texture: 'tnt_side.png',                 pool: 'overworld' },
  { id: 'dispenser',         name: 'Dispenser',         texture: 'dispenser_front_horizontal.png', pool: 'overworld' },
  { id: 'dropper',           name: 'Dropper',           texture: 'dropper_front_horizontal.png', pool: 'overworld' },
  { id: 'observer',          name: 'Observer',          texture: 'observer_front.png',           pool: 'overworld' },
  { id: 'piston',            name: 'Piston',            texture: 'piston_top_normal.png',        pool: 'overworld' },
  { id: 'sticky_piston',     name: 'Sticky Piston',     texture: 'piston_top_sticky.png',        pool: 'overworld' },
  { id: 'hopper',            name: 'Hopper',            texture: 'hopper_top.png',               pool: 'overworld' },
  { id: 'beacon',            name: 'Beacon',            texture: 'beacon.png',                   pool: 'overworld' },
  { id: 'redstone_lamp',     name: 'Redstone Lamp',     texture: 'redstone_lamp.png',            pool: 'overworld' },
  { id: 'target',            name: 'Target',            texture: 'target_top.png',               pool: 'overworld' },
  { id: 'cartography_table', name: 'Cartography Table', texture: 'cartography_table_top.png',    pool: 'overworld' },
  { id: 'fletching_table',   name: 'Fletching Table',   texture: 'fletching_table_top.png',      pool: 'overworld' },
  { id: 'smithing_table',    name: 'Smithing Table',    texture: 'smithing_table_top.png',       pool: 'overworld' },
  { id: 'loom',              name: 'Loom',              texture: 'loom_top.png',                 pool: 'overworld' },
  { id: 'composter',         name: 'Composter',         texture: 'composter_top.png',            pool: 'overworld' },
  { id: 'stonecutter',       name: 'Stonecutter',       texture: 'stonecutter_top.png',          pool: 'overworld' },

  // --- Miscellaneous ---
  { id: 'obsidian',      name: 'Obsidian',      texture: 'obsidian.png',       pool: 'overworld' },
  { id: 'slime_block',   name: 'Slime Block',   texture: 'slime_block.png',    pool: 'overworld' },
  { id: 'clay',          name: 'Clay',          texture: 'clay.png',           pool: 'overworld' },
  { id: 'lodestone',     name: 'Lodestone',     texture: 'lodestone_top.png',  pool: 'overworld' },
  { id: 'purpur_block',  name: 'Purpur Block',  texture: 'purpur_block.png',   pool: 'overworld' },
  { id: 'purpur_pillar', name: 'Purpur Pillar', texture: 'purpur_pillar.png',  pool: 'overworld' },
  { id: 'purpur_slab',   name: 'Purpur Slab',   texture: 'purpur_block.png',   pool: 'overworld' },
  { id: 'purpur_stairs', name: 'Purpur Stairs', texture: 'purpur_block.png',   pool: 'overworld' },
  { id: 'end_stone',     name: 'End Stone',     texture: 'end_stone.png',      pool: 'overworld' },
  { id: 'end_stone_bricks',       name: 'End Stone Bricks',       texture: 'end_stone_bricks.png', pool: 'overworld' },
  { id: 'end_stone_brick_slab',   name: 'End Stone Brick Slab',   texture: 'end_stone_bricks.png', pool: 'overworld' },
  { id: 'end_stone_brick_stairs', name: 'End Stone Brick Stairs', texture: 'end_stone_bricks.png', pool: 'overworld' },
  { id: 'end_stone_brick_wall',   name: 'End Stone Brick Wall',   texture: 'end_stone_bricks.png', pool: 'overworld' },
  { id: 'suspicious_sand',        name: 'Suspicious Sand',        texture: 'suspicious_sand_0.png',pool: 'overworld' },
  { id: 'suspicious_gravel',      name: 'Suspicious Gravel',      texture: 'suspicious_gravel_0.png', pool: 'overworld' },
  { id: 'chiseled_bricks',        name: 'Chiseled Bricks',        texture: 'chiseled_bricks.png',  pool: 'overworld' },
]

export const NETHER_POOL = [
  // --- Base blocks ---
  { id: 'netherrack',     name: 'Netherrack',     texture: 'netherrack.png',     pool: 'nether' },
  { id: 'soul_sand',      name: 'Soul Sand',      texture: 'soul_sand.png',      pool: 'nether' },
  { id: 'soul_soil',      name: 'Soul Soil',      texture: 'soul_soil.png',      pool: 'nether' },
  { id: 'glowstone',      name: 'Glowstone',      texture: 'glowstone.png',      pool: 'nether' },
  { id: 'magma_block',    name: 'Magma Block',    texture: 'magma.png',          pool: 'nether' },
  { id: 'ancient_debris', name: 'Ancient Debris', texture: 'ancient_debris_top.png', pool: 'nether' },
  { id: 'crying_obsidian',name: 'Crying Obsidian',texture: 'crying_obsidian.png', pool: 'nether' },
  { id: 'shroomlight',    name: 'Shroomlight',    texture: 'shroomlight.png',    pool: 'nether' },

  // --- Nether brick family ---
  { id: 'nether_bricks',           name: 'Nether Bricks',           texture: 'nether_bricks.png',           pool: 'nether' },
  { id: 'red_nether_bricks',       name: 'Red Nether Bricks',       texture: 'red_nether_bricks.png',       pool: 'nether' },
  { id: 'cracked_nether_bricks',   name: 'Cracked Nether Bricks',   texture: 'cracked_nether_bricks.png',   pool: 'nether' },
  { id: 'chiseled_nether_bricks',  name: 'Chiseled Nether Bricks',  texture: 'chiseled_nether_bricks.png',  pool: 'nether' },
  { id: 'nether_brick_slab',       name: 'Nether Brick Slab',       texture: 'nether_bricks.png',           pool: 'nether' },
  { id: 'nether_brick_stairs',     name: 'Nether Brick Stairs',     texture: 'nether_bricks.png',           pool: 'nether' },
  { id: 'nether_brick_wall',       name: 'Nether Brick Wall',       texture: 'nether_bricks.png',           pool: 'nether' },
  { id: 'nether_brick_fence',      name: 'Nether Brick Fence',      texture: 'nether_bricks.png',           pool: 'nether' },
  { id: 'red_nether_brick_slab',   name: 'Red Nether Brick Slab',   texture: 'red_nether_bricks.png',       pool: 'nether' },
  { id: 'red_nether_brick_stairs', name: 'Red Nether Brick Stairs', texture: 'red_nether_bricks.png',       pool: 'nether' },
  { id: 'red_nether_brick_wall',   name: 'Red Nether Brick Wall',   texture: 'red_nether_bricks.png',       pool: 'nether' },

  // --- Blackstone family ---
  { id: 'blackstone',                       name: 'Blackstone',                       texture: 'blackstone.png',                       pool: 'nether' },
  { id: 'gilded_blackstone',                name: 'Gilded Blackstone',                texture: 'gilded_blackstone.png',                pool: 'nether' },
  { id: 'polished_blackstone',              name: 'Polished Blackstone',              texture: 'polished_blackstone.png',              pool: 'nether' },
  { id: 'polished_blackstone_bricks',       name: 'Polished Blackstone Bricks',       texture: 'polished_blackstone_bricks.png',       pool: 'nether' },
  { id: 'cracked_polished_blackstone_bricks', name: 'Cracked Polished Blackstone Bricks', texture: 'cracked_polished_blackstone_bricks.png', pool: 'nether' },
  { id: 'chiseled_polished_blackstone',     name: 'Chiseled Polished Blackstone',     texture: 'chiseled_polished_blackstone.png',     pool: 'nether' },
  { id: 'blackstone_slab',                  name: 'Blackstone Slab',                  texture: 'blackstone.png',                       pool: 'nether' },
  { id: 'blackstone_stairs',                name: 'Blackstone Stairs',                texture: 'blackstone.png',                       pool: 'nether' },
  { id: 'blackstone_wall',                  name: 'Blackstone Wall',                  texture: 'blackstone.png',                       pool: 'nether' },
  { id: 'polished_blackstone_slab',         name: 'Polished Blackstone Slab',         texture: 'polished_blackstone.png',              pool: 'nether' },
  { id: 'polished_blackstone_stairs',       name: 'Polished Blackstone Stairs',       texture: 'polished_blackstone.png',              pool: 'nether' },
  { id: 'polished_blackstone_wall',         name: 'Polished Blackstone Wall',         texture: 'polished_blackstone.png',              pool: 'nether' },
  { id: 'polished_blackstone_brick_slab',   name: 'Polished Blackstone Brick Slab',   texture: 'polished_blackstone_bricks.png',       pool: 'nether' },
  { id: 'polished_blackstone_brick_stairs', name: 'Polished Blackstone Brick Stairs', texture: 'polished_blackstone_bricks.png',       pool: 'nether' },
  { id: 'polished_blackstone_brick_wall',   name: 'Polished Blackstone Brick Wall',   texture: 'polished_blackstone_bricks.png',       pool: 'nether' },

  // --- Basalt family ---
  { id: 'basalt',         name: 'Basalt',         texture: 'basalt_side.png',     pool: 'nether' },
  { id: 'smooth_basalt',  name: 'Smooth Basalt',  texture: 'smooth_basalt.png',   pool: 'nether' },
  { id: 'polished_basalt',name: 'Polished Basalt',texture: 'polished_basalt_side.png', pool: 'nether' },

  // --- Crimson wood ---
  { id: 'crimson_stem',           name: 'Crimson Stem',           texture: 'crimson_stem.png',           pool: 'nether' },
  { id: 'stripped_crimson_stem',  name: 'Stripped Crimson Stem',  texture: 'stripped_crimson_stem.png',  pool: 'nether' },
  { id: 'crimson_hyphae',         name: 'Crimson Hyphae',         texture: 'crimson_hyphae.png',         pool: 'nether' },
  { id: 'stripped_crimson_hyphae',name: 'Stripped Crimson Hyphae',texture: 'stripped_crimson_hyphae.png',pool: 'nether' },
  { id: 'crimson_planks',         name: 'Crimson Planks',         texture: 'crimson_planks.png',         pool: 'nether' },
  { id: 'crimson_nylium',         name: 'Crimson Nylium',         texture: 'crimson_nylium.png',         pool: 'nether' },
  { id: 'crimson_slab',           name: 'Crimson Slab',           texture: 'crimson_planks.png',         pool: 'nether' },
  { id: 'crimson_stairs',         name: 'Crimson Stairs',         texture: 'crimson_planks.png',         pool: 'nether' },

  // --- Warped wood ---
  { id: 'warped_stem',            name: 'Warped Stem',            texture: 'warped_stem.png',            pool: 'nether' },
  { id: 'stripped_warped_stem',   name: 'Stripped Warped Stem',   texture: 'stripped_warped_stem.png',   pool: 'nether' },
  { id: 'warped_hyphae',          name: 'Warped Hyphae',          texture: 'warped_hyphae.png',          pool: 'nether' },
  { id: 'stripped_warped_hyphae', name: 'Stripped Warped Hyphae', texture: 'stripped_warped_hyphae.png', pool: 'nether' },
  { id: 'warped_planks',          name: 'Warped Planks',          texture: 'warped_planks.png',          pool: 'nether' },
  { id: 'warped_nylium',          name: 'Warped Nylium',          texture: 'warped_nylium.png',          pool: 'nether' },
  { id: 'warped_slab',            name: 'Warped Slab',            texture: 'warped_planks.png',          pool: 'nether' },
  { id: 'warped_stairs',          name: 'Warped Stairs',          texture: 'warped_planks.png',          pool: 'nether' },

  // --- Fungi / plants ---
  { id: 'crimson_fungus',   name: 'Crimson Fungus',   texture: 'crimson_fungus.png',   pool: 'nether' },
  { id: 'warped_fungus',    name: 'Warped Fungus',    texture: 'warped_fungus.png',    pool: 'nether' },
  { id: 'nether_wart_block',name: 'Nether Wart Block',texture: 'nether_wart_block.png',pool: 'nether' },
  { id: 'warped_wart_block',name: 'Warped Wart Block',texture: 'warped_wart_block.png',pool: 'nether' },
  { id: 'crimson_roots',    name: 'Crimson Roots',    texture: 'crimson_roots.png',    pool: 'nether' },
  { id: 'warped_roots',     name: 'Warped Roots',     texture: 'warped_roots.png',     pool: 'nether' },

  // --- Nether ores ---
  { id: 'nether_quartz_ore', name: 'Nether Quartz Ore', texture: 'nether_quartz_ore.png', pool: 'nether' },
  { id: 'nether_gold_ore',   name: 'Nether Gold Ore',   texture: 'nether_gold_ore.png',   pool: 'nether' },

  // --- Crafted nether blocks ---
  { id: 'netherite_block',    name: 'Netherite Block',    texture: 'netherite_block.png',    pool: 'nether' },
  { id: 'quartz_block',       name: 'Quartz Block',       texture: 'quartz_block_side.png',  pool: 'nether' },
  { id: 'smooth_quartz_block',name: 'Smooth Quartz Block',texture: 'smooth_quartz.png',      pool: 'nether' },
  { id: 'quartz_bricks',      name: 'Quartz Bricks',      texture: 'quartz_bricks.png',      pool: 'nether' },
  { id: 'chiseled_quartz_block', name: 'Chiseled Quartz Block', texture: 'chiseled_quartz_block.png', pool: 'nether' },
  { id: 'quartz_pillar',      name: 'Quartz Pillar',      texture: 'quartz_pillar.png',      pool: 'nether' },
  { id: 'quartz_slab',        name: 'Quartz Slab',        texture: 'quartz_block_side.png',  pool: 'nether' },
  { id: 'quartz_stairs',      name: 'Quartz Stairs',      texture: 'quartz_block_side.png',  pool: 'nether' },
  { id: 'smooth_quartz_slab', name: 'Smooth Quartz Slab', texture: 'smooth_quartz.png',      pool: 'nether' },
  { id: 'smooth_quartz_stairs',name: 'Smooth Quartz Stairs',texture: 'smooth_quartz.png',    pool: 'nether' },

  // --- Miscellaneous ---
  { id: 'respawn_anchor', name: 'Respawn Anchor', texture: 'respawn_anchor_top_off.png', pool: 'nether' },
]
```

- [ ] **Step 2: Verify the file has no syntax errors**

```bash
node -e "import('./resources/js/data/materials.js').then(m => console.log('OVERWORLD:', m.OVERWORLD_POOL.length, 'NETHER:', m.NETHER_POOL.length))"
```

Expected output: `OVERWORLD: <N> NETHER: <N>` with both numbers > 0. (Node 18+ supports `--input-type=module` if needed.)

- [ ] **Step 3: Commit**

```bash
git add resources/js/data/materials.js
git commit -m "feat: add overworld and nether material pools"
```

---

## Task 3: Write and run texture download script

**Files:**
- Create: `scripts/download-textures.sh`

- [ ] **Step 1: Write the download script**

```bash
#!/usr/bin/env bash
# scripts/download-textures.sh
# Downloads all unique texture PNGs from InventivetalentDev/minecraft-assets
# into public/textures/. Safe to re-run — skips existing files.

BASE_URL="https://raw.githubusercontent.com/InventivetalentDev/minecraft-assets/1.21/assets/minecraft/textures/block"
DEST="$(dirname "$0")/../public/textures"

mkdir -p "$DEST"

success=0
fail=0

download() {
  local file="$1"
  local dest="$DEST/$file"
  if [ -f "$dest" ]; then
    return
  fi
  if curl -sf -o "$dest" "$BASE_URL/$file"; then
    echo "OK  $file"
    ((success++))
  else
    echo "404 $file"
    rm -f "$dest"
    ((fail++))
  fi
}

# All unique texture filenames referenced in materials.js
download stone.png
download granite.png
download polished_granite.png
download diorite.png
download polished_diorite.png
download andesite.png
download polished_andesite.png
download cobblestone.png
download mossy_cobblestone.png
download stone_bricks.png
download mossy_stone_bricks.png
download cracked_stone_bricks.png
download chiseled_stone_bricks.png
download smooth_stone.png
download calcite.png
download tuff.png
download tuff_bricks.png
download polished_tuff.png
download chiseled_tuff.png
download deepslate_top.png
download cobbled_deepslate.png
download polished_deepslate.png
download deepslate_bricks.png
download cracked_deepslate_bricks.png
download deepslate_tiles.png
download cracked_deepslate_tiles.png
download chiseled_deepslate.png
download reinforced_deepslate.png
download dirt.png
download coarse_dirt.png
download rooted_dirt.png
download grass_block_top.png
download podzol_top.png
download mycelium_top.png
download mud.png
download packed_mud.png
download mud_bricks.png
download farmland.png
download dirt_path_top.png
download sand.png
download red_sand.png
download sandstone.png
download smooth_sandstone.png
download chiseled_sandstone.png
download cut_sandstone.png
download red_sandstone.png
download smooth_red_sandstone.png
download chiseled_red_sandstone.png
download cut_red_sandstone.png
download gravel.png
download bricks.png
download mossy_bricks.png
download chiseled_bricks.png
download oak_log.png
download oak_wood.png
download stripped_oak_log.png
download stripped_oak_wood.png
download oak_planks.png
download oak_leaves.png
download birch_log.png
download birch_wood.png
download stripped_birch_log.png
download stripped_birch_wood.png
download birch_planks.png
download birch_leaves.png
download spruce_log.png
download spruce_wood.png
download stripped_spruce_log.png
download stripped_spruce_wood.png
download spruce_planks.png
download spruce_leaves.png
download jungle_log.png
download jungle_wood.png
download stripped_jungle_log.png
download stripped_jungle_wood.png
download jungle_planks.png
download jungle_leaves.png
download acacia_log.png
download acacia_wood.png
download stripped_acacia_log.png
download stripped_acacia_wood.png
download acacia_planks.png
download acacia_leaves.png
download dark_oak_log.png
download dark_oak_wood.png
download stripped_dark_oak_log.png
download stripped_dark_oak_wood.png
download dark_oak_planks.png
download dark_oak_leaves.png
download mangrove_log.png
download mangrove_wood.png
download stripped_mangrove_log.png
download stripped_mangrove_wood.png
download mangrove_planks.png
download mangrove_leaves.png
download mangrove_roots_side.png
download muddy_mangrove_roots_side.png
download cherry_log.png
download cherry_wood.png
download stripped_cherry_log.png
download stripped_cherry_wood.png
download cherry_planks.png
download cherry_leaves.png
download bamboo_block_side.png
download stripped_bamboo_block_side.png
download bamboo_planks.png
download bamboo_mosaic.png
download coal_ore.png
download iron_ore.png
download gold_ore.png
download diamond_ore.png
download emerald_ore.png
download lapis_ore.png
download redstone_ore.png
download copper_ore.png
download deepslate_coal_ore.png
download deepslate_iron_ore.png
download deepslate_gold_ore.png
download deepslate_diamond_ore.png
download deepslate_emerald_ore.png
download deepslate_lapis_ore.png
download deepslate_redstone_ore.png
download deepslate_copper_ore.png
download iron_block.png
download gold_block.png
download diamond_block.png
download emerald_block.png
download lapis_block.png
download redstone_block.png
download coal_block.png
download raw_iron_block.png
download raw_gold_block.png
download raw_copper_block.png
download copper_block.png
download exposed_copper.png
download weathered_copper.png
download oxidized_copper.png
download cut_copper.png
download exposed_cut_copper.png
download weathered_cut_copper.png
download oxidized_cut_copper.png
download terracotta.png
download white_terracotta.png
download orange_terracotta.png
download magenta_terracotta.png
download light_blue_terracotta.png
download yellow_terracotta.png
download lime_terracotta.png
download pink_terracotta.png
download gray_terracotta.png
download light_gray_terracotta.png
download cyan_terracotta.png
download purple_terracotta.png
download blue_terracotta.png
download brown_terracotta.png
download green_terracotta.png
download red_terracotta.png
download black_terracotta.png
download white_glazed_terracotta.png
download orange_glazed_terracotta.png
download magenta_glazed_terracotta.png
download light_blue_glazed_terracotta.png
download yellow_glazed_terracotta.png
download lime_glazed_terracotta.png
download pink_glazed_terracotta.png
download gray_glazed_terracotta.png
download light_gray_glazed_terracotta.png
download cyan_glazed_terracotta.png
download purple_glazed_terracotta.png
download blue_glazed_terracotta.png
download brown_glazed_terracotta.png
download green_glazed_terracotta.png
download red_glazed_terracotta.png
download black_glazed_terracotta.png
download white_concrete.png
download orange_concrete.png
download magenta_concrete.png
download light_blue_concrete.png
download yellow_concrete.png
download lime_concrete.png
download pink_concrete.png
download gray_concrete.png
download light_gray_concrete.png
download cyan_concrete.png
download purple_concrete.png
download blue_concrete.png
download brown_concrete.png
download green_concrete.png
download red_concrete.png
download black_concrete.png
download white_concrete_powder.png
download orange_concrete_powder.png
download magenta_concrete_powder.png
download light_blue_concrete_powder.png
download yellow_concrete_powder.png
download lime_concrete_powder.png
download pink_concrete_powder.png
download gray_concrete_powder.png
download light_gray_concrete_powder.png
download cyan_concrete_powder.png
download purple_concrete_powder.png
download blue_concrete_powder.png
download brown_concrete_powder.png
download green_concrete_powder.png
download red_concrete_powder.png
download black_concrete_powder.png
download white_wool.png
download orange_wool.png
download magenta_wool.png
download light_blue_wool.png
download yellow_wool.png
download lime_wool.png
download pink_wool.png
download gray_wool.png
download light_gray_wool.png
download cyan_wool.png
download purple_wool.png
download blue_wool.png
download brown_wool.png
download green_wool.png
download red_wool.png
download black_wool.png
download glass.png
download tinted_glass.png
download white_stained_glass.png
download orange_stained_glass.png
download magenta_stained_glass.png
download light_blue_stained_glass.png
download yellow_stained_glass.png
download lime_stained_glass.png
download pink_stained_glass.png
download gray_stained_glass.png
download light_gray_stained_glass.png
download cyan_stained_glass.png
download purple_stained_glass.png
download blue_stained_glass.png
download brown_stained_glass.png
download green_stained_glass.png
download red_stained_glass.png
download black_stained_glass.png
download prismarine.png
download prismarine_bricks.png
download dark_prismarine.png
download sea_lantern.png
download ice.png
download packed_ice.png
download blue_ice.png
download snow.png
download cactus_side.png
download dead_bush.png
download vine.png
download lily_pad.png
download moss_block.png
download azalea_top.png
download flowering_azalea_top.png
download spore_blossom.png
download dripstone_block.png
download sculk.png
download sculk_catalyst_bottom.png
download sculk_sensor_bottom.png
download sculk_shrieker_bottom.png
download amethyst_block.png
download budding_amethyst.png
download dried_kelp_side.png
download sponge.png
download wet_sponge.png
download red_mushroom_block.png
download brown_mushroom_block.png
download mushroom_stem.png
download melon_side.png
download pumpkin_side.png
download carved_pumpkin.png
download jack_o_lantern.png
download hay_block_side.png
download honeycomb_block.png
download honey_block_top.png
download bone_block_side.png
download crafting_table_top.png
download furnace_front_off.png
download blast_furnace_front_off.png
download smoker_front_off.png
download barrel_top.png
download bookshelf.png
download chiseled_bookshelf.png
download enchanting_table_top.png
download anvil_top.png
download note_block.png
download jukebox_top.png
download tnt_side.png
download dispenser_front_horizontal.png
download dropper_front_horizontal.png
download observer_front.png
download piston_top_normal.png
download piston_top_sticky.png
download hopper_top.png
download beacon.png
download redstone_lamp.png
download target_top.png
download cartography_table_top.png
download fletching_table_top.png
download smithing_table_top.png
download loom_top.png
download composter_top.png
download stonecutter_top.png
download obsidian.png
download slime_block.png
download clay.png
download lodestone_top.png
download purpur_block.png
download purpur_pillar.png
download end_stone.png
download end_stone_bricks.png
download suspicious_sand_0.png
download suspicious_gravel_0.png
download netherrack.png
download soul_sand.png
download soul_soil.png
download glowstone.png
download magma.png
download ancient_debris_top.png
download crying_obsidian.png
download shroomlight.png
download nether_bricks.png
download red_nether_bricks.png
download cracked_nether_bricks.png
download chiseled_nether_bricks.png
download blackstone.png
download gilded_blackstone.png
download polished_blackstone.png
download polished_blackstone_bricks.png
download cracked_polished_blackstone_bricks.png
download chiseled_polished_blackstone.png
download basalt_side.png
download smooth_basalt.png
download polished_basalt_side.png
download crimson_stem.png
download stripped_crimson_stem.png
download crimson_hyphae.png
download stripped_crimson_hyphae.png
download crimson_planks.png
download crimson_nylium.png
download warped_stem.png
download stripped_warped_stem.png
download warped_hyphae.png
download stripped_warped_hyphae.png
download warped_planks.png
download warped_nylium.png
download crimson_fungus.png
download warped_fungus.png
download nether_wart_block.png
download warped_wart_block.png
download crimson_roots.png
download warped_roots.png
download nether_quartz_ore.png
download nether_gold_ore.png
download netherite_block.png
download quartz_block_side.png
download smooth_quartz.png
download quartz_bricks.png
download chiseled_quartz_block.png
download quartz_pillar.png
download respawn_anchor_top_off.png

echo ""
echo "Done. Downloaded: $success  Failed/skipped: $fail"
```

- [ ] **Step 2: Make executable and run**

```bash
chmod +x scripts/download-textures.sh
bash scripts/download-textures.sh
```

Expected: lines starting with `OK` for downloaded files, `404` for any not found (these will use the gray placeholder at runtime). Final summary line appears. Check that `public/textures/` has PNG files:

```bash
ls public/textures/ | wc -l
```

Expect 200+ files.

- [ ] **Step 3: Commit**

```bash
git add scripts/download-textures.sh
git add public/textures/
git commit -m "feat: add texture download script and downloaded textures"
```

---

## Task 4: Write `resources/js/composables/useGame.js`

**Files:**
- Create: `resources/js/composables/useGame.js`

- [ ] **Step 1: Write the composable**

```js
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
```

- [ ] **Step 2: Verify the module is importable**

```bash
node --input-type=module <<'EOF'
import { useGame } from './resources/js/composables/useGame.js'
EOF
```

This will likely fail since it imports Vue — that's expected (Vue needs a browser). No action needed; the import chain will be verified when the dev server runs.

- [ ] **Step 3: Commit**

```bash
git add resources/js/composables/useGame.js
git commit -m "feat: add useGame composable with stage generation and state"
```

---

## Task 5: Write `resources/js/components/MaterialItem.vue`

**Files:**
- Create: `resources/js/components/MaterialItem.vue`

- [ ] **Step 1: Write the component**

```vue
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
```

- [ ] **Step 2: Commit**

```bash
git add resources/js/components/MaterialItem.vue
git commit -m "feat: add MaterialItem component"
```

---

## Task 6: Write `resources/js/components/GameBoard.vue`

**Files:**
- Create: `resources/js/components/GameBoard.vue`

- [ ] **Step 1: Write the component**

```vue
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
        @toggle="$emit('toggle', item.id)"
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
```

- [ ] **Step 2: Commit**

```bash
git add resources/js/components/GameBoard.vue
git commit -m "feat: add GameBoard component"
```

---

## Task 7: Write `resources/js/components/MinecraftPuzzler.vue`

**Files:**
- Create: `resources/js/components/MinecraftPuzzler.vue`

- [ ] **Step 1: Write the component**

```vue
<!-- resources/js/components/MinecraftPuzzler.vue -->
<template>
  <div class="puzzler-wrap">
    <div class="puzzler-panel">
      <div class="puzzler-title">PUZZLER</div>

      <!-- Game board -->
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
}
.btn-again:hover {
  background: #9a5a9a;
}
</style>
```

- [ ] **Step 2: Commit**

```bash
git add resources/js/components/MinecraftPuzzler.vue
git commit -m "feat: add MinecraftPuzzler top-level component"
```

---

## Task 8: Wire everything up

**Files:**
- Modify: `resources/styles/index.scss`
- Modify: `resources/js/index.js`
- Create: `public/index.html`

- [ ] **Step 1: Add VT323 font import to `resources/styles/index.scss`**

Add this line at the very top of the file (before the existing `@forward` rules):

```scss
@import url('https://fonts.googleapis.com/css2?family=VT323&display=swap');
```

Final file should look like:

```scss
@import url('https://fonts.googleapis.com/css2?family=VT323&display=swap');

@forward 'core';
@forward 'core/dev';
@forward 'config';
@forward 'atoms';
@forward 'molecules';
@forward 'organisms';
@forward 'utilities';
```

- [ ] **Step 2: Register MinecraftPuzzler in `resources/js/index.js`**

Add one line to the `components` object (after the existing `PWistia` line, before the closing `}`):

```js
MinecraftPuzzler: defineAsyncComponent(() => import('./components/MinecraftPuzzler.vue')),
```

Full file for reference:

```js
import { createApp, defineAsyncComponent } from 'vue'
import directionals from './directives/vDirectionals.js'
import scrolllock from './directives/vScrolllock.js'

import '../styles/index.scss'

createApp({
  components: {
    PAccordion: defineAsyncComponent(() => import('./components/PAccordion.vue')),
    PDismissable: defineAsyncComponent(() => import('./components/PDismissable.vue')),
    PLazy: defineAsyncComponent(() => import('./components/PLazy.vue')),
    POpenable: defineAsyncComponent(() => import('./components/POpenable.vue')),
    PTabs: defineAsyncComponent(() => import('./components/PTabs.vue')),
    PDirectionalKeys: defineAsyncComponent(() => import('./components/PDirectionalKeys.vue')),

    PSelect: defineAsyncComponent(() => import('@vueform/multiselect/themes/default.css') && import('@vueform/multiselect')),
    PSlider: defineAsyncComponent(() => import('./components/PSlider.vue')),
    PYouTube: defineAsyncComponent(() => import('./components/PYouTube.vue')),
    PYouTubePlaylist: defineAsyncComponent(() => import('./components/PYouTubePlaylist.vue')),
    PWistia: defineAsyncComponent(() => import('./components/PWistia.vue')),

    MinecraftPuzzler: defineAsyncComponent(() => import('./components/MinecraftPuzzler.vue')),
  },
  directives: {
    directionals,
    scrolllock,
  },
}).mount('#app')
```

- [ ] **Step 3: Create `public/index.html`**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Minecraft Puzzler</title>
  <script type="module" src="/resources/js/index.js"></script>
</head>
<body>
  <div id="app">
    <minecraft-puzzler></minecraft-puzzler>
  </div>
</body>
</html>
```

- [ ] **Step 4: Commit**

```bash
git add resources/styles/index.scss resources/js/index.js public/index.html
git commit -m "feat: wire up MinecraftPuzzler into entry point and add game page"
```

---

## Task 9: Verify in browser

- [ ] **Step 1: Start dev server**

```bash
npx vite --port 5173
```

- [ ] **Step 2: Open the game**

Navigate to `http://localhost:5173/index.html`

- [ ] **Step 3: Verify Stage 1 (2×2)**

- [ ] 4 block items display in a 2×2 grid
- [ ] Each item shows a 48×48 pixelated texture (or gray placeholder if 404)
- [ ] Name appears below each texture in VT323 font
- [ ] "STAGE COMPLETE" button is grayed out / disabled
- [ ] Click each item → it dims, shows strikethrough and ✓
- [ ] After all 4 checked → "STAGE COMPLETE" button becomes active green
- [ ] Click "STAGE COMPLETE" → advances to Stage 2

- [ ] **Step 4: Verify Stage 2 (3×3)**

- [ ] 9 items in a 3×3 grid
- [ ] 1 item has red border + orange name (nether block)
- [ ] None of the Stage 1 items reappear
- [ ] Same check-off and complete flow works

- [ ] **Step 5: Verify Stage 3 (4×4)**

- [ ] 16 items in a 4×4 grid
- [ ] 2 nether items (red border + orange name)
- [ ] No repeats from Stages 1 or 2

- [ ] **Step 6: Verify success screen**

- [ ] Gold "YOU WIN!" heading appears after Stage 3 completes
- [ ] "All materials collected" subtitle in gray
- [ ] Purple "PLAY AGAIN" button resets to a fresh Stage 1 with new random items

- [ ] **Step 7: Check browser console for errors**

Open DevTools → Console. Expect zero errors (404 texture warnings are acceptable — the placeholder handles them).

- [ ] **Step 8: Final commit**

```bash
git add -A
git commit -m "feat: minecraft puzzler game complete"
```
