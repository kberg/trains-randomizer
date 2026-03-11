<template>
  <div class="app">
    <h1>Trains Randomizer</h1>

    <div class="signature">
      By <a href="http://github.com/kberg">Robert Konigsberg</a>.
      Source is on <a href="https://github.com/kberg/trains-randomizer">GitHub</a>
    </div>

    <CriteriaComponent />

    <div>
      <p><b>Notes:</b></p>

      <p>Attack cards are considered a different type of card in the generator,
      so you must specifically want it. Be sure to include the Rising Sun cards.</p>

      <p>Patches are welcome! Most of all, enjoy!</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import CriteriaComponent from './components/CriteriaComponent.vue'

export default defineComponent({
  components: { CriteriaComponent },
})
</script>

<style>
.app {
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
}

a {
  text-decoration: none;
  color: blue;
}

a:hover {
  text-decoration: underline;
}

.signature {
  font-size: 75%;
  font-style: italic;
}
</style>
