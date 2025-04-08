<template>
<scroll-view @scrolltolower="lowerBottom" @refresherrefresh="getFresh" scroll-y="true" class="scrollHeight">
	<view class="list" v-if="person.data.list&&person.data.list.length>0">
		<view class="item" v-for="(item,index) of person.data.list" :key="index" @click="toDetail(item)">
			<view class="item_right">
				<view class="item_title">{{item.Name}}</view>
				<view class="collect_btn" @click.stop="cancelCollect(item)">
					<i :class="['iconfont', 'icon-Frame-11']" style="color:#F06F6F;"/>
				</view>
			</view>
		</view>
		<view class="more_text" v-if="person.showMoreData">没有数据了...</view>
	</view>
	<view v-else class="empty_box">
		<image src="@/static/null_icon.png" mode=""></image>
	</view>
</scroll-view>
</template>
 
<script lang="ts" setup>
import { reactive } from 'vue'
import { GetRemoveCollect } from '@/pages/user/hooks/collect.ts'; // 混入用户操作接口
import { getCollectList } from "@/api/user"
import {onShow} from "@dcloudio/uni-app";
let person:any=reactive({
	// 收藏列表
	data: {
		list: [],
		PageIndex: 1,
		PageSize: 10,
		total: 0
	},
	showMoreData:false
})
// 获取收藏列表
onShow(()=>{
	person.data.PageIndex=1
	uni.pageScrollTo({
	    scrollTop: 0
	});
	GetCollectList()
	if (person.data.PageIndex * person.data.PageSize >= person.data.total) return person.showMoreData=true
})
 
// 接口收藏列表
let GetCollectList = () => {
	uni.showLoading({title: '加载中'});
	let obj={
	    PageIndex: person.data.PageIndex,
	    PageSize: person.data.PageSize,
	}
	getCollectList(obj).then((res:any) => {
		let {Code,Data}=res.data
		if(Code===200){
			uni.hideLoading();
			person.data.list=[...person.data.list,...Data.Data]
			person.data.total = Data.Total
		}
	})
}
 
// 跳转至详情
let toDetail = (item:any) => {
	let obj = { Id: item.Id, NodeId: item.NodeId, IsCollect: 1 }
	uni.setStorageSync('setId', JSON.stringify(obj))
	uni.navigateTo({
		url: `/pages/recording/recordDetails`
	});
}
// 取消收藏
const cancelCollect = (item: any) => {
	uni.showModal({
		title: '是否取消收藏？',
		success: function (res) {
			if (res.confirm) {
				// 确定取消收藏
				GetRemoveCollect(item, item.Id, 1)
				// 获取收藏列表
				setTimeout(()=>{
					GetCollectList()
				},200)
			} else if (res.cancel) {
				// 取消
			}
		}
	});
}
//触底加载
const lowerBottom=()=>{
	// 判断是否还有下一页数据
	if (person.data.PageIndex * person.data.PageSize >= person.data.total) return person.showMoreData=true
	// 让页码值自增 +1
	person.data.PageIndex +=1
	// 重新获取列表数据
	GetCollectList()
}
// 下拉刷新
const getFresh=()=> {
}
</script>
 
<style lang="scss" scoped>
page{
	background: #F5F5F5;
}
.scrollHeight{
	height: 100vh;
	.more_text{
		color: #999;
		font-size: 24rpx;
		text-align: center;
	}
}
.list{
	top: 0rpx;
	padding-bottom: 20rpx;
	.item{
		align-items: center;
		padding: 10rpx 20rpx !important;
	}
	.item_right{
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 90%;
		margin-left: 10rpx;
		.item_title{
			width: 90%;
			height: inherit !important; 
		}
		.collect_btn{
			i{
				font-size: 40rpx;
				margin-left: 20rpx;
			}
		}
	}
}
</style>