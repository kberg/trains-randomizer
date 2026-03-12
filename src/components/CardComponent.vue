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
  font-family: 'Inter', system-ui, sans-serif;
  text-align: center;
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.18);
  transition: transform 0.15s ease, box-shadow 0.15s ease;
  cursor: default;
}

.base:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.24);
}

.base > div {
  min-height: 120px;
  padding-bottom: 10px;
}

.buffer {
  height: 10px;
}

.name {
  margin: 0 10px 8px;
  background: rgba(0, 0, 0, 0.72);
  color: white;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 4px;
  padding: 6px 8px;
  line-height: 1.3;
  letter-spacing: -0.01em;
}

.type {
  font-size: 0.68rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.88);
  display: block;
  padding: 0 8px;
}

.attack-note {
  font-size: 0.65rem;
  font-style: italic;
  color: rgba(255, 255, 255, 0.7);
  margin-top: 3px;
}

.action {
  background: linear-gradient(145deg, rgb(207, 83, 83) 0%, rgb(175, 55, 55) 100%);
}

.attack {
  background: linear-gradient(145deg, rgb(226, 50, 50) 0%, rgb(190, 28, 28) 100%);
}

.raillaying {
  background: linear-gradient(145deg, rgb(105, 168, 108) 0%, rgb(76, 138, 79) 100%);
}

.stationexpansion {
  background: linear-gradient(145deg, rgb(117, 109, 162) 0%, rgb(88, 80, 133) 100%);
}

.train {
  background: linear-gradient(145deg, rgb(113, 152, 202) 0%, rgb(78, 118, 172) 100%);
}

.victorypoints {
  background: linear-gradient(145deg, rgb(190, 163, 61) 0%, rgb(158, 132, 38) 100%);
}

.waste {
  background: linear-gradient(145deg, rgb(101, 100, 107) 0%, rgb(72, 71, 78) 100%);
}
</style>
