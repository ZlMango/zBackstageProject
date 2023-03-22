import {createRouter,createWebHashHistory} from 'vue-router'
import {getPowerNav} from '@/api/nav/nav'
import store from '../store/index'
const routes = [
	{
		path:'/',
		redirect:'/Login'
	},
	{
		path: '/Login',
		name: 'Login',
		component: () => import('../views/Login/Login.vue'),
		meta: {title: '登录页'},
		hidden: true,
	},
	{
		path: '/index',
		name: 'layout',
		component: () => import('../views/layout/index.vue'),
		hidden: true,
		children: [
			{
				path:'/ProductManagement',
				name: 'ProductManagement',
				meta:{title: '产品管理'},
				component: () => import('@/views/SubsidiaryManagement/ProductManagement/index.vue')
			},
			{
				path:'/MeetingRoomApplicationRecord',
				name: 'MeetingRoomApplicationRecord',
				meta:{title: '会议申请管理'},
				component: () => import('@/views/ConferenceApplicationManagement/MeetingRoomApplicationRecord/index.vue')
			}
		]
	}
]
const router = createRouter({
	history: createWebHashHistory(),
	routes
})

router.beforeEach( async (to, from, next) => {
	if (to.name === undefined){
		await store.dispatch('addRouter')
		localStorage.setItem('defaultActive',to.fullPath)
		next({path: to.fullPath})
	}else{
		next()
	}
})

// 设置路由全局后置守卫
router.afterEach(to => {
	document.title = to.meta.title
})

export default router
