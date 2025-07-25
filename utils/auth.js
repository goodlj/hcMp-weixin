// 该文件用来存储localStorage 本地缓存的方法
import {
	log
} from "util";
import {
	baseUrl,
	uploadUrl
} from "./apiconfig";
/**
 * 操作用户token
 */
export function setToken(value) {
	uni.setStorageSync('token', value);
	// console.log('存储用户信息成功');
}
/**
 * 获取缓存的Openid
 */
export function getToken() {
	let token = uni.getStorageSync('token');
	// console.log("token", token);
	// if (!token) {
	// 	// uni.showToast({
	// 	// 	title: "请先登录",
	// 	// 	icon: "none",
	// 	// 	complete: function() {
	// 	// 		uni.reLaunch({
	// 	// 			url: '/pages/me/me'
	// 	// 		});
	// 	// 	}
	// 	// });
	// 	uni.showModal({
	// 		title: '提示',
	// 		content: '请先登录',
	// 		success: function(res) {
	// 			if(res.confirm){
	// 				uni.reLaunch({
	// 					url: '/pages/me/me'
	// 				});
	// 			}
	// 		}
	// 	})
	// 	return null;
	// }
	return token;
}
/**
 * 移除用户token=openid
 */
export function removeToken() {
	uni.removeStorageSync('token');
}
// 用户第二次登录通过isFirst判断
export function setIsfirst(value){
	uni.setStorageSync('isfirst',value);
}
// 获取缓存的isfirst
export function getIsfirst(){
	let isfirst=uni.getStorageSync('isfirst');
	return isfirst;
}
// 移除isfirst
export function removeIsfirst(){
	uni.removeStorageSync('isfirst');
}
/**
 * 操作用户信息
 * 缓存微信用户信息
 */
// 二次登录的用户信息
export function setloginuserInfo(value){
	try{
		let loginuserValue=JSON.stringify(value);
		uni.setStorageSync('loginuserinfo',loginuserValue);
	}catch(e){
		return;
	}
}
export function getloginuserInfo(value){
	let loginuserinfo=uni.getStorageSync('loginuserinfo');
	if(loginuserinfo){
		return JSON.parse(loginuserinfo);
	}
}
export function removeloginuserInfo(){
	uni.removeStorageSync('loginuserinfo');
}
export function setUserInfo(value) {
	try {
		//const user={name:"张三"，age:25}
		//uni.setStorageSync('user',JSON.stringify(user))
		//存储值:"{"name":"张三","age":25}"
		// 读取时:
		//const data=JSON.parse(uni.getStorageSync('user'))
		//得到完整对象{name:"张三",age:25}
		let newValue = JSON.stringify(value);
		uni.setStorageSync('userinfo', newValue);
		// console.log('存储用户信息成功');
	} catch (e) {
		return;
	}
}
/**
 * （之前方式）获取缓存的微信用户信息 （现在登录方式）使用手机号快速验证，获取用户手机号
 */
export function getUserInfo() {
	let userinfo = uni.getStorageSync('userinfo');
	// console.log('userinfo', userinfo)
	if (userinfo) {
		return JSON.parse(userinfo);
	}
}
/**
 * 移除缓存的用户信息
 */
export function removeUserInfo() {
	uni.removeStorageSync('userinfo');
}

/**
 * 操作会员信息
 * 会员信息存储缓存
 */
export function setRememberInfo(value) {
	try {
		uni.setStorageSync('rememberInfo', value);
		// console.log('存储会员信息成功');
	} catch (e) {
		return;
	}
}

/**
 * 获取缓存的会员信息
 */
export function getRememberInfo() {
	let rememberInfo = uni.getStorageSync('rememberInfo');
	if (rememberInfo) {
		// console.log('会员信息获取成功：', rememberInfo)
		return rememberInfo;
	}
}
/**
 * 移除缓存的会员信息
 */
export function removeRememberInfo() {
	uni.removeStorageSync('rememberInfo');
	// console.log("清楚会员信息成功！")
}

/**
 * 缓存用户分享ID
 * 登录时传到后端
 */
export function setShareID(value) {
	try {
		uni.setStorageSync("shareid", value);
	} catch (e) {
		return;
	}
}
/**
 * 获取用户分享ID
 * 登录时传到后端
 */
export function getShareID() {
	let shareid = uni.getStorageSync("shareid")
	if (shareid) {
		return shareid;
	}
}
export function getConfig() {
	let base = {
		baseUrl,
		uploadUrl,
	}
	return base;
}