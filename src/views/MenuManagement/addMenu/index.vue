<template>
		<div class="mask">
				<div class="ModalBox">
						<div class="edit">添加菜单</div>
						<el-form
								label-width="100px"
								:model="tableData"
								style="max-width: 100%"
						>
								<el-form-item label="菜单名称">
										<el-input class="input" v-model="tableData.nName"/>
								</el-form-item>
								<el-form-item label="菜单等级">
										<el-input disabled class="input" v-model="tableData.nLevel"/>
								</el-form-item>
								<el-form-item label="菜单路由">
										<el-input class="input" v-model="tableData.nUrl"/>
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

const emit = defineEmits(['handleClick', 'handleCancel'])
let tableData = reactive({
		nName: '',
		nLevel: 1,
		nUrl: ''
})
const EmptyData = () => {
		ElMessage({
				message: '请填写完整数据',
				type: 'warning',
		})
}
// 添加
const handleClick = () => {
		console.log(tableData)
		if (tableData.nName === '' || tableData.nUrl === '') {
				EmptyData()
		} else {
				addMenuItem(tableData).then(res => {
						console.log(res, 'res')
						emit('handleClick')
						tableData.nName = ''
						tableData.nUrl = ''
						window.location.reload()
				})
		}
}

// 取消
const handleCancel = () => {
		tableData.nName = ''
		tableData.nUrl = ''
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