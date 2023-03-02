import request from '../../request/index'


// 获取角色列表
export function getAllRoles(){
	return request({
		url: 'Roles/getAllRoles.php',
		method: 'get'
	})
}

// 添加角色
export function addRoles(params){
	return request({
		url: 'Roles/addRoles.php',
		params
	})
}


// 编辑角色
export function editRoles(params){
	return request({
		url: 'Roles/updateRoles.php',
		params
	})
}

// 删除角色
export function deleteRoles(params){
	return request({
		url:'Roles/delRoles.php',
		params
	})
}

