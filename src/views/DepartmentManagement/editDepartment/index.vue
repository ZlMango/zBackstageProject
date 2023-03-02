<template>
		<div class="mask">
				<div class="ModalBox">
						<div class="edit">编辑部门</div>
						<el-form
								label-width="100px"
								:model="tableData"
								style="max-width: 100%"
						>
								<el-form-item label="部门名称">
										<el-input class="input" v-model="tableData.dName"/>
								</el-form-item>
								<el-form-item label="部门人数">
										<el-input class="input" v-model="tableData.dCount"/>
								</el-form-item>
								<el-form-item label="部门门牌号">
										<el-input class="input" v-model="tableData.dAddr"/>
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
import {editDept} from '@/api/dept'

const props = defineProps(['currentPage', 'editData'])
const currentPage = ref(1)
const emit = defineEmits(['handleClick', 'handleCancel'])
let tableData = reactive({
		dName: '',
		dCount: '',
		dAddr: '',
		dId: '',
		uId: 1
})

onUpdated(() => {
		tableData.dId = props.editData.dId
		tableData.uId = props.editData.uId
		tableData.dName = props.editData.dName
		tableData.dCount = props.editData.dCount
		tableData.dAddr = props.editData.dAddr
		currentPage.value = props.currentPage
})

// 确定编辑
const handleClick = () => {
		console.log(tableData, 'tableData')
		editDept({
				dId: tableData.dId,
				dName: tableData.dName,
				dCount: tableData.dCount,
				dAddr: tableData.dAddr,
				uId: tableData.uId
		}).then(res => {
				emit('handleClick')
				console.log(res)
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
</style>