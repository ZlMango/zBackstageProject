<template>
		<div>
				<div class="topBarBackground">
						<div class="homePage">
								<div><img class="imageStyle" src="../../../assets/shanx.gif" alt=""></div>
								<p class="company">西安市水务局后台管理系统</p>
								<div class="avatar">
										<div class="headPortrait">
												<el-avatar
														@click="avatar"
														:src="imageSrc"
												/>
										</div>
										<div class="SwitchButton">
												<p class="admin">{{ uName }}</p>
												<div>
														<el-popconfirm
																title="确定退出登录吗?"
																confirm-button-text="确定"
																cancel-button-text="取消"
																confirm-button-type="danger"
																@confirm="confirm"
																@cancel="cancel"
														>
																<template #reference>
																		<el-icon class="Icon">
																				<SwitchButton/>
																		</el-icon>
																</template>
														</el-popconfirm>
												</div>
										</div>
								</div>
						</div>
				</div>
		</div>
		<div v-show="avatarShow" @click="avatar" class="avatarImg">
				<div>
						<el-image @click:stop="modify" class="image" :src="imageSrc"/>
						<el-upload
								v-model:file-list="fileList"
								action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
								list-type="picture-card"
								:on-preview="handlePictureCardPreview"
								:on-remove="handleRemove"
						>
								<el-icon>
										<Plus/>
								</el-icon>
						</el-upload>
				</div>
		</div>
</template>

<script setup>
import {SwitchButton} from '@element-plus/icons-vue'
import {useRouter} from 'vue-router'
import {ElMessage} from 'element-plus'
import {ref,onMounted} from 'vue'
import {getOneUsers} from '@/api/user/login'
const router = useRouter()
const avatarShow = ref(false)
const uName = ref('')
const imageSrc = ref('https://img0.baidu.com/it/u=561032217,3372486445&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500')
onMounted(() => {
		getOneUsers({uId:localStorage.getItem('uId')}).then(res => {
				uName.value = res.data.uName
		})
})
const logOutMessage = () => {
		ElMessage({
				message: '您已退出登录',
				type: 'info',
		})
}
const confirm = () => {
		window.localStorage.removeItem('res');
		window.localStorage.removeItem('uId');
		window.localStorage.removeItem('defaultActive');
		window.localStorage.removeItem('powerData');
		window.localStorage.removeItem('FinalAuthority');
		logOutMessage()
		setTimeout(() => {
				router.replace('/')
		}, 1000)
}
const modify = () => {

}
const avatar = () => {
		avatarShow.value = !avatarShow.value
}
const cancel = () => {

}

import {Plus} from '@element-plus/icons-vue'

const fileList = ref([
		{
				name: 'food.jpeg',
				url: 'https://img0.baidu.com/it/u=561032217,3372486445&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
		},
])

const dialogImageUrl = ref('')
const dialogVisible = ref(false)

const handleRemove = (uploadFile, uploadFiles) => {

}

const handlePictureCardPreview = (uploadFile) => {
		dialogImageUrl.value = uploadFile.url
		dialogVisible.value = true
}
</script>

<style scoped>
.admin {
		color: black;
		z-index: 100;
		font-size: 1.2rem;
		font-weight: bold;
}

.topBarBackground {
		width: 100%;
		height: 6.5rem;
		background: white;
		box-shadow: 0 3px 4px 1px #d3d7d4;
}

.homePage {
		display: flex;
		justify-content: space-between;
}

.SwitchButton {
		display: flex;
		margin-right: 2em;
		justify-content: center;
		align-items: center;
}

.headPortrait {
		display: flex;
		justify-content: center;
		align-items: center;
		margin-right: 1em;
}

.headPortrait:hover {
		cursor: pointer;
}

.SwitchButton > div {
		margin: 0 0.1em;
		color: #fffcff;
}

.Icon {
		margin-top: 0.3em;
		color: black;
		font-weight: bold;
}

.Icon:hover {
		cursor: pointer;
}

.avatarImg {
		width: 100%;
		height: 47.4em;
		background: rgba(0, 0, 0, 0.1);
		position: absolute;
		left: 0;
		top: 0;
		z-index: 10;
		display: flex;
		justify-content: center;
		align-items: center;
}

.avatarImg > div {
		display: flex;
}

.image {
		width: 40em;
		height: auto;
}

.imageStyle {
		width: 14em;
		/*border: 1px solid darkred;*/
		margin-left: 1.2em;
}

.company {
		font-size: 2em;
		color: #2c3e50;
		font-weight: bold;
		/*border: 1px solid darkblue;*/
		line-height: 3rem;
}

.avatar {
		display: flex;
		margin-top: -16px;
}
</style>