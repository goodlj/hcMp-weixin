<template>
	<view class="storeContent">
		<!-- <view class="addContent" @click="handleAdd">
			<u-icon name="plus-circle" color="#02800a" size="14"></u-icon>
			<text class="addTitle">新增门店</text>
		</view> -->
		<view class="storeList">
			<view class="storeItem" v-for="(item,index) in companylist" :key="index">
				<text class="storeName">{{item.companyName}}</text>
				<text class="storeAddress">{{item.address}}</text>
				<view class="defaultBtn">
					<view>
						<u-checkbox-group @change="checkboxChange(item)">
							<u-checkbox activeColor="#fb441a" inactiveColor="#696969" v-model="item.isDefault" :checked="item.isDefault=='Y'" shape="circle" label="默认" labelSize="12" labelColor="#696969" iconSize="10"></u-checkbox>
						</u-checkbox-group>
					</view>
					<view>
						<u-button type="info" :plain="true" size="small" @click="deleteStore(item.id)">删除</u-button>
					</view>

				</view>
			</view>
		</view>
		<view class="addStore" @click="handleAdd">
			<view class="addStoreBtn">
				新增门店
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				companylist: [],
			}
		},
		onReady() {
		},
		onLoad() {
			// this.storeList();
		},
		onShow() {
			this.storeList();
		},
		methods: {
			//门店删除
			deleteStore(id) {
				this.request(`company/${id}`, 'GET', {}).then((res) => {
					uni.showToast({
						title: '门店删除成功',
						icon: "none"
					});
					this.storeList();
				})
			},
			//门店切换
			checkboxChange(item) {
				console.log(item.id);
				this.request("company/setDefault", {
					id: item.id
				}, 'POST', {}).then((res) => {
					uni.showToast({
						title: '门店切换成功',
						icon: "none"
					});
					this.storeList();
				})
			},
			handleAdd() {
				uni.navigateTo({
					url:'addStore/addStore'
				})
			},
			storeList() {
				this.request('company/loadCompany', 'GET', {}).then((res) => {
					this.companylist = res.data;
					
				})
			}
		}
	}
</script>
<style lang="scss" scoped>
	.storeContent {
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 20rpx;
		position: relative;

		.addContent {
			width: 100%;
			height: 50rpx;
			display: flex;
			justify-content: flex-start;
			align-items: center;
			padding: 0 0 0 20rpx;

			.addTitle {
				font-size: 24rpx;
				margin-left: 10rpx;
				color:#02800a;
			}
		}
		.addStore{
			position: fixed;
			bottom: 0;
			left: 0;
			right: 0;
			height: 165rpx;
			background: #fff;
			border-top: 2rpx solid #ebebe9;
			display: flex;
			justify-content: center;
			overflow: hidden;
			z-index: 100;
			.addStoreBtn{
				margin-top: 20rpx;
				width: 50%;
				text-align: center;
				height: 90rpx;
				line-height: 90rpx;
				color: #fff;
				font-weight: 700;
				font-size: 30rpx;
				background: #016eff;
				border-radius: 50rpx;
			}
		}
		.storePopup {
			padding: 20rpx;

			.formsubmit {
				margin-top: 50rpx;
				display: flex;
				justify-content: space-between;

				::v-deep .u-button--square {
					width: 30%;
				}
			}
		}

		.storeList {
			width: 100%;
			display: flex;
			flex-direction: column;

			.storeName {
				font-weight: 700;
			}

			.storeAddress {
				font-size: 24rpx;
				color: #696969;
			}

			.storeItem {
				width: 100%;
				min-height: 210rpx;
				border-radius: 16rpx;
				padding: 20rpx 30rpx;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				background: #fff;
				margin-bottom: 20rpx;

				.defaultBtn {
					width: 95%;
					display: flex;
					justify-content: space-between;
					align-items: center;

					button {
						width: 80rpx;

						&::after {
							border: none;
						}
					}

					::v-deep .u-button--plain.u-button--info {
						color: #000;
					}

					::v-deep .u-button--plain {
						background: #f5f4f4;
					}
				}
			}
		}
	}
</style>