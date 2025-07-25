<template>
	<view class="orderUnboundcontent">
		<u-toast ref="uToast"></u-toast>
		<view class="total" v-if="orderDetaillist.length>0">
			<view class="totalColor">
				订单编号：{{orderNo}},共{{totalNum}}条数据
			</view>
			<view class="detailContent" v-for="(item,index) in orderDetaillist" :key="index">
				<view class="detailItem">
					<view class="detailSingle">
						<text class="detailHeader">商品名称：</text>
<!-- 						<text class="detailValue">{{item.productName}}</text> -->
						<text class="detailValue">马来酸依那普利片</text>
					</view>
					<view class="detailSingle">
						<text class="detailHeader">电子监管码：</text>
						<!-- <text class="detailValue">{{item.regulatoryCodeList.length}}</text> -->
					</view>
					<view class="detailSingle codeheight">
						<scroll-view style="height:200rpx" scroll-y="true">
							<view class="codeItem" v-for="(codeitem,index) in item.regulatoryCodeList">{{codeitem}}
							</view>
						</scroll-view>
						<view class="copyImg" @click="handleCopy(item)">
							<image
								src="https://xhzl.sxhcyywl.com:1443/prod-api/profile/upload/2025/06/28/copy_20250628062121A035.png"
								mode="widthFix"></image>
						</view>
					</view>
					<!-- <view class="detailSingle">
						<text class="detailHeader">商品编码：</text>
						<text class="detailValue">{{item.sku}}</text>
					</view> -->
					<!-- <view class="detailSingle">
						<text class="detailHeader">规格：</text>
						<text class="detailValue">{{item.gg}}</text>
					</view> -->
					<!-- <view class="detailSingle">
						<text class="detailHeader">数量：</text>
						<text class="detailValue">{{item.qty}}</text>
					</view> -->
					<!-- <view class="previewBg">
						<button type="primary" size="mini" @click="handleQualitydown(item)">质检下载</button>
					</view> -->

				</view>
			</view>
		</view>
		<view class="empty" v-if="orderDetaillist.length==0&&isload">
			暂无数据
		</view>
		<!-- <button class="serviceBtn" open-type="contact" @contact="handleContact" session-from="未出库订单详情页"
			:send-message-title="'关于订单'+orderNo+'的问题'" :send-message-path="unboundDetailUrl"
			send-message-img="https://xhzl.sxhcyywl.com:1443/prod-api/profile/upload/2025/06/20/contact_20250620070827A016.png"
			:show-message-card="true">
			<image src="https://xhzl.sxhcyywl.com:1443/prod-api/profile/upload/2025/06/20/servicePerson_20250620070959A017.png"
				mode="widthFix"></image>
		</button> -->
	</view>
</template>
<script>
	import {
		setUserInfo,
		getUserInfo,
		setToken,
		getToken,
		removeUserInfo,
		removeToken
	} from '@/utils/auth';
	export default {
		data() {
			return {
				// 订单详情接口传参
				orderNo: "",
				addTime: "",
				//订单详情咨询url
				// unboundDetailUrl: "",
				// 订单详情数组
				orderDetaillist: [],
				isload: false,
				// 订单总数
				totalNum: null,
				queryParams: {
					pageNum: 1,
					pageSize: 10,
				}
			}
		},
		onLoad(options) {
			this.orderNo = options.orderNo;
			// this.unboundDetailUrl=`/pageA/deliveryOrder/orderDetail/orderUnbound?orderNo=${this.orderNo}&addTime=${this.addTime}`
			this.codeList();
		},
		onShow() {},
		methods: {
			//客服消息，可以从 bindcontact或@contact 回调中获得具体信息
			// handleContact(e){
			// 	console.log("客服消息回调",e);
			// },
			//监管码复制
			handleCopy(items) {
				const copyText = (items.regulatoryCode).split(',').join('\n');
				uni.setClipboardData({
					data: copyText,
					success: () => {
						uni.showToast({
							title: '复制成功',
							icon: 'success'
						});
					}
				})
			},
			codeList() {
				uni.showLoading({
					title: "加载中"
				});
				let codeParams = {
					// orderNo:this.orderNo,
					orderNo: "XSSZDA06736729",
					...this.queryParams
				}
				this.request('orderapi/regulatoryCode', codeParams, 'POST', {}).then((res) => {
					this.isload = true;
					uni.hideLoading();
					this.orderDetaillist = [...this.orderDetaillist, ...res.rows];
					this.totalNum = res.total;
				})
			},
			//下拉刷新
			async onPullDownRefresh() {
				this.queryParams.pageNum = 1;
				this.totalNum = 0;
				this.orderDetaillist = [];
				try {
					//重新发起数据请求
					await this.codeList();
				} catch (error) {
					this.$refs.uToast.show({
						message: '数据加载失败',
						type: 'error'
					});
				} finally {
					uni.stopPullDownRefresh();
				}
			},
			onReachBottom() {
				if (this.queryParams.pageNum * this.queryParams.pageSize >= this.totalNum) {
					this.$refs.uToast.show({
						message: '加载完成',
						type: 'default'
					});
				} else {
					this.queryParams.pageNum += 1;
					this.codeList();
				}
			},
		}
	}
