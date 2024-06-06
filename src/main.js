import { createApp } from 'vue'
import App from './App.vue'
import { createVuetify } from 'vuetify'
import { VAutocomplete, VBtn, VIcon, VSelect, VTable, VTextField  } from 'vuetify/components'
import { VNumberInput } from 'vuetify/labs/VNumberInput'
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader

const vuetify = createVuetify({
    components: {
      VAutocomplete,
      VBtn,
      VIcon,
      VNumberInput,
      VSelect,
      VTable,
      VTextField  
    },
    directives: {},
  })

  const app = createApp(App)

  app.use(vuetify)
  
  app.mount('#app')
