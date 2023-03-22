<template>
		<div class="topContent">
				<div class="newlyAdded">
						<div class="topTitle"><span>会议室管理</span></div>
						<el-button type="primary" @click="newlyAdded">添加会议室</el-button>
				</div>
		</div>
		<div></div>
		<div class="content">
				<el-table :data="tableData.slice((queryInfo.pageNum-1)*queryInfo.pageSize,queryInfo.pageNum*queryInfo.pageSize)"
				          style="width: 100%">
						<el-table-column label="序号" width="80">
								<template #default="scope">
										<div>
												<span style="margin-left: 10px">{{ scope.row.oId }}</span>
										</div>
								</template>
						</el-table-column>
						<el-table-column label="会议室门牌号" width="180" align="center">
								<template #default="scope">
										<span>{{ scope.row.oNum }}</span>
								</template>
						</el-table-column>
						<el-table-column label="会议室类型" width="130" align="center">
								<template #default="scope">
										<span>{{ scope.row.oName }}</span>
								</template>
						</el-table-column>
						<el-table-column label="会议室电话" width="180" align="center">
								<template #default="scope">
										<span>{{ scope.row.oTel }}</span>
								</template>
						</el-table-column>
						<el-table-column label="会议室描述" width="300">
								<template #default="scope">
										<span>{{ scope.row.oInfo }}</span>
								</template>
						</el-table-column>
						<el-table-column label="操作" align="center" fixed="right">
								<template #default="scope">
										<el-button type="warning" size="small" @click="handleEditStaff(scope.row)">
												<el-icon>
														<Edit/>
												</el-icon>
												编辑
										</el-button>
										<el-popconfirm
												width="175px"
												:icon="InfoFilled"
												title="确定删除该数据吗？"
												confirm-button-text="删除"
												cancel-button-text="取消"
												@confirm="confirmDelete"
										>
												<template #reference>
														<el-button
																size="small"
																type="danger"
																@click="handleDelete(scope.row)"
														>
																<el-icon>
																		<Delete/>
																</el-icon>
																删除
														</el-button>
												</template>
										</el-popconfirm>
								</template>
						</el-table-column>
				</el-table>
				<el-empty v-if="empty" description="description"/>
		</div>
		<editMeeting v-show="editStaffShow" :currentPage="currentPage" :editData="editData" @handleCancel="handleCancel"
		             @handleClick="createClose"/>
		<addMeeting v-show="addStaffShow" :currentPage="currentPage" @handleCancel="handleCancel"
		            @handleClick="createClose"/>
		<div class="pagination">
				<el-pagination
						:current-page="queryInfo.pageNum"
						:page-size="queryInfo.pageSize"
						:page-sizes="[5, 10, 20, 50]"
						:disabled="disabled"
						layout="total, sizes, prev, pager, next, jumper"
						:total="tableData.length"
						@size-change="handleSizeChange"
						@current-change="handleCurrentChange"
				/>
		</div>
</template>
<script setup>
import editMeeting from './editMeeting/index'
import addMeeting from './addMeeting/index'
import {onMounted, onUpdated, reactive, ref} from 'vue'
import {InfoFilled, Edit, Delete, CirclePlus, Document} from '@element-plus/icons-vue'
import {getAllUserData, deleteUsers} from '@/api/user/login'
import {getAllOffice, delOffice} from '@/api/office'
// 用户数据列表
const tableData = reactive([])
// 数据总条数
const total = ref(0)
const currentPage = ref(1)
const pageSize = ref(10)

// 获取列表数据的参数对象
const queryInfo = reactive({
		query: '',   // 查询参数
		pageNum: 1,  // 当前页码
		pageSize: 5  // 每页显示条数
})

const disabled = ref(false)
//  size-change 事件，分页组件选择每一页显示数据量时，触发该事件
const handleSizeChange = (val) => {
		queryInfo.pageSize = val
}
// current-change 事件，分页组件的页码值发生切换时，触发该事件
const handleCurrentChange = (val) => {
		queryInfo.pageNum = val
}
const empty = ref(false)
onMounted(() => {
		init()
})
let page = ref(1)
// 页面初始化
const init = () => {
		tableData.length = 0
		getAllOffice({page: queryInfo.pageNum}).then(res => {
				res.data.map(item => {
						if (res.data.length === 5) {
								getAllOffice({page: queryInfo.pageNum += 1}).then(officeData => {
										officeData.data.map(items => {
												tableData.push(items)
										})
								})
						}
						tableData.push(item)
				})
				queryInfo.pageNum = 1
		})
}
let editStaffShow = ref(false)
let addStaffShow = ref(false)
let editData = reactive({})

// 编辑
const handleEditStaff = (e) => {
		editData = {...e}
		editStaffShow.value = true
}
const oId = ref('')
// 删除
const handleDelete = (index) => {
		oId.value = index.oId
}
// 确定删除
const confirmDelete = () => {
		delOffice({oId: oId.value}).then(res => {
				init()
		})
}
// 关闭模态框
const createClose = () => {
		editData = {}
		init()
		editStaffShow.value = false
		addStaffShow.value = false
}
// 新增
const newlyAdded = () => {
		addStaffShow.value = !addStaffShow.value
}
const handleCancel = () => {
		addStaffShow.value = false
		editStaffShow.value = false
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