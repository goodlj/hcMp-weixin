<template>
	<view>
		<u-toast ref="uToast"></u-toast>
		<view class="detailContent" v-if="orderDetaillist.length>0">
			<view class="logisticsInfo">
				<view class="totalColor">
					订单编号：{{orderNo}}
				</view>
				<view class="steps">
					<u-steps :current="0" activeIcon="info-circle-fill" active-color="#fd1f43"
						inactiveIcon="checkmark-circle-fill" inactive-color="#00c9ff" direction="column">
						<view v-for="(item,index) in showList" :key="index">
							<u-steps-item :title="item.opeRemark" :desc="item.opeTime" iconSize="15"></u-steps-item>
							<!-- <view class="detailItem">
							<view class="detailSingle">
								<text class="detailHeader">{{item.opeRemark}}</text>
								<text class="detailValue">{{item.opeTime}}</text>
							</view>
						</view> -->
						</view>
						<view v-if="showFoldButton" class="fold-btn" @click="toggleFold">
							<u-icon :name="isFolded?'arrow-down':'arrow-up'" size="16" color='#1890ff'></u-icon>
							<text class="fold-text">{{isFolded?'展开更多':"收起"}}</text>
						</view>
					</u-steps>
				</view>
			</view>
		</view>
		<view class="empty" v-if="orderDetaillist.length==0&&loading">
			暂无数据
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				// 订单详情接口传参
				orderNo: "",
				// 订单详情数组
				orderDetaillist: [],
				// 展示暂无数据标识
				loading: false,
				// 订单总数
				queryParams: {
					pageNum: 1,
					pageSize: 10,
				},
				// 默认显示的最大条目数
				maxVisibleItems: 8,
				//是否处于折叠状态
				isFolded: true,
			}
		},
		computed: {
			//是否需要展示收起按钮
			showFoldButton() {
				return this.orderDetaillist.length > this.maxVisibleItems
			},
			//实际显示的列表数据
			showList() {
				return this.isFolded ? this.orderDetaillist.slice(0, this.maxVisibleItems) : this.orderDetaillist;
			}
		},
		onLoad(options) {
			console.log(options);
			this.orderNo = options.orderNo;
			// this.logisticsList();
		},
		onShow() {
			// this.detailList();
			this.logisticsList();
		},
		methods: {
			// 展开或收起
			toggleFold() {
				this.isFolded = !this.isFolded;
			},
			logisticsList() {
				uni.showLoading({
					title: "加载中"
				});
				let orderObj = {
					orderNo: this.orderNo,
					// ...this.queryParams
				}
				this.request('orderapi/orderStatus', orderObj, 'GET', {}).then((res) => {
					this.loading = true;
					uni.hideLoading();
					this.orderDetaillist = res.data.result;
				})
			},
			//下拉刷新
			async onPullDownRefresh() {
				// this.queryParams.pageNum = 1;
				// this.total = 0;
				this.orderDetaillist = [];
				this.loading = false;
				try {
					//重新发起数据请求
					await this.detailList();
				} catch (error) {
					this.$refs.uToast.show({
						message: '数据加载失败',
						type: 'error'
					});
				} finally {
					uni.stopPullDownRefresh();
				}
			},
			// onReachBottom(){
			// 	if(this.queryParams.pageNum*this.queryParams.pageSize>=this.totalNum){
			// 		this.$refs.uToast.show({
			// 			message: '加载完成',
			// 			type: 'default'
			// 		});
			// 	}else{
			// 		this.queryParams.pageNum += 1;
			// 		this.detailList();
			// 	}
			// },
			godetailSearch() {

			},
		}
	}
</script>
<style lang="scss" scoped>
	.searchBtn {
		flex-shrink: 0;
		width: 100%;
		height: 120rpx;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		padding: 0 20rpx;
		background: #fff;

		::v-deep .u-search__action {
			color: #000 !important;
		}

		// .screening {
		// 	width: 10%;
		// 	margin-left: 10rpx;
		// 	font-weight: 700;
		// 	color: #f6338f;
		// }
	}

	.detailContent {
		background-color: #fff;
		// width: 100%;
		border-radius: 16rpx;
		overflow: hidden;
		margin: 20rpx;
		display: flex;
		justify-content: center;

		.logisticsInfo {
			padding: 20rpx 30rpx;
			width: 100%;

			.totalColor {
				font-size: 28rpx;
				// color: #696969;
				color: #242424;
				margin-bottom: 20rpx;
			}

			.steps {
				// border: 1px solid #f0f0f0;
				background-color: #f7f7f7;
				border-radius: 6rpx;
				padding: 0 20rpx;

				::v-deep .u-text__value--main {
					font-weight: 700 !important;
				}

				//进度标签背景
				::v-deep .u-steps-item__wrapper {
					background: #f7f7f7 !important;
				}

				// 订单进度文字
				// ::v-deep .u-text__value--content {
				// 	font-size: 30rpx !important;
				// }

				// 时间
				// ::v-deep .u-text__value--tips {
				// 	font-size: 26rpx !important;
				// }

				::v-deep .u-steps-item__line--column {
					top: 40rpx;
					// height: 60rpx !important;
				}

				::v-deep .u-steps-item__wrapper--column {
					height: 40rpx;
				}

				/* 展开按钮样式 */
				.fold-btn {
					margin-top: 12rpx;
					padding: 16rpx 0;
					display: flex;
					align-items: center;
					justify-content: center;
					background-color: #f8f8f8;
					border-radius: 8rpx;
					transition: all 0.3s;
				}

				.fold-btn:active {
					background-color: #eee;
				}

				.fold-text {
					margin-left: 8rpx;
					font-size: 26rpx;
					color: #1890ff;
				}
			}
		}

		// width: 100%;
		// padding: 20rpx 0;
		// display: flex;
		// flex-direction: column;
		// .detailItem{
		// 	position: relative;
		// 	min-height: 200rpx;
		// 	display: flex;
		// 	flex-direction: column;
		// 	justify-content: center;
		// 	padding: 20rpx 30rpx;
		// 	background-color: #fff;
		// 	border-radius: 16rpx;
		// 	margin-top: 10rpx;
		// 	.detailSingle{
		// 		display: flex;
		// 		justify-content: flex-start;
		// 		.detailHeader{
		// 			width: 24%;
		// 			margin-right: 10rpx;
		// 			color: #696969;
		// 		}
		// 		.detailValue{
		// 			width: 70%;
		// 			color:#252623;
		// 		}
		// 	}
		// 	.previewBg{
		// 		position: absolute;
		// 		right: 40rpx;
		// 		bottom: 70rpx;
		// 	}
		// }
	}

	.empty {
		height: 500rpx;
		line-height: 500rpx;
		width: 100%;
		text-align: center;
	}
</style>