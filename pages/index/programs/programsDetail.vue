<template>
	<view class="programsdetail">
      <view class="programsNew">
      	<view class="programsnewTitle">
      		{{programsNew.programName}}
      	</view>
		<view class="programsTime">
			<u-icon name="clock" color="#696969" size="12"></u-icon>
			<view class="programsleft">
				{{programsNew.createTime}}
			</view>
		</view>
		<view>
			<u-parse class="u-content" :content="programsNew.programContent"></u-parse>
		</view>
      </view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				programsNew:{},
			}
		},
		onLoad(options) {
			console.log(options);
			this.id = options.id;
			this.detailList();
		},
		methods: {
			detailList() {
				this.request('wxapi/getInfo', {
					id: this.id
				}, 'GET', {}).then((res) => {
					this.programsNew=res.data;
				})
			}
		}

	}
</script>
<style lang="scss" scoped>
	.programsdetail {
		width: 100%;
		// background-image: linear-gradient(to right, #afe8f9, #80d9f7);
		background: #80d9f7;
		display: flex;
		justify-content: center;
		padding: 20rpx;
		.programsNew{
			width: 100%;
			min-height: 500rpx;
			background-color: #fff;
			border-radius: 16rpx;
			padding: 20rpx;
			letter-spacing: 2rpx;
			.programsnewTitle{
				font-weight: 700;
			}
			.programsTime{
				display: flex;
				justify-content: flex-start;
				align-items: center;
				margin-top: 20rpx;
				height: 60rpx;
				line-height: 60rpx;
				border-top: 2rpx solid #efefef;
				border-bottom: 2rpx solid #efefef;
				.programsleft{
					margin-left: 10rpx;
				}
			}
			.u-content {
			    padding: 24rpx;
			  }
		}
		
	}
</style>