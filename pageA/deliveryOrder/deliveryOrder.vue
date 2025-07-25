<template>
	<view class="deliveryOrder">
		<u-toast ref="uToast"></u-toast>
		<view class="stickyBox">
			<view class="searchBtn">
				<u-search v-model="orderValue" placeholder="输入订单号" bgColor="#ffffff" searchIconColor="#14cbf5"
					inputAlign="center" :disabled="true" shape="round" :showAction="false"
					@click="gotoSearch"></u-search>
				<view class="screening" @click="handleScreening">筛选</view>
			</view>
			<view class="utabsBox">
				<u-tabs :list="list" :is-scroll="false" lineColor="#00fcff" :activeStyle="{
        color: '#00fcff',
        fontWeight: 'bold',
        transform: 'scale(1.01)'
    }" :current="current" :inactiveStyle="{color:'#fff'}" bar-width="50" active-color="orange" @change="change">
				</u-tabs>
			</view>
		</view>
		<view class="tabsBox">
			<view v-show="current===0" class="scrollHeight">
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
									<text class="orderLeft">订单状态：</text><text
										class="orderRight">{{item.statusDescr}}</text>
								</view>
							</view>
							<view class="logisticsBtn">
								<!-- <image class="orderBg"
									src="https://xhzl.sxhcyywl.com:1443/prod-api/profile/upload/2025/04/28/location_20250428083811A004.png"
									mode="aspectFit"></image> -->
								<view @click.stop="handleLogistics(item)">
									<image class="orderBg"
										src="https://xhzl.sxhcyywl.com:1443/prod-api/profile/upload/2025/06/04/location_20250604081123A051.png"
										mode="widthFix"></image>
								</view>
								<!-- <view @click.stop="handleCode(item)">
									<image class="orderCode"
										src="https://xhzl.sxhcyywl.com:1443/prod-api/profile/upload/2025/06/30/code_20250630004236A042.png"
										mode="widthFix"></image>

								</view> -->

							</view>
						</view>
						<!-- <view class="orderCodeContent">
							<u-cell-group>
								<u-cell icon="scan" title="电子监管码" isLink value="查看详情" :border="false"
									:icon-style="{color:'#0075f7',fontSize:'32rpx',marginTop: '2rpx'}"
									:titleStyle="{color:'#1c1c1c',fontSize:'26rpx'}"
									:rightIconStyle="{color:'#0075f7',fontSize:'26rpx',fontWeight: 'bold'}"
									:url="`/pageA/deliveryOrder/supervisionCode/supervisionCode?orderNo=${item.orderNo}`"></u-cell>
							</u-cell-group>
						</view> -->
						<view class="deliveryBtn">
							<view v-if="item.lineCode=='Y'" class="elecBtn" @click.stop="handleElec(item)">电子随货</view>
							<view class="qualityBtn btngap" v-if="item.ediEdiSendFlag=='Y'"
								@click.stop="handleQuality(item)">订单详情</view>
							<view class="qualityBtn btngap" v-if="item.ediEdiSendFlag=='N'"
								@click.stop="handleAllQuality(item)">订单详情</view>
							<view v-if="item.statusDescr=='签收'" class="qualityBtn btngap confirmBtn"
								@click.stop="handleallConfirm(item)">确认收货</view>
						</view>
					</view>
				</view>
				<view v-if="isLoaded&&allList.length==0" class="empty_box">
					<u-empty mode="order" icon="">
					</u-empty>
				</view>
			</view>
			<view v-show="current===1" class="scrollHeight">
				<view class="scrolllist" v-if="unsignList&&unsignList.length>0">
					<view class="orderscrollItem" v-for="(item,index) in unsignList" :key="index">
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
									<text class="orderLeft">订单状态：</text><text
										class="orderRight">{{item.statusDescr}}</text>
								</view>
							</view>
							<view class="logisticsBtn" @click.stop="handleunsignLogistics(item)">
								<image class="orderBg"
									src="https://xhzl.sxhcyywl.com:1443/prod-api/profile/upload/2025/06/04/location_20250604081123A051.png"
									mode="widthFix"></image>
							</view>
						</view>
						<view class="deliveryBtn">
							<view v-if="item.lineCode=='Y'" class="elecBtn" @click.stop="handleunsignElec(item)">电子随货
							</view>
							<view class="qualityBtn btngap" v-if="item.ediEdiSendFlag=='Y'"
								@click.stop="handleunsingnQuality(item)">订单详情</view>
							<view class="qualityBtn btngap" v-if="item.ediEdiSendFlag=='N'"
								@click.stop="handleunsingnNQuality(item)">订单详情</view>
							<view v-if="item.statusDescr=='签收'" class="qualityBtn btngap confirmBtn"
								@click.stop="handleunsignConfirm(item)">确认收货</view>
						</view>
					</view>
				</view>
				<view v-if="unsignLoaded&&unsignList.length==0" class="empty_box">
					<u-empty mode="order" icon="">
					</u-empty>
				</view>
			</view>
			<view v-show="current===2" class="scrollHeight">
				<view class="scrolllist" v-if="unoutboundList&&unoutboundList.length>0">
					<view class="orderscrollItem" v-for="(item,index) in unoutboundList" :key="index">
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
									<text class="orderLeft">订单状态：</text><text
										class="orderRight">{{item.statusDescr}}</text>
								</view>
							</view>
							<view class="logisticsBtn" @click.stop="handleunboundLogistics(item)">
								<image class="orderBg"
									src="https://xhzl.sxhcyywl.com:1443/prod-api/profile/upload/2025/06/04/location_20250604081123A051.png"
									mode="widthFix"></image>
							</view>
						</view>
						<view class="deliveryBtn">
							<view v-if="item.lineCode=='Y'" class="elecBtn" @click.stop="handleUnoutboundElec(item)">
								电子随货</view>
							<view class="qualityBtn btngap" @click.stop="handleUnoutboundQuality(item)">订单详情</view>
						</view>
					</view>
				</view>
				<view v-if="unoutboundLoaded&&unoutboundList.length==0" class="empty_box">
					<u-empty mode="order" icon="">
					</u-empty>
				</view>
			</view>
		</view>
		<u-popup :show="showPopup" :round="10" mode="top" @close="showPopup=false">
			<view class="popup">
				<view class="procureModule">
					<text class="popupTitle">筛选条件</text>
				</view>
				<view class="formBox">
					<view class="durationBtn">
						<view v-for="item in durationOptions" :key="item.value" class="oneYear"
							:class="{ active: selectedDuration == item.value }" @click="selectDuration(item.value)">
							{{ item.label }}
						</view>
					</view>
				</view>
				<view class="procureModule">
					<text class="popupTitle">采购单位</text>
					<text class="resetBtn" @click="resetProcure">重置</text>
				</view>
				<view class="procurementBox">
					<view class="procurementBtn">
						<view v-for="item in procurementOptions" :key="item.value" class="procureItem">
							{{ item.lable }}
						</view>
					</view>
					<view class="procurementUnit" @click="handleGetprocure()">
						点击选择
					</view>
					<u-picker :show="showProcure" :columns="procureColumns" keyName="lable" @confirm="selectProcure"
						@cancel="cancelProcure"></u-picker>
				</view>
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
				//采购单位给后端传的参数
				labelParams: [],
				//所选采购单位集合
				procurementOptions: [],
				// 采购单位选项弹窗
				showProcure: false,
				procureColumns: [],
				showPopup: false,
				orderValue: "",
				// 开始时间弹窗
				showStart: false,
				// 结束时间弹窗
				showEnd: false,
				// tabs栏默认先展示index为0的部分
				current: 0,
				// 全部订单
				allList: [],
				isLoaded: false, // 新增：数据是否加载完成的标识（初始为false）
				total: 0,
				queryParams: {
					pageNum: 1,
					pageSize: 10,
				},
				//未签收订单
				unsignList: [],
				unsignLoaded: false,
				unsignTotal: 0,
				otherParams: {
					pageNum: 1,
					pageSize: 5,
				},
				// 未出库订单
				unoutboundTotal: 0,
				unoutboundList: [],
				unoutboundLoaded: false,
				// tabs栏内容
				list: [{
						name: "全部",
					},
					{
						name: "运输中",
					},
					{
						name: "未出库",
					},
				],
				// selectedDuration: null,
				selectedDuration: 1,
				durationOptions: [{
						label: '近7天',
						value: 1
					},
					{
						label: '近1个月',
						value: 2
					},
					{
						label: '近3个月',
						value: 3
					},
					{
						label: '近6个月',
						value: 4
					},
					{
						label: '今年',
						value: 5
					}
				],

			}
		},
		onReady() {
			// #ifdef MP-WEIXIN
			//如果需要兼容微信小程序，并且校验规则中含有方法等，只能通过setRules方法设置规则。
			// this.$refs.datetimePicker.setFormatter(this.formatter)
			// this.$refs.uForm.setRules(this.rules)
			// #endif
		},
		onLoad(options) {
			//检查URL参数中是否有tabIndex
			if (options.tabIndex) {
				this.current = Number(options.tabIndex);
			}
			this.getallList();
		},
		onShow() {
			// uni.pageScrollTo({
			// 	scrollTop: 0
			// });

		},
		methods: {
			//监管码
			handleCode(items) {
				const transOrderNo = items.orderNo;
				uni.navigateTo({
					url: `./supervisionCode/supervisionCode?orderNo=${transOrderNo}`
				})
			},
			// handleSeek(){
			// 	uni.navigateTo({
			// 		url:`./orderDetail/qualityDown?url=${encodeURIComponent("https://slip-tms.sxhcyywl.com:15443/api-hc-cloud/slip-ms-base/base/fssRest/preview/ff8081819666867a01978c8b7edc6c80")}`
			// 	})
			// },
			//确认收货公共部分
			commonConfire(receiveItem) {
				let receiveorderNo = receiveItem.orderNo;
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
			// 全部订单的确认收货
			handleallConfirm(items) {
				this.commonConfire(items);
			},
			//未签收确认收货
			handleunsignConfirm(items) {
				this.commonConfire(items);
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
			//跳转到订单号搜索页面
			gotoSearch() {
				uni.navigateTo({
					url: 'orderSearch/orderSearch'
				});
			},
			//未签收订单判断ediEdiSendFlag为N的订单详情
			handleunsingnNQuality(items) {
				let orderNoValue = items.orderNo;
				let addTime = items.addTime;
				uni.navigateTo({
					url: `/pageA/deliveryOrder/orderDetail/orderUnbound?orderNo=${orderNoValue}&addTime=${addTime}`
				});
			},
			//未签收订单详情
			handleunsingnQuality(items) {
				let orderNoValue = items.orderNo;
				let addTime = items.addTime;
				uni.navigateTo({
					url: `orderDetail/orderPreview?orderNo=${orderNoValue}&addTime=${addTime}`
				});
			},
			//未签收电子随货
			handleunsignElec(unsignitems) {
				this.commonElec(unsignitems);
			},
			//未出库电子随货
			handleUnoutboundElec(unoutbounditems) {
				this.commonElec(unoutbounditems);
			},
			// 未出库订单详情
			handleUnoutboundQuality(items) {
				let orderNoValue = items.orderNo;
				let addTime = items.addTime;
				uni.navigateTo({
					url: `/pageA/deliveryOrder/orderDetail/orderUnbound?orderNo=${orderNoValue}&addTime=${addTime}`
				});
			},
			getallList() {
				this.getwholeList();
				this.getUnsignList();
				this.getUnoutboundList();
			},
			//采购单位点击选择
			handleGetprocure() {
				this.showProcure = true;
				this.hideKeyboard();
				// let result = [{
				// 	label: "陕西伟业医药有限公司",
				// 	id: 1
				// }]
				// this.procureColumns.push(result);
				this.request('orderapi/OwnersList', {
					range: this.selectedDuration
				}, 'GET', {}).then((res) => {
					this.procureColumns = [];
					this.procureColumns.push(res.result);
					console.log("procureColumns", res.result, this.procureColumns);
				})
			},
			// 隐藏键盘
			hideKeyboard() {
				uni.hideKeyboard();
			},
			// 重置采购单位
			resetProcure() {
				this.procurementOptions = [];
				this.labelParams = [];
			},
			//采购单位确认按钮
			selectProcure(e) {
				console.log(e);
				const newItem = e.value[0];
				const isDuplicate = this.procurementOptions.some(item => item.id === newItem.id)
				if (isDuplicate) {
					uni.showToast({
						title: "请勿重复选择",
						icon: 'none',
					});
					return;
				}
				this.procurementOptions.push(newItem);
				this.labelParams = this.procurementOptions.map((item) => {
					return item.lable
				})
				console.log("labelParams", this.labelParams)
				this.showProcure = false;
			},
			//采购单位取消按钮
			cancelProcure() {
				this.showProcure = false;
			},
			commonLogistics(items) {
				let orderNoValue = items.orderNo;
				uni.navigateTo({
					url: `orderLogistics/orderLogistics?orderNo=${orderNoValue}`
				})
			},
			// 全部订单物流信息
			handleLogistics(allitems) {
				this.commonLogistics(allitems);
			},
			//未签收订单物流信息
			handleunsignLogistics(unsignitems) {
				this.commonLogistics(unsignitems);
			},
			//未出库订单物流信息
			handleunboundLogistics(unbounditems) {
				this.commonLogistics(unbounditems);
			},
			//全部订单判断ediEdiSendFlag为N的订单详情
			handleAllQuality(items) {
				let orderNoValue = items.orderNo;
				let addTime = items.addTime;
				uni.navigateTo({
					url: `/pageA/deliveryOrder/orderDetail/orderUnbound?orderNo=${orderNoValue}&addTime=${addTime}`
				});
			},
			// 质检查询
			handleQuality(items) {
				let orderNoValue = items.orderNo;
				let addTime = items.addTime;
				uni.navigateTo({
					url: `orderDetail/orderPreview?orderNo=${orderNoValue}&addTime=${addTime}`
				});
			},
			// 全部订单电子随货
			handleElec(allitems) {
				this.commonElec(allitems);
			},
			// 全部订单
			getwholeList() {
				uni.showLoading({
					title: '加载中'
				});
				let obj = {
					pageNum: this.queryParams.pageNum,
					pageSize: this.queryParams.pageSize,
					range: this.selectedDuration,
					owner: this.labelParams,
					// orderNo: this.orderValue,

				}
				//全部订单
				this.request('orderapi/orderList', obj, 'POST', {}).then((res) => {
					this.isLoaded = true;
					uni.hideLoading();
					this.allList = [...this.allList, ...res.rows];
					this.total = res.total;
				}).catch(err => {
					console.error('请求失败', err);
				}).finally(() => {
					uni.hideLoading();
				});
			},
			//未签收订单
			getUnsignList() {
				uni.showLoading({
					title: '加载中'
				});
				let otherobj = {
					pageNum: this.otherParams.pageNum,
					pageSize: this.otherParams.pageSize,
					range: this.selectedDuration,
					owner: this.labelParams,
					// orderNo: this.orderValue,
				}
				//未签收订单
				this.request('orderapi/UnSignInfo', otherobj, 'POST', {}).then((res) => {
					this.unsignLoaded = true;
					uni.hideLoading();
					this.unsignList = [...this.unsignList, ...res.rows];
					this.unsignTotal = res.total;
				}).catch(err => {
					console.error('请求失败', err);
				}).finally(() => {
					uni.hideLoading();
				})
			},
			//未出库订单
			getUnoutboundList() {
				uni.showLoading({
					title: '加载中'
				});
				let otherobj = {
					pageNum: this.otherParams.pageNum,
					pageSize: this.otherParams.pageSize,
					range: this.selectedDuration,
					owner: this.labelParams,
					// orderNo: this.orderValue,
				}
				this.request('orderapi/UnOutInfo', otherobj, 'POST', {}).then((res) => {
					this.unoutboundLoaded = true;
					uni.hideLoading();
					this.unoutboundList = [...this.unoutboundList, ...res.rows];
					this.unoutboundTotal = res.total;
				}).catch(err => {
					console.error('请求失败', err);
				}).finally(() => {
					uni.hideLoading();
				})
			},

			//触底加载
			onReachBottom() {
				console.log("已经触底了");
				console.log("tags", this.current);
				//判断是否还有下一页数据
				if (this.current == 0) {
					if (this.queryParams.pageNum * this.queryParams.pageSize >= this.total) {
						// this.showMoreData = true;
						this.$refs.uToast.show({
							message: '加载完成',
							type: 'default'
						});
						console.log("1885544");
					} else {
						//让页码值自增+1
						this.queryParams.pageNum += 1;
						this.getwholeList();
					}
				}
				if (this.current == 1) {
					if (this.otherParams.pageNum * this.otherParams.pageSize >= this.unsignTotal) {
						this.$refs.uToast.show({
							message: '加载完成',
							type: 'default'
						});
					} else {
						this.otherParams.pageNum += 1;
						this.getUnsignList();
					}
				}
				if (this.current == 2) {
					if (this.otherParams.pageNum * this.otherParams.pageSize >= this.unoutboundTotal) {
						this.$refs.uToast.show({
							message: '加载完成',
							type: 'default'
						});
					} else {
						this.otherParams.pageNum += 1;
						this.getUnoutboundList();
					}
				}

			},
			//下拉刷新
			async onPullDownRefresh() {
				this.procurementOptions = [];
				this.labelParams = [];
				this.queryParams.pageNum = 1;
				this.otherParams.pageNum = 1;
				// 全部订单
				this.total = 0;
				this.allList = [];
				this.isLoaded = false;
				// 未签收订单
				this.unsignTotal = 0;
				this.unsignList = [];
				this.unsignLoaded = false;
				//未出库订单
				this.unoutboundTotal = 0;
				this.unoutboundList = [];
				this.unoutboundLoaded = false;
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
			// 点击tabs展示响应数据栏
			change(index) {
				this.current = index.index;
			},
			// searchClick() {
			// 	console.log(this.orderValue);
			// 	this.allList = [];
			// 	this.isLoaded = false;
			// 	this.getallList();

			// },
			// 点击筛选打开弹窗
			handleScreening() {
				this.queryParams.pageNum = 1;
				this.otherParams.pageNum = 1;
				this.orderValue = "";
				this.showPopup = true;
			},
			selectDuration(value) {
				this.selectedDuration = value;
				console.log("时间按钮", this.selectedDuration);
			},
			submit() {
				if (this.selectedDuration) {
					this.allList = [];
					this.unsignList = [];
					this.unoutboundList = [];
					this.getallList();
					this.showPopup = false;
				} else {
					// this.$refs.uToast.show({
					// 	message: '请先选择时间',
					// 	type: 'error'
					// })
					uni.showToast({
						title: '请先选择时间',
						icon: 'none'
					})
					this.showPopup = true;
				}
			},
			cancel() {
				this.procurementOptions = [];
				this.labelParams = [];
				this.showPopup = false;
			}
		}
	}
</script>
<style lang="scss" scoped>
	.deliveryOrder {
		display: flex;
		flex-direction: column;
		position: relative;

	}

	.stickyBox {
		padding: 10rpx 0 0 0;
		position: -webkit-sticky;
		position: sticky;
		top: 0;
		z-index: 999;
		// background-image: linear-gradient(to bottom, #77c3fe 0%, #0084ff 50%, #49a7fe 100%);
		// height: 90rpx;
		// background-color: #3bdefb;取消搜索框下的背景
		background: #006efa;
	}

	.searchBtn {
		flex-shrink: 0;
		width: 100%;
		// height: 120rpx;
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

		.screening {
			width: 11%;
			// width: 100%;
			height: 56rpx;
			text-align: center;
			line-height: 56rpx;
			// background-color: #e314d2;
			background-color: #41cc43;
			margin-left: 10rpx;
			color: #fff;
			border-radius: 30rpx;
			font-size: 24rpx;
			font-weight: 700;
		}
	}

	.utabsBox {
		display: flex;
		justify-content: center;

		::v-deep .u-tabs__wrapper__nav__item {
			padding: 0 80rpx !important;
		}

		::v-deep .u-tabs__wrapper__nav__item__text {
			font-size: 30rpx !important;
		}
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
				// background: linear-gradient(45deg, #e7f1f9 0%, #c7e0ff10 30%, #fdf4f5 60%, #fdf4f510 100%);
				// background-image: linear-gradient(to right, #77c3fe, #0084ff);取消搜索框下的背景
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
								display: block;
								word-break: break-all;
								white-space: normal;

								.receipt {
									color: #ff283c;
									margin-left: 10rpx;
									font-size: 24rpx;
								}
							}
						}
					}

					.logisticsBtn {
						z-index: 100;
						width: 20%;
						// height: 50rpx;
						// display: flex;
						// flex-direction: column;
						// justify-content: flex-end;

						.orderBg {
							position: absolute;
							width: 10%;
							height: 40%;
							right: 10%;
							bottom: 60%;
							// filter: blur(1rpx);
							z-index: 0;
						}

						// .orderCode {
						// 	position: absolute;
						// 	width: 7%;
						// 	height: 35%;
						// 	right: 0%;
						// 	top: 0%;
						// 	// filter: blur(1rpx);
						// 	z-index: 0;
						// }

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

			// 	.orderCodeContent {
			// 		height: 90rpx;

			// 		::v-deep .u-cell__body {
			// 			padding: 20rpx 30rpx 20rpx 40rpx;
			// 		}
			// 		::v-deep .u-cell__value{
			// 			color: #0075f7 !important;
			// 			font-weight: normal;
			// 			font-size: 26rpx;
			// 		}
			
			// 	}

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
						background: #00dbde !important;
						// border:2rpx solid #00dbde;
						// color:#02cbce;
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

	.popup {
		padding: 40rpx;
		min-height: 200rpx;
		overflow: hidden;

		// ::v-deep .u-input__content__field-wrapper__field {
		// 	text-align: center !important;
		// }
		.procureModule {
			display: flex;
			justify-content: flex-start;
			align-items: center;

			.popupTitle {
				font-size: 30rpx;
				font-weight: 700;
				margin-right: 16rpx;
			}

			.resetBtn {
				width: 80rpx;
				text-align: center;
				height: 40rpx;
				line-height: 40rpx;
				color: #aeaeae;
				border: 2rpx solid #aeaeae;
				border-radius: 26rpx;
				font-size: 24rpx;
			}
		}

		.procurementBox {
			margin-top: 10rpx;
			padding: 20rpx 10rpx;
			// height: 500rpx;
			height: 320rpx;
			overflow-y: scroll;

			.procurementUnit {
				margin-top: 10rpx;
				// background-color: #b1f5cb;
				background-color: #f6f6f6;
				width: 30%;
				height: 60rpx;
				border-radius: 16rpx;
				text-align: center;
				line-height: 60rpx;
			}

			.procurementBtn {
				width: 100%;
				display: flex;
				justify-content: space-between;
				flex-wrap: wrap;

				.procureItem {
					background-color: #f4fdfe;
					border: 2rpx solid #ff9900;
					color: #ff7800;
					font-weight: bold;
					width: 48%;
					height: 60rpx;
					border-radius: 16rpx;
					text-align: center;
					line-height: 60rpx;
					margin: 0 10rpx 10rpx 0;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
				}
			}
		}

		.formBox {
			margin-top: 10rpx;
			padding: 20rpx 30rpx;
			// height: 500rpx;
			height: 220rpx;

			// border: 1px solid #f3f3f3;
			::v-deep .u-input__content__field-wrapper__field {
				text-align: center !important;
			}

			::v-deep .u-form-item__body__right__message {
				margin-left: 280rpx !important;
			}

			.durationBtn {
				width: 100%;
				height: 150rpx;
				display: flex;
				// justify-content: space-between;
				justify-content: flex-start;
				flex-wrap: wrap;

				.oneYear {
					background-color: #f6f6f6;
					width: 30%;
					height: 60rpx;
					border-radius: 16rpx;
					text-align: center;
					line-height: 60rpx;
					margin-right: 20rpx;
				}

				.active {
					background-color: #f4fdfe;
					border: 2rpx solid #ff9900;
					color: #ff7800;
					font-weight: bold;
				}

				&:active {
					opacity: 0.8;
				}
			}
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