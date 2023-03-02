<template>
		<div class="mask">
				<div class="ModalBox">
						<div class="edit">编辑菜单</div>
						<el-form
								label-width="100px"
								:model="tableData"
								style="max-width: 100%"
						>
								<el-form-item label="菜单名称">
										<el-input class="input" v-model="name"/>
								</el-form-item>
								<el-form-item label="菜单等级">
										<el-input class="input" v-model="level"/>
								</el-form-item>
								<el-form-item label="菜单路由">
										<el-input class="input" v-model="url"/>
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
import {ref, onMounted, onUpdated, inject, reactive, watch} from 'vue'
import {editMenuItem} from '@/api/nav/nav'
import {getAllMenuItems} from '@/api/nav/nav.js'

const emit = defineEmits(['handleClick', 'handleCancel'])
// 接收父组件传的表单值
const props = defineProps(['editMenuData'])
const id = ref('')
const name = ref('')
const level = ref('')
const url = ref('')
let tableData = reactive({})
const init = () => {
		window.location.reload()
		getAllMenuItems().then(res => {
				console.log(res)
		})
}
onUpdated(() => {
		id.value = props.editMenuData.id
		name.value = props.editMenuData.name
		level.value = props.editMenuData.level
		url.value = props.editMenuData.url
		tableData = {...props.editMenuData}
		console.log(tableData)
})


// 确定编辑
const handleClick = () => {
		editMenuItem({
				nId: id.value,
				nName: name.value,
				nLevel: level.value,
				nUrl: url.value
		}).then(res => {
				init()
				console.log(res, 'res')
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