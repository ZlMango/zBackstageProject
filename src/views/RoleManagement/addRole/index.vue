<template>
		<div class="mask">
				<div class="ModalBox">
						<div class="edit">添加角色</div>
						<el-form
								label-width="100px"
								:model="MenuData"
								style="max-width: 100%"
						>
								<el-form-item label="角色">
										<el-input class="input" v-model="tableData.rName"/>
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
										<el-button @click="$emit('handleCancel')">取消</el-button>
								</div>
						</el-form>
				</div>
		</div>
</template>

<script setup>
import {ref, onMounted, onUpdated, inject, reactive, watch} from 'vue'
import {getAllRoles, addRoles} from '@/api/roles'
import {getAllMenuItems, deleteMenuItem} from '@/api/nav/nav.js'
import {ElMessage} from 'element-plus'

const props = defineProps(['currentPage'])
const currentPage = ref(1)
const emit = defineEmits(['handleClick', 'handleCancel'])
let tableData = reactive({
		rName: '',
		rPower: ''
})
const checked = ref([])

let MenuData = ref([])
const checked1 = ref(false)
let menuItem = ref([])
onMounted(() => {
		getAllMenuItems().then(res => {
				MenuData.value = res.data
				res.data.map(item => {
						checked1.value = item.nId
						menuItem.value = item.nName
				})
		})
		currentPage.value = props.currentPage
})

const EmptyData = () => {
		ElMessage({
				message: '请填写完整数据',
				type: 'warning',
		})
}


const changeChecked = () => {
		console.log(checked.value)
		tableData.rPower = checked.value.toString()
		console.log(tableData.rPower)
}

// 添加
const handleClick = () => {
		console.log(tableData)
		if (tableData.rName === '') {
				EmptyData()
		} else {
				console.log(currentPage.value)
				addRoles(tableData).then(res => {
						console.log(res)
						emit('handleClick')
						tableData.rName = ''
						checked.value = []
				})
		}
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