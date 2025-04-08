<template>
	<view class="routeContent">
		<view class="searchBtn">
			<u-search placeholder="订单号" :showAction="true" v-model="orderValue" shape="round" actionText="查询"
				@search="searchClick()" @custom="searchClick()"></u-search>
		</view>
		<view class="orderstep">
			<view class="ordertitle">
				<view class="ordericon">
					<u-icon name="car" color="#4bcffa" size="28"></u-icon>
					<text class="ordertext">订单号</text>
				</view>
				<text class="ordernum">XSSZDA03762894</text>
			</view>
			<u-line margin="20rpx 0 0 0"></u-line>
			<view class="coluStep">
				<!-- <image class="routeImg" src="../../static/img/routeBg.png" mode=""></image> -->
				<u-steps :current="stepsList.length-2" activeIcon="checkmark-circle-fill" active-color="#00C9FF"
					inactiveIcon="info-circle-fill" inactive-color="#FFB75E" direction="column">
					<view v-for="(item,index) in stepsList" :key="index">
						<u-steps-item :title="item.title" :desc="item.desc"></u-steps-item>
					</view>
				</u-steps>
			</view>

		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				orderValue: "",
				stepsList: [{
						title: "已收货",
						desc: "12-20 12:34"
					},
					{
						title: "已验收",
						desc: "12-20 13:45"
					},
					{
						title: "已上架",
						desc: "12-20 14:21"
					},
					{
						title: "已拣货",
						desc: "12-20 15:10"
					},
					{
						title: "已复核",
						desc: "12-20 17:01"
					},
					{
						title: "已集货",
						desc: "12-20 17:23"
					},
					{
						title: "待配送",
						desc: "12-20 18:45"
					},
				]
			}
		},
		methods: {
			// search 用户确定搜索时触发，用户按回车键，或者手机键盘右下角的"搜索"键时触发
			//custom 用户点击右侧控件时触发
			searchClick() {
				console.log(this.orderValue);
			}
		}
	}
</script>
<style lang="scss">
	.searchBtn {
		text-align: center;
		height: 120rpx;
		line-height: 120rpx;
		padding: 0 20rpx;
		background: #fff;

		// background: linear-gradient(0deg, #24cd4d50 0%, #00e9b420 100%);
		// 查询字体颜色
		::v-deep .u-search__action {
			color: #4bcffa !important;
		}
	}

	.orderstep {
		width: calc(100%-40rpx);
		// height: calc(100%-120rpx);
		border-radius: 16rpx;
		min-height: 600rpx;
		margin: 20rpx;
		background: #fff;
		padding: 20rpx 30rpx;

		.ordertitle {
			display: flex;
			justify-content: space-between;
			align-items: center;
			.ordericon{
				display: flex;
				justify-content: flex-start;
				align-items: center;
				::v-deep .u-icon__icon{
					font-size: 44rpx !important;
				}
			}
			.ordertext {
				font-size: 30rpx;
				// font-weight: 700;
				margin-right: 20rpx;
			}

			.ordernum {
				font-size: 30rpx;
				// color: #4bcffa;
			}
		}

		.coluStep {
			display: flex;
			justify-content: center;
			margin-top: 20rpx;
			background: #f3f5f7;
			// background: linear-gradient(0deg, #24cd4d50 0%, #00e9b420 100%);
			padding: 12rpx;
			border-radius: 16rpx;

			//进度标签背景
			::v-deep .u-steps-item__wrapper {
				background: none !important;
			}

			// 订单进度文字
			::v-deep .u-text__value--content {
				font-size: 30rpx !important;
			}

			// 时间
			::v-deep .u-text__value--tips {
				font-size: 26rpx !important;
			}

			::v-deep .u-steps-item__line--column {
				top: 40rpx;
				height: 80rpx !important;
			}

			// font-size: 44rpx;
			// font-weight: 700;
			// .slot-icon {
			// 	width: 21px;
			// 	height: 21px;
			// 	background-color: $u-warning;
			// 	border-radius: 100px;
			// 	font-size: 12px;
			// 	color: #fff;
			// 	line-height: 21px;
			// 	text-align: center;
			// }
		}
	}
</style>