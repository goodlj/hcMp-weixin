<template>
	<view class="loginModel">
		<!-- 手机号快捷登录 -->
		<view :style="{height:navHeight+'px',paddingTop:statusBarHeight+'px'}">
		</view>
		<!-- 海川小海智链 -->
		<text class="programname">海川小海智链</text>
		<view class="numberlogin">
			<button class="login-btn" open-type="getPhoneNumber" @getphonenumber="weChatLogin"
				@click="checkAgreement">手机号快捷登录</button>
			<view class="agreement" :class="{'shake':shake}" @click="agreementChecked=!agreementChecked">
				<checkbox :checked="agreementChecked" style="transform:scale(0.5)"></checkbox>
				<text>我已阅读并同意《隐私政策》</text>
			</view>
		</view>
	</view>
</template>
<script>
	import {
		log
	} from 'util'
	import {setUserInfo,getUserInfo,setToken,getToken,removeUserInfo,removeToken} from '@/utils/auth' 
	export default {
		data() {
			return {
				agreementChecked: false, //隐私勾选状态
				shake: false, //控制抖动效果
				statusBarHeight: null, //状态栏高度
				navHeight: null, //导航栏高度
			}
		},
		onLoad() {
			// 获取胶囊的详细信息
			let menuButtonObject = uni.getMenuButtonBoundingClientRect();
			let navTop = menuButtonObject.top;
			this.statusBarHeight = uni.getSystemInfoSync().statusBarHeight;
			// 导航栏整体高度
			this.navHeight = this.statusBarHeight + menuButtonObject.height + (navTop - this.statusBarHeight) * 2;
		},
		methods: {
			checkAgreement() {
				// 未勾选隐私协议时触发抖动
				if (!this.agreementChecked) {
					this.triggerShake();
					uni.showToast({
						title: "请先同意隐私政策",
						icon: 'none'
					})
					// return
				}
				return this.agreementChecked
			},
			weChatLogin(e) {
				let that = this;
				if (!this.checkAgreement()) return
				if (e.detail.errMsg === "getPhoneNumber:ok") {
					// let code = e.detail.code;
					let phoneData = {};
					phoneData.code = e.detail.code;
					phoneData.encryptedData = e.detail.encryptedData;
					phoneData.iv = e.detail.iv;
					console.log("phoneData", phoneData)
					// let phoneDatastring=JSON.stringify(phoneData);
					// let header={
					// 	"Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
					// };
					// console.log("phoneDatastring",phoneDatastring)
					//1.不传递header,要省略中间参数，需用undefined占位；2.显式传递空对象，明确传递空对象{}，保持代码可读性；
					that.request('login/phone', phoneData, 'POST', {}).then((wxPhone) => {
						console.log("wxPhone", wxPhone);
						setToken(wxPhone.data.token);
						// let personInfo={
						// 	...wxPhone.data,//展开原有字段
						// 	avatar:"",//添加新的avatar字段
						// }
						// 设置用户手机号等信息
						setUserInfo(wxPhone.data);
						//uni.reLaunch()关闭所有页面，打开到应用内的某个页面。
						uni.reLaunch({
							url: '/pages/index/index'
						})
						// console.log("111");
					})
				} else {
					uni.showToast({
						title: "获取手机号失败",
						icon: 'none'
					})
				}
			},
			triggerShake() {
				this.shake = true;
				setTimeout(() => {
					this.shake = false;
				}, 500)
			}
		}
	}
</script>
<style lang="scss">
	.loginModel {
		width: 100%;
		height: 100vh;
		// min-height: 100vh;
		display: flex;
		flex-direction: column;
		// justify-content: center;
		align-items: center;

		.programname {
			height: 600rpx;
			line-height: 600rpx;
			font-size: 60rpx;
		}

		.numberlogin {
			width: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;

			/* 登录按钮样式 */
			.login-btn {
				width: 80%;
				// margin-top: 40rpx;
				background-color: #07c160;
				color: white;
				font-size: 32rpx;
			}

			/* 协议区域样式 */
			.agreement {
				margin-top: 16rpx;
				display: flex;
				align-items: center;
				padding: 20rpx;
				transition: all 0.3s;
			}

			/* 抖动动画 */
			.shake {
				animation: shake 0.5s ease-in-out;
			}

			@keyframes shake {

				0%,
				100% {
					transform: translateX(0);
				}

				10%,
				30%,
				50%,
				70%,
				90% {
					transform: translateX(-10px);
				}

				20%,
				40%,
				60%,
				80% {
					transform: translateX(10px);
				}
			}
		}
	}
</style>