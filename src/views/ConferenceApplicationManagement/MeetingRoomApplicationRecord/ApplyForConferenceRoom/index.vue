<template>
		<div class="mask">
				<div class="ModalBox">
						<div class="edit">申请会议室</div>
						<el-form
								label-width="170px"
								:model="tableData"
								style="max-width: 100%"
						>
								<el-form-item label="会议室门牌号">
										<el-select v-model="rolesName" @change="changeName" class="m-2">
												<el-option
														v-for="(item,index) in rolesData"
														:key="index"
														:label="item.oNum"
														:value="item.oId"
												/>
										</el-select>
								</el-form-item>
								<el-form-item label="会议开始时间">
										<el-time-select
												v-model="tableData.startTime"
												:max-time="tableData.endTime"
												class="mr-4"
												placeholder="Start time"
												start="08:30"
												step="00:15"
												end="18:30"
										/>
										<!--										<el-input  class="input" v-model="tableData.startTime" />-->
								</el-form-item>
								<el-form-item label="会议结束时间">
										<el-time-select
												v-model="tableData.endTime"
												:min-time="tableData.startTime"
												placeholder="End time"
												start="08:30"
												step="00:15"
												end="18:30"
										/>
										<!--										<el-input class="input" v-model="tableData.endTime" />-->
								</el-form-item>
								<el-form-item label="会议室申请人">
										<el-input class="input" disabled v-model="tableData.users.uName"/>
								</el-form-item>
								<el-form-item label="申请人部门">
										<el-input class="input" disabled v-model="tableData.dept.dName"/>
								</el-form-item>
								<div class="determine">
										<el-button @click="handleClick" type="primary">添加</el-button>
										<el-button @click="handleCancel">取消</el-button>
								</div>
						</el-form>
				</div>
		</div>
</template>

<script setup>
import {ref, onMounted, onUpdated, inject, reactive, watch} from 'vue'
import {addMenuItem} from '@/api/nav/nav'
import {getAllMenuItems} from '@/api/nav/nav.js'
import {ElMessage} from 'element-plus'
import {AddUsers, getAllUserData} from '@/api/user/login'
import {getAllOffice, checkOffice} from '@/api/office'
import {getAllDept, deleteDept} from '@/api/dept'
import {getAllRoles} from '@/api/roles'

const startTime = ref('')
const endTime = ref('')
const props = defineProps(['currentPage'])
const currentPage = ref(1)
const emit = defineEmits(['handleClick', 'handleCancel'])
const queryInfo = reactive({
		query: '',   // 查询参数
		currentPage: 1,  // 当前页码
		pageSize: 10  // 每页显示条数
})
let tableData = reactive({
		oId: '',
		startTime: '',
		endTime: '',
		uId: '',
		dId: '',
		uIdStr: 'uIdStr',
		office: {},
		users: {},
		dept: {},
		status: 1
})
let rolesName = ref([])
const departmentName = ref([])
let rolesData = reactive([])
onMounted(() => {
		tableData.uId = localStorage.getItem('uId')
		getAllUserData({page: queryInfo.currentPage}).then(res => {
				res.data.map(item => {
						if (item.uId === tableData.uId) {
								if (res.data.length === 10) {
										getAllUserData({page: queryInfo.currentPage += 1}).then(data => {
												data.data.map(items => {
														tableData.users = items
														tableData.uId = items.uId
												})
										})
								}
								tableData.users = item
								tableData.uId = item.uId
						}
				})
		})
		if (tableData.users) {
				getAllDept().then(res => {
						res.data.map(item => {
								if (item.dId === tableData.users.dId) {
										tableData.dept = item
										console.log(tableData.dept)
										tableData.dId = item.dId
								}
						})
				})
		}
		getAllOffice({page: queryInfo.currentPage}).then(res => {
				console.log(res.data)
				res.data.map(item => {
						if (res.data.length === 5) {
								getAllOffice({page: queryInfo.currentPage += 1}).then(officeData => {
										officeData.data.map(items => {
												rolesData.push(items)
												tableData.oId = items.oId
										})
								})
						}
						rolesData.push(item)
						tableData.oId = item.oId
				})
		})
})
onUpdated(() => {
		if (tableData.users) {
				getAllDept().then(res => {
						res.data.map(item => {
								if (item.dId === tableData.users.dId) {
										tableData.dept = item
										tableData.dId = item.dId
								}
						})
				})
		}
})
const changeName = (index) => {
		getAllOffice({page: queryInfo.currentPage}).then(res => {
				console.log(res.data)
				res.data.forEach(item => {
						if (res.data.length === 5) {
								getAllOffice({page: queryInfo.currentPage += 1}).then(officeData => {
										officeData.data.map(items => {
												rolesData.push(items)
										})
								})
						}
						rolesData.push(item)
				})
		})
		tableData.oId = index
		console.log(tableData.oId)
}
// 定义初始化方法
const init = () => {


}

const EmptyData = () => {
		ElMessage({
				message: '请填写完整数据',
				type: 'warning',
		})
}
// 添加
const handleClick = () => {
		console.log(tableData)
		if (tableData.startTime === '' || tableData.endTime === '' || tableData.uId === '' || tableData.dId === '') {
				EmptyData()
		} else {
				console.log(currentPage.value)
				checkOffice({
						oId: tableData.oId,
						startTime: tableData.startTime,
						endTime: tableData.endTime,
						uId: tableData.uId,
						dId: tableData.dId,
						uIdStr: tableData.uIdStr,
						status: tableData.status
				}).then(res => {
						console.log(res)
						emit('handleClick')
						tableData.oId = ''
						tableData.startTime = ''
						tableData.endTime = ''
						tableData.uIdStr = ''
						rolesData = []
						rolesName = []
				})
		}
}
// 取消
const handleCancel = () => {
		tableData.oId = ''
		tableData.startTime = ''
		tableData.endTime = ''
		tableData.uIdStr = ''
		rolesData = []
		rolesName = []
		emit('handleCancel')
}
</script>

<style scoped>
.edit {
		font-size: 1.5em;
		margin: 1.3em;
}

.mask {
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.1);
		position: absolute;
		left: 0;
		top: 0;
		z-index: 10;
		display: flex;
}

.ModalBox {
		width: 40%;
		height: auto;
		padding-bottom: 1em;
		background: white;
		margin: auto;
		border-radius: 1rem;
}

.input {
		width: 90%;
}

.determine {
		display: flex;
		justify-content: space-around;
}
</style>