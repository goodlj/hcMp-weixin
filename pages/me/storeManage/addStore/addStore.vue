<template>
	<view class="addStorecontent">
		<view class="textAreainfo">
			<!-- <u-textarea v-model="form.companyName" placeholder="请输入门店名称" autoHeight border="none"></u-textarea> -->
			<u-form :model="form" ref="uForm" labelWidth="80" labelPosition="right" :rules="rules">
				<u-form-item label="门店名称" prop="companyName" required="true">
					<u-textarea v-model="form.companyName" placeholder="请输入门店名称" height="80"></u-textarea>
				</u-form-item>
				<u-form-item label="手机号" prop="phone" borderBottom required="true">
					<u-input v-model="form.phone" placeholder="请输入手机号" autoHeight border="none">
						<template slot="suffix">
							<u-code ref="uCode" @change="codeChange" :seconds="seconds" changeText="X秒重新获取"></u-code>
							<u-button @tap="getCode" :text="tips" type="success" size="small"></u-button>
						</template>
					</u-input>
				</u-form-item>
				<u-form-item label="短信验证码" prop="verifyCode" required="true">
					<!-- <u-input v-model="form.code" placeholder="请填写短信验证码" autoHeight border="none"></u-input> -->
					<u-code-input v-model="form.verifyCode" mode="line" :space="25" hairline></u-code-input>
				</u-form-item>
			</u-form>
		</view>
		<view class="saveStore" @click="saveStore">
			<view class="saveStoreBtn">
				<text class="savaText">
					保存
				</text>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				tips: "",
				seconds: 60,
				form: {
					companyName: "",
					phone: "",
					verifyCode: ""
				},
				rules: {
					companyName: [{
						required: true,
						message: '请输入门店名称',
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
			}
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
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
			saveStore() {
				this.$refs.uForm.validate().then(res => {
					let that = this;
					console.log("that.form", that.form);
					that.request('company/addCompany', that.form, 'POST', {}).then((res) => {
						if (res.data == 0) {
							// uni.showToast({
							// 	title: res.msg,
							// 	icon: "error"
							// });
							uni.$u.toast(res.msg);
							this.form.companyName = ""
						} else if (res.data == 1) {
							uni.$u.toast(res.msg);
						} else if (res.data == 2) {
							uni.navigateBack({
								delta: 1
							})
						}
					})
				}).catch(errors => {
					uni.$u.toast('请填写完整信息')
				})
				// if (this.form.companyName) {
				// 	let addparams = {
				// 		// phone: this.userinfo.phone,
				// 		companyName: this.form.companyName,
				// 	}
				// 	this.request('company/addCompany', addparams, 'POST', {}).then((res) => {
				// 		if (res.data == 0) {
				// 			uni.showToast({
				// 				title: res.msg,
				// 				icon: "error"
				// 			});
				// 			this.form.companyName = ""
				// 		} else {
				// 			uni.navigateBack({
				// 				delta: 1
				// 			})
				// 		}
				// 	})
				// } else {
				// 	uni.showToast({
				// 		title: "请输入门店名称",
				// 		icon: "none"
				// 	});
				// }

			}
		}
	}
</script>
<style lang="scss" scoped>
	.addStorecontent {
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 20rpx;
		position: relative;

		.textAreainfo {
			width: 100%;
			min-height: 300rpx;
			// border-radius: 30rpx;
			border-radius: 16rpx;
			background: #fff;
			padding: 0 40rpx 40rpx 40rpx;

			// ::v-deep .u-textarea {
			// 	border-radius: 30rpx;
			// }
			::v-deep .u-form-item__body__right__message {
				margin-left: 20rpx !important;
				/* 右侧布局 */

			}
		}

		.saveStore {
			position: fixed;
			bottom: 0;
			left: 0;
			right: 0;
			height: 165rpx;
			background: #fff;
			border-top: 2rpx solid #ebebe9;
			display: flex;
			justify-content: center;
			overflow: hidden;
			z-index: 100;

			.saveStoreBtn {
				margin-top: 20rpx;
				width: 50%;
				text-align: center;
				height: 90rpx;
				line-height: 90rpx;
				color: #fff;
				font-weight: 700;
				font-size: 30rpx;
				background: #016eff;
				border-radius: 50rpx;

				.savaText {
					letter-spacing: 14rpx;
					margin-right: -20rpx;
				}
			}
		}
	}
</style>