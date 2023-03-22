import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router'
import store from './store'
import './assets/icon/iconfont/iconfont.css'
const app = createApp(App)
import * as ElIconModules from '@element-plus/icons-vue'
// 注册Icons 全局组件
Object.keys(ElIconModules).forEach(function (key) {
	app.component(ElIconModules[key].name, ElIconModules[key])
})
app.use(ElementPlus).use(store).use(router).mount('#app')
