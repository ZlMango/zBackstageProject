import request from '../../request/index.js'

// 获取所有文件
export function getAllRegu(){
	return request({
		url: 'regu/getAllRegu.php',
	})
}

// 添加文件
export function addRegu(data){
	return request({
		url: 'regu/addRegu.php',
		method: 'post',
		data
	})
}

// 修改文件
export function updateRegu(data){
	return request({
		url: 'regu/updateRegu.php',
		method: 'post',
		data
	})
}

// 删除文件
export function delRegu(params){
	return request({
		url: 'regu/delRegu.php',
		method: 'get',
		params
	})
}

// 获取一份文件
export function getOneRegu(params){
	return request({
		url: 'regu/getOneRegu.php',
		method: 'get',
		params
	})
}
