<template>
	<view class="addCompany">
		<!-- 使用自定义导航栏组件 -->
		<view class="companyContent">
			<view class="avatarflex">
				<view class="avatarLabel">
					头像：
				</view>
				<button open-type="chooseAvatar" @chooseavatar="chooseaAatar" class="clearBtn">
					<view class="avatar">
						<u-avatar :src="src" size="40" shape="circle"></u-avatar>
					</view>
				</button>
			</view>
			<u-form class="formContent" :model="form" ref="uForm" :rules="rules" labelWidth="160rpx">
				<u-form-item label="昵称:" prop="nickName" borderBottom required="true">
					<u-input v-model="form.nickName" border="none" inputAlign="right" />
				</u-form-item>
				<u-form-item label="单位名称:" prop="companyName" borderBottom required="true">
					<u-input v-model="form.companyName" @blur="companyNameBlur" border="none" inputAlign="right" />
				</u-form-item>
				<u-form-item label="性质:" prop="isStore" @click="showNature = true;hideKeyboard()" borderBottom
					required="true">
					<u-input v-model="form.isStore" disabled disabledColor="#ffffff" border="none" inputAlign="right" />
					<u-icon slot="right" name="arrow-right"></u-icon>
				</u-form-item>
				<u-form-item label="姓名:" prop="userName" borderBottom required="true">
					<u-input v-model="form.userName" border="none" inputAlign="right" />
				</u-form-item>
				<u-form-item label="手机号:" prop="phone" borderBottom required="true">
					<!-- 					<u-input v-model="form.phone" border="none" inputAlign="right" /> -->
					<u-input v-model="form.phone" placeholder="请输入手机号" autoHeight border="none">
						<template slot="suffix">
							<u-code ref="uCode" @change="codeChange" :seconds="seconds" changeText="X秒重新获取"></u-code>
							<u-button @tap="getCode" :text="tips" type="success" size="small"></u-button>
						</template>
					</u-input>

				</u-form-item>
				<u-form-item label="验证码:" prop="verifyCode" borderBottom required="true">
					<u-input v-model="form.verifyCode" placeholder="请填写短信验证码" autoHeight border="none"></u-input>
				</u-form-item>
			</u-form>
			<u-picker :show="showNature" :columns="columns" keyName="label" @confirm="selectNature"
				@cancel="cancelNature"></u-picker>
			<view class="btn">
				<u-button type="success" text="保存" @click="saveInfo" :customStyle="{width:'90%'}"></u-button>
				<!-- <u-button type="primary" size="small" text="保存" @click="saveInfo"
					:customStyle="{width:'45%'}"></u-button> -->
				<!-- <u-button type="error" size="small" text="取消" @click="cancel" :customStyle="{width:'45%'}"></u-button> -->
			</view>
		</view>

	</view>
</template>

