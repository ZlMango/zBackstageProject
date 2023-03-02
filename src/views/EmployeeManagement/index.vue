<template>
		<div class="topContent">
				<div class="newlyAdded">
						<div class="topTitle"><span>员工管理</span></div>
						<el-button type="primary" @click="newlyAdded">添加员工</el-button>
				</div>
		</div>
		<div class="content">
				<el-table
						:data="tableData.slice((queryInfo.currentPage-1)*queryInfo.pageSize,queryInfo.currentPage*queryInfo.pageSize)"
						style="width: 100%">
						<el-table-column label="序号" width="140">
								<template #default="scope">
										<div style="display: flex; align-items: center">
												<span style="margin-left: 10px">{{ scope.row.uId }}</span>
										</div>
								</template>
						</el-table-column>
						<el-table-column label="用户名" width="180">
								<template #default="scope">
										<span>{{ scope.row.uName }}</span>
								</template>
						</el-table-column>
						<el-table-column label="密码" width="180">
								<template #default="scope">
										<span>{{ scope.row.uPwd }}</span>
								</template>
						</el-table-column>
						<el-table-column label="电话" width="180">
								<template #default="scope">
										<span>{{ scope.row.uTel }}</span>
								</template>
						</el-table-column>
						<el-table-column label="操作">
								<template #default="scope">
										<el-button size="small" @click="handleEditStaff(scope.row)">编辑</el-button>
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
														>删除
														</el-button>
												</template>
										</el-popconfirm>
								</template>
						</el-table-column>
				</el-table>
				<el-empty v-if="empty" description="description"/>
		</div>
		<editStaff v-show="editStaffShow" :currentPage="queryInfo.currentPage" :editData="editData"
		           @handleCancel="handleCancel" @handleClick="createClose"/>
		<addStaff v-show="addStaffShow" :currentPage="queryInfo.currentPage" @handleCancel="handleCancel"
		          @handleClick="createClose"/>
		<div class="pagination">
				<el-pagination
						:current-page="queryInfo.currentPage"
						:page-size="queryInfo.pageSize"
						:page-sizes="[5, 10, 20, 30, 50]"
						:disabled="disabled"
						layout="total, sizes, prev, pager, next, jumper"
						:total="tableData.length"
						@size-change="handleSizeChange"
						@current-change="handleCurrentChange"
				/>
		</div>
</template>
<script setup>
// 员工管理
import editStaff from './editStaff/index'
import addStaff from './addStaff/index'
import {onMounted, onUpdated, reactive, ref} from 'vue'
import {InfoFilled} from '@element-plus/icons-vue'
import {getAllUserData, deleteUsers} from '@/api/user/login'
// 用户数据列表
const tableData = reactive([])
// 获取列表数据的参数对象
const queryInfo = reactive({
		query: '',   // 查询参数
		currentPage: 1,  // 当前页码
		pageSize: 10  // 每页显示条数
})

const disabled = ref(false)
//  size-change 事件，分页组件选择每一页显示数据量时，触发该事件
const handleSizeChange = (val) => {
		queryInfo.pageSize = val
		console.log(queryInfo.pageSize)
}
// current-change 事件，分页组件的页码值发生切换时，触发该事件
const handleCurrentChange = (pageNum) => {
		queryInfo.currentPage = pageNum
		console.log(`current page: ${pageNum}`)
}
const empty = ref(false)
onMounted(() => {
		
		getAllUserData({page: queryInfo.currentPage}).then(res => {
				res.data.map(item => {
						if (res.data.length === 10) {
								getAllUserData({page: queryInfo.currentPage += 1}).then(data => {
										data.data.map(items => {
												tableData.push(items)
										})
								})
						}
						tableData.push(item)
				})
				queryInfo.currentPage = 1
		})
})

// 页面初始化
const init = () => {
		tableData.length = 0
		getAllUserData({page: queryInfo.currentPage}).then(res => {
				res.data.map(item => {
						tableData.push(item)
				})
				// total.value = res.data.length
		})
}
let editStaffShow = ref(false)
let addStaffShow = ref(false)
let editData = reactive({})

// 编辑
const handleEditStaff = (e) => {
		editData = {...e}
		console.log(e, 111)
		console.log(editData, 'editData')
		editStaffShow.value = true
}
const uId = ref('')
// 删除
const handleDelete = (index) => {
		uId.value = index.uId
		console.log(index, uId.value)
}
// 确定删除
const confirmDelete = () => {
		deleteUsers({uId: uId.value}).then(res => {
				console.log(res)
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
		editStaffShow.value = false
		addStaffShow.value = false
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