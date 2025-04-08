<template>
	<view class="content">
		<!-- banner图 -->
		<view class="uni-padding-wrap">
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
		</view>
		<view class="message-box" @click="noticeMore">
			<view class="page-section swiper">
				<view class="page-section-spacing">
					<swiper style="height: 120rpx;" class="swiper" vertical="ture" circular="true"
						indicator-dots='false' indicator-color="rgba(0,0,0,.0)" indicator-active-color="rgba(0,0,0,.0)"
						autoplay="true" interval="4000">
						<swiper-item class="swiper-list" v-for="(item, index) in messageData" :key="index">
							<view class="message-tltle">{{item.noticeTitle}}</view>
							<view class="message-content"><span>感谢</span>{{item.noticeDesc}}</view>
						</swiper-item>
					</swiper>
				</view>
			</view>
		</view>
		<view class="navlist">
			<view class="navItem" v-for="(item,index) in navList" :key="index" @click="handleSkip(index)">
				<image class="navImg" :src="item.navUrl" mode=""></image>
				<text class="navTitle">{{item.title}}</text>
			</view>
		</view>
		<view class="orderInfo">
			<view>
				<view class="infoTitle">
					<text class="logisTitle">物流信息</text>
					<u-icon name="setting-fill" color="#2979ff" size="16"></u-icon>
				</view>
				<view class="infoText">
					<image class="infoImg" src="../../static/img/transport.png" mode=""></image>
					<text class="intransit">运输中</text>
					<view class="dot"></view>
					<text class="intransit">2件</text>
				</view>
			</view>
			<view class="infoContent">
				<view class="medicineList">
					<image class="medicineImg" src="../../static/img/stomachMedicine.jpg" mode=""></image>
				</view>
				<view class="logisticsInfo">
					<view class="receiving">
						<text class="parcelSchedule">已揽件</text>
						<text class="parcelArrive">90%概率后天到达目的地</text>
					</view>
					<text class="parceldesc">胃康宁片</text>
					<text class="parceldesc">中通快递|已在西安市揽收</text>
				</view>
				<view class="setting">
					<u-icon name="more-dot-fill" color="#dddddd" size="20"></u-icon>
				</view>
			</view>
			<u-line></u-line>
			<view class="infoContent">
				<view class="medicineList">
					<image class="medicineImg" src="../../static/img/gmldrug.jpg" mode=""></image>
				</view>
				<view class="logisticsInfo">
					<view class="receiving">
						<text class="parcelSchedule">已揽件</text>
						<text class="parcelArrive">90%概率明天到达目的地</text>
					</view>
					<text class="parceldesc">感冒灵颗粒</text>
					<text class="parceldesc">中通快递|已在宝鸡市揽收</text>
				</view>
				<view class="setting">
					<u-icon name="more-dot-fill" color="#dddddd" size="20"></u-icon>
				</view>
			</view>
			<view class="allpackage">
				<view class="allContent">
					<image class="infoImg" src="../../static/img/allpackage.png" mode=""></image>
					<text class="alltext">全部包裹</text>
				</view>
				<view class="packageNum">
					<view class="alltext">34件</view>
					<u-icon name="arrow-right" color="#dddddd" size="10"></u-icon>
				</view>


			</view>
		</view>
		<view class="contact">
			<button open-type="contact">
				<view class="contactIcon">
					<u-icon name="kefu-ermai" color="#000" size="16"></u-icon>
					<text class="contactText">客服中心</text>
				</view>
			</button>
		</view>
		<!-- <view class="copyright">
			<text>小海智链版权所有</text>
		</view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				bannerList: [
					// {
					// 	bannerImg: 'https://cdn.uviewui.com/uview/swiper/swiper2.png'
					// },
					// {
					// 	bannerImg: 'https://cdn.uviewui.com/uview/swiper/swiper1.png'
					// },
					// {
					// 	bannerImg: 'https://cdn.uviewui.com/uview/swiper/swiper3.png'
					// },
					{
						bannerImg: '../../static/img/banner1.jpg'
					},
					{
						bannerImg: '../../static/img/banner2.jpg'
					},
					{
						bannerImg: '../../static/img/banner3.jpg'
					},

				],
				navList: [
					// {
					// 	navUrl: "../../static/img/route.png",
					// 	title: "路由查询"
					// },
					{
						navUrl: "../../static/img/qualityInspect.png",
						title: "质检报告"
					},
					// {
					// 	navUrl: "../../static/img/electroShip.png",
					// 	title: "电子随货"
					// },
					{
						navUrl: "../../static/img/order.png",
						title: "订单查询"
					},
					// {
					// 	navUrl: "../../static/img/electroCode.png",
					// 	title: "监管码"
					// },
					{
						navUrl: "../../static/img/dataAnalysis.png",
						title: "数据分析"
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
			}
		},
		onLoad() {
			this.getBannerlist();
			// this.myAd()
		},
		methods: {
			//uni.navigateTo()保留当前页面，跳转到应用内的某个页面。需要跳转的应用内非tabBar的页面路径
			handleSkip(indexs) {
				console.log(indexs)
				if (indexs == 0) {
					uni.navigateTo({
						url: '/pageA/route/route'
					})
				} else if (indexs == 1) {
					uni.navigateTo({
						url: '/pageA/deliveryOrder/deliveryOrder'
					})
				} else if (indexs == 2) {
					// uni.reLaunch({
					// 	url: '/pages/me/me'
					// })
					// wx.openCustomerServiceChat({
					// 	extInfo: {
					// 		url: ''
					// 	},
					// 	corpId: '',
					// 	success(res) {
					// 		console.log('客服会话已打开', res)
					// 	}
					// })
				}
			},
			getBannerlist() {
				this.request('loadBaneer', 'GET').then(res => {
					// console.log("res:",res)
					if (res) {
						let imgurl = {};
						for (var i = 0; i < res.data.length; i++) {
							imgurl[i] = {};
							imgurl[i]['bannerImg'] = this.myimgurl() + res.data[i].bannerImg
						}
						console.log("bannerList", imgurl)
						this.bannerList = imgurl
					}
				})
			},
			noticeMore() {
				uni.navigateTo({
					url: '../me/mynotice/mynotice'
				})
			}
		}
	}
