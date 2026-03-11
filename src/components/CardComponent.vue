<template>
  <div class="base">
    <div :class="cardColor()">
      <div class="buffer"></div>
      <div class="name">{{ card.name }}</div>
      <span class="type">{{ card.type }}</span>
      <div v-if="card.type === 'Attack'" class="attack-note">Attack card</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Card } from '../app/card'

export default defineComponent({
  props: {
    card: {
      type: Object as PropType<Card>,
      required: true,
    },
  },

  setup(props) {
    function cardColor() {
      const c = props.card.type.toString().toLowerCase().replace(/\s/g, '')
      return [c]
    }

    return { cardColor }
  },
})
</script>

<style>
.base {
  font-family: sans-serif;
  text-align: center;
  width: 200px;
  height: 120px;
}

.buffer {
  height: 8px;
}

.name {
  margin: 8px;
  background: black;
  color: white;
  font-size: 24px;
  border-radius: 4px;
  padding: 4px;
}

.type {
  font-size: 12px;
  vertical-align: text-bottom;
}

.attack-note {
  font-size: 10px;
  font-style: italic;
}

.action {
  background-color: rgb(207, 83, 83);
}

.attack {
  background-color: rgb(226, 50, 50);
}

.raillaying {
  background-color: rgb(105, 168, 108);
}

.stationexpansion {
  background-color: rgb(117, 109, 162);
}

.train {
  background-color: rgb(113, 152, 202);
}

.victorypoints {
  background-color: rgb(190, 163, 61);
}

.waste {
  background-color: rgb(101, 100, 107);
}
</style>
