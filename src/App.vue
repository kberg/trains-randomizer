<template>
  <div class="app-panel">
    <div class="app-header">
      <h1>Trains Randomizer</h1>
      <div class="signature">
        By <a href="http://github.com/kberg">Robert Konigsberg</a>.
        Source on <a href="https://github.com/kberg/trains-randomizer">GitHub</a>
      </div>
    </div>
    <div class="app-body">
      <CriteriaComponent />
    </div>
    <div class="app-notes">
      <p><strong>Notes</strong></p>
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
.app-panel {
  background: var(--bg-panel);
  border-radius: 4px;
  border-top: 6px solid var(--shin-blue);
  box-shadow: 0 4px 40px rgba(0, 48, 135, 0.15);
  overflow: hidden;
}

.app-header {
  padding: 32px 40px 28px;
  background: linear-gradient(170deg, #EDF4FF 0%, #FFFFFF 55%);
  border-bottom: 1px solid var(--border);
  position: relative;
}

/* Speed stripe — the Shinkansen nose line shooting across */
.app-header::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--shin-blue) 0%, var(--shin-blue-mid) 30%, transparent 80%);
}

h1 {
  font-size: 2rem;
  font-weight: 700;
  color: var(--shin-blue);
  margin: 0 0 6px;
  letter-spacing: -0.025em;
}

.app-body {
  padding: 32px 40px;
}

.app-notes {
  padding: 20px 40px 28px;
  background: #F5F8F5;
  border-top: 1px solid var(--border);
  font-size: 0.85rem;
  color: var(--text-muted);
  line-height: 1.6;
}

.app-notes p {
  margin: 4px 0;
}

.app-notes strong {
  color: var(--text-dark);
}

a {
  text-decoration: none;
  color: var(--shin-blue-mid);
}

a:hover {
  text-decoration: underline;
}

.signature {
  font-size: 0.8rem;
  color: var(--text-muted);
  font-style: italic;
}
</style>
