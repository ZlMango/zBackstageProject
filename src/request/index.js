// 1. 导入axios依赖包
import axios from 'axios'
// 2. 创建axios实例对象
const request = axios.create({
	// 管理后台要使用的接口的基础地址
	baseURL:'http://localhost:9999/api/',
	// 超时时间
	timeout: 10000,
	headers: {
		"Content-Type": "application/x-www-form-urlencoded"
	},
})

// 3. 定义请求拦截器 前置拦截器 请求发送出去之前触发
request.interceptors.request.use((config) => {
	// config 接口请求的配置信息
	return config;
},error => {
	// 出现请求错误时抛出错误信息
	return Promise.reject(error)
})

// 4. 定义响应拦截器 后置拦截器 服务器的响应数据回来之前触发
request.interceptors.response.use(response => {
	// 返回从服务器获取的数据
	return response
},error => {
	//返回错误的响应信息
	return Promise.reject(error)
})
// 抛出axios实例对象的信息
export default request