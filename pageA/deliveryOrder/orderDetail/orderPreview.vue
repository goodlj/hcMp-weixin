<template>
	<view class="orderPreviewcontent">
		<u-toast ref="uToast"></u-toast>
		<!-- 		<view class="searchBtn">
			<u-search placeholder="输入商品名称" inputAlign="center" :showAction="true" :animation="true" shape="round" :clearabled="true" :disabled="true" @click="godetailSearch()"></u-search>
		</view> -->
		<view class="total" v-if="orderDetaillist.length>0">
			<view class="totalColor">
				订单编号：{{orderNo}},共{{totalNum}}条数据
			</view>
			<view class="detailContent" v-for="(item,index) in orderDetaillist" :key="index">
				<view class="detailItem">
					<view class="detailSingle">
						<text class="detailHeader">商品名称：</text>
						<text class="detailValue">{{item.skuDescr}}</text>
					</view>
					<view class="detailSingle">
						<text class="detailHeader">商品编码：</text>
						<text class="detailValue">{{item.sku}}</text>
					</view>
					<view class="detailSingle">
						<text class="detailHeader">批号：</text>
						<text class="detailValue">{{item.batchNo}}</text>
					</view>
					<view class="detailSingle">
						<text class="detailHeader">规格：</text>
						<text class="detailValue">{{item.gg}}</text>
					</view>
					<view class="detailSingle">
						<text class="detailHeader">数量：</text>
						<text class="detailValue">{{item.qty}}</text>
					</view>
					<view class="detailSingle">
						<text class="detailHeader">有无监管码：</text>
						<text class="detailValue">{{serialNoText(item.serialNoFlag)}}</text>
					</view>
					<view class="previewBg">
						<button type="primary" size="mini" @click="handleQualitydown(item)">质检下载</button>
					</view>

				</view>
			</view>
		</view>
		<view class="empty" v-if="orderDetaillist.length==0&&isload">
			暂无数据
		</view>
		<button class="serviceBtn" open-type="contact" @contact="handleContact" session-from="订单详情页"
			:send-message-title="'关于订单'+orderNo+'的问题'" :send-message-path="detailUrl"
			send-message-img="https://xhzl.sxhcyywl.com:1443/prod-api/profile/upload/2025/06/20/contact_20250620070827A016.png"
			:show-message-card="true">
			<image src="https://xhzl.sxhcyywl.com:1443/prod-api/profile/upload/2025/06/20/servicePerson_20250620070959A017.png"
				mode="widthFix"></image>
		</button>
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
				detailUrl: "",
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
			console.log(options);
			this.orderNo = options.orderNo;
			this.addTime = options.addTime;
			this.detailUrl =`/pageA/deliveryOrder/orderDetail/orderPreview?orderNo=${this.orderNo}&addTime=${this.addTime}`;
			this.detailList();
		},
		onShow() {
			// this.detailList();
		},
		computed: {
			serialNoText() {
				return (value) => {
					if (value === 'Y') return '有';
					if (value === 'N') return '无';
					return value;
				}
			}
		},
		methods: {
			//客服消息，可以从 bindcontact或@contact 回调中获得具体信息
			handleContact(e){
				console.log("客服消息回调",e);
			},
			// 质检下载
			handleQualitydown(items) {
				console.log("质检", items)
				uni.showLoading({
					title: '文件下载中...'
				});
				const fileName = `${items.skuDescr}`;
				// const encodedParam=encodeURLComponent(items.fileId);
				uni.downloadFile({
					url: `https://xhzl.sxhcyywl.com:1443/prod-api/orderapi/pcDetailDownload/${items.orderNo}?fileId=${items.fileId}`,
					filePath: `${wx.env.USER_DATA_PATH}/${fileName}.zip`,
					header: {
						Authorization: `Bearer ${getToken()}`
					},
					success: (res) => {
						console.log("文件下载", res)
						uni.hideLoading();
						if (res.statusCode === 200) {
							const filePath = res.filePath || res.tempFilePath
							//分享
							wx.shareFileMessage({
								filePath: filePath,
								// fileName:fileName+'.pdf',
								success: () => {
									console.log("ceshi")
								}
							})
						} else {
							uni.hideLoading()
							uni.showToast({
								title: `服务器错误：${res.statusCode}`,
								icon: 'none'
							});
						}
					},
					fail: (err) => {
						console.log("err", err);
						uni.hideLoading();
						uni.showToast({
							title: `下载失败：${err.errMsg}`,
							icon: 'none'
						});
					}
				});
				// const url = items.url;
				// const encodeUrl = encodeURIComponent(url);
				// console.log("url", url);
				// uni.navigateTo({
				// 	url: `/pageA/deliveryOrder/orderDetail/qualityDown?url=${encodeUrl}`
				// })
			},
			detailList() {
				uni.showLoading({
					title: "加载中"
				});
				let orderObj = {
					orderNo: this.orderNo,
					addTime: this.addTime,
					...this.queryParams
				}
				this.request('orderapi/getOrderDetial', orderObj, 'POST', {}).then((res) => {
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
			onReachBottom() {
				if (this.queryParams.pageNum * this.queryParams.pageSize >= this.totalNum) {
					this.$refs.uToast.show({
						message: '加载完成',
						type: 'default'
					});
				} else {
					this.queryParams.pageNum += 1;
					this.detailList();
				}
			},
			// godetailSearch() {

			// },
		}
	}
</script>
<style lang="scss" scoped>
	.orderPreviewcontent {
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