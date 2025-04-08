<template>
	<view class="deliveryOrder">
		<u-toast ref="uToast"></u-toast>
		<view class="stickyBox">
			<view class="searchBtn">
				<u-search placeholder="订单号" :showAction="true" v-model="orderValue" shape="round" actionText="查询"
					:animation="true" @search="searchClick()" @custom="searchClick()"></u-search>
				<text class="screening" @click="handleScreening">筛选</text>
			</view>
			<view class="utabsBox">
				<u-tabs :list="list" :is-scroll="false" :current="current" bar-width="50" active-color="orange"
					@change="change">
				</u-tabs>
			</view>
		</view>
		<view class="tabsBox">
			<view v-if="current===0" class="scrollHeight">
				<view class="scrolllist" v-if="allList&&allList.length>0">
					<view class="orderscrollItem" v-for="(item,index) in allList" :key="index" @click="toDetail(item)">
						<view class="deliveryInfo">
							<view class="itemTitle">
								订单编号：{{item.orderNo}}
							</view>
							<view class="deliveryTime">
								发货时间：{{item.allocateTime}}
							</view>
						</view>
						<view class="deliveryBtn">
							<view class="customButton" @click.stop="handleElec(item)">
								电子随货
							</view>
						</view>
					</view>
					<view class="more_text" v-if="showMoreData">
						没有更多数据了...
					</view>
				</view>
				<view v-else class="empty_box">
					<u-empty mode="order" icon="">
					</u-empty>
				</view>
			</view>
			<view v-if="current===1">
				待配送
			</view>
			<view v-if="current===2">
				配送中
			</view>
			<view v-if="current===3">
				待签收
			</view>
			<view v-if="current===4">
				已完成
			</view>
		</view>
		<u-popup :show="showPopup" :round="10" mode="top" @close="showPopup=false">
			<view class="popup">
				<text class="popupTitle">筛选条件</text>
				<view class="formBox">
					<u--form :model="form" ref="uForm" labelWidth="90px">
						<u-form-item label="时间范围" prop="timeValue" borderBottom @click="showCalendar=true">
							<u-input v-model="form.timeValue" :disabled="true" readonly disabledColor="#ffffff"
								placeholder="请选择时间范围" border="none"></u-input>
							<u-icon slot="right" name="arrow-right"></u-icon>
						</u-form-item>
					</u--form>
				</view>
				<u-calendar :min-date="minDate" :max-date="maxDate" monthNum="60" allowSameDay :formatter="formatter"
					:show="showCalendar" mode="range" @confirm="timeConfirm" @close="showCalendar=false"
					ref="calendar"></u-calendar>
				<view class="submitBtn">
					<view class="customBtn">
						<u-button @click="submit" color="#f6338f">提交</u-button>
					</view>
					<view class="customBtn">
						<u-button @click="cancel"
							color="linear-gradient(to right, rgb(66, 83, 216), rgb(213, 51, 186))">取消</u-button>
					</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>
