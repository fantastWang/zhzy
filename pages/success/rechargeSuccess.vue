<template>
	<view>
		<view style="height: 98vh;text-align: center;">
			<view style="padding-top: 25vh;">
				<image src="../../static/img/rechargeSuccess.png" style="width: 30vw;height: 15vh;">
			</view>
			<view>
				<label style="color: #666666;font-size: 12px;">您已成功充值</label>
			</view>
			<view>
				<label style="color: #333333;font-size: 30px;font-weight: bolder;">{{money}}元</label>
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
				money:""
			}
		},
		onLoad(options) {
			this.money = options.money;
		},
		methods: {
			index() {
				uni.switchTab({
					url: '/pages/list/list'
				});
			}
		}
	}
</script>

<style>

</style>
