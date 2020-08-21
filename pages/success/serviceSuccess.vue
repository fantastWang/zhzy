<template>
	<view>
		<view style="height: 98vh;text-align: center;">
			<view style="padding-top: 25vh;">
				<image src="../../static/img/serviceSuccess.png" style="width: 30vw;height: 15vh;">
			</view>
			<view>
				<label style="color: #333333;font-size: 16px;font-weight: bolder;">服务预约成功</label>
			</view>
			<view>
				<label style="color: #666666;">您的预约已成功，我们会立即处理~</label>
			</view>
			<view style="margin: 0 auto;width: 85%;height: 8vh;font-size: 16px;line-height: 8vh;border-radius:6px;margin-top: 5vh;">
				<button style="background:rgba(24,196,145,1);color: #FFFFFF;" @click="index">返回首页</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			index(){
				uni.switchTab({
					url: '/pages/list/list'
				});
			}
		}
	}
</script>

<style>

</style>
