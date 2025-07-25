<template>
	<view class="orderInfo">
		<view>
			<view class="infoTitle">
				<view class="titleleft">
					<view class="titleIcon"></view>
					<text class="logisTitle">行业动态</text>
				</view>
				<!-- <u-icon name="setting-fill" color="#2979ff" size="16"></u-icon> -->
				<u-icon name="arrow-right" color="#2979ff" size="16"></u-icon>
			</view>

			<view class="infoContent" v-for="(items,index) in programmsList" :key="index"
				@click="handleDetail(items.id)">
				<view class="medicineList">
					<image class="medicineImg" :src="myimgurl()+items.programImg" mode=""></image>
				</view>
				<view class="logisticsInfo">
					<view class="parcelArrive">{{items.programName}}</view>

					<text class="parceldesc"></text>
					<view class="parceldesc"><u-icon name="clock" color="#696969" size="12"></u-icon>
						<view class="parceleft">
							{{items.createTime}}
						</view>
					</view>
				</view>
				<!-- <view class="setting">
					<u-icon name="more-dot-fill" color="#dddddd" size="20"></u-icon>
				</view> -->
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				//行业动态
				programmsList: [],
			}
		},
		onLoad(){
			this.getloadProgramms();
		},
		methods: {
			// 行业动态
			getloadProgramms() {
				this.request('wxapi/loadProgramms', 'GET', {}).then((res) => {
					this.programmsList = res.data;
					console.log(this.programmsList)
				})
			},
			handleDetail(ids) {
				uni.navigateTo({
					url: `/pages/index/programs/programsDetail?id=${ids}`
				})
			},
		},
	}
</script>
<style lang="scss" scoped>
	.orderInfo {
		width: calc(100%-40rpx);
		margin: 20rpx;
		min-height: 570rpx;
		border-radius: 16rpx;
		padding: 20rpx 40rpx;
		background: linear-gradient(to bottom, #c7e0ff50 0%, #c7e0ff10 20%, #fff 40%, #fff 100%);

		.infoTitle {
			display: flex;
			justify-content: space-between;
			font-weight: 700;

			.titleleft {
				display: flex;
				justify-content: flex-start;
				align-items: center;
			}

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
			margin: 40rpx 0 20rpx 0;
			width: 100%;
			// padding: 0 20rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;

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
				// margin-left: 8rpx;
				margin-left: 12rpx;
				display: flex;
				flex-direction: column;
				height: 150rpx;
				justify-content: space-around;
				width: 72%;
				border-bottom: 2rpx solid #f2f2f2;

				.parcelSchedule {
					font-weight: 700;
					font-size: 26rpx;
				}

				.parcelArrive {
					// margin-left: 6rpx;
					font-size: 26rpx;
					// color: #0165c6;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
					font-weight: 700;
				}

				.parceldesc {
					display: flex;
					justify-content: flex-start;
					align-items: center;
					font-size: 26rpx;
					color: #696969;

					.parceleft {
						margin-left: 10rpx;
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
</style>