</script>
<style lang="scss" scoped>
	.orderUnboundcontent {
		position: relative;
	}

	.serviceBtn {
		position: fixed;
		right: 15rpx;
		bottom: 15%;
		z-index: 999;
		width: 120rpx;
		height: 120rpx;
		padding: 0;
		margin: 0;
		// background: #ffffff;
		background-color: transparent;
		border-radius: 50%;

		&::after {
			border: 0;
		}
	}

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
	}

	.total {
		height: 50rpx;
		line-height: 50rpx;
		width: 100%;
		padding: 10rpx 30rpx;

		.totalColor {
			font-size: 28rpx;
			color: #696969;
		}

		.detailContent {
			width: 100%;
			// padding: 20rpx 0;
			display: flex;
			flex-direction: column;

			.detailItem {
				position: relative;
				min-height: 200rpx;
				display: flex;
				flex-direction: column;
				justify-content: center;
				padding: 20rpx 30rpx;
				background-color: #fff;
				border-radius: 16rpx;
				margin-top: 10rpx;

				.detailSingle {
					display: flex;
					justify-content: flex-start;

					.detailHeader {
						width: 27%;
						margin-right: 10rpx;
						color: #696969;
					}

					.detailValue {
						width: 70%;
						color: #252623;
					}
				}

				.codeheight {
					// height: 180rpx;
					display: flex;
					flex-direction: column;
					border: 2rpx solid #42d3ad;
					padding: 0 0 0 20rpx;
					border-radius: 20rpx;
					position: relative;
					margin-top: 10rpx;

					.copyImg {
						position: absolute;
						width: 6%;
						height: 28%;
						right: 10%;
						bottom: 30%;
						z-index: 999;
					}

					// 滚动条样式
					::v-deep ::-webkit-scrollbar {
						/*滚动条整体样式*/
						width: 4px !important;
						height: 1px !important;
						overflow: auto !important;
						background: #ccc !important;
						-webkit-appearance: auto !important;
						display: block;
					}

					::v-deep ::-webkit-scrollbar-thumb {
						/*滚动条里面小方块*/
						border-radius: 10px !important;
						box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2) !important;
						background: #7b7979 !important;
					}

					::v-deep ::-webkit-scrollbar-track {
						background: #FFFFFF !important;
					}

					.codeItem {
						width: 100%;
						color: #252623;
						font-size: 28rpx;
						height: 40rpx;
						line-height: 40rpx;
					}
				}

				.previewBg {
					position: absolute;
					z-index: 100;
					right: 40rpx;
					// bottom: 70rpx;
					bottom: 60rpx;
				}
			}
		}
	}

	.empty {
		height: 500rpx;
		line-height: 500rpx;
		width: 100%;
		text-align: center;
	}
</style>