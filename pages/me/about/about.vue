<template>
	<view class="about">
		<text class="company">关于公司</text>
		<view class="companyProfile">
			陕西海川医药有限公司于2019年成立,是一家专业的第三方医药物流企业,为医药类型客户提供药品存储、分拣复核、委托配送等专业定制化个性服务。
		</view>
		<text class="company">公司地址</text>
		<view class="companyProfile">
			陕西省西咸新区沣东新城丰产路陕西数字医药产业园办公楼1(北楼)第2、3整层
		</view>
		<view class="contactNumber">联系电话：029-84626666</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		onLoad() {

		},

		methods: {

		}
	}
</script>

<style scoped lang="scss">
	.about {
		margin: 0;
		width: 100%;
		height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		color: #fff;
		padding: 100rpx 50rpx;
		background: linear-gradient(-120deg, #F15BB5, #9A5CE5, #01BEFF, #00F5D4);
	}

	.company {
		font-size: 32rpx;
		margin-bottom: 40rpx;
	}
	.companyProfile {
		margin-bottom: 60rpx;
		text-indent: 60rpx;
	}
	.contactNumber{
		font-size: 36rpx;
	}
</style>