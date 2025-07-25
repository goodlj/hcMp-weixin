<!-- 本示例未包含完整css，获取外链css请参考上文，在hello uni-app项目中查看 -->
<template>
	<view class="feedbackBg">
		<view class="feedbackContent">
			<text class="opinion">填写反馈</text>
			<view class="feedbackform">
				<form @submit="formSubmit">
					<view class="uni-form-item uni-column feedbackline">
						<view class="title">联系电话</view>
						<input class="uni-input" focus name="itemName" v-model="formData.itemName" placeholder="请输入电话号码" />
					</view>
					<view class="uni-form-item uni-column feedbackline">
						<view class="title">意见</view>
						<textarea class="textarea" name="itemDesc" v-model="formData.itemDesc" placeholder="请输入意见"/>
					</view>
					<view class="opinionSubmit">
						<button form-type="submit" type="primary" size="default">提交</button>
					</view>
				</form>
			</view>
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
	export default {
		data() {
			return {
				formData:{
					itemName:"",
					itemDesc:"",
				},
				isfirst:undefined,
				userinfo:{},
				loginuserinfo: {},
			}
		},
		onShow() {
			this.isfirst = getIsfirst();
			this.userinfo = getUserInfo() || {};
			this.loginuserinfo = getloginuserInfo() || {};
			if(!this.isfirst){
				this.formData.itemName=this.userinfo.phonenumber;
			}else{
				this.formData.itemName=this.loginuserinfo.phonenumber;
			}
			// this.formData.itemName=this.userinfo.phone;
			// console.log("userinfo", this.userinfo)
		},
		methods: {
			formSubmit: function(e) {
				// console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value))
				var formdata = e.detail.value;
				this.request('wxapi/addItems',formdata,'POST',{}).then((res)=>{
					uni.showToast({
						title: '反馈成功',
						icon: 'none'
					})
					this.formData.itemDesc=""
					
				})
			}
		}
	}
</script>
<style lang="scss" scoped>
	.feedbackBg{
		width: 100%;
		// background: #80d9f7;
		display: flex;
		justify-content: center;
		padding: 20rpx 20rpx;
		.uni-form-item .title {
			padding: 20rpx 0;
			font-weight: 700;
		}
		.feedbackContent{
			width: 100%;
			background: #fff;
			padding: 20rpx;
			border-radius: 16rpx;
			.opinion{
				font-size: 40rpx;
				font-weight: 700;
			}
			.feedbackform{
				margin-top: 30rpx;
				.feedbackline{
					padding: 30rpx 0;
					border-bottom: 2rpx solid #dadada;
				}
				.opinionSubmit{
					margin-top: 20rpx;
				}
			}
		}
	}
	
</style>