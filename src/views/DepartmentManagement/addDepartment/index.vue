<template>
		<div class="mask">
				<div class="ModalBox">
						<div class="edit">添加部门</div>
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
										<el-button @click="handleClick" type="primary">添加</el-button>
										<el-button @click="handleCancel">取消</el-button>
								</div>
						</el-form>
				</div>
		</div>
</template>

<script setup>
import {ref, onMounted, onUpdated, inject, reactive, watch} from 'vue'
import {addDept} from '@/api/dept'
import {ElMessage} from 'element-plus'
import {AddUsers, getAllUserData} from '@/api/user/login'

const props = defineProps(['currentPage'])
const currentPage = ref(1)
const emit = defineEmits(['handleClick', 'handleCancel'])
let tableData = reactive({
		dName: '',
		dCount: '',
		dAddr: '',
		uId: 1
})
onMounted(() => {
		currentPage.value = props.currentPage
})

const EmptyData = () => {
		ElMessage({
				message: '请填写完整数据',
				type: 'warning',
		})
}
// 添加
const handleClick = () => {
		if (tableData.dName === '' || tableData.dCount === '' || tableData.dAddr === '') {
				EmptyData()
		} else {
				addDept(tableData).then(res => {
						tableData.dName = ''
						tableData.dCount = ''
						tableData.dAddr = ''
						emit('handleClick')
				})
		}
}
const handleCancel = () => {
		tableData.dName = ''
		tableData.dCount = ''
		tableData.dAddr = ''
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