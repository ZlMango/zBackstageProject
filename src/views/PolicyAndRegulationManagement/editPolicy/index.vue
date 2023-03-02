<template>
		<div class="mask">
				<div class="ModalBox">
						<div class="edit">编辑会议室</div>
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
import {Plus} from '@element-plus/icons-vue'
import {updateRegu} from '@/api/regu'
import FormData from 'form-data'

const props = defineProps(['currentPage', 'editData'])
const currentPage = ref(1)
const emit = defineEmits(['handleClick', 'handleCancel'])
let tableData = reactive({
		rId: '',
		rTitle: '',
		rContent: '',
		rImg: ''
})
const init = () => {
		window.location.reload()
		getAllUserData({page: currentPage.value}).then(() => {
		})
}
onUpdated(() => {
		tableData.rTitle = props.editData.rTitle
		tableData.rContent = props.editData.rContent
		tableData.rImg = props.editData.rImg
		tableData.rId = props.editData.rId
		currentPage.value = props.currentPage
		imageUrl.value = 'http://localhost:9999/api/upload/policy/' + props.editData.rImg
})
let imgFile = ref('')
const imageUrl = ref('')
const imgData = ref([])
// 上传文件之前的钩子，参数为上传的文件， 若返回false或者返回 Promise 且被 reject，则停止上传
const beforeAvatarUpload = (rawFile) => {
		imageUrl.value = rawFile
		tableData.rImg = rawFile
		console.log(rawFile, '上传文件之前的钩子')
		return true
}
// 文件上传成功的钩子
const handleAvatarSuccess = (response, uploadFile) => {
		console.log(uploadFile, '文件上传成功的钩子')
		imageUrl.value = URL.createObjectURL(uploadFile.raw)
}
// 确定编辑
const handleClick = () => {
		console.log(tableData, 'tableData')
		let FormData = require("form-data"); //导入上传控件
		const fd = new FormData()
		fd.append('rImg', tableData.rImg)
		fd.append('rId', tableData.rId)
		fd.append('rTitle', tableData.rTitle)
		fd.append('rContent', tableData.rContent)
		updateRegu(fd).then(res => {
				console.log(res)
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