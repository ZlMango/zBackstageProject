import request from '../../request/index.js'

// 获取所有菜单
export function getAllMenuItems(){
	return request({
		url: 'nav/getAllNav.php'
	})
}
// 编辑菜单
export function editMenuItem(params){
	return request({
		url: 'nav/updateNav.php',
		params
	})
}

// 添加菜单项
export function addMenuItem(params){
	return request({
		url: 'nav/addNav.php',
		params
	})
}

// 删除菜单项
export function deleteMenuItem(params){
	return request({
		url: 'nav/delNav.php',
		params
	})
}

// 删除菜单项
export function getPowerNav(params){
	return request({
		url: 'nav/getPowerNav.php',
		params
	})
}