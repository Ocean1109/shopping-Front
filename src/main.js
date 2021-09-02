import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import installElementPlus from './plugins/element'
// 引入Echarts
import * as echarts from 'echarts'


const app = createApp(App)
installElementPlus(app)
app.use(store).use(router).mount('#app')

app.config.globalProperties.$echarts = echarts


