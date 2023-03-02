import request from '../../request/index.js'


// 登录
export function login(data){
	return request({
		url: 'login.php',
		method: 'post',
		data
	})
}

// 用户注册
export function userRegister(params){
	return request({
		url: 'users/reg.php',
		params
	})
}


// 获取用户列表
export function getAllUserData(params){
	return request({
		url: 'users/getAllUsers.php',
		method: 'get',
		params
	})
}

// 添加用户
export function AddUsers(params){
	return request({
		url:'users/addUsers.php',
		params
	})
}

// 修改用户
export function editUsers(params){
	return request({
		url:'users/updateUsers.php',
		method: 'get',
		params
	})
}

// 删除用户
export function deleteUsers(params){
	return request({
		url:'users/delUsers.php',
		method: 'get',
		params
	})
}

export function getOneUsers(params){
	return request({
		url:'users/getOneUsers.php',
		method: 'get',
		headers: {'Content-Type': 'multipart/form-data'},
		params
	})
}


