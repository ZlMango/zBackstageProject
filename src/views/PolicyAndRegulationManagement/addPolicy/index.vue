<template>
		<div class="mask">
				<div class="ModalBox">
						<div class="edit">添加政策</div>
						<el-form
								label-width="100px"
								:model="tableData"
								style="max-width: 100%"
						>
								<el-form-item label="文件标题">
										<el-input class="input" v-model="tableData.rTitle"/>
								</el-form-item>
								<el-form-item label="政策内容">
										<el-input class="input" type="textarea" v-model="tableData.rContent"/>
								</el-form-item>
								<el-form-item label="文件图片">
										<el-upload
												action="http://localhost:9999/api/sonCom/getPic.php"
												:before-upload="beforeAvatarUpload"
												:on-success="handleAvatarSuccess"
												v-model:file-list="imgData"
												:handleRemove="removeImage"
												list-type="picture"
										>
												<!--												<el-button type="primary">选择图片</el-button>-->
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
import {ref, onMounted, onUpdated, inject, reactive, watch} from 'vue'
import {addMenuItem} from '@/api/nav/nav'
import {getAllMenuItems} from '@/api/nav/nav.js'
import {ElMessage} from 'element-plus'
import {AddUsers, getAllUserData} from '@/api/user/login'
import {addOffice} from '@/api/office'
import {addRegu} from '@/api/regu'
import {Plus} from '@element-plus/icons-vue'
import FormData from 'form-data'

const props = defineProps(['currentPage'])
const currentPage = ref(1)
const emit = defineEmits(['handleClick', 'handleCancel'])
let tableData = reactive({
		rTitle: '',
		rContent: '',
		rImg: ''
})
const uploadRef = ref('')
let imgFile = ref('')
const imageUrl = ref('')
const imgData = ref([])
let date = new Date();
let year = date.getFullYear();
let dateArr = [
		date.getMonth() + 1,
		date.getDate(),
		date.getHours(),
		date.getMinutes(),
		date.getSeconds(),
];
const getDate = () => {
		// tableData.rDate = year + "/" + dateArr[0] + "/" + dateArr[1] + " " + dateArr[2] + ":" + dateArr[3] + ":" + dateArr[4]
}
onUpdated(() => {
		getDate()
})
onMounted(() => {
		currentPage.value = props.currentPage
})
// 上传文件之前的钩子，参数为上传的文件， 若返回false或者返回 Promise 且被 reject，则停止上传
const beforeAvatarUpload = (rawFile) => {
		imgFile.value = rawFile
		tableData.rImg = rawFile
		console.log(rawFile, '上传文件之前的钩子')
		return true
}
// 文件上传成功的钩子
const handleAvatarSuccess = (response, uploadFile) => {
		console.log(uploadFile, '文件上传成功的钩子')
		imageUrl.value = URL.createObjectURL(uploadFile.raw)
}
// 文件列表移除文件时的钩子
const removeImage = (file, rawFile) => {
		console.log(file, '文件列表移除文件时的钩子')
		URL.revokeObjectURL(imageUrl.value)
}
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
		if (tableData.rTitle === '' || tableData.rContent === '' || tableData.rImg === '') {
				EmptyData()
		} else {
				console.log(currentPage.value)
				let FormData = require("form-data"); //导入上传控件
				const fd = new FormData()
				fd.append('rImg', tableData.rImg)
				fd.append('rTitle', tableData.rTitle)
				fd.append('rContent', tableData.rContent)
				addRegu(fd).then(res => {
						console.log(res)
						emit('handleClick')
						tableData.rTitle = ''
						tableData.rContent = ''
						tableData.rImg = ''
						imageUrl.value = ''
				})
		}
}
// 取消
const handleCancel = () => {
		tableData.rTitle = ''
		tableData.rContent = ''
		tableData.rImg = ''
		// tableData.rDate = ''
		if (tableData.rDate === '') {
				getDate()
		}
		imageUrl.value = ''
		emit('handleCancel')
		
}
</script>

<style scoped>
.edit {
		font-size: 1.5em;
		margin: 1.3em;
}

.avatar {
		width: 150px;
		height: auto;
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