</script>

<style lang="scss">
	.content {
		position: relative;
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
		background: url(https://zhoukaiwen.com/img/icon/clock.gif) #FFFFFF;
		background-repeat: no-repeat;
		background-size: 100rpx 100rpx;
		background-position: 15rpx 10rpx;
		margin: 0rpx 0rpx 10rpx 0rpx;
		padding-left: 130rpx;

		.message-tltle {
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
		// justify-content: space-around;
		justify-content: flex-start;
		align-items: center;
		flex-wrap: wrap;
		margin: 20rpx;
		height: 150rpx;
		// height: 200rpx;
		background-color: #fff;
		border-radius: 16rpx;
		padding: 20rpx;

		.navItem {
			display: flex;
			flex-direction: column;
			align-items: center;
			width: 33%;
			// width: 20%;

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

	.orderInfo {
		width: calc(100%-40rpx);
		margin: 20rpx;
		height: 570rpx;
		border-radius: 16rpx;
		padding: 20rpx 40rpx;
		background: linear-gradient(to bottom, #c7e0ff50 0%, #c7e0ff10 20%, #fff 40%, #fff 100%);

		.infoTitle {
			display: flex;
			justify-content: space-between;
			font-weight: 700;
			.logisTitle{
				font-size: 30rpx;
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
			margin: 20rpx 0 20rpx 0;
			width: 100%;
			padding: 0 20rpx;
			display: flex;
			justify-content: space-between;

			.medicineList {
				display: flex;
				justify-content: center;
				align-items: center;
				width: 30%;
				height: 140rpx;
				border: 2rpx solid #f1f1f1;
				box-shadow: -3px -2px 2px rgba(0, 0, 0, 0.2);
				border-radius: 10rpx;

				.medicineImg {
					width: 180rpx;
					height: 120rpx;
				}
			}

			.logisticsInfo {
				margin-left: 8rpx;
				display: flex;
				flex-direction: column;
				height: 130rpx;
				justify-content: space-around;
				width: 65%;

				.parcelSchedule {
					font-weight: 700;
					font-size: 26rpx;
				}

				.parcelArrive {
					margin-left: 6rpx;
					font-size: 26rpx;
					color: #0165c6;
				}

				.parceldesc {
					font-size: 26rpx;
					color: #494949;
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