<template>
		<div class="topContent">
				<div class="newlyAdded">
						<div class="topTitle"><span>角色管理</span></div>
						<el-button type="primary" @click="newlyAdded">添加角色</el-button>
				</div>
		</div>
		<div class="content">
				<el-table
						:data="tableData.slice((queryInfo.currentPage-1)*queryInfo.pageSize,queryInfo.currentPage*queryInfo.pageSize)"
						style="width: 100%">
						<el-table-column label="序号" width="140">
								<template #default="scope">
										<div style="display: flex; align-items: center">
												<span style="margin-left: 10px">{{ scope.row.rId }}</span>
										</div>
								</template>
						</el-table-column>
						<el-table-column label="角色" width="180">
								<template #default="scope">
										<span>{{ scope.row.rName }}</span>
								</template>
						</el-table-column>
						<el-table-column label="权限" width="180">
								<template #default="scope">
										<span>{{ scope.row.rPower }}</span>
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
		<editRole v-show="editRolesShow" :currentPage="queryInfo.currentPage" :editData="editData"
		          @handleClick="createClose"/>
		<addRole v-show="addRolesShow" :currentPage="queryInfo.currentPage" @handleCancel="createClose"
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
import editRole from './editRole/index'
import addRole from './addRole/index'
import {onMounted, onUpdated, reactive, ref} from 'vue'
import {InfoFilled} from '@element-plus/icons-vue'
import {getAllRoles, deleteRoles} from '@/api/roles'
import {getAllMenuItems} from '@/api/nav/nav.js'
import {getAllUserData} from '@/api/user/login'
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
		pageSize: 10  // 每页显示条数
})

const disabled = ref(false)
//  size-change 事件，分页组件选择每一页显示数据量时，触发该事件
const handleSizeChange = (val) => {
		queryInfo.pageSize = val
}
// current-change 事件，分页组件的页码值发生切换时，触发该事件
const handleCurrentChange = (pageNum) => {
		queryInfo.currentPage = pageNum
}
const empty = ref(false)
const nextPage = ref(0)

const power = reactive([])

onMounted(() => {
		getAllMenuItems().then(resData => {
				resData.data.map(item => {
						power.push(item.nName)
				})
		})
		getAllRoles().then(res => {
				res.data.map(item => {
						tableData.push(item)
				})
				queryInfo.currentPage = 1
		})
})

// 页面初始化
const init = () => {
		tableData.length = 0
		// window.location.reload()
		getAllRoles().then(res => {
				res.data.map(item => {
						tableData.push(item)
				})
				total.value = res.data.length
		})
}
let editRolesShow = ref(false)
let addRolesShow = ref(false)
let editData = reactive({})

// 编辑
const handleEditStaff = (e) => {
		editData = {...e}
		editRolesShow.value = true
}
const rId = ref('')
// 删除
const handleDelete = (index) => {
		rId.value = index.rId
}
// 确定删除
const confirmDelete = () => {
		deleteRoles({rId: rId.value}).then(res => {
				init()
		})
}
// 关闭模态框
const createClose = () => {
		editData = {}
		init()
		editRolesShow.value = false
		addRolesShow.value = false
}
// 新增
const newlyAdded = () => {
		addRolesShow.value = !addRolesShow.value
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