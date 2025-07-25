<template>
	<view>
		<view class="header">
			<view class="bg">
				<view class="box">
					<view class="box-hd">
						<view v-if="islogin">
							<view v-if="!isfirst">
								<view class="avator">
									<!-- <button open-type="chooseAvatar" @chooseavatar="chooseaAatar" class="avatarBtn">
										<u-avatar :src="src" size="80" shape="square"></u-avatar>
							
									</button> -->
									<!-- <img src="https://xhzl.sxhcyywl.com:1443/prod-api/profile/upload/2025/04/25/sc2_20250425130040A004.png"
										alt="" /> -->
									<img :src="userinfo.avatar">
									<!-- <image class="avatorimg" src="../../static/img/avatar.png" mode="aspectFit"></image> -->
								</view>
								<!-- <view class="phone-number">{{userinfo.phonenumber}},{{userinfo.nickName || '未设置昵称'}}</view> -->
								<view class="phone-number">{{userinfo.phonenumber || '未设置'}}</view>
							</view>
							<view v-if="isfirst">
								<view class="avator">
									<!-- <button open-type="chooseAvatar" @chooseavatar="chooseaAatar" class="avatarBtn">
										<u-avatar :src="src" size="80" shape="square"></u-avatar>
							
									</button> -->
									<!-- <img src="https://xhzl.sxhcyywl.com:1443/prod-api/profile/upload/2025/04/25/sc2_20250425130040A004.png"
										alt="" /> -->
									<img :src="loginuserinfo.avatar">
									<!-- <image class="avatorimg" src="../../static/img/avatar.png" mode="aspectFit"></image> -->
								</view>
								<!-- <view class="phone-number">{{loginuserinfo.phonenumber}},{{loginuserinfo.nickName || '未设置昵称'}}</view> -->
								<view class="phone-number">{{loginuserinfo.phonenumber || '未设置'}}
								</view>
							</view>
						</view>
						<view v-else @click="goLogin">
							<view class="avator">
								<img :src="src">
							</view>
							<view class="phone-number" style="color:#3fbeff;">点我登录</view>
						</view>
					</view>
					<view class="box-bd">
						<view class="item" @click="myNotice">
							<u-icon class="icon" name="volume-fill" size="25" color="#757575"></u-icon>
							<view class="text">我的通知</view>
						</view>
						<!-- <view class="item">
							<u-icon class="icon" name="star-fill" size="25" color="#757575"></u-icon>
							<view class="text">我的收藏</view>
						</view> -->
						<view class="item contactBtn">
							<button open-type="contact" session-from="我的页面">
								<u-icon class="icon" name="server-fill" size="25" color="#757575"></u-icon>
								<view class="text">我的客服</view>
							</button>

						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="list-content">
			<view class="list">
				<!-- <view class="li">
					<u-icon class="icon" name="coupon-fill" size="25" color="#757575"></u-icon>
					<view class="text">我的名片</view>
					<u-icon class="icon" name="arrow-right" size="20" color="#757575"></u-icon>
				</view> -->
				<!-- <view class="li " @click="changeSkin">
					<u-icon class="icon" name="grid-fill" size="25" color="#757575"></u-icon>
					<view class="text">主题切换</view>
					<u-icon class="icon" name="arrow-right" size="20" color="#757575"></u-icon>
				</view> -->
				<!-- <view class="li ">
					<u-icon class="icon" name="question-circle-fill" size="25" color="#757575"></u-icon>
					<view class="text">帮助中心</view>
					<u-icon class="icon" name="arrow-right" size="20" color="#757575"></u-icon>
				</view> -->
				<view class="li" @click="handleAbout">
					<u-icon class="icon" name="info-circle-fill" size="25" color="#757575"></u-icon>
					<view class="text">关于我们</view>
					<u-icon class="icon" name="arrow-right" size="20" color="#757575"></u-icon>
				</view>
				<view class="li" @click="feedback">
					<u-icon class="icon" name="email-fill" size="25" color="#757575"></u-icon>
					<view class="text">意见反馈</view>
					<u-icon class="icon" name="arrow-right" size="20" color="#757575"></u-icon>
				</view>
				<!-- <view class="li" @click="evaluate">
					<u-icon class="icon" name="man-add-fill" size="25" color="#757575"></u-icon>
					<view class="text">客户评价</view>
					<u-icon class="icon" name="arrow-right" size="20" color="#757575"></u-icon>
				</view> -->
				<view class="li" @click="storeManage">
					<u-icon class="icon" name="setting-fill" size="25" color="#757575"></u-icon>
					<view class="text">门店管理</view>
					<u-icon class="icon" name="arrow-right" size="20" color="#757575"></u-icon>
				</view>
				<view class="li noborder" @click="loginOut">
					<u-icon class="icon" name="account-fill" size="25" color="#757575"></u-icon>
					<view class="text">注销登录</view>
					<u-icon class="icon" name="arrow-right" size="20" color="#757575"></u-icon>
				</view>
			</view>
		</view>
		<view class="copyright">
			<text>海川小海智链版权所有</text>
		</view>
	</view>
