<template>
	<view>
		<web-view :src="previewUrl">
		</web-view>
	</view>
</template>

<script>
	const app = getApp();

	export default {
		data() {
			return {
				previewUrl: ''
			}
		},
		onLoad(option) {
			if (option != undefined) {
				// console.log(option.url);
				this.previewUrl = decodeURIComponent(option.url);
				console.log(this.previewUrl);
			}
		},
	}
</script>

<style>

</style>