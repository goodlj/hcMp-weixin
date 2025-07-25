<template>
	<view class="addmini">
		<view class="addContent">
			<view class="addIcon">
				<image
					src="https://xhzl.sxhcyywl.com:1443/prod-api/profile/upload/2025/05/27/addMini_20250527005013A026.png"
					mode="widthFix"></image>
			</view>
			<view class="addDesc">
				<view class="descTop">添加到我的小程序</view>
				<view class="descBottom">下次查订单更方便</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {

			}
		}
	}
</script>
<style lang="scss" scoped>
	.addmini {
		width: 100%;
		height: 70rpx;
		position: relative;
		.addContent {
			position: absolute;
			right: 0;
			display: flex;
			justify-content: flex-start;
			align-items: center;
			height: 100%;
			width: 43%;
			background: #fff;
			border-radius: 50rpx;
			padding: 10rpx 30rpx;

			.addIcon {
				width: 55rpx;
				height: 100%;
				align-self:center;
				image {
					width: 100%;
				}
			}

			.addDesc {
				margin-left: 10rpx;

				.descTop {
					font-size: 24rpx;
					font-weight: 700;
				}

				.descBottom {
					font-size: 22rpx;
				}
			}
		}
	}
</style>