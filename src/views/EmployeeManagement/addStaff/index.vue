<template>
		<div class="mask">
				<div class="ModalBox">
						<div class="edit">添加员工</div>
						<el-form
								label-width="100px"
								:model="tableData"
								style="max-width: 100%"
						>
								<el-form-item label="用户名">
										<el-input class="input" v-model="tableData.uName"/>
								</el-form-item>
								<el-form-item label="密码">
										<el-input class="input" v-model="tableData.uPwd"/>
								</el-form-item>
								<el-form-item label="电话">
										<el-input class="input" v-model="tableData.uTel"/>
								</el-form-item>
								<el-form-item label="角色">
										<el-select v-model="rolesName" @change="changeName" class="m-2">
												<el-option
														v-for="(item,index) in rolesData"
														:key="index"
														:label="item.rName"
														:value="item.rId"
												/>
										</el-select>
								</el-form-item>
								<el-form-item label="部门">
										<el-select v-model="departmentName" @change="changeDeptName" class="m-2">
												<el-option
														v-for="(item,index) in departmentData"
														:key="index"
														:label="item.dName"
														:value="item.dId"
												/>
										</el-select>
								</el-form-item>
								<el-form-item label="添加权限">
										<div>
												<el-checkbox-group class="checked" v-model="checked" @change="changeChecked()" size="small">
														<el-checkbox class="checkedItem" v-for="(item,index) in MenuData" :key="index"
														             :label="item.nId" :checked="item.checked" size="large">
																{{ item.nName }}
														</el-checkbox>
												</el-checkbox-group>
										</div>
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
import {getAllMenuItems} from '@/api/nav/nav.js'
import {ElMessage} from 'element-plus'
import {AddUsers, getAllUserData} from '@/api/user/login'
import {getAllRoles} from '@/api/roles'
import {getAllDept, deleteDept} from '@/api/dept'

const props = defineProps(['currentPage'])
const currentPage = ref(1)
const emit = defineEmits(['handleClick', 'handleCancel'])
let tableData = reactive({
		uName: '',
		uPwd: '',
		uTel: '',
		uPower: '',
		rId: '1',
		dId: '1'
})

const rolesName = ref([])
const departmentName = ref([])
const rolesData = reactive([])
const departmentData = reactive([])
const checked = ref([])
let MenuData = ref([])
let menuItem = ref([])
const select = ref('')
onMounted(() => {
		getAllMenuItems().then(res => {
				MenuData.value = res.data
				res.data.map(item => {
						menuItem.value = item.nName
				})
		})
		getAllRoles().then(res => {
				res.data.map(item => {
						rolesData.push(item)
				})
		})
		getAllDept().then(res => {
				res.data.map(item => {
						departmentData.push(item)
				})
		})
		currentPage.value = props.currentPage
})
onUpdated(() => {
		if (tableData.uPower) {
				for (let i = 0; i < tableData.uPower.length; i++) {
						if (tableData.uPower[i] !== ',') {
								checked.value.push(tableData.uPower[i])
						}
				}
		} else {
				checked.value = []
		}
})
const changeName = (index) => {
		getAllRoles().then(res => {
				res.data.map(item => {
						if (item.rId === index) {
								tableData.uPower = item.rPower
						}
						rolesData.push(item)
				})
		})
		tableData.rId = index
}
const changeDeptName = (changeDept) => {
		
		tableData.dId = changeDept
}
const EmptyData = () => {
		ElMessage({
				message: '请填写完整数据',
				type: 'warning',
		})
}
const changeChecked = () => {
		tableData.rId = checked.value.toString()
}

// 添加
const handleClick = () => {
		if (tableData.uName === '' || tableData.uPwd === '' || tableData.uTel === '') {
				EmptyData()
		} else {
				AddUsers(tableData).then(res => {
						// init()
						emit('handleClick')
						tableData.uName = ''
						tableData.uPwd = ''
						tableData.uTel = ''
						tableData.rId = ''
						tableData.dId = ''
						tableData.uPower = ''
						checked.value = []
						rolesName.value = []
						departmentName.value = []
				})
		}
}

// 取消
const handleCancel = () => {
		tableData.uName = ''
		tableData.uPwd = ''
		tableData.uTel = ''
		tableData.rId = ''
		tableData.dId = ''
		tableData.uPower = ''
		checked.value = []
		rolesName.value = []
		departmentName.value = []
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

.menuItem {
		display: flex;
		justify-content: space-around;
		line-height: 30px;
		margin: 1.5em auto;
}

.input {
		width: 90%;
}

.inputGroup {
		width: 90%;
		height: auto;
		margin: 1em auto;
}

.determine {
		display: flex;
		justify-content: space-around;
}

.checked {
		display: flex;
		flex-wrap: wrap;
}

.checkedItem {
		width: 39%;
}
</style>