<script>
	import {
		log
	} from 'util';

	export default {
		data() {
			return {
				showPopup: false,
				orderValue: "",
				form: {
					timeValue: "",
				},
				rules: {
					timeValue: [{
						required: true,
						message: '请输入时间范围',
						trigger: ['blur', 'change']
					}]
				},
				showCalendar: false,
				// tabs栏默认先展示index为0的部分
				current: 0,
				allList: [],
				total: 0,
				showMoreData: false,
				queryParams: {
					pageNum: 1,
					pageSize: 10,
				},
				// 订单开始时间
				startTime: "",
				// 订单结束时间
				endTime: "",
				// minDate:"2024-01-01",
				minDate: new Date(new Date().getFullYear() - 4, 0, 1),
				maxDate: "",
				// maxDate: new Date(new Date().getFullYear() + 1, 0, 1),
				// minDate: new Date(new Date().getFullYear(), 0, 1),
				// maxDate: new Date(new Date().getFullYear(), 11, 31),
				// tabs栏内容
				list: [{
						name: "全部"
					},
					{
						name: "待配送"
					},
					{
						name: "配送中"
					},
					{
						name: "待签收"
					},
					{
						name: "已完成"
					},
				],

			}
		},
		onReady() {
			// #ifdef MP-WEIXIN
			//如果需要兼容微信小程序，并且校验规则中含有方法等，只能通过setRules方法设置规则。
			this.$refs.calendar.setFormatter(this.formatter)
			this.$refs.uForm.setRules(this.rules)
			// #endif
		},
		onShow() {
			//显示当前年月日
			const d = new Date();
			const year = d.getFullYear();
			let month = d.getMonth() + 1;
			month = month < 10 ? `0${month}` : month;
			const date = d.getDate();
			this.maxDate = `${year}-${month}-${date}`;
			uni.pageScrollTo({
				scrollTop: 0
			});
		},

		methods: {
			// 订单详情
			toDetail(items){
				console.log("订单详情","订单详情")
			},
			// 电子随货
			handleElec(items){
				console.log("电子随货","电子随货")
			},
			getallList() {
				uni.showLoading({
					title: '加载中'
				});
				let obj = {
					pageNum: this.queryParams.pageNum,
					pageSize: this.queryParams.pageSize,
					startTime: this.startTime,
					endTime: this.endTime,
					contactTel: "13993076578",
				}
				//如果有接口
				this.request('orderapi/orderList', obj, 'POST', {}).then((res) => {
					uni.hideLoading();
					this.allList = [...this.allList, ...res.data.data.list];
					this.total = res.data.data.totalCount;
				})
			},
			//触底加载
			onReachBottom() {
				console.log("已经触底了");
				//判断是否还有下一页数据
				if (this.queryParams.pageNum * this.queryParams.pageSize >= this.total) {
					this.showMoreData = true;
				} else {
					//让页码值自增+1
					this.queryParams.pageNum += 1;
					this.getallList();
				}

			},
			//下拉刷新
			async onPullDownRefresh() {
				this.queryParams.pageNum = 1;
				this.total = 0;
				this.allList = [];
				try {
					//重新发起数据请求
					await this.getallList();
				} catch (error) {
					this.$refs.uToast.show({
						message: '数据加载失败',
						type: 'error'
					});
				} finally {
					uni.stopPullDownRefresh();
				}
			},
			// 下拉刷新,refresher-triggered的初始值为false要先变为true,执行完刷新操作之后再变为false才会有结果
			// async getFresh() {
			// 	// if(!this.triggered){
			// 	// 	this.triggered=true;
			// 	// 	setTimeout(()=>{
			// 	// 		this.triggered=false;
			// 	// 	},500)
			// 	// }
			// 	this.triggered = true;
			// 	// 重新获取列表数据
			// 	await this.getallList();
			// 	this.triggered = false;
			// },
			// 点击tabs展示响应数据栏
			change(index) {
				this.current = index.index;
			},
			searchClick() {
				console.log(this.orderValue);
			},
			// 点击筛选打开弹窗
			handleScreening() {
				this.showPopup = true;
			},
			timeConfirm(selectValue) {
				console.log(selectValue);
				if (selectValue.length >= 2) {
					this.startTime = selectValue[0];
					this.endTime = selectValue[selectValue.length - 1];
					this.form.timeValue = `${this.startTime}~${this.endTime}`
				}
				this.showCalendar = false;
			},
			formatter(day) {
				const d = new Date()
				let month = d.getMonth() + 1
				const date = d.getDate()
				// if (day.month == month && day.day == date + 3) {
				// 	day.bottomInfo = '有优惠'
				// 	day.dot = true
				// }
				return day
			},
			submit() {
				this.$refs.uForm.validate().then(res => {
					this.getallList();
					// this.$refs.uToast.show({
					// 	message: '校验通过',
					// 	type: 'success'
					// })
				}).catch(errors => {
					this.$refs.uToast.show({
						message: '校验失败',
						type: 'error'
					})
				})
				this.showPopup = false;
			},
			cancel() {
				this.showPopup = false;
			}
		}
	}
</script>
<style lang="scss" scoped>
	.deliveryOrder {
		display: flex;
		flex-direction: column;
		height: 100vh;
		// overflow-y: auto;
	}

	.stickyBox {
		padding: 10rpx 0 0 0;
		position: -webkit-sticky;
		position: sticky;
		top: 0;
		z-index: 999;
		background: #fff;

	}

	.searchBtn {
		flex-shrink: 0;
		width: 100%;
		// height: 120rpx;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		padding: 0 20rpx;
		background: #fff;

		::v-deep .u-search__action {
			color: #000 !important;
		}

		.screening {
			width: 10%;
			margin-left: 10rpx;
			font-weight: 700;
			color: #f6338f;
		}
	}

	.utabsBox {
		display: flex;
		justify-content: center;
	}

	.tabsBox {
		width: 100%;
		flex: 1;
		// background: #fff;
		padding: 0 20rpx;

		.scrolllist {
			display: flex;
			flex-direction: column;
			justify-content: space-between;

			.orderscrollItem {
				height: 200rpx;
				display: flex;
				justify-content: space-around;
				align-items: center;
				border-radius: 16rpx;
				background: #a79ffb;
				margin: 10rpx 0 0 0;
				padding: 30rpx 20rpx;
				.deliveryInfo{
					height: 100%;
					display: flex;
					flex-direction: column;
					justify-content: space-around;
					align-items:flex-start;
					.itemTitle,.deliveryTime {
						font-size: 28rpx;
						font-weight: 700;
					}
				}
				.deliveryBtn{
					z-index: 999;
					height: 100%;
					display: flex;
					align-items: center;
					.customButton{
						width:120rpx;
						height: 50rpx;
						line-height: 50rpx;
						text-align: center;
						font-size: 24rpx;
						border-radius: 8rpx;
						background-color: #00bffe;
						color: #fff;
					}
				}
				
			}

			.more_text {
				color: #999;
				font-size: 24rpx;
				text-align: center;
			}
		}
	}

	.popup {
		padding: 40rpx;
		min-height: 200rpx;
		overflow: hidden;

		// ::v-deep .u-input__content__field-wrapper__field {
		// 	text-align: center !important;
		// }

		.popupTitle {
			font-size: 30rpx;
			font-weight: 700;

		}

		.formBox {
			margin-top: 10rpx;
			padding: 20rpx 30rpx;
			height: 500rpx;
			// border: 1px solid #f3f3f3;
		}

		.submitBtn {
			display: flex;
			justify-content: space-between;
			align-item: center;
			margin-top: 10rpx;

			.customBtn {
				width: 48%;
				border-radius: 16rpx;
			}
		}

	}
</style>