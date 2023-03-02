<template>
		<div class="mask">
				<div class="ModalBox">
						<div class="edit">编辑员工</div>
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
										<el-select v-model="tableData.rId" @change="changeName" class="m-2">
												<el-option
														v-for="(item,index) in rolesData"
														:key="index"
														:label="item.rName"
														:value="item.rId"
												/>
										</el-select>
								</el-form-item>
								<el-form-item label="部门">
										<el-select v-model="tableData.dId" @change="changeDeptName" class="m-2">
												<el-option
														v-for="(item,index) in departmentData"
														:key="index"
														:label="item.dName"
														:value="item.dId"
												/>
										</el-select>
								</el-form-item>
								<el-form-item label="权限">
										<el-checkbox-group class="checked" v-model="checked" @change="changeChecked()" size="small">
												<el-checkbox class="checkedItem" v-for="(item,index) in MenuData" :key="index" :label="item.nId"
												             :checked="item.checked" size="large">
														{{ item.nName }}
												</el-checkbox>
										</el-checkbox-group>
								</el-form-item>
								<div class="determine">
										<el-button @click="handleClick" type="danger">修改</el-button>
										<el-button @click="handleCancel">取消</el-button>
								</div>
						</el-form>
				</div>
		</div>
</template>

<script setup>
import {ref, onMounted, onUpdated, reactive} from 'vue'
import {editUsers, getAllUserData} from '@/api/user/login'
import {getAllMenuItems} from '@/api/nav/nav.js'
import {getAllRoles} from '@/api/roles'
import {getAllDept} from '@/api/dept'

const props = defineProps(['currentPage', 'editData'])
const currentPage = ref(1)
const emit = defineEmits(['handleClick', 'handleCancel'])
let tableData = reactive({
		uId: '',
		uName: '',
		uPwd: '',
		uTel: '',
		uPower: '',
		rId: '',
		dId: ''
})
const checked = ref([])
let MenuData = ref([])
let menuItem = ref([])
const rolesName = ref([])
const departmentName = ref([])
const rolesData = reactive([])
const departmentData = reactive([])
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
				console.log(res)
		})
		getAllDept().then(res => {
				res.data.map(item => {
						departmentData.push(item)
				})
		})
})
onUpdated(() => {
		tableData.uId = props.editData.uId
		tableData.uName = props.editData.uName
		tableData.uPwd = props.editData.uPwd
		tableData.uTel = props.editData.uTel
		tableData.uPower = props.editData.uPower
		tableData.rId = props.editData.rId
		tableData.dId = props.editData.dId
		console.log(tableData.rId)
		console.log(tableData.dId)
		// getAllRoles().then(res => {
		// 		res.data.map(item => {
		// 				if (item.rId === props.editData.rId){
		// 						rolesName.value.push(item.rName)
		// 				}
		// 		})
		// })
		// getAllDept().then(res => {
		// 		res.data.map(item => {
		// 				if (item.dId === props.editData.dId){
		// 						departmentName.value.push(item.dName)
		// 				}
		// 		})
		// })
		currentPage.value = props.currentPage
		console.log(checked.value)
		console.log(tableData)
		if (tableData.uPower) {
				for (let i = 0; i < tableData.uPower.length; i++) {
						console.log(tableData.uPower[i])
						if (tableData.uPower[i] !== ',') {
								checked.value.push(tableData.uPower[i])
						}
				}
				console.log(checked.value)
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
				console.log(res)
		})
		tableData.rId = index
		// tableData.uPower = index
		// checked.value = index.split(',')
		console.log(index)
}
const changeDeptName = (changeDept) => {
		
		tableData.dId = changeDept
		console.log(changeDept)
}
const changeChecked = () => {
		console.log(checked.value)
		tableData.uPower = checked.value.toString()
		console.log(tableData.uPower)
}

// 确定编辑
const handleClick = () => {
		console.log(tableData, 'tableData')
		editUsers({
				uId: tableData.uId,
				uName: tableData.uName,
				uPwd: tableData.uPwd,
				uTel: tableData.uTel,
				uPower: tableData.uPower
		}).then(res => {
				emit('handleClick')
		})
}
// 取消
const handleCancel = () => {
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