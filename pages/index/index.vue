<template>
	<view class="content">
		<u-toast ref="uToast"></u-toast>
		<!-- banner图 -->
		<!-- <view class="uni-padding-wrap">
			<view class="page-section swiper">
				<view class="page-section-spacing">
					<swiper class="swiper" circular="true" indicator-dots="true" autoplay="true" interval="3500"
						duration="600">
						<swiper-item class="swiper-list" v-for="(item, index) in bannerList" :key="index">
							<view class="swiper-item uni-bg-red">
								<image class="swiper-img" :src="item.bannerImg" mode="aspectFill"></image>
							</view>
						</swiper-item>
					</swiper>
				</view>
			</view>
		</view> -->
		<!-- <u-swiper :list="bannerList" keyName="url" height="150" indicatorMode="dot"></u-swiper> -->
		<u-swiper :list="bannerList" keyName="bannerImg" height="150" indicatorMode="dot"></u-swiper>
		<view class="message-box">
			<view v-if="isLogin">
				<view class="phone-number" v-if="!isfirst">
					{{'欢迎用户'+userinfo.nickName || '未设置'}}
				</view>
				<view class="phone-number" v-if="isfirst">
					{{'欢迎用户'+loginuserinfo.nickName || '未设置'}}
				</view>
			</view>
			<view v-else @click="goLogin">
				<view class="phone-number authText">
					点击授权登录
				</view>
			</view>
			<!-- <view class="page-section swiper">
				<view class="page-section-spacing">
					<swiper style="height: 120rpx;" class="swiper" vertical="ture" circular="true"
						indicator-dots='false' indicator-color="rgba(0,0,0,.0)" indicator-active-color="rgba(0,0,0,.0)"
						autoplay="true" interval="4000">
						<swiper-item class="swiper-list" v-for="(item, index) in messageData" :key="index">
							<view class="message-title">{{item.noticeTitle}}</view>
							<view class="message-content"><span>感谢</span>{{item.noticeDesc}}</view>
						</swiper-item>
					</swiper>
				</view>
			</view> -->
		</view>
		<view class="navlist">
			<view class="navItem" v-for="(item,index) in navList" :key="index" @click="handleSkip(index)">
				<image class="navImg" :src="item.navUrl" mode=""></image>
				<text class="navTitle">{{item.title}}</text>
			</view>
		</view>
		<!-- 未签收订单 -->
		<view class="orderInfo">
			<view>
				<view class="infoTitle">
					<view class="titleleft">
						<view class="titleIcon"></view>
						<text class="logisTitle">运输中订单</text>
						<text class="circledot"></text>
						<text class="logisTitle">{{total}}件</text>
					</view>
					<!-- <u-icon name="setting-fill" color="#2979ff" size="16"></u-icon> -->
					<view class="titleRight" @click="goUnsign">
						<text class="seemore">查看全部</text>
						<u-icon name="arrow-right" color="#939297" size="14"></u-icon>
					</view>
				</view>
				<view v-if="allList&&allList.length>0">
					<view class="infoContent" v-for="(item,index) in allList" :key="index">
						<view class="logisticsInfo">
							<view class="itemHeader">
								<view class="orderfont">
									<text class="orderword">订单编号:</text>
									<text class="orderdynamic">{{item.orderNo}}</text>
								</view>
								<!-- 								<text class="statusfont">{{item.statusDescr}}</text> -->
								<view class="statusfont" @click.stop="handleunsignLogistics(item)"><u-icon
										name="car-fill" color="#fff"></u-icon></view>
							</view>

							<view class="parcelArrive">
								<text class="procureUnit purchaseBg">采购单位</text>
								<text class="procureValue procureFont">{{item.owner}}</text>
							</view>
							<view class="parcelArrive">
								<text class="procureUnit issuanceBg">开单时间</text>
								<text class="procureValue procureFont">{{item.addTime}}</text>
							</view>
							<view class="parcelArrive">
								<text class="procureUnit statusBg">订单状态</text>
								<text class="procureValue procureFont">{{item.statusDescr}}</text>
							</view>
							<view class="procureBtn">
								<view v-if="item.lineCode=='Y'" class="elecBtn" @click.stop="handleElec(item)">电子随货
								</view>
								<view class="qualityBtn btngap" v-if="item.ediEdiSendFlag=='Y'"
									@click.stop="handleQuality(item)">订单详情</view>
								<view class="qualityBtn btngap" v-if="item.ediEdiSendFlag=='N'"
									@click.stop="handleAllQuality(item)">订单详情</view>
								<!-- <view class="qualityBtn btngap" @click.stop="handleunsignLogistics(item)">物流节点</view> -->
								<view v-if="item.statusDescr=='签收'" class="qualityBtn btngap confirmBtn"
									@click.stop="handleConfirm(item)">确认收货</view>
							</view>
						</view>
					</view>
				</view>
				<view v-if="isLoaded&&allList.length==0" class="empty_box">
					<u-empty mode="order" icon="">
					</u-empty>
				</view>
			</view>
		</view>
		<!-- 未出库订单 -->
		<view class="orderInfo">
			<view>
				<view class="infoTitle">
					<view class="titleleft">
						<view class="titleIcon"></view>
						<text class="logisTitle">未出库订单</text>
						<text class="circledot"></text>
						<text class="logisTitle">{{unoutboundTotal}}件</text>
					</view>
					<!-- <u-icon name="setting-fill" color="#2979ff" size="16"></u-icon> -->
					<view class="titleRight" @click="goUnbound">
						<text class="seemore">查看全部</text>
						<u-icon name="arrow-right" color="#939297" size="14"></u-icon>
					</view>
				</view>
				<view v-if="unoutboundList&&unoutboundList.length>0">
					<view class="infoContent" v-for="(item,index) in unoutboundList" :key="index">
						<view class="logisticsInfo">
							<view class="itemHeader">
								<view class="orderfont">
									<text class="orderword">订单编号:</text>
									<text class="orderdynamic">{{item.orderNo}}</text>
								</view>
								<!-- 								<text class="statusfont">{{item.statusDescr}}</text> -->
								<view class="statusfont" @click.stop="handleunboundLogistics(item)"><u-icon
										name="car-fill" color="#fff"></u-icon></view>
							</view>

							<view class="parcelArrive">
								<text class="procureUnit purchaseBg">采购单位</text>
								<text class="procureValue procureFont">{{item.owner}}</text>
							</view>
							<view class="parcelArrive">
								<text class="procureUnit issuanceBg">开单时间</text>
								<text class="procureValue procureFont">{{item.addTime}}</text>
							</view>
							<view class="parcelArrive">
								<text class="procureUnit statusBg">订单状态</text>
								<text class="procureValue procureFont">{{item.statusDescr}}</text>
							</view>
							<view class="procureBtn">
								<view v-if="item.lineCode=='Y'" class="elecBtn"
									@click.stop="handleUnoutboundElec(item)">电子随货</view>
								<view class="qualityBtn btngap" @click.stop="handleUnoutboundQuality(item)">订单详情</view>
								<!-- <view class="qualityBtn btngap" @click.stop="handleunboundLogistics(item)">物流节点</view> -->
							</view>
						</view>
					</view>
				</view>
				<view v-if="unoutboundLoaded&&unoutboundList.length==0" class="empty_box">
					<u-empty mode="order" icon="">
					</u-empty>
				</view>
			</view>
		</view>
		<!-- <u-line></u-line> -->
		<view class="contact">
			<button open-type="contact">
				<view class="contactIcon">
					<u-icon name="kefu-ermai" color="#000" size="16"></u-icon>
					<text class="contactText">客服中心</text>
				</view>
			</button>
		</view>
		<button class="serviceBtn" open-type="contact" session-from="首页">
			<image src="https://xhzl.sxhcyywl.com:1443/prod-api/profile/upload/2025/06/20/servicePerson_20250620070959A017.png"
				mode="widthFix"></image>
		</button>
		<!-- <view class="miniprogramAnotherway" v-if="isAddToMyMiniProgram" @click="closeAdd">
			<addMini />
		</view> -->
		<view class="addMiniProgram" v-if="isAddToMyMiniProgram">
			<view class="addMiniImg" @click="closeAdd">
				<image
					src="https://xhzl.sxhcyywl.com:1443/prod-api/profile/upload/2025/06/02/wpadd_20250602011100A032.png"
					mode="widthFix">
				</image>
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
	import {
		addMini
	} from './programs/addMini.vue'
	export default {
		components: {
			addMini
		},
		data() {
			return {
				//是否添加到我的小程序
				isAddToMyMiniProgram: undefined,
				isLogin: undefined,
				isfirst: undefined,
				userinfo: {},
				loginuserinfo: {},
				bannerList: [],
				navList: [{
						navUrl: "https://xhzl.sxhcyywl.com:1443/prod-api/profile/upload/2025/04/25/sc10_20250425130214A012.png",
						title: "订单查询"
					},
					{
						navUrl: "https://xhzl.sxhcyywl.com:1443/prod-api/profile/upload/2025/04/25/sc6_20250425130128A008.png",
						title: "监管码"
					},
					{
						navUrl: "https://xhzl.sxhcyywl.com:1443/prod-api/profile/upload/2025/05/29/trend_20250529085419A019.png",
						title: "行业动态"
					},
					{
						navUrl: "https://xhzl.sxhcyywl.com:1443/prod-api/profile/upload/2025/06/03/notice_20250603094308A046.png",
						title: "通知公告"
					},

				],
				messageData: [{
						noticeTitle: '欢迎使用海川小海智链',
						tag: '感谢',
						// noticeContent: '感谢Uview开源框架'
					},
					// {
					// 	noticeTitle: '「AbuCoder」感谢若依开发框架！',
					// 	tag: '感谢',
					// 	// noticeContent: '第一次做插件，感谢大家的支持哦~'
					// },
					// {
					// 	noticeTitle: '「AbuCoder」感谢ColorUI前段框架！',
					// 	tag: '感谢',
					// 	// noticeContent: '第一次做插件，感谢大家的支持哦~'
					// }
				],
				queryParams: {
					pageNum: 1,
					pageSize: 5,
				},
				// 未签收字段
				total: 0,
				allList: [
					// {
					// 	owner: "陕西海通医药有限公司",
					// 	orderNo: "XSSZDA06529575",
					// 	addTime: "2025-05-24 18:28:48",
					// 	statusDescr: "拣货完成"
					// },
					// {
					// 	owner: "陕西海通医药有限公司",
					// 	orderNo: "XSSZDA06529576",
					// 	addTime: "2025-05-24 8:28:48",
					// 	statusDescr: "拣货完成"
					// },
					// {
					// 	owner: "陕西海通医药有限公司",
					// 	orderNo: "XSSZDA06529575",
					// 	addTime: "2025-05-24 14:28:48",
					// 	statusDescr: "拣货完成"
					// }
				],
				isLoaded: false,
				// 未出库订单
				unoutboundTotal: 0,
				unoutboundList: [],
				unoutboundLoaded: false,
			}
		},
		onLoad() {
			this.getBannerlist();
			console.log("添加小程序", wx.canIUse('checkIsAddedToMyMiniProgram'));
			if (wx.canIUse('checkIsAddedToMyMiniProgram')) {
				this.checkIsAddedToMyMiniProgram();
			}
		},
		onShow() {
			this.checkLoginAndLoadData();
			// const token = getToken();
			this.isfirst = getIsfirst();
			this.userinfo = getUserInfo() || {};
			this.loginuserinfo = getloginuserInfo() || {};
			// if (!token && !this.isfirst) {
			// 	//未登录，返回登录页
			// 	uni.reLaunch({
			// 		url: '/pages/login/login'
			// 	})
			// }
		},
		methods: {
			//检查本地是否存在Token,每次页面显示时检查登录状态
			checkLoginAndLoadData() {
				this.isLogin = getToken();
				if (this.isLogin) {
					this.getallList();
				} else {
					this.allList = [];
					this.total = 0;
					this.unoutboundList = [];
					this.unoutboundTotal = 0;
				}
			},
			goLogin() {
				uni.navigateTo({
					url: '/pages/login/login'
				})
			},
			//确认收货
			handleConfirm(items) {
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
								that.getallList();
							})
						}
					}
				});
			},
			//未签收订单查看全部
			goUnsign() {
				if (!this.isLogin) {
					//未登录，返回登录页
					uni.navigateTo({
						url: '/pages/login/login'
					})
				} else {
					uni.navigateTo({
						url: '/pageA/deliveryOrder/deliveryOrder?tabIndex=1'
					})
				}
			},
			//未出库订单查看全部
			goUnbound() {
				if (!this.isLogin) {
					//未登录，返回登录页
					uni.navigateTo({
						url: '/pages/login/login'
					})
				} else {
					uni.navigateTo({
						url: '/pageA/deliveryOrder/deliveryOrder?tabIndex=2'
					})
				}
			},
			//公共物流节点信息
			commonLogistics(items) {
				let orderNoValue = items.orderNo;
				uni.navigateTo({
					url: `/pageA/deliveryOrder/orderLogistics/orderLogistics?orderNo=${orderNoValue}`
				})
			},
			//未签收订单物流信息
			handleunsignLogistics(unsignitems) {
				this.commonLogistics(unsignitems);
			},
			//未出库订单物流信息
			handleunboundLogistics(unbounditems) {
				this.commonLogistics(unbounditems);
			},
			// 电子随货公共部分
			commonElec(items) {
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
			// 未出库电子随货
			handleUnoutboundElec(unoutbounditems) {
				this.commonElec(unoutbounditems);
			},
			//未签收电子随货
			handleElec(unsignitems) {
				this.commonElec(unsignitems);
			},
			//未签收质检查询
			handleQuality(items) {
				let orderNoValue = items.orderNo;
				let addTime = items.addTime;
				uni.navigateTo({
					url: `/pageA/deliveryOrder/orderDetail/orderPreview?orderNo=${orderNoValue}&addTime=${addTime}`
				});
			},
			//未签收订单判断ediEdiSendFlag为N
			handleAllQuality(items) {
				let orderNoValue = items.orderNo;
				let addTime = items.addTime;
				uni.navigateTo({
					url: `/pageA/deliveryOrder/orderDetail/orderUnbound?orderNo=${orderNoValue}&addTime=${addTime}`
				});
			},
			//未出库质检查询
			handleUnoutboundQuality(items) {
				let orderNoValue = items.orderNo;
				let addTime = items.addTime;
				uni.navigateTo({
					url: `/pageA/deliveryOrder/orderDetail/orderUnbound?orderNo=${orderNoValue}&addTime=${addTime}`
				});
			},
			// 未签收、未出库订单列表
			getallList() {
				uni.showLoading({
					title: '加载中'
				});
				let obj = {
					pageNum: this.queryParams.pageNum,
					pageSize: this.queryParams.pageSize,
				}
				//未签收订单
				this.request('orderapi/UnSignInfo', obj, 'POST', {}).then((res) => {
					this.isLoaded = true;
					uni.hideLoading();
					this.allList = res.rows;
					this.total = res.total;
				}).catch(err => {
					console.error('请求失败', err);
				}).finally(() => {
					uni.hideLoading();
				});
				// 未出库订单
				this.request('orderapi/UnOutInfo', obj, 'POST', {}).then((res) => {
					this.unoutboundLoaded = true;
					uni.hideLoading();
					this.unoutboundList = res.rows;
					this.unoutboundTotal = res.total;
				}).catch(err => {
					console.error('请求失败', err);
				}).finally(() => {
					uni.hideLoading();
				});

			},
			// 下拉刷新
			async onPullDownRefresh() {
				this.queryParams.pageNum = 1;
				this.total = 0;
				this.allList = [];
				this.isLoaded = false;
				// 未出库下拉刷新
				this.unoutboundTotal = 0;
				this.unoutboundList = [];
				this.unoutboundLoaded = false;
				try {
					//重新发起数据请求
					await this.getallList();
				} catch (error) {
					this.$refs.uToast.show({
						message: "数据加载失败",
						type: 'error'
					});
				} finally {
					uni.stopPullDownRefresh();
				}
			},
			// 关闭添加
			closeAdd() {
				this.isAddToMyMiniProgram = false;
			},
			// 添加我的小程序
			checkIsAddedToMyMiniProgram() {
				try {
					wx.checkIsAddedToMyMiniProgram({
						success: (res) => {
							console.log("added", res);
							if (res.added) {
								this.isAddToMyMiniProgram = false;
							} else {
								this.isAddToMyMiniProgram = true;
							}
						},
						fail: () => {
							this.isAddToMyMiniProgram = false;
						}
					})
				} catch (error) {
					console.log('error', error);
				}
			},
			// 点击记住了我去试试关闭内容
			closeMiniprogram() {
				this.isAddToMyMiniProgram = false;
			},
			//uni.navigateTo()保留当前页面，跳转到应用内的某个页面。需要跳转的应用内非tabBar的页面路径
			handleSkip(indexs) {
				console.log(indexs)
				if (indexs == 0) {
					// uni.navigateTo({
					// 	url: '/pageA/route/route'
					// })
					if (!this.isLogin) {
						//未登录，返回登录页
						uni.navigateTo({
							url: '/pages/login/login'
						})
					} else {
						uni.navigateTo({
							url: '/pageA/deliveryOrder/deliveryOrder'
						})
					}
				} else if (indexs == 1) {
					if (!this.isLogin) {
						//未登录，返回登录页
						uni.navigateTo({
							url: '/pages/login/login'
						})
					} else {
						uni.navigateTo({
							url: '/pageA/codequery/codequery'
						})
					}
					// uni.showToast({
					// 	title: '敬请期待...',
					// 	icon: 'none'
					// })
				} else if (indexs == 2) {
					uni.navigateTo({
						url: '/pageA/industryTrends/industryTrends'
					})
				} else if (indexs == 3) {
					uni.navigateTo({
						url: '/pages/me/mynotice/mynotice'
					})
				}
			},
			getBannerlist() {
				this.request('wxapi/loadBaneer', {
					imgType: "0"
				}, 'GET').then(res => {
					// console.log("res:",res)
					if (res) {
						let imgurl = {};
						for (var i = 0; i < res.data.length; i++) {
							imgurl[i] = {};
							imgurl[i]['bannerImg'] = this.myimgurl() + res.data[i].bannerImg
						}
						// console.log("bannerList", imgurl);
						//Object.values()会返回对象所有属性值组成的数组
						this.bannerList = Object.values(imgurl);
						// this.bannerList = imgurl;
					}
				})
			},
			// noticeMore() {
			// 	uni.navigateTo({
			// 		url: '../me/mynotice/mynotice'
			// 	})
			// }
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		position: relative;
		background: #f0f3f7;
	}

	.swiper-box {
		flex: 1;
	}

	.swiper-item {
		width: 100%;
		height: 100%;
	}

	/*通知公告*/
	.message-box {
		width: 100%;
		height: 120rpx;
		// line-height: 120rpx;
		display: flex;
		align-items: center;
		background: url(https://zhoukaiwen.com/img/icon/clock.gif) #FFFFFF;
		background-repeat: no-repeat;
		background-size: 100rpx 100rpx;
		background-position: 15rpx 10rpx;
		margin: 20rpx 0rpx 10rpx 0rpx;
		padding-left: 130rpx;

		.phone-number {
			width: 100%;
			// margin: 20rpx auto;
			margin: 20rpx 0;
			font-size: 30rpx;
			font-weight: 700;
		}

		.authText {
			text-align: center;
			width: 220rpx;
			height: 70rpx;
			line-height: 70rpx;
			// border: 2rpx solid #00d2ff;
			background: #f0f3f7;
			border-radius: 50rpx;
			color: #36adfd;
			font-size: 28rpx;
		}

		.message-title {
			height: 65rpx;
			line-height: 70rpx;
			font-weight: 600;
			font-size: 28rpx;
		}

		.message-content {
			color: #0081ff;

			span {
				background-color: #0081ff;
				color: #FFFFFF;
				padding: 2rpx 8rpx;
				border-radius: 8rpx;
				margin-right: 8rpx;
			}
		}
	}

	.navlist {
		width: calc(100%-40rpx);
		display: flex;
		justify-content: space-around;
		// justify-content: flex-start;
		align-items: center;
		flex-wrap: wrap;
		margin: 20rpx;
		height: 150rpx;
		// height: 200rpx;
		background-color: #fff;
		border-radius: 16rpx;
		padding: 20rpx 10rpx;

		.navItem {
			display: flex;
			flex-direction: column;
			align-items: center;
			// width: 33%;
			width: 20%;

			.navImg {
				width: 70rpx;
				height: 70rpx;
				// width: 60rpx;
				// height: 60rpx;
			}

			.navTitle {
				font-size: 26rpx;
				margin-top: 8rpx;
			}
		}
	}

	.contact {
		width: calc(100%-40rpx);
		margin: 20rpx;

		button {
			background: #fff;
			border-radius: 16rpx;
			font-size: 30rpx;
			height: 80rpx;
			line-height: 80rpx;

			.contactIcon {
				display: flex;
				justify-content: center;

				.contactText {
					margin-left: 16rpx;
				}
			}
		}

		button::after {
			border: 0;
		}
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

	.miniprogramAnotherway {
		width: 100%;
		height: 5%;
		position: absolute;
		z-index: 99;
		top: 0;
	}

	.addMiniProgram {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		right: 0;

		.addMiniImg {
			height: 100%;
			position: relative;

			image {
				width: 100%;
			}

			.closeAddMini {
				width: 100%;
				height: 50rpx;
				line-height: 50rpx;
				text-align: center;
				position: absolute;
				bottom: 30rpx;
				z-index: 999;

				// button &::after {
				// 	border: none;
				// }
				::v-deep .u-button--info {
					width: 50%;
					color: #fff;
					font-size: 28rpx;
					background-color: #27c084;
					border-radius: 30rpx;
					// border: 2rpx solid #fff;
					border: none;
				}
			}
		}


	}

	.orderInfo {
		width: calc(100%-40rpx);
		margin: 20rpx;
		// min-height: 570rpx;
		min-height: 500rpx;
		border-radius: 16rpx;
		padding: 20rpx;
		// background: linear-gradient(to bottom, #c7e0ff50 0%, #c7e0ff10 20%, #fff 40%, #fff 100%);
		background: #fff;

		.infoTitle {
			display: flex;
			justify-content: space-between;

			.titleleft {
				display: flex;
				justify-content: flex-start;
				align-items: center;
				font-weight: 700;

				.titleIcon {
					width: 10rpx;
					height: 34rpx;
					background: #00d2ff;
					border-radius: 30%;
					margin-right: 20rpx;
				}

				.logisTitle {
					font-size: 30rpx;
				}

				.circledot {
					width: 10rpx;
					height: 10rpx;
					border-radius: 50%;
					background: #d7d7d7;
					margin: 0 10rpx 0 10rpx;
				}
			}

			.titleRight {
				display: flex;
				justify-content: flex-start;
				align-items: baseline;

				.seemore {
					color: #939297;
					font-size: 26rpx;
				}
			}
		}

		.infoText {
			margin-top: 30rpx;
			display: flex;
			align-items: center;

			.infoImg {
				width: 40rpx;
				height: 40rpx;
			}

			.intransit {
				margin: 0 12rpx;
				font-weight: 700;
			}

			.dot {
				width: 8rpx;
				height: 8rpx;
				border-radius: 50%;
				background: #c6c6c6;
			}
		}

		.infoContent {
			// margin: 40rpx 0 20rpx 0;
			margin: 20rpx 0;
			width: 100%;
			display: flex;
			flex-direction: column;
			// border-bottom: 2rpx solid #ececec;
			background: #f6fdff;
			// background: #f7f7f7;
			border-radius: 30rpx;

			.medicineList {
				display: flex;
				justify-content: center;
				align-items: center;
				width: 28%;
				// height: 140rpx;
				height: 150rpx;
				// border: 2rpx solid #f1f1f1;
				// box-shadow: -3px -2px 2px rgba(0, 0, 0, 0.2);
				// border-radius: 10rpx;

				.medicineImg {
					width: 200rpx;
					height: 150rpx;

				}
			}

			.logisticsInfo {
				// margin-left: 12rpx;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				// width: 72%;
				width: 100%;
				min-height: 400rpx;
				padding: 0 20rpx;

				// border-bottom: 2rpx solid #f2f2f2;

				.itemHeader {
					display: flex;
					height: 90rpx;
					line-height: 90rpx;
					justify-content: space-between;
					align-items: center;
					border-bottom: 2rpx dashed #ececec;

					.orderfont {
						color: #0b0b0b;
						font-size: 26rpx;

						.orderword {
							margin-right: 20rpx;
						}

						// .orderdynamic{

						// }
					}

					.statusfont {
						border-radius: 50%;
						display: flex;
						justify-content: center;
						align-items: center;
						background: #0081ff;
						width: 50rpx;
						height: 50rpx;

						::v-deep .u-icon__icon {
							font-size: 38rpx !important;
						}

						// color: #5d6266;
						// font-size: 24rpx;
						// color: #fff;
						// width: 140rpx;
						// text-align: center;
						// height: 50rpx;
						// line-height: 50rpx;
						// border-top-left-radius: 40rpx;
						// border-top-right-radius: 20rpx;
						// border-bottom-left-radius: 25rpx;
						// border-bottom-right-radius: 30rpx;
						// background: linear-gradient(to right, #08a669, #44980d);
					}
				}

				.parcelArrive {
					// margin-left: 6rpx;
					display: flex;
					align-items: center;

					// color: #0165c6;
					// white-space: nowrap;
					// overflow: hidden;
					// text-overflow: ellipsis;
					.procureFont {
						font-size: 28rpx;
					}

					.procureUnit {
						width: 15%;
						margin-right: 20rpx;
						text-align: center;
						border-radius: 6rpx;
						height: 36rpx;
						line-height: 36rpx;
						font-size: 22rpx;
						// color: #fff;
					}

					.purchaseBg {
						color: #9b64d9;
						border: 2rpx solid #9b64d9;
						// background: #9b64d9;
					}

					.issuanceBg {
						color: #f19a05;
						border: 2rpx solid #f19a05;
						// background: #ffa100;
					}

					.statusBg {
						color: #ff3737;
						border: 2rpx solid #ff3737;
					}

					.procureValue {
						width: 70%;
					}
				}

				.procureBtn {
					width: 100%;
					display: flex;
					justify-content: flex-end;
					align-items: center;
					height: 100rpx;
					line-height: 100rpx;
					border-top: 2rpx dashed #ececec;

					.elecBtn,
					.qualityBtn {
						width: 25%;
						text-align: center;
						height: 58rpx;
						line-height: 58rpx;
						border-radius: 50rpx;
						background: #429efd;
						color: #fff;
						// border: 2rpx solid #429efd;
						// color: #1d86f2;
						font-size: 24rpx;
						// font-weight: 700;
					}

					.btngap {
						margin-left: 20rpx;
					}

					.confirmBtn {
						background: #00dbde !important;
						// border: 2rpx solid #00dbde;
						// color: #02cbce;
						color: #fff;
					}
				}
			}

			.setting {
				width: 5%;
				text-align: center;
				display: flex;
				align-items: center;

				::v-deep .u-icon--right {
					transform: rotate(90deg);
				}
			}
		}

		.allpackage {
			margin-top: 30rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.alltext {
				margin-left: 10rpx;
				font-weight: 700;
			}

			.allContent {
				display: flex;
				align-items: center;

				.infoImg {
					width: 40rpx;
					height: 40rpx;
				}
			}

			.packageNum {
				display: flex;
				align-items: center;
				justify-content: flex-start;
				color: #0165c6;
			}


		}
	}

	.copyright {
		width: 100%;
		height: 60rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #9E9E9E;
		font-size: 26rpx;
		position: fixed;
		bottom: 0;
	}
</style>