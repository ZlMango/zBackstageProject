import request from '../../request/index.js'

// 获取所有会议室
export function getAllOffice(data){
	return request({
		url: 'office/getOffice.php',
		method: 'post',
		data
	})
}

// 添加会议室
export function addOffice(params){
	return request({
		url: 'office/addOffice.php',
		method: 'get',
		params
	})
}

// 更新会议室
export function updateOffice(params){
	return request({
		url: 'office/updateOffice.php',
		method: 'get',
		params
	})
}

// 删除会议室
export function delOffice(params){
	return request({
		url: 'office/delOffice.php',
		method: 'get',
		params
	})
}

// 获取所有申请会议室列表
export function getAllCheckOffice(){
	return request({
		url: 'office/getAllCheckOffice.php',
		method: 'get',
	})
}

// 申请会议室
export function checkOffice(params){
	return request({
		url: 'office/checkOffice.php',
		method: 'get',
		params
	})
}

//
export function getOneOffice(params){
	return request({
		url: 'office/getOneOffice.php',
		method: 'get',
		params
	})
}