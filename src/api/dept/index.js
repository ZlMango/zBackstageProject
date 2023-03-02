import request from '../../request/index'

// 获取所有部门
export function getAllDept(){
	return request({
		url: 'dept/getAllDept.php',
	})
}

// 添加部门
export function addDept(params){
	return request({
		url:'dept/addDept.php',
		params
	})
}

// 编辑部门
export function editDept(params){
	return request({
		url:'dept/updateDept.php',
		params
	})
}

// 删除部门
export function deleteDept(params){
	return request({
		url:'dept/delDept.php',
		params
	})
}

// 删除部门
export function getOneDept(params){
	return request({
		url:'dept/getOneDept.php',
		params
	})
}