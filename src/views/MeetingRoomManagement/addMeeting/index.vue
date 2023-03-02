<template>
		<div class="mask">
				<div class="ModalBox">
						<div class="edit">添加会议室</div>
						<el-form
								label-width="100px"
								:model="tableData"
								style="max-width: 100%"
						>
								<el-form-item label="门牌号">
										<el-input class="input" v-model="tableData.oNum"/>
								</el-form-item>
								<el-form-item label="会议室名称">
										<el-input class="input" v-model="tableData.oName"/>
								</el-form-item>
								<el-form-item label="会议室电话">
										<el-input class="input" v-model="tableData.oTel"/>
								</el-form-item>
								<el-form-item label="会议室信息">
										<el-input class="input" v-model="tableData.oInfo"/>
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
import {addMenuItem} from '@/api/nav/nav'
import {getAllMenuItems} from '@/api/nav/nav.js'
import {ElMessage} from 'element-plus'
import {AddUsers, getAllUserData} from '@/api/user/login'
import {addOffice} from '@/api/office'

const props = defineProps(['currentPage'])
const currentPage = ref(1)
const emit = defineEmits(['handleClick', 'handleCancel'])
let tableData = reactive({
		oNum: '',
		oName: '',
		oTel: '',
		oInfo: ''
})
onMounted(() => {
		currentPage.value = props.currentPage
})
// 定义初始化方法
const init = () => {
		// 页面自动刷新
		window.location.reload()
		getAllUserData({page: currentPage.value}).then(res => {
				console.log(res)
		})
}
const EmptyData = () => {
		ElMessage({
				message: '请填写完整数据',
				type: 'warning',
		})
}
// 添加
const handleClick = () => {
		console.log(tableData)
		if (tableData.oNum === '' || tableData.oName === '' || tableData.oTel === '' || tableData.oInfo === '') {
				EmptyData()
		} else {
				console.log(currentPage.value)
				addOffice(tableData).then(res => {
						console.log(res)
						emit('handleClick')
						tableData.oNum = ''
						tableData.oName = ''
						tableData.oTel = ''
						tableData.oInfo = ''
				})
		}
}
// 取消
const handleCancel = () => {
		tableData.oNum = ''
		tableData.oName = ''
		tableData.oTel = ''
		tableData.oInfo = ''
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