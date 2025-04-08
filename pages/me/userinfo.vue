<template>
	<view class="container">
		<view class="user-box">
			<view class="avatar-box">
				<button open-type="chooseAvatar" @chooseavatar="chooseaAatar" class="clearBtn">
					<view class="avatar">
						<u-avatar :src="src" size="80" shape="square"></u-avatar>
					</view>
				</button>
			</view>
			<!-- <view class="user">
				<u-form labelPosition="left">
					<u-form-item
						label="昵称"
						prop="username"
						borderBottom
						ref="item1">
						<u-input v-model="username" placeholder="请输入昵称" border="none"></u-input>
					</u-form-item>
				</u-form>
			</view> -->
		</view>
		<view class="btn">
			<u-button type="primary" text="保存" @click="saveInfo" :customStyle="{width:'45%'}"></u-button>
			<u-button type="error" text="取消" @click="cancel" :customStyle="{width:'45%'}"></u-button>
		</view>
	</view>
</template>

<script>
	import {
		getConfig,
		setUserInfo,
		getUserInfo,
		getToken
	} from '@/utils/auth';
import { log } from 'util';
	export default {
		data() {
			return {
				// src: '/static/img/avatar.png',
				src: '',
				// username:'',
				userinfo: {},
				savepth: '', //真正保存的文件路径
			};
		},
		onShow() {
			this.userinfo = getUserInfo() || {};
			// console.log(getUserInfo())
			// console.log(getUserInfo().avatar)
			// this.src = getUserInfo().avatar || ''
			// this.username = getUserInfo().nickname || ''
		},
		methods: {
			chooseaAatar(e) {
				console.log(e)
				this.src = e.detail.avatarUrl;
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
						if (r.code == 200) {
							this.savepth = r.url;
							console.log("this.savepth",this.savepth)
						}
					},
					fail: (err) => {
						//失败的回调
						console.log("err", err)
					}

				})
			},
			//保存数据
			saveInfo() {
				let that = this
				let form = {};
				// form.nickName = this.username
				form.avatarUrl = this.savepth,
					// form.openid = getToken()
				uni.showLoading({
					title: '保存中...'
				})
				console.log(form);
				that.request('saveUserInfo', form, 'POST',{}).then(res => {
					console.log("wxloginres: ", res)
					if (res.code == 200) {
						uni.hideLoading()
						setTimeout(function() {
							uni.hideLoading();
						}, 2000);
						const currentUserInfo = getUserInfo();
						const updatedUserInfo = {
							...currentUserInfo, //展示当前用户信息
							...res.data //将新获取的数据合并起来，覆盖相同的字段
						}
						setUserInfo(updatedUserInfo); //存储最新用户信息
						uni.navigateBack({
							delta: 1 //返回上一页,1为返回的页面数，如果delta大于现有页面数，则返回到首页
						})
						// uni.reLaunch({url: '/pages/me/me'});

					} else {
						uni.showToast({
							icon: "none",
							title: "登录失败，请稍后试试！",
							duration: 2000
						})
					}
				})
			},
			//取消保存
			cancel() {
				uni.navigateBack({
					delta: 1, //返回上一层
				})
			}
		}
	}
</script>

<style lang="scss">
	.user-box {
		width: 100%;
		height: 460rpx;
		background: #fff;

		.avatar-box {
			height: 260rpx;

			.avatar {
				width: 200rpx;
				margin: 80rpx auto;
			}
		}

		.user {
			width: 90%;
			margin: 30rpx auto;
		}
	}

	.btn {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		width: 90%;
		margin: 100rpx auto;
	}
</style>