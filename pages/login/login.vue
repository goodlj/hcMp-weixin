<template>
	<view class="loginModel">
		<!-- 手机号快捷登录 -->
		<view :style="{height:navHeight+'px',paddingTop:statusBarHeight+'px'}">
		</view>
		<image style="width:200rpx;height: 200rpx;margin-top:20%"
			src="https://xhzl.sxhcyywl.com:1443/prod-api/profile/upload/2025/04/25/sc9_20250425130201A011.png"
			mode="aspectFit">
		</image>
		<!-- 海川小海智链 -->
		<text class="programname">海川小海智链</text>
		<view class="numberlogin">
			<!-- <text class="warnInfo">未注册的手机号将自动注册并登录</text> -->
			<button v-if="!agreementChecked" class="login-btn" @click="handlePhone">微信授权登录</button>
			<button v-else class="login-btn" @click="weChatLogin">微信授权登录</button>
			<view class="agreement" :class="{'shake':shake}" @click="agreementChecked=!agreementChecked">
				<checkbox :checked="agreementChecked" style="transform:scale(0.5)"></checkbox>
				<text>我已阅读并同意<text class="privacyColor" @click.stop="gotoAgreement">《用户协议》</text>和<text
						class="privacyColor" @click.stop="gotoPrivacy">《隐私政策》</text></text>
			</view>
		</view>
	</view>
</template>
<script>
	import {
		log
	} from 'util'
	import {
		getConfig,
		setUserInfo,
		getUserInfo,
		setToken,
		getToken,
		removeUserInfo,
		removeToken,
		setIsfirst,
		getIsfirst,
		removeIsfirst,
		setloginuserInfo,
		getloginuserInfo,
		removeloginuserInfo
	} from '@/utils/auth'
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
			// 进入用户协议
			gotoAgreement() {
				uni.navigateTo({
					url: "/pages/login/agreement"
				})
			},
			// 进入隐私协议内容
			gotoPrivacy() {
				wx.openPrivacyContract({
					success: () => {
						console.log("隐私协议打开成功");
					},
					fail: (error) => {
						console.error('隐私协议打开失败', error);
						uni.showToast({
							title: "隐私协议打开失败",
							icon: "error"
						});
					}
				});
			},
			handlePhone() {
				// 未勾选隐私协议时触发抖动
				if (!this.agreementChecked) {
					this.triggerShake();
					uni.showToast({
						title: "请阅读并勾选用户协议和隐私政策",
						icon: 'none'
					})
					// return
				}
				return this.agreementChecked
			},
			weChatLogin() {
				let that=this;
				uni.showModal({
					title:"提示",
					content:"授权微信登录后才能正常使用小程序功能",
					success(res){
						if(res.confirm){
							//需要在小程序进行登录获取code
							uni.login({
								provider: 'weixin',
								success: (res) => {
									var code = res.code;
									console.log("code", code);
									that.request('wxapi/wxLogin', {
										code: code
									}, 'POST', {}).then((wxPhone) => {
										console.log("wxPhone", wxPhone);
										setToken(wxPhone.token);
										setIsfirst(wxPhone.isFirst);
										if(!wxPhone.isFirst){
											// uni.navigateTo({
											// 	url: '/pages/addCompany/addCompany'
											// })
											uni.reLaunch({
												url: '/pages/guide/guide'
											})
										}else{
											console.log("login",wxPhone.userInfo);
											setloginuserInfo(wxPhone.userInfo);
											uni.switchTab({
												url: '/pages/index/index'
											})
										}
										
									})
								},
								fail: ()=> {
									uni.showToast({
										title: '微信登录失败',
										icon: 'none'
									})
								}
							})
						}else if(res.cancel){
							uni.showToast({
								title:'已拒绝授权',
								icon:'none'
							})
						}
					}
				})
				


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
<style lang="scss" scoped>
	.loginModel {
		width: 100%;
		height: 100vh;
		// min-height: 100vh;
		display: flex;
		flex-direction: column;
		// justify-content: center;
		align-items: center;
		// background: #020f75;
		// background-image: linear-gradient(to top, #020f75 0%, #fff 100%);
		background: linear-gradient(to bottom, transparent -400rpx, #fff 600rpx), linear-gradient(to right, #aaaaff, #FFD1DE);

		.programname {
			height: 90rpx;
			line-height: 90rpx;
			font-size: 40rpx;
			margin-bottom: 40%;
			letter-spacing: 40rpx;
			text-indent: 40rpx;
			font-weight: 700;
		}

		.numberlogin {
			width: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;

			.warnInfo {
				color: #676666;
				// color: #8d8d8c;
				margin-bottom: 20rpx;
			}

			/* 登录按钮样式 */
			.login-btn {
				width: 80%;
				// margin-top: 40rpx;
				background-color: #07c160;
				color: white;
				font-size: 32rpx;
				border-radius: 50rpx;
			}

			/* 协议区域样式 */
			.agreement {
				margin-top: 16rpx;
				display: flex;
				align-items: center;
				padding: 20rpx;
				transition: all 0.3s;

				.privacyColor {
					color: #04bc5c;
					font-size: 28rpx;
				}
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