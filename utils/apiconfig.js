/**
 * author：AbuCoder
 * date:2023年4月7日13:53:23
 * 正式上线，baseUrl请换成线上地址
 */

// export const baseUrl = 'https://abucoder.rasmall.cn/prod-api/wxapi/';//上线时使用https地址
// export const uploadUrl = baseUrl+'/upload'//图片上传地址,上线时使用https地址
export const baseUrl = 'https://xhzl.sxhcyywl.com:1443/prod-api/';//本地调试用该地址
// export const baseUrl = 'http://10.142.150.3:8099/';//本地调试用该地址
// export const baseUrl = 'http://10.168.40.220:18099/prod-api/';//本地调试用该地址
// export const uploadUrl = baseUrl+'upload'//图片上传地址
export const uploadUrl = baseUrl+'wxapi/upload'//图片上传地址

//通过环境来判断
// if(process.env.NODE_ENV==="development"){
// 	baseUrl='http://localhost:8083/wxapi'
// }else{
// 	baseUrl = 'https://abucoder.rasmall.cn/prod-api/wxapi/';//上线时使用https地址
// }