</template>

<script>
	import {
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
	} from '@/utils/auth';
	import {
		log
	} from 'util';
	export default {
		data() {
			return {
				// avatarUrl: 'https://portrait.gitee.com/uploads/avatars/user/354/1062657_rahman_1649233036.png!avatar60',
				islogin: undefined,
				isfirst: undefined,
				userinfo: {},
				loginuserinfo: {},
				src: "https://xhzl.sxhcyywl.com:1443/prod-api/profile/upload/2025/06/13/avatar_20250613095825A017.png",
				// islogin:false,
			}
		},
		onShow() {
			this.islogin = getToken();
			this.isfirst = getIsfirst();
			this.userinfo = getUserInfo() || {};
			this.loginuserinfo = getloginuserInfo() || {};
		},
		methods: {
			goLogin() {
				uni.navigateTo({
					url: '/pages/login/login'
				})
			},
			chooseaAatar(e) {
				console.log(e)
				this.src = e.detail.avatarUrl
				this.uploadFile(e.detail.avatarUrl); //选好了就开始上传
			},
			uploadFile(src) {
				uni.showLoading({
					title: '加载中...'
				})
				uni.uploadFile({
					url: getConfig().uploadUrl, //图片上传路径
					fileType: 'image', //图片类型,
					name: 'file', //对应接口的文件名称
					filePath: src,
					header: { //请求头
						"Content-Type": "multipart/form-data"
					},
					success: (res) => {
						uni.hideLoading()
						//成功的回调
						//一般用于重新获取数据渲染页面
						const r = JSON.parse(res.data);
						console.log(r)
						if (r.code == 0) {
							this.savepth = r.url
						}
					},
					fail: (err) => {
						//失败的回调
						console.log("err", err)
					}

				})
			},
			myNotice() {
				uni.navigateTo({
					url: './mynotice/mynotice'
				})
				// uni.showToast({
				// 	title: '敬请期待...',
				// 	icon: 'none'
				// })
			},
			handleAbout() {
				uni.navigateTo({
					url: './about/about'
				})
			},
			//意见反馈
			feedback() {
				//检查本地是否存在Token
				const token = getToken();
				if (!token) {
					//未登录，返回登录页
					uni.navigateTo({
						url: '/pages/login/login'
					})
				} else {
					uni.navigateTo({
						url: './feedback/feedback'
					})
				}
			},
			//客户评价
			// evaluate(){
			// 	uni.navigateTo({
			// 		url:'./evaluate/evaluate'
			// 	})
			// },
			//门店管理
			storeManage() {
				// 检查本地是否存在Token
				const token = getToken();
				if (!token) {
					//未登录，返回登录页
					uni.navigateTo({
						url: '/pages/login/login'
					})
				} else {
					uni.navigateTo({
						url: './storeManage/storeManage'
					})
				}
			},
			loginOut() {
				uni.showModal({
					title: '注登录提示',
					content: '确定要注销登录吗？',
					cancelText: "取消", // 取消按钮的文字
					confirmText: "确认", // 确认按钮的文字
					confirmColor: '#f55850',
					success: (res) => {
						if (res.confirm) {
							console.log('comfirm') //点击确定之后执行的代码
							uni.$u.toast("注销登录成功，欢迎再来")
							removeToken()
							removeUserInfo()
							removeloginuserInfo()
							// uni.removeStorageSync("hasShownGuide")
							uni.switchTab({
								// url: '/pages/login/login'
								url: '/pages/index/index'
							});
							// this.islogin=false
						} else {
							console.log('cancel') //点击取消之后执行的代码
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background-color: #f1f1f1;
		font-size: 28rpx;
	}

	.header {
		background: #fff;
		height: 660rpx;
		padding-bottom: 110rpx;

		.bg {
			width: 100%;
			height: 490rpx;
			padding-top: 310rpx;
			background: linear-gradient(to bottom, rgb(1, 94, 234), rgb(0, 192, 250), rgb(255, 255, 255));
		}
	}

	.box {
		width: 650rpx;
		height: 300rpx;
		border-radius: 20rpx;
		margin: 0 auto;
		background: #fff;
		box-shadow: 0 5rpx 20rpx 0rpx rgba(0, 0, 150, .2);

		.box-hd {
			display: flex;
			flex-wrap: wrap;
			flex-direction: row;
			justify-content: center;
			margin-top: 15rpx;

			.avator {
				width: 160rpx;
				height: 160rpx;
				background: #fff;
				border: 5rpx solid #f1f1f1;
				border-radius: 50%;
				margin: 0 auto;
				margin-top: -80rpx;
				overflow: hidden;

				.avatarBtn {
					padding: 0 !important;
				}

				img {
					width: 100%;
					height: 100%;
				}
			}

			.phone-number {
				width: 100%;
				text-align: center;
				margin: 20rpx auto;
			}
		}

		.box-bd {
			display: flex;
			flex-wrap: nowrap;
			flex-direction: row;
			justify-content: center;

			.item {
				flex: 1 1 auto;
				display: flex;
				flex-wrap: wrap;
				flex-direction: row;
				justify-content: center;
				border-right: 2rpx solid #f1f1f1;
				margin: 15rpx 0;

				&:last-child {
					border: none;
				}

				.icon {
					width: 60rpx;
					height: 60rpx;

					img {
						width: 100%;
						height: 100%;
					}
				}

				.text {
					width: 100%;
					text-align: center;
					margin-top: 10rpx;
					color: #000;
				}
			}

			.contactBtn {
				button {
					background: #fff0;
					font-size: 28rpx;

					&::after {
						border: none;
					}

					::v-deep .u-icon--right {
						justify-content: center;
					}

				}
			}
		}
	}

	.list-content {
		background: #fff;
	}

	.list {
		width: 100%;
		border-bottom: 15rpx solid #f1f1f1;
		background: #fff;

		&:last-child {
			border: none;
		}

		.li {
			width: 92%;
			height: 100rpx;
			padding: 0px 4%;
			border-bottom: 2rpx solid #f3f3f3;
			display: flex;
			align-items: center;
			margin: 0rpx auto;

			&.noborder {
				border-bottom: 0
			}

			.icon {
				flex-shrink: 0;
				width: 50rpx;
				height: 50rpx;

				image {
					width: 50rpx;
					height: 50rpx;
				}
			}

			.text {
				padding-left: 20rpx;
				width: 100%;
				color: #666;
			}

			.to {
				flex-shrink: 0;
				width: 40rpx;
				height: 40rpx;
			}
		}
	}

	.copyright {
		margin: 20rpx auto;
		width: 80%;
		height: 60rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #9E9E9E;
		font-size: 26rpx;
	}
</style>