<template>
	<view class="singOrdersearch">
		<view class="searchBtn">
			<u-search v-model="orderValue" placeholder="输入订单号" bgColor="#ffffff" searchIconColor="#14cbf5"
				inputAlign="center" :showAction="true" searchIcon="scan" actionText="搜索" :clearabled="true"
				@clickIcon="handleScan" shape="round" @search="gotoSearch" @custom="searchClick"></u-search>
			<!-- 			<view class="screening" @click="handleScreening">筛选</view> -->
		</view>
		<view class="orderdisplay">
			<view class="scrolllist" v-if="allList&&allList.length>0">
				<view class="orderscrollItem" v-for="(item,index) in allList" :key="index">
					<view class="deliverylogistics">
						<view class="deliveryInfo">
							<view class="deliveryItem itemTitle">
								<text class="orderLeft">采购单位：</text><text class="orderRight">{{item.owner}}</text>
							</view>
							<view class="deliveryItem itemTitle">
								<text class="orderLeft">订单编号：</text><text class="orderRight">{{item.orderNo}}</text>
							</view>
							<view class="deliveryItem deliveryTime">
								<text class="orderLeft">开单时间：</text><text class="orderRight">{{item.addTime}}</text>
							</view>
							<view class="deliveryItem deliveryTime">
								<text class="orderLeft">订单状态：</text><text class="orderRight">{{item.statusDescr}}</text>
							</view>
						</view>
						<view class="logisticsBtn" @click.stop="handlesingleLogistics(item)">
							<!-- <image class="orderBg"
								src="https://xhzl.sxhcyywl.com:1443/prod-api/profile/upload/2025/04/28/location_20250428083811A004.png"
								mode="aspectFit"></image> -->
							<image class="orderBg"
								src="https://xhzl.sxhcyywl.com:1443/prod-api/profile/upload/2025/06/04/location_20250604081123A051.png"
								mode="aspectFit"></image>
						</view>
					</view>
					<view class="deliveryBtn">
						<view v-if="item.lineCode=='Y'" class="elecBtn" @click.stop="handlesingleElec(item)">电子随货</view>
						<view class="qualityBtn btngap" @click.stop="handlesingleQuality(item)">订单详情</view>
						<view v-if="item.statusDescr=='签收'" class="qualityBtn btngap confirmBtn"
							@click.stop="handlesingleConfirm(item)">确认收货</view>
					</view>
				</view>
			</view>
			<view v-if="loading&&allList.length==0" class="empty_box">
				<u-empty mode="order" icon="">
				</u-empty>
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
		removeToken
	} from '@/utils/auth';
	export default {
		data() {
			return {
				orderValue: "",
				loading: false,
				total: 0,
				allList: [],
			}
		},
		onLoad() {

		},
		methods: {
			//确认收货
			handlesingleConfirm(items) {
				let receiveorderNo = items.orderNo;
				let receiveParams = {
					orderNo: receiveorderNo
				};
				let that = this;
				uni.showModal({
					title: '提示',
					content: '是否确认收货?',
					success: function(res) {
						if (res.confirm) {
							that.request('orderapi/orderSure', receiveParams, 'GET', {}).then(() => {
								that.commonSearch();
							})
						}
					}
				});
			},
			//订单详情
			handlesingleQuality(items) {
				let orderNoValue = items.orderNo;
				let addTime = items.addTime;
				uni.navigateTo({
					url: `../orderDetail/orderPreview?orderNo=${orderNoValue}&addTime=${addTime}`
				});
			},
			//电子随货
			handlesingleElec(items) {
				uni.showLoading({
					title: '文件下载中...'
				});
				const fileName = items.orderNo;
				uni.downloadFile({
					url: `https://xhzl.sxhcyywl.com:1443/prod-api/orderapi/getElectron?orderNo=${items.orderNo}`,
					filePath: `${wx.env.USER_DATA_PATH}/${fileName}.pdf`,
					header: {
						Authorization: `Bearer ${getToken()}`
					},
					success: (res) => {
						console.log("文件下载", res)
						uni.hideLoading();
						if (res.statusCode === 200) {
							const filePath = res.filePath || res.tempFilePath
							// 1. 解析文件名（增强兼容性）
							// 2. 直接打开临时文件
							// wx.shareFileMessage({
							// 	filePath:filePath,
							// 	// fileName:fileName+'.pdf',
							// 	success:()=>{
							// 		console.log("ceshi")
							// 	}
							// })
							uni.openDocument({
								filePath: filePath,
								// filePath: res.tempFilePath,
								fileType: 'pdf',
								showMenu: true,
								success: () => {
									uni.hideLoading()
									uni.showToast({
										title: `文件已打开,请通过右上角菜单进行分析保存`,
										icon: 'none'
									});
								},
								fail: (err) => {
									uni.hideLoading()
									uni.showToast({
										title: `打开失败：${err.errMsg || '未知错误'}`,
										icon: 'none'
									});
								}
							});
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
			},
			//物流节点查询
			handlesingleLogistics(items) {
				let orderNoValue = items.orderNo;
				uni.navigateTo({
					url: `../orderLogistics/orderLogistics?orderNo=${orderNoValue}`
				})
			},
			// 搜索栏扫码
			handleScan() {
				// uni.setScreenBrightness({
				// 	value: 0.5
				// }); // 保持屏幕常亮
				uni.scanCode({
					// scanType: ['barCode'],
					success: (res) => {
						console.log('条码内容:' + res.result);
						this.orderValue = res.result;
					},
					fail: (err) => {
						//取消扫码err返回的内容{errMsg:"scanCode:fail cancel"}
						console.log(err);
						//以下语法相当于obj[key],变量key的值作为属性名，访问对象obj的对应属性
						const errorMsg = {
							'scanCode:fail auth deny': '摄像头权限被拒绝',
							'scanCode:fail system permission denied': '系统权限不足',
							'scanCode:fail timeout': '扫描超时',
							'scanCode:fail camera not available': '摄像头被占用',
							'scanCode:fail cancel': '已取消扫码'
						} [err.errMsg] || '未知错误';
						uni.showToast({
							title: errorMsg,
							icon: 'none'
						})
						// uni.showModal({
						// 	title: '提示',
						// 	content: errorMsg,
						// 	success: (modalRes) => {
						// 		if (modalRes.confirm) {
						// 			//跳转设置页
						// 			// uni.openSetting();
						// 			this.handleScan();
						// 		}
						// 	}
						// })
					}
				})
			},
			commonSearch() {
				// /\s+/g:这是一个正则表达式，\s:匹配任意空白字符,+:表示匹配前面的空白字符一次或多次，g:全局匹配，表示替换字符串中所有符合条件的部分，而不是只替换第一个，'':替换成空字符串，也就是删除匹配的内容
				const ordervalueFormat=this.orderValue.replace(/\s+/g,'');
				if (ordervalueFormat) {
					uni.showLoading({
						title: "加载中"
					});
					let obj = {
						orderNo: ordervalueFormat,
					}
					this.request('orderapi/orderList', obj, 'POST', {}).then((res) => {
						this.loading = true;
						uni.hideLoading();
						this.allList = res.rows;
						this.total = res.total;
					}).catch(err => {
						console.error('请求失败', err);
					}).finally(() => {
						uni.hideLoading();
					})
				}else{
					uni.showToast({
						title:"请输入订单号",
						icon:'none'
					});
				}
			},
			gotoSearch() {
				this.commonSearch();
			},
			searchClick() {
				this.commonSearch();
			}
		}
	}
</script>
<style lang="scss" scoped>
	.singOrdersearch {
		width: calc(100%-40rpx);
		display: flex;
		flex-direction: column;
		// margin: 20rpx;

		.searchBtn {
			flex-shrink: 0;
			width: 100%;
			height: 100rpx;
			display: flex;
			justify-content: flex-start;
			align-items: center;
			padding: 0 20rpx;
			// background-image: linear-gradient(to bottom, #d6fef6, #abfef4);

			::v-deep .u-search__action {
				color: #fff !important;
				background-color: #14cbf5;
				border-radius: 30rpx;
				// width: 15%;
				height: 56rpx;
				line-height: 56rpx;
				font-size: 24rpx;
				// text-align: center;
			}
		}

		.orderdisplay {
			width: 100%;
			padding: 0 20rpx;

			.scrolllist {
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				// padding: 0 0 20rpx 0;

				.orderscrollItem {
					min-height: 370rpx;
					display: flex;
					flex-direction: column;
					justify-content: space-around;
					// align-items: center;
					border-radius: 16rpx;
					border: 2rpx solid #f5f5f5;
					box-shadow: 0 8rpx 16rpx rgba(0, 0, 0, 0.2);
					/* 投影 */
					background: #e7f1f9;
					margin: 10rpx 0 0 0;
					position: relative;

					.deliverylogistics {
						display: flex;
						justify-content: flex-start;
						// align-items: center;
						height: 100%;

						.deliveryInfo {
							width: 80%;
							min-height: 270rpx;
							display: flex;
							flex-direction: column;
							justify-content: space-between;
							// padding: 20rpx 50rpx 0 50rpx;
							padding: 20rpx 0 18rpx 40rpx;
							z-index: 10;

							.itemTitle,
							.deliveryTime {
								font-size: 28rpx;
							}


							.deliveryItem {
								width: 100%;
								display: flex;
								align-items: baseline; // 基线对齐
								justify-content: flex-start;

								.orderLeft {
									width: 31%;
									color: #757576;
								}

								.orderRight {
									width: 69%;
									color: #0f0f24;

								}
							}
						}

						.logisticsBtn {
							z-index: 100;
							width: 20%;
							height: 50rpx;

							.orderBg {
								position: absolute;
								width: 10%;
								height: 40%;
								right: 10%;
								bottom: 53%;
								// filter: blur(1rpx);
								z-index: 0;
							}

							.carRadius {
								width: 52rpx;
								height: 52rpx;
								display: flex;
								justify-content: center;
								align-items: center;
								border-radius: 50%;
								background-color: #00dbde;
							}
						}
					}


					.deliveryBtn {
						// border-top: 1px solid #e6e6e6;
						// flex: 1;
						// z-index: 999;
						height: 90rpx;
						width: 100%;
						display: flex;
						justify-content: flex-end;
						align-items: center;
						z-index: 10;
						padding: 0 20rpx;
						background: #f9f9f9;
						border-bottom-left-radius: 16rpx;
						border-bottom-right-radius: 16rpx;

						.elecBtn,
						.qualityBtn {
							width: 25%;
							text-align: center;
							height: 60rpx;
							line-height: 60rpx;
							border-radius: 50rpx;
							// background-image: linear-gradient(to right, #ebcd99, #d7ab6a);
							background: #006efa;
							color: #fff;
							// border: 2rpx solid #006efa;
							// color: #0367e6;
							font-size: 24rpx;
							font-weight: 700;
						}

						.btngap {
							margin-left: 20rpx;
						}

						.confirmBtn {
							background: #14cbf5 !important;
							// border:2rpx solid #00dbde;
							color: #fff;
						}

						// .qualityBtn {
						// 	color: #754605;
						// 	font-size: 26rpx;
						// 	background-image: linear-gradient(to right, #ebcd99, #d7ab6a);
						// 	border-radius: 30rpx;

						// 	// background-color: #79c6de;
						// 	&::after {
						// 		// border: 2rpx solid #18b9eb;
						// 		border: none;
						// 	}
						// }
					}

				}

				// .more_text {
				// 	color: #999;
				// 	font-size: 24rpx;
				// 	text-align: center;
				// }

			}
		}
	}
</style>