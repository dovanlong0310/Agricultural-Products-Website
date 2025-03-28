import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { 
  faShoppingCart, 
  faSearch, 
  faUser, 
  faSignOutAlt,
  faCheckCircle,
  faMapMarkerAlt,
  faPhone,
  faEnvelope
} from '@fortawesome/free-solid-svg-icons'

import { 
    faFacebook,
    faYoutube,
    faInstagram,
    faTwitter
  } from '@fortawesome/free-brands-svg-icons'

library.add(
  faShoppingCart, 
  faSearch, 
  faUser, 
  faSignOutAlt,
  faCheckCircle,
  faMapMarkerAlt,
  faPhone,
  faEnvelope,
  faFacebook,
  faYoutube,
  faInstagram,
  faTwitter
)

const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon)
app.use(router)
app.use(store)

app.config.errorHandler = (err) => {
  console.error('Global error:', err)
}

app.mount('#app')
