<template>
	<view class="evaluateContent">
		<view class="touchstar">
			<text>
				评价：
			</text>
			<u-rate :count="count" v-model="starvalue" allowHalf="true" :size="22" @change="handleGetstar"></u-rate>
		</view>
		<u-button type="primary" @click="handlePublish">发表</u-button>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				count: 5,
				starvalue: null,
			}
		},
		methods: {
			handleGetstar(){
				console.log("starvalue", this.starvalue);
			},
			handlePublish() {
				// console.log("starvalue", this.starvalue);
			}
		},
	}
</script>
<style lang="scss" scoped>
	.evaluateContent {
		width: calc(100%-40rpx);
		display: flex;
		flex-direction: column;
		margin: 20rpx;

		.touchstar {
			border-radius: 20rpx;
			display: flex;
			justify-content: flex-start;
			align-items: center;
			width: 100%;
			padding: 20rpx;
			background: #fff;
			margin-bottom: 20rpx;
		}
	}
</style>