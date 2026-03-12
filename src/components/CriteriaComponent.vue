<template>
  <h2>Criteria:</h2>
  <div>
    <form novalidate @submit.prevent="submit">
      <table>
        <tbody>
        <tr>
          <td>
            <div class="heading">Decks</div>
            <div class="deck-buttons">
              <button type="button" :class="['deck-btn', { active: criteria.includeTrains }]" @click="criteria.includeTrains = !criteria.includeTrains">Trains</button>
              <button type="button" :class="['deck-btn', { active: criteria.includeRisingSun }]" @click="criteria.includeRisingSun = !criteria.includeRisingSun">Rising Sun</button>
              <button type="button" :class="['deck-btn', { active: criteria.includeCoastalTides }]" @click="criteria.includeCoastalTides = !criteria.includeCoastalTides">Coastal Tides</button>
              <div class="todo">Sea Bridge (coming soon)</div>
            </div>
          </td>
          <td width="40px"></td>
          <td>
            <!-- <label>Preset <input type="text" v-model="criteria.preset"></label> <br/> -->
            <div class="heading">Additional cards</div>
            <table class="criteria-table">
              <tbody>
              <tr><th></th><th>Min</th><th>Max</th></tr>
              <tr>
                <td>Trains</td>
                <td><input type="number" min="0" max="10" v-model.number="criteria.train.min"></td>
                <td><input type="number" min="0" max="10" v-model.number="criteria.train.max" placeholder="—"></td>
              </tr>
              <tr>
                <td>Lay Rail</td>
                <td><input type="number" min="0" max="10" v-model.number="criteria.railLaying.min"></td>
                <td><input type="number" min="0" max="10" v-model.number="criteria.railLaying.max" placeholder="—"></td>
              </tr>
              <tr>
                <td>Action (non-attack)</td>
                <td><input type="number" min="0" max="10" v-model.number="criteria.action.min"></td>
                <td><input type="number" min="0" max="10" v-model.number="criteria.action.max" placeholder="—"></td>
              </tr>
              <tr :class="{ disabled: !criteria.includeRisingSun }">
                <td class="attack-indent">Attack Actions</td>
                <td><input type="number" min="0" max="10" v-model.number="criteria.attack.min" :disabled="!criteria.includeRisingSun"></td>
                <td><input type="number" min="0" max="10" v-model.number="criteria.attack.max" :disabled="!criteria.includeRisingSun" placeholder="—"></td>
              </tr>
              <tr>
                <td>Station Expansion</td>
                <td><input type="number" min="0" max="10" v-model.number="criteria.stationExpansion.min"></td>
                <td><input type="number" min="0" max="10" v-model.number="criteria.stationExpansion.max" placeholder="—"></td>
              </tr>
              <tr>
                <td>VP</td>
                <td><input type="number" min="0" max="10" v-model.number="criteria.vp.min"></td>
                <td><input type="number" min="0" max="10" v-model.number="criteria.vp.max" placeholder="—"></td>
              </tr>
              </tbody>
            </table>
          </td>
        </tr>
        </tbody>
      </table>
      <div class="seed-line">
        <label>RNG seed: <input type="number" v-model.number="criteria.seed"></label>
        <span class="seed-hint"> — use only if you know what you're doing</span>
      </div>
      <div class="generate-row">
        <div v-if="tooManyMins" class="min-error">Total minimums ({{ totalMin }}) exceed 8</div>
        <button type="submit" class="generate-btn" :disabled="tooManyMins">Generate</button>
      </div>
    </form>
  </div>

  <div class="grid-container">
    <div class="grid-item" v-for="(card, index) in cards" :key="index">
      <CardComponent :card="card" />
    </div>
  </div>
  <p></p>
  <div class="params-line">
    If you get surprising results and want support, send the contents of this field:
    <input type="text" disabled :value="repeatable_param">
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue'
import { Card } from '../app/card'
import { Criteria, TypeCriterion } from '../app/criteria'
import { generate } from '../app/generator'
import { SeededRandomNumberGenerator } from '../app/random'
import { Parameters } from '../app/criteria/parameters'
import CardComponent from './CardComponent.vue'

function defaultCriteria(): Criteria {
  return {
    includeTrains: true,
    includeRisingSun: false,
    includeCoastalTides: false,
    preset: '',
    action: {type: "Action", min: 3, max: 4},
    attack: {type: "Attack", min: 0, max: undefined},
    railLaying: {type: "Rail Laying", min: 2, max: 3},
    stationExpansion: {type: "Station Expansion", min: 0, max: 1},
    train: {type: "Train", min: 2, max: 3},
    vp: {type: "Victory Points", min: 0, max: undefined},
    seed: NaN,
  }
}

function maxOf(n: number | undefined): number | undefined {
  return n === undefined || isNaN(n) ? undefined : n
}

