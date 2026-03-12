<template>
  <h2>Criteria:</h2>
  <div>
    <form novalidate @submit.prevent>
      <table>
        <tbody>
        <tr>
          <td>
            <div class="heading">Decks</div>
            <label>Include Trains <input type="checkbox" required v-model="criteria.includeTrains"></label> <br/>
            <label>Include Rising Sun <input type="checkbox" required v-model="criteria.includeRisingSun"></label> <br/>
            <label>Include Coastal Tides <input type="checkbox" required v-model="criteria.includeCoastalTides"></label> <br/>
            <div class="todo">TODO: Include Sea Bridge</div>
            <br/>
          </td>
          <td width="30px"></td>
          <td>
            <!-- <label>Preset <input type="text" v-model="criteria.preset"></label> <br/> -->
            <div class="heading">Additional cards</div>
            <table border="1">
              <tbody>
              <tr><th></th><th>At least</th><th>But no more than</th></tr>
              <tr>
                <td>Trains</td>
                <td><input type="number" min="0" max="10" v-model.number="criteria.train.min"></td>
                <td>
                  <label><input type="checkbox" v-model="maxEnabled.train"></label>
                  <input type="number" min="0" max="10" v-model.number="criteria.train.max" :disabled="!maxEnabled.train">
                </td>
              </tr>
              <tr>
                <td>Lay Rail</td>
                <td><input type="number" min="0" max="10" v-model.number="criteria.railLaying.min"></td>
                <td>
                  <label><input type="checkbox" v-model="maxEnabled.railLaying"></label>
                  <input type="number" min="0" max="10" v-model.number="criteria.railLaying.max" :disabled="!maxEnabled.railLaying">
                </td>
              </tr>
              <tr>
                <td>Action (non-attack)</td>
                <td><input type="number" min="0" max="10" v-model.number="criteria.action.min"></td>
                <td>
                  <label><input type="checkbox" v-model="maxEnabled.action"></label>
                  <input type="number" min="0" max="10" v-model.number="criteria.action.max" :disabled="!maxEnabled.action">
                </td>
              </tr>
              <tr>
                <td>Station Expansion</td>
                <td><input type="number" min="0" max="10" v-model.number="criteria.stationExpansion.min"></td>
                <td>
                  <label><input type="checkbox" v-model="maxEnabled.stationExpansion"></label>
                  <input type="number" min="0" max="10" v-model.number="criteria.stationExpansion.max" :disabled="!maxEnabled.stationExpansion">
                </td>
              </tr>
              <tr>
                <td>VP</td>
                <td><input type="number" min="0" max="10" v-model.number="criteria.vp.min"></td>
                <td>
                  <label><input type="checkbox" v-model="maxEnabled.vp"></label>
                  <input type="number" min="0" max="10" v-model.number="criteria.vp.max" :disabled="!maxEnabled.vp">
                </td>
              </tr>
              <tr :class="{ disabled: !criteria.includeRisingSun }">
                <td>Attack Actions</td>
                <td><input type="number" min="0" max="10" v-model.number="criteria.attack.min" :disabled="!criteria.includeRisingSun"></td>
                <td>
                  <label><input type="checkbox" v-model="maxEnabled.attack" :disabled="!criteria.includeRisingSun"></label>
                  <input type="number" min="0" max="10" v-model.number="criteria.attack.max" :disabled="!maxEnabled.attack || !criteria.includeRisingSun">
                </td>
              </tr>
              </tbody>
            </table>
          </td>
        </tr>
        </tbody>
      </table>
      <label>RNG seed: <input type="number" v-model.number="criteria.seed"></label> Use only if you know what you're doing.<br/>
      <button type="button" @click="submit">Go</button>
    </form>
  </div>

  <div class="grid-container">
    <div class="grid-item" v-for="(card, index) in cards" :key="index">
      <CardComponent :card="card" />
    </div>
  </div>
  <p></p>
  <div>If you get a set of surprising results and want support, send the contents of this text box: <input type="text" disabled :value="repeatable_param"></div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, onMounted } from 'vue'
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
    action: new TypeCriterion("Action", 3, 4),
    attack: new TypeCriterion("Attack", 0),
    railLaying: new TypeCriterion("Rail Laying", 2, 3),
    stationExpansion: new TypeCriterion("Station Expansion", 0, 1),
    train: new TypeCriterion("Train", 2, 3),
    vp: new TypeCriterion("Victory Points", 0),
    seed: NaN,
  }
}

type MaxEnabled = {
  train: boolean
  railLaying: boolean
  action: boolean
  stationExpansion: boolean
  vp: boolean
  attack: boolean
}

function maxEnabledFromCriteria(c: Criteria): MaxEnabled {
  return {
    train: c.train.max !== undefined,
    railLaying: c.railLaying.max !== undefined,
    action: c.action.max !== undefined,
    stationExpansion: c.stationExpansion.max !== undefined,
    vp: c.vp.max !== undefined,
    attack: c.attack.max !== undefined,
  }
}

export default defineComponent({
  components: { CardComponent },

  setup() {
    const criteria = ref<Criteria>(defaultCriteria())
    const maxEnabled = reactive<MaxEnabled>(maxEnabledFromCriteria(criteria.value))
    const cards = ref<Card[] | undefined>(undefined)
    const repeatable_param = ref('')

    // https://boardgamegeek.com/thread/1373087/not-so-random-randomizer
    onMounted(() => {
      const params = new URLSearchParams(window.location.search)
      if (params.has('c')) {
        const c = Parameters.toCriteria(params)
        const seedParam = params.get('seed')
        if (seedParam) c.seed = parseInt(seedParam)
        criteria.value = c
        Object.assign(maxEnabled, maxEnabledFromCriteria(c))
      } else {
        const seedParam = params.get('seed')
        if (seedParam) criteria.value.seed = parseInt(seedParam)
      }
    })

    function submit() {
      const c = criteria.value
      const seed = c.seed ? c.seed : Math.round(Math.random() * 10000000)
      const rng = new SeededRandomNumberGenerator(seed)

      // Build effective criteria — only pass max where enabled
      const effective: Criteria = {
        ...c,
        train: new TypeCriterion(c.train.type, c.train.min, maxEnabled.train ? c.train.max : undefined),
        railLaying: new TypeCriterion(c.railLaying.type, c.railLaying.min, maxEnabled.railLaying ? c.railLaying.max : undefined),
        action: new TypeCriterion(c.action.type, c.action.min, maxEnabled.action ? c.action.max : undefined),
        stationExpansion: new TypeCriterion(c.stationExpansion.type, c.stationExpansion.min, maxEnabled.stationExpansion ? c.stationExpansion.max : undefined),
        vp: new TypeCriterion(c.vp.type, c.vp.min, maxEnabled.vp ? c.vp.max : undefined),
        attack: new TypeCriterion(c.attack.type, c.attack.min, maxEnabled.attack ? c.attack.max : undefined),
      }

      cards.value = generate(effective, rng)
      repeatable_param.value = Parameters.fromCriteria(effective, seed).toString()
    }

    return { criteria, maxEnabled, cards, repeatable_param, submit }
  },
})
</script>

<style>
.grid-container {
  display: inline-grid;
  grid-template-columns: auto auto auto auto;
  grid-gap: 3px;
}

.grid-item {
  padding: 10px;
}

.heading {
  font-weight: bold;
}

.todo {
  color: #AAA;
}

tr.disabled {
  color: #AAA;
}
</style>
