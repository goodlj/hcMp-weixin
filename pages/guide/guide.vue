<template>
	<view class="guide-container">
		<!-- 滑动容器 -->
		<swiper class="swiper" :current="currentIndex" @change="onSwiperChange" :indicator-dots="false"
			:autoplay="false">
			<!-- 引导页 1 -->
			<swiper-item>
				<view class="swiper-item guide-page-1">
					<view class="skipModul" @click="handleSkip">
						<view class="skip">
							跳过
						</view>
					</view>
					<image
						src="https://xhzl.sxhcyywl.com:1443/prod-api/profile/upload/2025/05/24/%E7%99%BB%E5%BD%95_20250524070507A010.jpg"
						mode="widthFix"></image>
				</view>
			</swiper-item>

			<!-- 引导页 2 -->
			<swiper-item>
				<view class="swiper-item guide-page-2">
					<view class="skipModul" @click="handleSkip">
						<view class="skip">
							跳过
						</view>
					</view>
					<image
						src="https://xhzl.sxhcyywl.com:1443/prod-api/profile/upload/2025/05/24/%E8%A1%A5%E5%85%85%E4%BF%A1%E6%81%AF%E9%A1%B5_20250524070557A011.jpg"
						mode="widthFix"></image>
					<button class="start-btn" @click="navigateToHome">立即体验</button>
				</view>
			</swiper-item>
			<!-- 引导页3 -->
			<!-- <swiper-item>
        <view class="swiper-item guide-page-3">
          <image src="https://xhzl.sxhcyywl.com:1443/prod-api/profile/upload/2025/05/28/%E9%A6%96%E9%A1%B5_20250528082407A002.jpg" mode="widthFix"></image>
        </view>
      </swiper-item> -->
			<!-- 引导页4 -->
			<!-- <swiper-item>
	    <view class="swiper-item guide-page-4">
	      <image src="https://xhzl.sxhcyywl.com:1443/prod-api/profile/upload/2025/05/24/%E8%AE%A2%E5%8D%95%E5%88%97%E8%A1%A8%E9%A1%B5_20250524080545A017.jpg" mode="widthFix"></image>
	    </view>
	  </swiper-item> -->
			<!-- 引导页5 -->
			<!-- <swiper-item>
	    <view class="swiper-item guide-page-5">
	      <image src="https://xhzl.sxhcyywl.com:1443/prod-api/profile/upload/2025/05/24/%E6%88%91%E7%9A%84_20250524070704A014.jpg" mode="widthFix"></image>
	    </view>
	  </swiper-item> -->
			<!-- 引导页6 -->
			<!-- <swiper-item>
	    <view class="swiper-item guide-page-5">
	      <image src="https://xhzl.sxhcyywl.com:1443/prod-api/profile/upload/2025/05/28/%E9%97%A8%E5%BA%97%E7%AE%A1%E7%90%86_20250528082346A001.jpg" mode="widthFix"></image>
	    </view>
	  </swiper-item> -->
			<!-- 引导页 7（最后一页，带按钮） -->
			<!-- <swiper-item>
        <view class="swiper-item guide-page-6">
          <image src="https://xhzl.sxhcyywl.com:1443/prod-api/profile/upload/2025/05/24/%E5%A1%AB%E5%86%99%E9%97%A8%E5%BA%97%E5%85%A8%E7%A7%B0_20250524082801A018.jpg" mode="widthFix"></image>
          <button class="start-btn" @click="navigateToHome">立即体验</button>
        </view>
      </swiper-item> -->
		</swiper>
		<!-- 自定义指示点 -->
		<view class="indicator">
			<view v-for="(item, index) in 2" :key="index" class="dot" :class="{ active: currentIndex === index }">
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				currentIndex: 0 // 当前页索引
			};
		},
		onShow() {
			uni.hideHomeButton();
		},
		methods: {
			handleSkip() {
				uni.reLaunch({
					url: '/pages/addCompany/addCompany'
				})
			},
			// 滑动时触发
			onSwiperChange(e) {
				this.currentIndex = e.detail.current;
			},
			// 跳转到补充信息页面
			navigateToHome() {
				uni.reLaunch({
					url: '/pages/addCompany/addCompany'
				})
				// 标记已看过引导页
				// uni.setStorageSync('hasShownGuide', true);
				// 跳转逻辑（示例跳转到首页）
				// uni.switchTab({
				// 	url: '/pages/index/index'
				// });

			}
		},
		// 首次启动检查
		onLoad() {
			// const hasShown = uni.getStorageSync('hasShownGuide');
			// if (hasShown) {
			// 	this.navigateToHome();
			// }
		}
	};
</script>
<style scoped lang="scss">
	.guide-container {
		width: 100%;
		height: 100vh;
		position: relative;
		background: #14cbf5;
	}

	.skipModul {
		display: flex;
		justify-content: flex-end;
		width: 100%;
		height: 60rpx;
		padding: 0 50rpx;
		margin-bottom: 10rpx;

		.skip {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 100rpx;
			height: 100%;
			border: 2rpx solid #dedede;
			color: #fff;
			border-radius: 30rpx;
		}
	}

	/* 滑动容器样式 */
	.swiper {
		width: 100%;
		height: 100%;
	}

	.swiper-item {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		// justify-content: center;
		/* background: #ffffff; */
		background: #8f94fb;
		padding: 30rpx 0 0 0;
	}

	.swiper-item image {
		width: 75%;
		max-width: 600rpx;
		border-radius: 30rpx;
	}

	/* 立即体验按钮 */
	.start-btn {
		margin-top: 36rpx;
		background: #14cbf5;
		color: white;
		width: 60%;
		border-radius: 50rpx;
		font-size: 32rpx;

		&::after {
			border: none;
		}
	}

	/* 自定义指示点 */
	.indicator {
		position: absolute;
		bottom: 80rpx;
		left: 0;
		right: 0;
		display: flex;
		justify-content: center;
		gap: 20rpx;
	}

	.dot {
		width: 20rpx;
		height: 20rpx;
		border-radius: 50%;
		background: rgba(0, 0, 0, 0.3);
		transition: all 0.3s;
	}

	.dot.active {
		width: 40rpx;
		border-radius: 10rpx;
		background: #14cbf5;
	}
</style>