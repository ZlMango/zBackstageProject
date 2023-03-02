import request from '../../request/index'

// 获取子公司列表
export function getAllSC(){
	return request({
		url: 'sonCom/getAllSC.php',
		method: 'get'
	})
}

// 添加子公司
export function addSC(data){
	return request({
		url: 'sonCom/addSC.php',
		headers: {'Content-Type': 'multipart/form-data'},
		method: 'post',
		data
	})
}

// 删除子公司
export function delSC(params){
	return request({
		url: 'sonCom/delSC.php',
		method: 'get',
		params
	})
}

// 获取一条子公司的数据
export function getOneSC(params){
	return request({
		url: 'sonCom/getOneSC.php',
		method: 'get',
		params
	})
}


// 获取公司Logo图片
export function getPic(params){
	return request({
		url: 'sonCom/getPic.php',
		method: 'get',
		params
	})
}


// 修改子公司数据
export function updateSC(params,data){
	return request({
		url: 'sonCom/updateSC.php',
		method: 'post',
		params,
		data
	})
}