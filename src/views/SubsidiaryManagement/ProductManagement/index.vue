<template>
		<div class="topContent">
				<div class="newlyAdded">
						<div class="topTitle"><span>产品管理</span></div>
						<el-button type="primary" @click="comeBack">返回子公司管理</el-button>
				</div>
		</div>
		<div class="content">
				<el-table :data="tableData" style="width: 100%">
						<el-table-column label="序号" align="center" width="140">
								<template #default="scope">
										<div style="display: flex; align-items: center; justify-content:center;">
												<span style="margin-left: 10px">{{ scope.row.pId }}</span>
										</div>
								</template>
						</el-table-column>
						<el-table-column label="产品名称" align="center" width="240">
								<template #default="scope">
										<span>{{ scope.row.pName }}</span>
								</template>
						</el-table-column>
						<el-table-column label="产品规格" align="center" width="180">
								<template #default="scope">
										<span>{{ scope.row.pFalg }}</span>
								</template>
						</el-table-column>
						<el-table-column label="产品价格" align="center" width="150">
								<template #default="scope">
										<span>{{ scope.row.pPrice }}</span>
								</template>
						</el-table-column>
						<el-table-column label="产品图片" align="center" width="260">
								<template #default="scope">
										<img class="logo" :src="'http://localhost:9999/api/upload/'+scope.row.pImg" alt="">
								</template>
						</el-table-column>
						<el-table-column label="产品信息" align="center" width="150">
								<template #default="scope">
										<span>{{ scope.row.pInfo }}</span>
								</template>
						</el-table-column>
						<el-table-column label="操作" width="220" align="center" fixed="right">
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
										</div>
								</template>
						</el-table-column>
				</el-table>
				<el-empty v-if="empty" description="description"/>
		</div>
		<editProduct v-show="editProductShow" :editData="editData" @handleClick="handleClick" @handleCancel="handleCancel"/>
</template>
<script setup>
import addProduct from './addProduct/index'
import editProduct from './editProduct/index'
import {onMounted, onUpdated, reactive, ref} from 'vue'
import {InfoFilled, Edit, Delete, CirclePlus} from '@element-plus/icons-vue'
import {getAllProduct} from '@/api/scComProduct'
import {getAllSC, delSC} from '@/api/sonCom'
import {useRouter} from 'vue-router'
import {delProduct} from '@/api/scComProduct'

const router = useRouter()
// 用户数据列表
const tableData = reactive([])
// 数据总条数
const total = ref(0)
const currentPage = ref(1)
const pageSize = ref(10)
const disabled = ref(false)
const addProductShow = ref(false)
const editProductShow = ref(false)

const scId = ref('')
scId.value = localStorage.getItem('scId')
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
		
		if (scId.value !== '') {
				getAllProduct({scId: scId.value}).then(res => {
						res.data.map(item => {
								tableData.push(item)
						})
						console.log(res)
						total.value = res.data.length
				})
		}
})
onUpdated(() => {
})
const goTo = (scWebUrl) => {
		
		console.log(scWebUrl)
		window.location.href = scWebUrl;
}

// 页面初始化
const init = () => {
		tableData.length = 0
		if (scId.value !== '') {
				getAllProduct({scId: scId.value}).then(res => {
						res.data.map(item => {
								tableData.push(item)
						})
						console.log(res)
						total.value = res.data.length
				})
		}
		editProductShow.value = false
}
let editData = reactive({})
// 编辑
const handleEditStaff = (e) => {
		editData = {...e}
		console.log(editData, 'editData')
		editProductShow.value = true
}

const pId = ref('')

// 删除
const handleDelete = (index) => {
		pId.value = index.pId
		console.log(index, pId.value)
}
// 确定删除
const confirmDelete = () => {
		delProduct({pId: pId.value}).then(res => {
				console.log(res)
				init()
		})
}
//
const handleCancel = () => {
		editProductShow.value = false
		addProductShow.value = false
}
// 关闭模态框
const handleClick = () => {
		editData = {}
		init()
}
// 返回
const comeBack = () => {
		router.replace('/SubsidiaryManagement')
}

// 添加产品
const increaseProduct = () => {
		addProductShow.value = true
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