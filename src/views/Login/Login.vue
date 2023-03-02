<template>
		<div class="view-background">
				<div class="loginFont">
						<div class="logo"></div>
						<div class="login">融职教育科技有限公司后台管理系统</div>
				</div>
				<!--	用户登录		-->
				<div class="form-box" v-show="showLogin">
						<div class="company">
								<p>Login</p>
						</div>
						<el-form class="Form">
								<el-form-item class="form-item">
										<el-input
												v-model="accountNumber"
												:prefix-icon="User"
												clearable
												placeholder="account number"
										/>
								</el-form-item>
								<el-form-item type="password" class="form-item">
										<el-input
												v-model="password"
												show-password
												:prefix-icon="Lock"
												clearable
												placeholder="password"
										/>
								</el-form-item>
								<div class="submit">
										<el-button class="btn" type="primary" @click="onSubmit">登录</el-button>
										<el-button class="btn" type="success" @click="Register">注册</el-button>
								</div>
						</el-form>
				</div>
				
				<!--		用户注册		-->
				<div class="showRegisterForm" v-show="showRegister">
						<div class="company">
								<p>Register</p>
						</div>
						<el-form class="Form">
								<el-form-item class="form-item">
										<el-input
												v-model="usersRegister.uName"
												:prefix-icon="User"
												clearable
												placeholder="account number"
										/>
								</el-form-item>
								<el-form-item type="password" class="form-item">
										<el-input
												v-model="usersRegister.uPwd"
												show-password
												:prefix-icon="Lock"
												clearable
												placeholder="password"
										/>
								</el-form-item>
								<el-form-item type="password" class="form-item">
										<el-input
												v-model="usersRegister.uTel"
												:prefix-icon="Iphone"
												clearable
												placeholder="userTel"
										/>
								</el-form-item>
								<el-form-item>
										<div class="formSelect">
												<span class="power">添加权限</span>
												<el-checkbox-group class="checked" v-model="checked" @change="changeChecked()" size="small">
														<el-checkbox class="checkedItem" v-for="(item,index) in MenuData" :key="index"
														             :label="item.nId" :checked="item.checked" size="large">
																{{ item.nName }}
														</el-checkbox>
												</el-checkbox-group>
										</div>
								</el-form-item>
								<div class="submit">
										<el-button class="btn" type="primary" plain @click="goLogin">去登录</el-button>
										<el-button class="btn" type="success" plain @click="registerUser">完成注册</el-button>
								</div>
						</el-form>
				</div>
		</div>
</template>
<script setup>
import {reactive, ref, onUpdated, onMounted} from 'vue'
import {ElMessage} from 'element-plus'
import {Calendar, User, Hide, Lock, Iphone} from '@element-plus/icons-vue'
import {useRouter} from 'vue-router'
import {getAllMenuItems} from '@/api/nav/nav.js'
import {getAllRoles, deleteRoles} from '@/api/roles'
import {login, userRegister} from '@/api/user/login.js'

let showRegister = ref(false)
const showLogin = ref(true)
const router = useRouter()
const accountNumber = ref('')
const password = ref('')
// 用户注册表单信息
const usersRegister = reactive({
		uName: '',
		uPwd: '',
		uTel: '',
		rId: 1,
		uPower: ''
})
const checked = ref([])
const rolesData = reactive([])
let MenuData = ref([])
const checked1 = ref(false)
let menuItem = ref([])
const rId = ref(0)
let rolesId = ref({})
const uPower = ref('')
const rPower = ref('')
const powerData = ref([])
// 用户最终的权限
const FinalAuthority = ref('')
onMounted(() => {
		getAllMenuItems().then(res => {
				MenuData.value = res.data
				res.data.map(item => {
						checked1.value = item.nId
						menuItem.value = item.nName
				})
		})
		getAllRoles().then(res => {
				res.data.map(item => {
						rolesData.push(item)
				})
		})
})
const changeChecked = () => {
		console.log(checked.value)
		usersRegister.uPower = checked.value.toString()
		console.log(usersRegister.uPower)
}

onUpdated(() => {
		// window.location.reload()
})
const successMessage = () => {
		ElMessage({
				message: '正在登录...',
				type: 'success',
		})
}
const fillInAccountNumber = () => {
		ElMessage({
				message: '请填写用户名',
				type: 'warning',
		})
}
const accountNumberError = () => {
		ElMessage({
				message: '用户名或密码错误',
				type: 'warning',
		})
}
const accountNumberPasswordError = () => {
		ElMessage({
				message: '请填写完整用户信息',
				type: 'warning',
		})
}
const fillInPassWord = () => {
		ElMessage({
				message: '请填写密码',
				type: 'warning',
		})
}
const RegisterSuccess = () => {
		ElMessage({
				message: '注册成功，请登录',
				type: 'success',
		})
}

