<template>
	<view>
		<view class="uni-flex uni-row" style="text-align: center;background-color: #F2FCFA;height: 5vh;">
			<view class="flex-item" style="width: 40%;line-height: 5vh;">充值日期</view>
			<view class="flex-item" style="width: 30%;line-height: 5vh;">充值金额</view>
			<view class="flex-item" style="width: 30%;line-height: 5vh;">账户余额</view>
		</view>
		<scroll-view style="height: 95vh;" scroll-y="true" @scrolltolower="lower" @scroll="scroll">
			<view v-for="(item,index) in items" :key="index" class="uni-flex uni-row" style="text-align: center;height: 5vh">
				<view class="flex-item" style="width: 40%;line-height: 5vh;">{{item.createTime}}</view>
				<view class="flex-item" style="width: 30%;line-height: 5vh;">{{item.money==null?'0':item.money}}元</view>
				<view class="flex-item" style="width: 30%;line-height: 5vh;">{{item.balance==null?'0':item.balance}}元</view>
			</view>
		</scroll-view>
		<view :style="numFlag==true?'display: none;':'text-align: center;color:#999999;'">
			没有更多数据了
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				items: [],
				user: uni.getStorageSync('user'),
				current: 1,
				numFlag: true
			}
		},
		onLoad() {
			this.loadData();
		},
		methods: {
			lower: function(e) {
				this.current++;
				if (this.numFlag) {
					this.loadData();
				}
			},
			scroll() {
				if (!this.numFlag) {
					this.numFlag = true;
				}
			},
			loadData() {
				uni.showLoading({
					title: '加载中',
					mask: true
				});
				uni.request({
					url: this.$http.contextPath + 'orderMeal/rechargeRecord',
					method: 'POST',
					header: {
						'Content-Type': 'application/json'
					},
					data: {
						"elderlyId": this.user.id,
						"organId": this.user.organId,
						"current": this.current
					},
					success: (res) => {
						if (res.data.status == 1) {
							let data = res.data.data;
							if (data.length == 0) {
								this.numFlag = false;
							}
							data.forEach(item => {
								this.items.push({
									createTime: item.createTime.replace('T', ' ').substring(0, 19),
									balance: item.balance,
									money: item.money
								})
							})
							uni.hideLoading();
						}
					}
				});
			}
		}
	}
</script>

<style>

</style>
