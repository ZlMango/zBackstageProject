<template>
		<div class="mask">
				<div class="ModalBox">
						<div class="edit">编辑子公司</div>
						<el-form
								label-width="100px"
								:model="tableData"
								style="max-width: 100%"
						>
								<el-form-item label="公司名称">
										<el-input class="input" v-model="tableData.scName"/>
								</el-form-item>
								<el-form-item label="负责人">
										<el-input class="input" v-model="tableData.scMan"/>
								</el-form-item>
								<el-form-item label="负责人电话">
										<el-input class="input" v-model="tableData.scTel"/>
								</el-form-item>
								<el-form-item label="公司网址">
										<el-input class="input" v-model="tableData.scWebUrl"/>
								</el-form-item>
								<el-form-item label="公司管理员">
										<el-select v-model="tableData.uId" @change="changeName" :placeholder="placeholder" class="m-2">
												<el-option
														v-for="(item,index) in userData"
														:key="index"
														:label="item.uName"
														:value="item.uId"
												/>
										</el-select>
								</el-form-item>
								<el-form-item label="公司Logo">
										<el-upload
												action="http://localhost:9999/api/sonCom/getPic.php"
												:before-upload="beforeAvatarUpload"
												:on-success="handleAvatarSuccess"
												list-type="picture"
										>
												<!--<el-button type="primary">选择图片</el-button>-->
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
import {updateSC} from '@/api/sonCom'
import {Plus} from '@element-plus/icons-vue'
import FormData from 'form-data'

const props = defineProps(['currentPage', 'editData'])
const currentPage = ref(1)
const emit = defineEmits(['handleClick', 'handleCancel'])
const placeholder = ref('')
const queryInfo = reactive({
		query: '',   // 查询参数
		currentPage: 1,  // 当前页码
		pageSize: 10  // 每页显示条数
})
let tableData = reactive({
		scId: 0,
		scName: '',
		scMan: '',
		scTel: '',
		scWebUrl: '',
		file: '',
		uId: 0
})

const rolesName = reactive([])
const userData = reactive([])
let imgFile = ref('')
const imageUrl = ref('')
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
onUpdated(() => {
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
		tableData.scId = props.editData.scId
		imageUrl.value = 'http://localhost:9999/api/upload/' + props.editData.scLogo
		tableData.scName = props.editData.scName
		tableData.scMan = props.editData.scMan
		tableData.scTel = props.editData.scTel
		tableData.scWebUrl = props.editData.scWebUrl
		tableData.uId = props.editData.uId
		currentPage.value = props.currentPage
})
const changeName = (index) => {
		tableData.uId = index
		console.log(index)
}
// 确定编辑
const handleClick = () => {
		let FormData = require("form-data"); //导入上传控件
		const fd = new FormData() // 声明formData数据类型
		fd.append('uId', tableData.uId)
		fd.append('scName', tableData.scName)
		fd.append('scMan', tableData.scMan)
		fd.append('scTel', tableData.scTel)
		fd.append('scWebUrl', tableData.scWebUrl)
		console.log(props.editData.scLogo)
		if (imgFile.value !== props.editData.scLogo) {
				fd.append('file', imgFile.value)
		} else {
				fd.append('file', props.editData.scLogo)
		}
		console.log(tableData, 'tableData')
		updateSC({scId: tableData.scId}, fd).then(res => {
				console.log(res, 1111111111)
				if (res.data === 1) {
						emit('handleClick')
				}
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
		width: 50%;
		height: auto;
		padding-bottom: 1em;
		background: white;
		margin: auto;
		border-radius: 1rem;
}

.input {
		width: 90%;
}

.determine {
		display: flex;
		justify-content: space-around;
}

.avatar {
		width: 150px;
		height: auto;
}
</style>