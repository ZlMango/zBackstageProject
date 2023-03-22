<template>
		<div class="topContent">
				<div class="newlyAdded">
						<div class="topTitle"><span>菜单管理</span></div>
						<el-button type="primary" @click="newlyAdded">添加菜单</el-button>
				</div>
		</div>
		<div class="content">
				<el-table
						:data="tableData.slice((queryInfo.currentPage-1)*queryInfo.pageSize,queryInfo.currentPage*queryInfo.pageSize)"
						style="width: 100%">
						<el-table-column label="序号" width="100">
								<template #default="scope">
										<div style="display: flex; align-items: center">
												<span style="margin-left: 10px">{{ scope.row.nId }}</span>
										</div>
								</template>
						</el-table-column>
						<el-table-column label="菜单名称" width="180">
								<template #default="scope">
										<span>{{ scope.row.nName }}</span>
								</template>
						</el-table-column>
						<el-table-column label="菜单等级" width="180">
								<template #default="scope">
										<span>{{ scope.row.nLevel }}</span>
								</template>
						</el-table-column>
						<el-table-column label="菜单路由" width="260">
								<template #default="scope">
										<span>{{ scope.row.nUrl }}</span>
								</template>
						</el-table-column>
						<el-table-column label="操作">
								<template #default="scope">
										<el-button size="small" @click="handleEdit(scope.row)"
										>编辑
										</el-button
										>
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
		</div>
		<editMenu v-show="editShow" :editMenuData="editData" @handleCancel="handleCancel" @handleClick="createClose"/>
		<addMenu v-show="addShow" @handleCancel="handleCancel" @handleClick="createClose"/>
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
import editMenu from './editMenu/index'
import addMenu from './addMenu/index'
import {getAllMenuItems, deleteMenuItem} from '@/api/nav/nav.js'
import {ref, onUpdated, onMounted, reactive} from 'vue'
import {InfoFilled} from '@element-plus/icons-vue'
import {getAllUserData} from '@/api/user/login'

const tableData = reactive([])
const total = ref(1)
const currentPage4 = ref(1)
const pageSize4 = ref(10)
const queryInfo = reactive({
		query: '',   // 查询参数
		currentPage: 1,  // 当前页码
		pageSize: 10  // 每页显示条数
})
const disabled = ref(false)
const background = ref(false)
//  size-change 事件，分页组件选择每一页显示数据量时，触发该事件
const handleSizeChange = (val) => {
		queryInfo.pageSize = val
}
// current-change 事件，分页组件的页码值发生切换时，触发该事件
const handleCurrentChange = (pageNum) => {
		queryInfo.currentPage = pageNum
}
onMounted(() => {
		getAllMenuItems().then(res => {
				res.data.map(item => {
						if (res.data.length === 10) {
								getAllMenuItems().then(data => {
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
		// window.location.reload()
		getAllMenuItems().then(res => {
				res.data.map(item => {
						tableData.push(item)
				})
				window.localStorage.setItem('tableData', tableData)
				total.value = res.data.length
		})
}
let editShow = ref(false)
let addShow = ref(false)
let editData = {}

// 编辑
const handleEdit = (e) => {
		editData = {
				id: e.nId,
				name: e.nName,
				level: e.nLevel,
				url: e.nUrl,
		}
		editShow.value = !editShow.value
}
let nId = ref('')
// 删除
const handleDelete = (index) => {
		nId.value = index.nId
		window.location.reload()
}
// 确定删除
const confirmDelete = () => {
		deleteMenuItem({nId: nId.value}).then(res => {
				init()
		})
}
// 关闭模态框
const createClose = () => {
		editData = {}
		init()
		editShow.value = false
		addShow.value = false
}
// 新增菜单
const newlyAdded = () => {
		editShow.value = !editShow.value
		addShow.value = !addShow.value
}

// 取消
const handleCancel = () => {
		editShow.value = false
		addShow.value = false
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