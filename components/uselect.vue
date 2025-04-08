<template>
	<view class="container">
		<!-- 显示区域 -->
		<view class="select-box" @click="toggleDropdown">
			<text class="selected-value">{{ selectedValue || defaultValue }}</text>
			<view class="triangle" :class="{ 'triangle-up': isDropdownOpen }"></view>
		</view>

		<!-- 下拉选项 -->
		<view v-if="isDropdownOpen" class="dropdown">
			<scroll-view scroll-y :style="{maxHeight:dropdownMaxHeight+'rpx'}">
				<view v-for="(item, index) in options" :key="index" class="dropdown-item" @click="selectItem(item)">
					{{ item.label }}
				</view>
			</scroll-view>
		</view>

		<!-- 点击外部关闭下拉（可选） -->
		<view v-if="isDropdownOpen" class="mask" @click="closeDropdown"></view>
	</view>
</template>

<script>
	import {
		log
	} from 'util';
	export default {
		props: {
			options: {
				type: Array,
				default: () => []
			},
			// 默认提示文字
			defaultValue: {
				type: String,
				default: '请选择'
			},
			//下拉框最大高度
			dropdownMaxHeight: {
				type: Number,
				default: 200
			}
		},
		data() {
			return {
				isDropdownOpen: false, // 控制下拉框显示
				selectedValue: '', // 选中的值
				selectedLabel: ','
				// defaultValue: '10天内',    // 默认提示文字
				//     options: [                 // 选项列表
				//       { label: '10天内', value: 1 },
				//       { label: '一个月', value: 2 },
				//       { label: '二个月', value: 3 },
				// { label: '三个月', value: 1 },
				// { label: '四个月', value: 2 },
				// { label: '五个月', value: 3 }
				//     ]
			};
		},
		methods: {
			// 切换下拉框状态
			toggleDropdown() {
				this.isDropdownOpen = !this.isDropdownOpen;
			},
			// 选择选项
			selectItem(item) {
				this.selectedLabel = item.label;
				this.selectedValue = item.label;
				this.$emit('change', item);
				// console.log("this.selectedValue", this.selectedValue);
				this.closeDropdown();
			},
			// 关闭下拉框
			closeDropdown() {
				this.isDropdownOpen = false;
			}
		}
	};
</script>

<style lang="scss">
	/* 容器样式 */
	.container {
		position: relative;
		width: 160rpx;
		font-size: 26rpx;
	}

	/* 选择框样式 */
	.select-box {
		display: flex;
		align-items: center;
		padding: 20rpx;
		/* border: 1px solid #ddd; */
		/* border-radius: 4px; */
		background-color: #fff;
		height: 80rpx;
	}

	/* 选中的值 */
	.selected-value {
		flex: 1;
		color: #333;
	}

	/* 三角图标 */
	.triangle {
		width: 0;
		height: 0;
		border-left: 10rpx solid transparent;
		border-right: 10rpx solid transparent;
		border-top: 14rpx solid #bbbbbc;
		/* 默认向下箭头 */
		transition: transform 0.3s;
	}

	/* 展开时箭头向上 */
	.triangle-up {
		transform: rotate(180deg);
	}

	/* 下拉框样式 */
	.dropdown {
		position: absolute;
		width: 100%;
		margin-top: 10rpx;
		border: 2rpx solid #ddd;
		border-radius: 8rpx;
		background-color: #fff;
		z-index: 999;
		box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.1);
	}

	// .dropdown scroll-view {
	// 	max-height: inherit;
	// }

	/* 下拉选项项 */
	.dropdown-item {
		text-align: center;
		height: 60rpx;
		line-height: 60rpx;
		padding: 10rpx;
		color: #333;
	}

	.dropdown-item:active {
		background-color: #f5f5f5;
	}

	/* 遮罩层（点击外部关闭） */
	.mask {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: transparent;
		z-index: 998;
	}
</style>