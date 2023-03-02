<template>
		<div class="mask">
				<div class="ModalBox">
						<div class="edit">编辑会议室</div>
						<el-form
								label-width="100px"
								:model="tableData"
								style="max-width: 100%"
						>
								<el-form-item label="会议室门牌号">
										<el-input class="input" v-model="tableData.oNum"/>
								</el-form-item>
								<el-form-item label="会议室名称">
										<el-input class="input" v-model="tableData.oName"/>
								</el-form-item>
								<el-form-item label="会议室电话">
										<el-input class="input" v-model="tableData.oTel"/>
								</el-form-item>
								<el-form-item label="会议室描述">
										<el-input class="input" v-model="tableData.oInfo"/>
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
import {updateOffice} from '@/api/office'

const props = defineProps(['currentPage', 'editData'])
const currentPage = ref(1)
const emit = defineEmits(['handleClick', 'handleCancel'])
let tableData = reactive({
		oId: 0,
		oNum: '',
		oName: '',
		oTel: '',
		oInfo: ''
})
const init = () => {
		window.location.reload()
		getAllUserData({page: currentPage.value}).then(() => {
		})
}
onUpdated(() => {
		tableData.oNum = props.editData.oNum
		tableData.oName = props.editData.oName
		tableData.oTel = props.editData.oTel
		tableData.oInfo = props.editData.oInfo
		tableData.oId = props.editData.oId
		currentPage.value = props.currentPage
})

// 确定编辑
const handleClick = () => {
		console.log(tableData, 'tableData')
		updateOffice({
				oId: tableData.oId,
				oNum: tableData.oNum,
				oName: tableData.oName,
				oTel: tableData.oTel,
				oInfo: tableData.oInfo
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