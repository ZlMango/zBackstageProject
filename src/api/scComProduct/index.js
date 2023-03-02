import request from '../../request/index'

// 添加产品
export const addProduct = (data) =>{
	return request({
		url: 'scComProduct/addProduct.php',
		headers: {'Content-Type': 'multipart/form-data'},
		method: 'post',
		data,
	})
}

// 修改产品
export const editProduct = (params,data) =>{
	return request({
		url: 'scComProduct/updateProduct.php',
		headers: {'Content-Type': 'multipart/form-data'},
		method: 'post',
		params,
		data
	})
}

// 获取产品列表
export const getAllProduct = (params) =>{
	return request({
		url: 'scComProduct/getAllProduct.php',
		method: 'get',
		params
	})
}

// 删除产品
export const delProduct = (params) =>{
	return request({
		url: 'scComProduct/delProduct.php',
		method: 'get',
		params
	})
}