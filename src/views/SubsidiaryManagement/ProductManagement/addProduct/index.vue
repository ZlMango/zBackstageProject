<template>
		<div class="mask">
				<div class="ModalBox">
						<div class="edit">添加{{ scName }}产品</div>
						<el-form
								label-width="100px"
								:model="tableData"
								style="max-width: 100%"
						>
								<el-form-item label="产品名称">
										<el-input class="input" v-model="tableData.pName"/>
								</el-form-item>
								<el-form-item label="产品规格">
										<el-input class="input" v-model="tableData.pFalg"/>
								</el-form-item>
								<el-form-item label="产品价格">
										<el-input class="input" v-model="tableData.pPrice"/>
								</el-form-item>
								<el-form-item label="产品信息">
										<el-input class="input" v-model="tableData.pInfo"/>
								</el-form-item>
								<el-form-item label="产品图片">
										<el-upload
												action="http://localhost:9999/api/sonCom/getPic.php"
												:before-upload="beforeAvatarUpload"
												:on-success="handleAvatarSuccess"
												v-model:file-list="imgData"
												list-type="picture"
										>
												<img v-if="imageUrl" :src="imageUrl" class="avatar" alt="点击上传"/>
												<el-icon v-else class="avatar-uploader-icon">
														<Plus/>
												</el-icon>
										</el-upload>
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
import {ref, onMounted, onUpdated, reactive} from 'vue'
import {ElMessage} from 'element-plus'
import {getAllUserData} from '@/api/user/login'
import {Plus} from '@element-plus/icons-vue'
import {addSC, getAllSC} from '@/api/sonCom'
import {addProduct, getAllProduct} from '@/api/scComProduct'
import axios from 'axios'

const props = defineProps(['addScId'])
const currentPage = ref(1)
const emit = defineEmits(['handleClick', 'handleCancel'])
const rolesName = ref([])
const userData = reactive([])
const imgData = ref([])
let tableData = reactive({
		pName: '',
		pFalg: '',
		file: '',
		pPrice: '',
		pInfo: '',
		scId: ''
})
let imgFile = ref('')
const scName = ref('')
const imageUrl = ref('')
const queryInfo = reactive({
		query: '',   // 查询参数
		currentPage: 1,  // 当前页码
		pageSize: 10  // 每页显示条数
})

// 点击文件列表中已上传的文件时的钩子
const handlePreview = (e) => {
		console.log(e, '点击文件列表中已上传的文件时的钩子')
}
// 文件列表移除文件时的钩子
const handleRemove = (e) => {
		console.log(e, '文件列表移除文件时的钩子')
}

// 上传文件之前的钩子，参数为上传的文件， 若返回false或者返回 Promise 且被 reject，则停止上传
const beforeAvatarUpload = (rawFile) => {
		imgFile.value = rawFile
		tableData.file = rawFile
		console.log(rawFile, '上传文件之前的钩子')
		return true
}
// 文件上传成功的钩子
const handleAvatarSuccess = (response, uploadFile) => {
		console.log(uploadFile, '文件上传成功的钩子')
		imageUrl.value = URL.createObjectURL(uploadFile.raw)
}
onMounted(() => {
		getAllUserData({page: queryInfo.currentPage}).then(res => {
				console.log(res.data, 'res.data')
				res.data.map(item => {
						if (res.data.length === 10) {
								getAllUserData({page: queryInfo.currentPage += 1}).then(data => {
										data.data.map(items => {
												userData.push(items)
										})
								})
						}
						userData.push(item)
				})
				currentPage.value = props.currentPage
		})
})
onUpdated(() => {
		if (props.addScId) {
				tableData.scId = props.addScId.scId
				scName.value = props.addScId.scName
				console.log(tableData.scId, 'tableData.scId')
		}
})
const EmptyData = () => {
		ElMessage({
				message: '请填写完整数据',
				type: 'warning',
		})
}
// 添加
const handleClick = (e) => {
		if (tableData.pName === '' || tableData.pFalg === '' || tableData.pPrice === '' || tableData.pInfo === '') {
				EmptyData()
		} else {
				console.log(currentPage.value)
				let url = "http://localhost:9999/api/sonCom/getPic.php"
				let FormData = require("form-data"); //导入上传控件
				const fd = new FormData() // 声明formData数据类型
				
				fd.append('pName', tableData.pName)
				fd.append('pFalg', tableData.pFalg)
				fd.append('pPrice', tableData.pPrice)
				fd.append('pInfo', tableData.pInfo)
				fd.append('scId', tableData.scId)
				fd.append('file', imgFile.value)
				console.log(tableData)
				console.log(imgFile.value)
				console.log(FormData)
				addProduct(fd).then((res) => {
						console.log(res)
						emit('handleClick')
						tableData.pName = ''
						tableData.pFalg = ''
						tableData.scId = ''
						tableData.pPrice = ''
						tableData.pInfo = ''
						imgFile.value = ''
						imageUrl.value = ''
						rolesName.value = []
				})
		}
}

const handleCancel = () => {
		tableData.pName = ''
		tableData.pFalg = ''
		tableData.scId = ''
		tableData.pPrice = ''
		tableData.pInfo = ''
		imgFile.value = ''
		imageUrl.value = ''
		rolesName.value = []
		emit('handleCancel')
}
</script>

<style scoped>
.avatar-uploader {
		width: 178px;
		height: 178px;
		display: block;
}

.avatar {
		width: 150px;
		height: auto;
}

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
		width: 50%;
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

.avatar-uploader .el-upload {
		border: 1px dashed var(--el-border-color);
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
		transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
		border-color: var(--el-color-primary);
}

.avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 150px;
		height: 150px;
		text-align: center;
}
</style>