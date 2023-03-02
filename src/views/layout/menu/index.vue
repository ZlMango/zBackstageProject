<template>
		<keep-alive>
				<div class="menuContent">
						<el-row class="tac">
								<el-col :span="24">
										<el-menu
												active-text-color="#ffd04b"
												background-color="#303133"
												class="el-menu-vertical-demo"
												:default-active="defaultActive"
												text-color="#fff"
												router
										>
												<el-menu-item @click="getMenuIndex" v-for="(item,index) in menuData" :key="index"
												              :index="item.nUrl">
														<span class="menuItem">
																<i :class="iconObj[item.nId]"></i>
																<span>{{ item.nName }}</span>
														</span>
												</el-menu-item>
										</el-menu>
								</el-col>
						</el-row>
				</div>
		</keep-alive>
</template>
<script setup>
import {ref, onUpdated, onMounted, reactive, watch} from 'vue'
import {useRouter} from 'vue-router'
import {getAllMenuItems, getPowerNav} from '@/api/nav/nav.js'

let menuData = reactive([])
const iconObj = reactive({
		"1": 'iconfont icon-yuangongguanli',
		'2': 'iconfont icon-jiaoseguanli1',
		'3': 'iconfont icon-caidanguanli1',
		'4': 'iconfont icon-2fengongsi',
		'5': 'iconfont icon-bumenguanli2',
		'6': 'iconfont icon-huiyiguanli01',
		'7': 'iconfont icon-ceshishenqing',
		'8': 'iconfont icon-falvfagui',
})
const defaultActive = ref('EmployeeManagement')
const menuDataList = ref(0)
const powerData = JSON.parse(localStorage.getItem('powerData'))
const menuPower = ref([])
const router = useRouter()
onMounted(() => {
		defaultActive.value = 'EmployeeManagement'
		console.log(powerData)
		powerData.map(item => {
				if (item !== ',') {
						menuPower.value.push(item)
				}
		})
		console.log(menuPower.value)
		getAllMenuItems().then(res => {
				console.log(res.data)
				console.log(menuPower.value)
				res.data.map(item => {
						menuPower.value.map(items => {
								if (item.nId === items) {
										menuData.push(item)
								}
						})
						// menuData.push(item)
						menuDataList.value = res.data.length
				})
		})
})

const handleClick = () => {
		console.log(menuData)
}
const getMenuIndex = (e) => {
		router.replace(`/${e.index}`)
		defaultActive.value = e.index
		localStorage.setItem('defaultActive', defaultActive.value)
}
defaultActive.value = localStorage.getItem('defaultActive')
</script>

<style scoped>
.menuItem {
		text-align: center;
		width: 100%;
		display: flex;
		justify-content: space-around;
		font-size: 1.2em;
}

.tac {
		width: 100%;
		height: 100%;
		background-color: #303133;
		text-align: center;
}

.menuContent {
		height: 86.3vh;
		width: 100%;
}

</style>