<script>
	import {
		getConfig,
		setUserInfo,
		getUserInfo,
		setToken,
		getToken,
		removeUserInfo,
		removeToken
	} from '@/utils/auth'
	export default {

		data() {
			return {
				//验证码
				tips: "",
				seconds: 60,
				src: 'https://xhzl.sxhcyywl.com:1443/prod-api/profile/upload/2025/05/15/7490cf7f4dbe590e1f82d3b1547a4ec6b080e3e6140a-8YDOzm_20250515024145A004.png',
				username: '',
				userinfo: {},
				savepth: '', //真正保存的文件路径
				//提交的时候传Y,N
				isStorevalue: "",
				form: {
					nickName: "",
					userName: "",
					phone: "",
					companyName: "",
					isStore: "",
					verifyCode: ""

				},
				showNature: false,
				columns: [
					[{
						label: '连锁店',
						id: "Y"
						// ...
					}, {
						label: '非连锁',
						id: "N"
					}]
				],
				rules: {
					nickName: [{
						required: true,
						message: '请输入昵称',
						trigger: ['blur', 'change']
					}],
					userName: [{
						required: true,
						message: '请输入姓名',
						trigger: ['blur', 'change']
					}],
					companyName: [{
						required: true,
						message: '请输入单位名称',
						trigger: ['blur', 'change']
					}],
					isStore: [{
						required: true,
						message: '请选择单位性质',
						trigger: ['blur', 'change']
					}],
					verifyCode: [{
						required: true,
						message: '请输入验证码',
						trigger: ['blur', 'change']
					}],
					phone: [{
							required: true,
							message: '请输入手机号',
							trigger: ['change', 'blur'],
						},
						{
							// 自定义验证函数，见上说明
							validator: (rule, value, callback) => {
								return uni.$u.test.mobile(value);
							},
							message: '手机号码不正确',
							// 触发器可以同时用blur和change
							trigger: ['change', 'blur'],
						}
					]
				}
			};
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		},
		onShow() {
			uni.hideHomeButton();
		},
		methods: {
			codeChange(text) {
				console.log("text", text);
				this.tips = text;
			},
			//发送验证码前验证手机号
			validatePhone(phone) {
				return /^1[3-9]\d{9}$/.test(phone);
			},
			getCode() {
				//canGetCode属性可以知道当前是否能够获取验证码(即倒计时是否结束)。调用start()方法后，组件会开始倒计时，并且canGetCode会变成false,直到倒计时结束
				if (!this.validatePhone(this.form.phone)) {
					uni.$u.toast('请输入正确的手机号码');
					return;
				}
				if (this.$refs.uCode.canGetCode) {
					// 模拟向后端请求验证码
					uni.showLoading({
						title: '正在获取验证码'
					})

					this.request(`wxapi/send-code?phone=${this.form.phone}`, {}, 'POST').then(res => {
						if (res.code == 200) {
							uni.hideLoading();
							uni.$u.toast('验证码已发送');
							this.$refs.uCode.start();
						} else {
							uni.$u.toast(res.msg || '发送失败')
						}
					}).catch(error => {
						console.error('发送验证码失败', error);
					}).finally(() => {
						uni.hideLoading(); // 确保请求结束后隐藏加载动画
					});

					// setTimeout(() => {
					// 	uni.hideLoading();
					// 	// 这里此提示会被this.start()方法中的提示覆盖
					// 	uni.$u.toast('验证码已发送');
					// 	// 通知验证码组件内部开始倒计时
					// 	this.$refs.uCode.start();
					// }, 2000);
				} else {
					uni.$u.toast('倒计时结束后再发送');
				}
			},
			//隐藏键盘
			hideKeyboard() {
				uni.hideKeyboard();
			},
			// 单位名称失去焦点时触发
			companyNameBlur(value) {
				console.log("value", value);
				if (value) {
					this.request('orderapi/getCustomer', {
						companyName: value
					}, 'GET', {}).then((res) => {
						if (res.data == 0) {
							uni.showToast({
								title: res.msg,
								icon: "error"
							});
							this.form.companyName = ""
						} else {
							let address = res.data.address;
							let customerId = res.data.customerId;
							this.$set(this.form, 'address', address);
							this.$set(this.form, 'customerId', customerId);
							console.log("form", this.form);
						}
					})
				} else {
					uni.showToast({
						title: "请填写单位名称",
						icon: "none"
					});
				}

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
						"Content-Type": "multipart/form-data",
						Authorization: `Bearer ${getToken()}`
					},
					success: (res) => {
						uni.hideLoading()
						//成功的回调
						//一般用于重新获取数据渲染页面
						const r = JSON.parse(res.data);
						console.log("r", r)
						if (r.code == 200) {
							this.savepth = r.url
						}
					},
					fail: (err) => {
						//失败的回调
						console.log("err", err)
					}

				})
			},
			cancel() {
				uni.navigateTo({
					url: "/pages/login/login"
				})
			},
			selectNature(e) {
				console.log(e, e.value[0].id);
				this.form.isStore = e.value[0].label;
				console.log('isStore', this.form.isStore);
				this.isStorevalue = e.value[0].id;
				this.$refs.uForm.validateField('isStore');
				this.showNature = false;
			},
			// 取消性质
			cancelNature() {
				this.showNature = false;
			},
			//保存数据
			saveInfo() {
				this.$refs.uForm.validate().then(res => {
					let that = this
					this.form.avatar = this.savepth
					// this.form.isStore = this.isStorevalue
					const submitData = {
						...this.form,
						isStore: this.isStorevalue
					}
					// that.request('orderapi/userInfo', submitData, 'POST').then(res => {
					// 	console.log("wxloginres: ", res)
					// 	if (res.data != 0) {
					// 		// uni.hideLoading()
					// 		setTimeout(function() {
					// 			uni.hideLoading();
					// 		}, 2000);
					// 		setUserInfo(res.data); //存储最新用户信息
					// 		uni.switchTab({
					// 			url: '/pages/index/index'
					// 		})
					// 	} else if (res.data == 0) {
					// 		uni.$u.toast(res.msg);
					// 	}
					// })
					if (this.form.avatar) {
						uni.showLoading({
							title: '保存中...'
						})
						that.request('orderapi/userInfo', submitData, 'POST').then(res => {
							console.log("wxloginres: ", res)
							if (res.data != 0) {
								// uni.hideLoading()
								setTimeout(function() {
									uni.hideLoading();
								}, 2000);
								setUserInfo(res.data); //存储最新用户信息
								uni.switchTab({
									url: '/pages/index/index'
								})
							} else if (res.data == 0) {
								uni.$u.toast(res.msg);
							}
						})
					} else {
						uni.showToast({
							title: "请上传头像信息",
							icon: 'none'
						});
					}

				}).catch(errors => {
					uni.$u.toast('请填写完整信息')
				})

			},
		},
	};
</script>
<style lang="scss" scoped>
	.addCompany {
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		background: linear-gradient(to right, #1ef2fe, #44f2fc);

		.companyContent {
			background: #fff;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			width: 100%;
			min-height: 500rpx;
			margin: 20rpx;
			border-radius: 16rpx;


			.avatarflex {
				margin-top: 20rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				// width: 75%;
				width: 90%;
				height: 100rpx;
				border-bottom: 2rpx solid #eaeaea;
				padding: 20rpx 0;

				.clearBtn {
					display: flex;
					justify-content: center;
					align-items: center;
					background: none;
					padding: 0;
					margin: 0;
					line-height: 1;
					border: 2rpx solid #eaeaea;
					border-radius: 50%;
					height: 80rpx;
					width: 80rpx;

					&::after {
						border: none;
					}

					.u-avatar {
						// border: 2rpx solid #fff;
						// box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
					}
				}
			}

			.formContent {
				width: 70%;

				::v-deep .u-form-item__body__right__message {
					margin-left: 200rpx !important;
					/* 右侧布局 */

				}

				// ::v-deep .u-input__content__field-wrapper__field{
				// 	text-align: right !important;
				// }
			}

			.btn {
				display: flex;
				justify-content: flex-end;
				align-items: center;
				width: 90%;
				margin: 40rpx 0 20rpx 0;
			}
		}
	}
</style>