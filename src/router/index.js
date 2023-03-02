import {createRouter, createWebHistory,createWebHashHistory} from 'vue-router'
import {getPowerNav} from '@/api/nav/nav'
import {reactive,ref} from 'vue'
const routes = [
	{
		path: '/',
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
		],
		// children:[
		//   // 员工管理
		//   {
		//     path:'/EmployeeManagement',
		//     name: 'EmployeeManagement',
		//     component: () =>　import('../views/EmployeeManagement/index.vue'),
		//     meta:{title:'员工管理'}
		//   },
		//   // 角色管理
		//   {
		//     path:'/RoleManagement',
		//     name: 'RoleManagement',
		//     component: () =>　import('../views/RoleManagement/index.vue'),
		//     meta:{title:'角色管理'},
		//   },
		//   // 菜单管理
		//   {
		//     path:'/MenuManagement',
		//     name: 'MenuManagement',
		//     component: () =>　import('../views/MenuManagement/index.vue'),
		//     meta:{title:'菜单管理'},
		//   },
		//   // 子公司管理
		//   {
		//     path:'/SubsidiaryManagement',
		//     name: 'SubsidiaryManagement',
		//     component: () =>　import('../views/SubsidiaryManagement/index.vue'),
		//     meta:{title:'子公司管理'},
		//   },
		//   // 部门管理
		//   {
		//     path:'/DepartmentManagement',
		//     name: 'DepartmentManagement',
		//     component: () =>　import('../views/DepartmentManagement/index.vue'),
		//     meta:{title:'部门管理'},
		//   },
		//   // 会议管理
		//   {
		//     path:'/ManagementOfMeetings',
		//     name: 'ManagementOfMeetings',
		//     component: () =>　import('../views/ManagementOfMeetings/index.vue'),
		//     meta:{title:'会议管理'},
		//   },
		//   // 资产管理
		//   {
		//     path:'/AssetManagement',
		//     name: 'AssetManagement',
		//     component: () =>　import('../views/AssetManagement/index.vue'),
		//     meta:{title:'资产管理'},
		//   },
		// ]
	},
]
const router = createRouter({
	history: createWebHashHistory(),
	routes
})
// 从用户登录页面用户点击登录保存本地的用户最终权限的字段取出来
let str = localStorage.getItem('FinalAuthority')
const uId = localStorage.getItem('uId')
let menuList = JSON.parse(localStorage.getItem('res'))
// 定义动态路由的方法，在前置路由守卫中调用
const dynamic = () => {
	console.log(str,11111111)
	// 获取权限菜单信息参数为用户的最终权限
	if (str){
		getPowerNav({str: str}).then(res => {
			window.localStorage.setItem('res',JSON.stringify(res.data))
			console.log(res.data,1111)
			// 遍历权限菜单接口返回值
			res.data.forEach((item) => {
				// 取出返回值中的nUrl(定义的路径，与组件目录名称一致)
				const paths = item.nUrl.split("/")[0];
				if (paths){
					//addRouter动态添加路由
					router.addRoute(
						'layout',
						{
							path: `/${paths}`,
							name: `${item.nUrl}`,
							meta: {
								title: `${item.nName}`
							},
							component: () => import('@/views/' + item.nUrl + '/index.vue'),
						}
					)

				}
			})
		})
	}


}
router.beforeEach( (to, from, next) => {
	let menuItem = JSON.parse(localStorage.getItem('res'))
	if (to.name === 'Login'){
		window.localStorage.removeItem('res');
		window.localStorage.removeItem('uId');
		window.localStorage.removeItem('defaultActive');
		window.localStorage.removeItem('powerData');
		window.localStorage.removeItem('FinalAuthority');
	}
	if (uId) {
		dynamic()
		if (to.name === undefined){
			getPowerNav({str: str}).then(res => {
				// 遍历权限菜单接口返回值
				res.data.forEach((item) => {
					// 取出返回值中的nUrl(定义的路径，与组件目录名称一致)
					const paths = item.nUrl.split("/")[0];
					if (paths){
						//addRouter动态添加路由
						router.addRoute(
							'layout',
							{
								path: `/${paths}`,
								name: `${item.nUrl}`,
								meta: {
									title: `${item.nName}`
								},
								component: () => import('@/views/' + item.nUrl + '/index.vue'),
							}
						)
					}
				})
			})
			next(router.replace('/'))
		}else{
			next()
		}
	}else{
		next()
	}
})

// 设置路由全局后置守卫
router.afterEach(to => {
	document.title = to.meta.title
})

export default router
