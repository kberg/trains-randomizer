import { createApp } from 'vue'
import App from './App.vue'
import './styles.css'

const app = createApp(App)

app.config.errorHandler = (err) => {
  alert(err)
  console.error(err)
}

app.mount('#app')
