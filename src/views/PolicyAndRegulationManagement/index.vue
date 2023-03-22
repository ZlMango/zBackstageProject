<template>
		<div class="topContent">
				<div class="newlyAdded">
						<div class="topTitle"><span>政策法规管理</span></div>
						<el-button type="primary" @click="newlyAdded">添加文件</el-button>
				</div>
		</div>
		<div></div>
		<div class="content">
				<el-table :data="tableData.slice((queryInfo.pageNum-1)*queryInfo.pageSize,queryInfo.pageNum*queryInfo.pageSize)"
				          style="width: 100%">
						<el-table-column label="序号" width="80">
								<template #default="scope">
										<div>
												<span style="margin-left: 10px">{{ scope.row.rId }}</span>
										</div>
								</template>
						</el-table-column>
						<el-table-column label="文件标头" width="200" align="center">
								<template #default="scope">
										<span>{{ scope.row.rTitle }}</span>
								</template>
						</el-table-column>
						<el-table-column label="文件上传时间" width="200" align="center">
								<template #default="scope">
										<span>{{ scope.row.rDate }}</span>
								</template>
						</el-table-column>
						<el-table-column label="文件主要内容" width="240" align="center">
								<template #default="scope">
										<div class="rContent">{{ scope.row.rContent }}</div>
								</template>
						</el-table-column>
						<el-table-column label="文件缩略图" width="300" align="center">
								<template #default="scope">
										<img class="contentImg" :src="'http://localhost:9999/api/upload/policy/'+scope.row.rImg" alt="">
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
		<editPolicy v-show="editPolicyShow" :currentPage="currentPage" :editData="editData" @handleCancel="handleCancel"
		            @handleClick="createClose"/>
		<addPolicy v-show="addPolicyShow" :currentPage="currentPage" @handleCancel="handleCancel"
		           @handleClick="createClose"/>
		<div class="pagination">
				<el-pagination
						:current-page="queryInfo.pageNum"
						:page-size="queryInfo.pageSize"
						:page-sizes="[2, 5, 10, 20]"
						:disabled="disabled"
						layout="total, sizes, prev, pager, next, jumper"
						:total="tableData.length"
						@size-change="handleSizeChange"
						@current-change="handleCurrentChange"
				/>
		</div>
</template>
<script setup>
import editPolicy from './editPolicy/index'
import addPolicy from './addPolicy/index'
import {onMounted, onUpdated, reactive, ref} from 'vue'
import {InfoFilled, Edit, Delete, CirclePlus, Document} from '@element-plus/icons-vue'
import {getAllUserData, deleteUsers} from '@/api/user/login'
import {getAllOffice, delOffice} from '@/api/office'
import {getAllRegu, delRegu} from '@/api/regu'
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
		pageSize: 2  // 每页显示条数
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
		getAllRegu().then(res => {
				res.data.map(item => {
						tableData.push(item)
				})
				queryInfo.pageNum = 1
		})
}
let editPolicyShow = ref(false)
let addPolicyShow = ref(false)
let editData = reactive({})

// 编辑
const handleEditStaff = (e) => {
		editData = {...e}
		editPolicyShow.value = true
}
const rId = ref('')
// 删除
const handleDelete = (index) => {
		rId.value = index.rId
}
// 确定删除
const confirmDelete = () => {
		delRegu({rId: rId.value}).then(res => {
				init()
		})
}
// 关闭模态框
const createClose = () => {
		editData = {}
		init()
		editPolicyShow.value = false
		addPolicyShow.value = false
}
// 新增
const newlyAdded = () => {
		addPolicyShow.value = !addPolicyShow.value
}
const handleCancel = () => {
		addPolicyShow.value = false
		editPolicyShow.value = false
}
</script>

<style scoped>
.contentImg {
		width: 10rem;
		height: auto;
}

.rContent {
		height: 10rem;
		overflow-y: scroll;
		line-height: 10rem;
}

.rContent::-webkit-scrollbar {
		/*隐藏滚动条*/
		display: none;
}

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