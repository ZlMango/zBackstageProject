<template>
		<div class="topContent">
				<div class="newlyAdded">
						<div class="topTitle"><span>会议室申请记录</span></div>
						<el-button type="primary" @click="goApplyForConferenceRoom">申请会议室</el-button>
						<el-button type="primary" @click="comeBack">返回</el-button>
				</div>
		</div>
		<div></div>
		<div class="content">
				<el-table :data="tableData.slice((queryInfo.pageNum-1)*queryInfo.pageSize,queryInfo.pageNum*queryInfo.pageSize)"
				          style="width: 100%">
						<el-table-column label="序号" width="80">
								<template #default="scope">
										<div>
												<span style="margin-left: 10px">{{ scope.row.coId }}</span>
										</div>
								</template>
						</el-table-column>
						<el-table-column label="会议室门牌号" align="center" width="180">
								<template #default="scope">
										<span>{{ scope.row.oId }}</span>
								</template>
						</el-table-column>
						<el-table-column label="会议开始时间" align="center" width="180">
								<template #default="scope">
										<span>{{ scope.row.startTime }}</span>
								</template>
						</el-table-column>
						<el-table-column label="会议结束时间" align="center" width="180">
								<template #default="scope">
										<span>{{ scope.row.endTime }}</span>
								</template>
						</el-table-column>
						<el-table-column label="会议室申请人" align="center" width="180">
								<template #default="scope">
										<span>{{ scope.row.uId }}</span>
								</template>
						</el-table-column>
						<el-table-column label="申请人所属部门" align="center" width="180">
								<template #default="scope">
										<span>{{ scope.row.dId }}</span>
								</template>
						</el-table-column>
						<!--						<el-table-column label="uIdStr">-->
						<!--								<template #default="scope">-->
						<!--										<span>{{scope.row.uIdStr}}</span>-->
						<!--								</template>-->
						<!--						</el-table-column>-->
						<el-table-column label="会议室申请状态" align="center">
								<template #default="scope">
										<span>{{ scope.row.status }}</span>
								</template>
						</el-table-column>
				</el-table>
				<el-empty v-if="empty" description="description"/>
				<ApplyForConferenceRoom v-show="ApplyForConferenceRoomShow" @handleCancel="handleCancel"
				                        @handleClick="handleClick"/>
		</div>
		<div class="pagination">
				<el-pagination
						:current-page="queryInfo.pageNum"
						:page-size="queryInfo.pageSize"
						:page-sizes="[10, 30, 50, 100]"
						:disabled="disabled"
						layout="total, sizes, prev, pager, next, jumper"
						:total="tableData.length"
						@size-change="handleSizeChange"
						@current-change="handleCurrentChange"
				/>
		</div>
</template>
<script setup>
import {onMounted, onUpdated, reactive, ref} from 'vue'
import {getAllOffice, delOffice, getAllCheckOffice, getOneOffice} from '@/api/office'
import {useRouter} from 'vue-router'
import ApplyForConferenceRoom from './ApplyForConferenceRoom'
import {getAllUserData, getOneUsers} from '@/api/user/login'
import {getAllDept, getOneDept} from '@/api/dept'

const router = useRouter()
// 用户数据列表
const tableData = reactive([])
// 数据总条数
const total = ref(0)
const currentPage = ref(1)
const pageSize = ref(10)
const ApplyForConferenceRoomShow = ref(false)
// 获取列表数据的参数对象
const queryInfo = reactive({
		query: '',   // 查询参数
		pageNum: 1,  // 当前页码
		pageSize: 10  // 每页显示条数
})
let ApplicationRecord = reactive({
		oNum: '',
		startTime: '',
		endTime: '',
		uName: '',
		dName: '',
		uIdStr: '',
		status: ''
})
const disabled = ref(false)
//  size-change 事件，分页组件选择每一页显示数据量时，触发该事件
const handleSizeChange = (val) => {
		console.log(val)
		queryInfo.pageSize = val
}
// current-change 事件，分页组件的页码值发生切换时，触发该事件
const handleCurrentChange = (val) => {
		queryInfo.pageNum = val
		console.log(`current page: ${val}`)
}
const empty = ref(false)
// 页面初始化
const init = () => {
		
		tableData.length = 0
		ApplicationRecord.uId = localStorage.getItem('uId')
		getAllCheckOffice().then(res => {
				console.log(res.data)
				res.data.map(item => {
						tableData.push(item)
				})
				tableData.map(item => {
						getOneUsers({uId: ApplicationRecord.uId}).then(resUName => {
								item.uId = resUName.data.uName
						})
						getOneDept({dId: item.dId}).then(resDept => {
								item.dId = resDept.data.dName
						})
						getOneOffice({oId: item.oId}).then(resOffice => {
								item.oId = resOffice.data.oNum
						})
						console.log(item)
						if (item.status === '1') {
								item.status = '已通过'
						} else if (item.status === '2') {
								item.status = '未通过'
						}
				})
				queryInfo.pageNum = 1
		})
}
onMounted(() => {
		init()
		
})
onUpdated(() => {

})
let page = ref(1)
const rolesName = ref([])
const departmentName = ref([])
const rolesData = reactive([])

let editStaffShow = ref(false)
let MeetingRoomApplicationRecordShow = false
let editData = reactive({})

// 编辑
const handleEditStaff = (e) => {
		editData = {...e}
		console.log(e, 111)
		console.log(editData, 'editData')
		editStaffShow.value = true
}
const oId = ref('')
// 删除
const handleDelete = (index) => {
		oId.value = index.oId
		console.log(index, oId.value)
}
// 确定删除
const confirmDelete = () => {
		delOffice({oId: oId.value}).then(res => {
				console.log(res)
				init()
		})
}

// 申请会议室
const goApplyForConferenceRoom = () => {
		ApplyForConferenceRoomShow.value = true
}
const handleCancel = () => {
		// tableData.length = 0
		// getAllCheckOffice().then(res => {
		// 		console.log(res.data)
		// 		res.data.map(item => {
		// 				tableData.push(item)
		// 		})
		// 		queryInfo.pageNum = 1
		// })
		ApplyForConferenceRoomShow.value = false
}
const handleClick = () => {
		init()
}
// 返回会议室申请管理
const comeBack = () => {
		router.replace('/ConferenceApplicationManagement')
}
</script>

<style scoped>
.topContent {
		/*border:1px solid sienna;*/
		height: 5em;
		width: 95%;
		margin: 1.5em auto;
		box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
		background: white;
		display: flex;
		justify-content: space-between;
}

.content {
		width: 95%;
		background: white;
		margin: 0 auto;
		box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
}

.newlyAdded {
		width: 40%;
		display: flex;
		justify-content: space-around;
		align-items: center;
}

.topTitle {
		display: flex;
		font-size: 1.5em;
		font-weight: bold;
}

.pagination {
		margin-top: 1em;
		display: flex;
		justify-content: center;
}
</style>