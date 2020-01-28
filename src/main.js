import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import apolloProvider from './plugins/vueApollo'
import loading from './directives/loading'
import '@/styles/index.scss'

Vue.config.productionTip = false
Vue.directive('loading', loading)

new Vue({
  router,
  store,
  apolloProvider,
  render: h => h(App),
}).$mount('#app')
