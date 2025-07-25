<template>
	<view class="routeContent">
		<view class="searchBtn">
			<u-search placeholder="输入追溯码" :showAction="true" v-model="orderValue" shape="round" actionText="查询"
				@search="searchClick()" @custom="searchClick()"></u-search>
		</view>
		<view class="orderstep">
			<view class="codeTop" v-if="drugCodelist&&drugCodelist.length>0">
				<text class="info">药品基本信息</text>
				<view class="detailContent" v-for="(item,index) in drugCodelist" :key="index">
					<view class="detailItem">
						<view class="detailSingle">
							<text class="detailHeader">药品通用名：</text>
							<text class="detailValue">{{item.physic_name}}</text>
						</view>
						<view class="detailSingle">
							<text class="detailHeader">剂型：</text>
							<text class="detailValue">{{item.prepn_type}}</text>
						</view>
						<view class="detailSingle">
							<text class="detailHeader">制剂规格：</text>
							<text class="detailValue">{{item.prepn_spec}}</text>
						</view>
						<view class="detailSingle">
							<text class="detailHeader">包装规格：</text>
							<text class="detailValue">{{item.pkg_spec}}</text>
						</view>
						<view class="detailSingle">
							<text class="detailHeader">包装比例：</text>
							<text class="detailValue">{{item.pkg_ratio}}</text>
						</view>
						<view class="detailSingle">
							<text class="detailHeader">产品批号：</text>
							<text class="detailValue">{{item.produce_batch_no}}</text>
						</view>
						<view class="detailSingle">
							<text class="detailHeader">生产日期：</text>
							<text class="detailValue">{{item.produce_date}}</text>
						</view>
						<view class="detailSingle">
							<text class="detailHeader">有效期至：</text>
							<text class="detailValue">{{item.exprie_date}}</text>
						</view>
					</view>
				</view>
			</view>
			<view class="traceableContent">
				<text class="info">追溯码所在完整包装的关联关系信息(点击追溯码可以查看下级信息)</text>

				<view class="traceableCode">
					<view class="firstCode">
						<view class="firstCodeBox">
							<view class="firstCodeItem" v-for="(item, index) in fatherData" :key="index"
								@click="handlefatherNode(item)" :style="{
			                  backgroundColor: item.clicked ? '#409eff' : '',
			                  color: item.clicked ? '#fff' : '',
			                }">
								{{ item.value }}
								<!-- 								<text class="copyBox" :style="{ color: item.clicked ? '#fff' : '' }"
									@click="handleCopy(item.value)">复制</text> -->
							</view>
						</view>
						<view class="codeNum">共{{ fatherData.length }}个追溯码</view>
					</view>
					<view class="secondCode">
						<scroll-view class="secondCodeBox" style="height: 378rpx;" scroll-y="true">
							<view class="secondCodeItem" v-for="(item, index) in sonData" :key="index"
								@click="handlesonNode(item)" :style="{
			                  backgroundColor: item.clicked ? '#409eff' : '',
			                  color: item.clicked ? '#fff' : '',
			                }">
								{{ item.value }}
								<!-- 								<text class="copyBox" :style="{ color: item.clicked ? '#fff' : '' }"
									@click="handleCopy(item.value)">复制</text> -->
							</view>
						</scroll-view>
						<view class="codeNum">共{{ sonData.length }}个追溯码</view>
					</view>
					<view class="thirdCode">
						<scroll-view class="thirdCodeBox" style="height: 378rpx;" scroll-y="true">
							<view class="thirdCodeItem" v-for="(item, index) in grandsonData" :key="index"
								@click="handlegrandsonNode(item)" :style="{
			                  backgroundColor: item.clicked ? '#409eff' : '',
			                  color: item.clicked ? '#fff' : '',
			                }">
								{{ item.value }}
								<!-- 								<text class="copyBox" :style="{ color: item.clicked ? '#fff' : '' }"
									@click="handleCopy(item.value)">复制</text> -->
							</view>
						</scroll-view>
						<view class="codeNum">共{{ grandsonData.length }}个追溯码</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				drugCodelist: [],
				orderValue: "83422450248465170609",
				dataCode: [],
				fatherData: [],
				sonData: [],
				grandsonData: [],
				tableData: [],
			}
		},
		onLoad(){
			this.searchClick();
		},
		methods: {
			// search 用户确定搜索时触发，用户按回车键，或者手机键盘右下角的"搜索"键时触发
			//custom 用户点击右侧控件时触发
			searchClick() {
				if (this.orderValue) {
					uni.showLoading({
						title: "加载中"
					});
					console.log(this.orderValue);
					let codeValue = {
						code: this.orderValue
					}
					this.request('wxapi/getCodeInfo', codeValue, 'GET', {}).then((res) => {
						if (res.data.msgCode[0] == "SUCCESS") {
							uni.hideLoading();
							this.drugCodelist = res.data.baseInfo;
							this.dataCode = res.data.treeNode[0];
							this.getFatherData(this.dataCode);
						} else {
							uni.hideLoading();
							uni.showToast({
								title: res.data.msgInfo[0],
								icon: 'none',
								duration: 5000
							});
							this.drugCodelist = [];
							this.dataCode = [];
							this.fatherData = [];
							this.sonData = [];
							this.grandsonData = [];
						}

					})
				} else {
					uni.showToast({
						title: "请输入追溯码",
						icon: 'none'
					});
				}

			},
			// handleCopy(copyValue) {
			// 	this.$copyText(copyValue).then(() => {
			// 		this.$message.success("复制成功");
			// 	});
			// },
			getFatherData(data) {
				// this.fatherData=[];
				data.forEach((item) => {
					this.fatherData = [];
					this.fatherData.push({
						value: item.code,
						clicked: false,
						id: item.code,
					});
					if (item.children) {
						this.getSonData(item.children);
					}
				});
			},
			getSonData(data) {
				this.sonData = [];
				this.grandsonData = [];
				data.forEach((item) => {
					const newItem = {
						value: item.code,
						clicked: false,
						id: item.code,
						children: [],
					};
					if (item.children) {
						item.children.map((item) => {
							newItem.children.push({
								value: item.code,
								clicked: false,
								id: item.code,
							});
						});

						this.getGrandsonData(item.children);
					}
					this.sonData.push(newItem);
				});
			},
			getGrandsonData(data) {
				data.forEach((item) => {
					this.grandsonData.push({
						value: item.code,
						clicked: false,
						id: item.code,
					});
				});
			},
			handlefatherNode(item) {
				if (!item.clicked) {
					this.fatherData.forEach((data) => {
						data.clicked = false;
					});
					item.clicked = true;
				} else {
					item.clicked = false;
				}
			},
			handlesonNode(item) {
				this.sonData.forEach((data) => {
					if (item.id == data.id) {
						this.grandsonData = [];
						// ...用于对象、数组，const arr1=[1,2,3];const arr2=[0,...arr1,4];console.log(arr2);//[0,1,2,3,4]
						this.grandsonData.push(...item.children);
						console.log(this.grandsonData);
					}
				});
				//   items.clicked = !items.clicked;
				if (!item.clicked) {
					this.sonData.forEach((data) => {
						data.clicked = false;
					});
					item.clicked = true;
				} else {
					item.clicked = false;
				}
			},
			handlegrandsonNode(item) {
				//   items.clicked = !items.clicked;
				if (!item.clicked) {
					this.grandsonData.forEach((data) => {
						data.clicked = false;
					});
					item.clicked = true;
				} else {
					item.clicked = false;
				}
			},
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
			color: #0690d8 !important;
		}
	}

	.orderstep {
		width: calc(100%-40rpx);
		// height: calc(100%-120rpx);
		border-radius: 16rpx;
		min-height: 600rpx;
		margin: 20rpx;

		// background: #fff;
		// padding: 10rpx 20rpx;
		.info {
			font-weight: 700;

		}

		.codeTop {
			min-height: 400rpx;
			border-radius: 16rpx;
			background: #fff;
			padding: 20rpx 20rpx;

			.detailContent {
				width: 100%;

				.detailItem {
					min-height: 200rpx;
					display: flex;
					flex-direction: column;
					justify-content: center;
					padding: 8rpx 20rpx;
					background-color: #fff;
					border-radius: 16rpx;

					.detailSingle {
						display: flex;
						justify-content: flex-start;
						margin-top: 12rpx;

						.detailHeader {
							width: 40%;
							margin-right: 10rpx;
							color: #696969;
						}

						.detailValue {
							width: 60%;
							color: #252623;
						}
					}
				}
			}

		}

		.traceableContent {
			width: 100%;
			min-height: 800rpx;
			background: #fff;
			margin-top: 10rpx;
			padding: 20rpx 20rpx 30rpx 20rpx;
			border-radius: 16rpx;

			.traceableCode {
				margin-top: 20rpx;
				display: flex;
				flex-direction: column;

				.codeNum {
					font-size: 28rpx;
					color: #ff0012;
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
						/*滚动条里面轨道*/
						// box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2) !important;
						// border-radius: 10px !important;
						background: #FFFFFF !important;
					}
				.firstCode {
					width: 100%;

					.firstCodeBox {
						width: 100%;
						height: 54rpx;
						// border: 2rpx solid #6d6b6b;
						border: 2rpx solid #0690d8;
						border-radius: 16rpx;
						// overflow-y: scroll;
						display: flex;
						flex-direction: column;

						.firstCodeItem {
							height: 54rpx;
							line-height: 54rpx;
							cursor: pointer;
							margin: 0 0 12rpx 0;
							padding: 0 0 0 10rpx;
							// border-bottom: 2rpx solid #bbbbbb;

							.copyBox {
								color: #409eff;
								cursor: pointer;
								margin-left: 6rpx;
								z-index: 999;
							}
						}
					}
				}

				.secondCode {
					width: 100%;
					margin-top: 30rpx;

					.secondCodeBox {
						width: 100%;
						// height: 378rpx;
						// border: 2rpx solid #6d6b6b;
						border: 2rpx solid #0690d8;
						border-radius: 16rpx;
						// overflow-y: scroll;
						display: flex;
						flex-direction: column;

						.secondCodeItem {
							height: 54rpx;
							line-height: 54rpx;
							cursor: pointer;
							// margin: 0 0 12rpx 0;
							padding: 0 0 0 10rpx;
							// border-bottom: 2rpx solid #bbbbbb;

							.copyBox {
								color: #409eff;
								cursor: pointer;
								margin-left: 6rpx;
								z-index: 999;
							}
						}
					}
				}

				.thirdCode {
					width: 100%;
					margin-top: 30rpx;

					.thirdCodeBox {
						width: 100%;
						// height: 378rpx;
						// border: 2rpx solid #6d6b6b;
						border: 2rpx solid #0690d8;
						border-radius: 16rpx;
						// overflow-y: scroll;
						display: flex;
						flex-direction: column;

						.thirdCodeItem {
							height: 54rpx;
							line-height: 54rpx;
							cursor: pointer;
							// margin: 0 0 12rpx 0;
							padding: 0 0 0 10rpx;
							// border-bottom: 2rpx solid #bbbbbb;

							.copyBox {
								color: #409eff;
								cursor: pointer;
								margin-left: 6rpx;
								z-index: 999;
							}
						}
					}
				}
			}
		}
	}
</style>