export default defineComponent({
  components: { CardComponent },

  setup() {
    const criteria = ref<Criteria>(defaultCriteria())
    const cards = ref<Card[] | undefined>(undefined)
    const repeatable_param = ref('')

    const totalMin = computed(() => {
      const c = criteria.value
      return c.train.min + c.railLaying.min + c.action.min + c.stationExpansion.min + c.vp.min +
        (c.includeRisingSun ? c.attack.min : 0)
    })
    const tooManyMins = computed(() => totalMin.value > 8)

    // https://boardgamegeek.com/thread/1373087/not-so-random-randomizer
    onMounted(() => {
      const params = new URLSearchParams(window.location.search)
      if (params.has('c')) {
        const c = Parameters.toCriteria(params)
        const seedParam = params.get('seed')
        if (seedParam) {
          c.seed = parseInt(seedParam)
        }
        criteria.value = c
      } else {
        const seedParam = params.get('seed')
        if (seedParam) {
          criteria.value.seed = parseInt(seedParam)
        }
      }
    })

    function submit() {
      const c = criteria.value
      const seed = c.seed ?? Math.round(Math.random() * 10000000)
      const rng = new SeededRandomNumberGenerator(seed)

      // Treat blank max inputs (NaN) as no upper bound
      const effective: Criteria = {
        ...c,
        train: {type: c.train.type, min: c.train.min, max: maxOf(c.train.max)},
        railLaying: {type: c.railLaying.type, min: c.railLaying.min, max: maxOf(c.railLaying.max)},
        action: {type: c.action.type, min: c.action.min, max: maxOf(c.action.max)},
        stationExpansion: {type: c.stationExpansion.type, min: c.stationExpansion.min, max: maxOf(c.stationExpansion.max)},
        vp: {type: c.vp.type, min: c.vp.min, max: maxOf(c.vp.max)},
        attack: {type: c.attack.type, min: c.attack.min, max: maxOf(c.attack.max)},
      }

      cards.value = generate(effective, rng)
      repeatable_param.value = Parameters.fromCriteria(effective, seed).toString()
    }

    return { criteria, cards, repeatable_param, submit, totalMin, tooManyMins }
  },
})
</script>

<style>
h2 {
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--shin-blue);
  text-transform: uppercase;
  letter-spacing: 0.12em;
  margin: 0 0 20px;
}

.heading {
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--shin-blue);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 12px;
}

/* Deck toggle buttons */
.deck-buttons {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

button.deck-btn {
  display: block;
  background: transparent;
  color: var(--text-muted);
  border: 2px solid var(--border);
  padding: 10px 22px;
  font-size: 1.05rem;
  font-weight: 500;
  font-family: inherit;
  border-radius: 4px;
  cursor: pointer;
  text-align: left;
  letter-spacing: 0.01em;
  transition: border-color 0.15s, color 0.15s, background 0.15s;
  margin: 0;
}

button.deck-btn:hover {
  border-color: var(--shin-blue-mid);
  color: var(--shin-blue-mid);
}

button.deck-btn.active {
  background: var(--shin-blue);
  border-color: var(--shin-blue);
  color: white;
}

button.deck-btn.active:hover {
  background: var(--shin-blue-mid);
  border-color: var(--shin-blue-mid);
}

.todo {
  color: #B0BCC8;
  font-size: 0.9rem;
  font-style: italic;
  padding: 6px 0 0 2px;
}

/* Criteria table */
.criteria-table {
  border-collapse: collapse;
  font-size: 1rem;
}

.criteria-table th {
  background: var(--shin-blue);
  color: white;
  padding: 10px 16px;
  font-size: 0.82rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  text-align: left;
  border: none;
}

.criteria-table td {
  padding: 10px 16px;
  border-bottom: 1px solid #E4EEF8;
  color: var(--text-dark);
  border-left: none;
  border-right: none;
  font-size: 1rem;
}

.criteria-table tr:last-child td {
  border-bottom: none;
}

.criteria-table tbody tr:hover td {
  background: #F0F6FF;
}

tr.disabled td {
  color: #B8C8D8;
}

input[type="number"] {
  width: 62px;
  padding: 6px 8px;
  border: 2px solid #9AB0C8;
  border-radius: 3px;
  font-size: 1rem;
  font-family: inherit;
  color: var(--text-dark);
  background: white;
  -moz-appearance: textfield;
  appearance: textfield;
}

input[type="number"]:focus {
  outline: none;
  border-color: var(--shin-blue-mid);
  box-shadow: 0 0 0 2px rgba(0, 85, 165, 0.15);
}

input[type="number"]:disabled {
  background: #F0F4F8;
  color: #B0BCC8;
  border-color: #E0E8F0;
}

.attack-indent {
  padding-left: 24px !important;
}

.generate-row {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.min-error {
  font-size: 0.9rem;
  color: #C0392B;
  font-weight: 500;
}

.seed-line {
  margin-top: 18px;
  font-size: 1rem;
  color: var(--text-muted);
}

.seed-hint {
  font-style: italic;
}

.seed-line input[type="number"] {
  width: 110px;
}

button.generate-btn {
  display: inline-block;
  background: var(--shin-blue);
  margin-top: 0;
  color: white;
  border: none;
  padding: 12px 40px;
  font-size: 1rem;
  font-weight: 600;
  font-family: inherit;
  border-radius: 3px;
  cursor: pointer;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  transition: background 0.15s ease, transform 0.1s ease;
}

button.generate-btn:disabled {
  background: #A0AABB;
  cursor: not-allowed;
  transform: none;
}

button.generate-btn:hover {
  background: var(--shin-blue-mid);
}

button.generate-btn:active {
  background: #001F5B;
  transform: translateY(1px);
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 14px;
  margin-top: 28px;
}

.grid-item {
  padding: 0;
}

.params-line {
  margin-top: 14px;
  font-size: 0.9rem;
  color: var(--text-muted);
}

.params-line input[type="text"] {
  font-family: 'Courier New', monospace;
  font-size: 0.8rem;
  padding: 5px 10px;
  border: 1px solid var(--border);
  border-radius: 3px;
  background: #F5F8FA;
  color: var(--text-dark);
  width: 300px;
  margin-left: 6px;
}
</style>