const RegisterFail = () => {
		ElMessage({
				message: '注册失败，请确认用户信息',
				type: 'warning',
		})
}
// 登录
const onSubmit = () => {
		if (accountNumber.value === '') {
				fillInAccountNumber()
		} else if (password.value === '') {
				fillInPassWord()
		} else {
				login({uName: accountNumber.value, uPwd: password.value}).then(res => {
						if (res.data === 2) {
								accountNumberError()
						} else {
								successMessage()
								rId.value = res.data.rId
								const uId = res.data.uId
								window.localStorage.setItem('uId', uId)
								console.log(res.data)
								uPower.value = res.data.uPower
								rolesId = rolesData.filter(item => item.rId === res.data.rId)
								rPower.value = rolesId[0].rPower + ',' + uPower.value
								let setPower = new Set(rPower.value.split('')); //数组a为可迭代对象,b此时为Set结构
								setPower = Array.from(setPower); //Set为可迭代对象,b此时为数组结构
								setPower.map(item => {
										if (item !== ',') {
												powerData.value.push(item)
										}
								})
								console.log(powerData._rawValue);
								FinalAuthority.value = powerData._rawValue.toString();
								console.log(FinalAuthority.value);
								localStorage.setItem('FinalAuthority', FinalAuthority.value)
								localStorage.setItem('powerData', JSON.stringify(powerData._rawValue))
								setTimeout(() => {
										router.replace('/EmployeeManagement')
										// 用户登录接口
								}, 2000)
						}
						rolesData.value = []
				})
		}
}

// 注册
const Register = () => {
		showRegister.value = !showRegister.value
		showLogin.value = !showLogin.value
}
// 去登录
const goLogin = () => {
		showRegister.value = !showRegister.value
		showLogin.value = !showLogin.value
}
// 注册用户
const registerUser = () => {
		if (usersRegister.uTel === '' || usersRegister.uName === '' || usersRegister.uPwd === '' || usersRegister.uPower === '') {
				accountNumberPasswordError()
		} else {
				userRegister(usersRegister).then(res => {
						console.log(res, 1111111)
						if (res.data === 1) {
								setTimeout(() => {
										RegisterSuccess()
										usersRegister.uName = ''
										usersRegister.uPwd = ''
										usersRegister.uTel = ''
										checked.value = []
								}, 1000)
						} else {
								RegisterFail()
						}
				})
		}
}
</script>

<style scoped>
.logo {
		width: 8em;
		height: 3em;
		/*border: 1px solid darkred;*/
		background-image: url('../../../src/assets/logo1.png');
		background-repeat: no-repeat;
		background-position: 50%;
		background-size: 100%;
}

.login {
		width: 20em;
		height: 3em;
		/*border: 1px solid darkred;*/
		line-height: 3em;
		font-weight: bold;
}

.view-background {
		display: flex;
		flex-direction: column;
		height: 100vh;
		overflow: auto;
		position: relative;
}

.form-box {
		width: 400px;
		height: auto;
		margin: 50px auto 0;
		padding-bottom: 2em;
		background-color: rgba(12, 34, 54, 0.1);
		border-radius: 0.5em;
}

.showRegisterForm {
		width: 400px;
		height: auto;
		padding-bottom: 2em;
		margin: 10px auto 0;
		background-color: rgba(12, 34, 54, 0.1);
		border-radius: 0.5em;
}

@media (min-width: 304px) {
		.view-background {
				background-image: url('../../../src/assets/background.png');
				background-repeat: no-repeat;
				background-size: 320%;
		}
}

.Form {
		width: 75%;
		margin: 2em auto auto;
}

.loginFont {
		margin: 50px auto 0;
		font-size: 2em;
		display: flex;
}

.submit {
		margin-top: 2em;
		display: flex;
		justify-content: space-between;
}

.company {
		width: 100%;
		height: 2em;
		line-height: 2em;
		font-size: 1.4em;
		font-weight: bold;
}

.btn {
		width: 10em;
}

.checked {
		display: flex;
		flex-wrap: wrap;
		
}

.checkedItem {
		width: 37%;
		color: white;
}

.power {
		display: flex;
		justify-content: flex-start;
		width: 200px;
		color: #009ad6;
}

.formSelect {
		display: flex;
}
</style>