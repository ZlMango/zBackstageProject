<template>
		<div class="mask">
				<div class="ModalBox">
						<div class="edit">编辑角色</div>
						<el-form
								label-width="100px"
								:model="tableData"
								style="max-width: 100%"
						>
								<el-form-item label="角色">
										<el-input class="input" v-model="tableData.rName"/>
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
										<el-button @click="$emit('handleClick')">取消</el-button>
								</div>
						</el-form>
				</div>
		</div>
</template>

<script setup>
import {ref, onMounted, onUpdated, reactive} from 'vue'
import {getAllRoles, editRoles} from '@/api/roles'
import {getAllMenuItems} from '@/api/nav/nav.js'

const props = defineProps(['currentPage', 'editData'])
const currentPage = ref(1)
const emit = defineEmits(['handleClick'])
let tableData = reactive({
		rId: '',
		rName: '',
		rPower: ''
})
const checked = ref([])
let MenuData = ref([])
let menuItem = ref([])
onMounted(() => {
		getAllMenuItems().then(res => {
				MenuData.value = res.data
				res.data.map(item => {
						menuItem.value = item.nName
				})
		})
})
onUpdated(() => {
		tableData.rId = props.editData.rId
		tableData.rName = props.editData.rName
		tableData.rPower = props.editData.rPower
		currentPage.value = props.currentPage
		if (tableData.rPower) {
				for (let i = 0; i < tableData.rPower.length; i++) {
						if (tableData.rPower[i] !== ',') {
								checked.value.push(tableData.rPower[i])
						}
				}
		} else {
				checked.value = []
		}
})
const changeChecked = () => {
		tableData.rPower = checked.value.toString()
}


// 确定编辑
const handleClick = () => {
		editRoles({rId: tableData.rId, rName: tableData.rName, rPower: tableData.rPower}).then(res => {
				emit('handleClick')
		})
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