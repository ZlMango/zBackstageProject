<template>
		<div class="topContent">
				<div class="newlyAdded">
						<div class="topTitle"><span>子公司管理</span></div>
						<el-button type="primary" @click="newlyAdded">添加子公司</el-button>
				</div>
		</div>
		<div class="content">
				<el-table :data="tableData" style="width: 100%">
						<el-table-column label="序号" width="100">
								<template #default="scope">
										<div style="display: flex; align-items: center;">
												<span style="margin-left: 10px">{{ scope.row.scId }}</span>
										</div>
								</template>
						</el-table-column>
						<el-table-column label="公司名称" align="center" width="240">
								<template #default="scope">
										<span>{{ scope.row.scName }}</span>
								</template>
						</el-table-column>
						<el-table-column label="公司负责人" align="center" width="140">
								<template #default="scope">
										<span>{{ scope.row.scMan }}</span>
								</template>
						</el-table-column>
						<el-table-column label="负责人电话" align="center" width="180">
								<template #default="scope">
										<span>{{ scope.row.scTel }}</span>
								</template>
						</el-table-column>
						<el-table-column label="公司管理员" align="center" width="150">
								<template #default="scope">
										<span>{{ scope.row.uName }}</span>
								</template>
						</el-table-column>
						<el-table-column label="公司Logo" align="center" width="220">
								<template #default="scope">
										<img class="logo" :src="'http://localhost:9999/api/upload/'+scope.row.scLogo"
										     @click="goTo(scope.row.scWebUrl)" alt="">
								</template>
						</el-table-column>
						<el-table-column label="操作" width="360" align="center" fixed="right">
								<template #default="scope">
										<div class="operation">
												<el-button size="small" @click="handleEditStaff(scope.row)">
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
												<el-button size="small" type="primary" @click="increaseProduct(scope.row)">
														<el-icon>
																<CirclePlus/>
														</el-icon>
														添加产品
												</el-button>
												<el-button size="small" type="primary" @click="ProductList(scope.row.scId)">
														<el-icon>
																<View/>
														</el-icon>
														查看产品
												</el-button>
										</div>
								</template>
						</el-table-column>
				</el-table>
				<el-empty v-if="empty" description="description"/>
		</div>
		<editSubsidiary v-show="editStaffShow" :currentPage="currentPage" :editData="editData" @handleCancel="handleCancel"
		                @handleClick="createClose"/>
		<addSubsidiary v-show="addStaffShow" :currentPage="currentPage" @handleCancel="handleCancel"
		               @handleClick="createClose"/>
		<addProduct v-show="addProductShow" @handleClick="createClose" @handleCancel="handleCancel" :addScId="addScId"/>
</template>
<script setup>
import editSubsidiary from './editSubsidiary/index'
import addSubsidiary from './addSubsidiary/index'
import addProduct from './ProductManagement/addProduct/index'
import {onMounted, onUpdated, reactive, ref} from 'vue'
import {InfoFilled, Edit, Delete, CirclePlus, View} from '@element-plus/icons-vue'
import {getAllUserData, deleteUsers} from '@/api/user/login'
import {getAllSC, delSC} from '@/api/sonCom'
import {useRouter} from 'vue-router'

const router = useRouter()
// 用户数据列表
const tableData = reactive([])
// 数据总条数
const total = ref(0)
const currentPage = ref(1)
const pageSize = ref(10)
const disabled = ref(false)
const addProductShow = ref(false)
//  size-change 事件，分页组件选择每一页显示数据量时，触发该事件
const handleSizeChange = (val) => {
		console.log(val)
		console.log(`${val} items per page`)
}
// current-change 事件，分页组件的页码值发生切换时，触发该事件
const handleCurrentChange = (val) => {
		console.log(`current page: ${val}`)
}
const empty = ref(false)

const nextPage = ref(0)
onMounted(() => {
		getAllSC().then(res => {
				res.data.map(item => {
						tableData.push(item)
				})
				console.log(res)
				total.value = res.data.length
		})
})

const goTo = (scWebUrl) => {
		
		console.log(scWebUrl)
		window.location.href = scWebUrl;
}

// 页面初始化
const init = () => {
		tableData.length = 0
		getAllSC().then(res => {
				res.data.map(item => {
						tableData.push(item)
				})
				console.log(res)
				total.value = res.data.length
		})
		editStaffShow.value = false
		addStaffShow.value = false
		addProductShow.value = false
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
const scId = ref('')
// 删除
const handleDelete = (index) => {
		scId.value = index.scId
		console.log(index, scId.value)
}
// 确定删除
const confirmDelete = () => {
		delSC({scId: scId.value}).then(res => {
				console.log(res)
				init()
		})
}
//
const handleCancel = () => {
		editStaffShow.value = false
		addStaffShow.value = false
		addProductShow.value = false
}
// 关闭模态框
const createClose = () => {
		editData = {}
		init()
}
// 新增
const newlyAdded = () => {
		addStaffShow.value = !addStaffShow.value
}
const addScId = ref('')
// 添加产品
const increaseProduct = (index) => {
		console.log(index)
		addScId.value = index
		addProductShow.value = true
}
// 查看产品列表
const ProductList = (scId) => {
		console.log(scId, 'scId')
		localStorage.setItem('scId', scId)
		router.replace('/ProductManagement')
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
		max-height: 110vh;
		height: auto;
		background: white;
		/*overflow:scroll;*/
		/*overflow:hidden;*/
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

.logo {
		width: 10rem;
		height: auto;
}

.operation {
		display: flex;
		justify-content: space-around;
}
</style>