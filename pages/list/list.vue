<template>
	<view>
		<view class="index_view_top">
			<view class="uni-flex uni-row" style="height: 100%;">
				<view class="flex-item" style="width: 100%;height: 100%;">
					<view class="uni-flex uni-column" style="height: 100%;">
						<view class="flex-item flex-item-V" style="height: 50%;padding-bottom: 1%;">
							<view style="height: 100%;padding-top: 6vh;">
								<label style="font-weight: bolder;font-size: 5vw;color: #FFFFFF;">{{user.name==null?"":user.name}}</label>
								<label style="font-size: 4vw;color: #FFFFFF;">{{user.mobile==null?"":user.mobile}}</label>
							</view>
						</view>
						<view class="flex-item flex-item-V" style="height: 50%;">
							<view style="height: 100%;">
								<label style="font-weight: bolder;font-size: 5vw;color: #FFFFFF;">账户余额：</label>
								<label style="font-size: 4vw;color: #FFED58;">{{info.balance}}元</label>
							</view>
						</view>
					</view>
				</view>
				<view style="width: 100%;text-align: right;padding-right: 2vw;">
					<label style="font-size: 12px;color: #FFFFFF;">{{user.organizationName==null?"":user.organizationName}}</label>
				</view>
			</view>
		</view>
		<view>
			<view class="uni-flex uni-row">
				<view class="flex-item_three" @tap="recharge">
					<view class="flex-item">
						<view class="uni-flex uni-column" style="margin-top: 3vh;">
							<view class="flex-item flex-item-V">
								<image src="../../static/img/recharge.png" class="record">
							</view>
							<view class="flex-item flex-item-V">
								<label>充值</label>
							</view>
						</view>
					</view>
				</view>
				<view class="flex-item_three" @tap="serviceOrder">
					<view class="flex-item">
						<view class="uni-flex uni-column" style="margin-top: 3vh;">
							<view class="flex-item flex-item-V">
								<image src="../../static/img/service.png" class="record">
							</view>
							<view class="flex-item flex-item-V">
								<label>服务预约</label>
							</view>
						</view>
					</view>
				</view>
				<view class="flex-item_three" @tap="orderMeal">
					<view class="flex-item">
						<view class="uni-flex uni-column" style="margin-top: 3vh;">
							<view class="flex-item flex-item-V">
								<image src="../../static/img/order.png" class="record">
							</view>
							<view class="flex-item flex-item-V">
								<label>订餐</label>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view style="margin-top: 5vh;background:rgba(255,255,255,1);box-shadow:0px 6px 16px 0px rgba(0,190,134,0.1),0px -2px 10px 0px rgba(0,190,134,0.1);border-radius:6px;width: 95%;margin: 5vw auto;">
			<view style="height: 6vh;padding-left: 5vw;font-weight: 600;font-size: 16px;padding-top: 2vh;">
				记录
			</view>
			<view class="uni-flex uni-row" style="padding-top: 2vh;">
				<view class="flex-item" @tap="rechargeRecord">
					<view class="uni-flex uni-column">
						<view class="flex-item flex-item-V">
							<image src="../../static/img/rechargeRecord.png" class="record">
						</view>
						<view class="flex-item flex-item-V">充值记录</view>
					</view>
				</view>
				<view class="flex-item" @tap="serviceRecord">
					<view class="uni-flex uni-column">
						<view class="flex-item flex-item-V">
							<image src="../../static/img/serviceRecord.png" class="record">
						</view>
						<view class="flex-item flex-item-V">服务记录</view>
					</view>
				</view>
				<view class="flex-item" @tap="mealRecord">
					<view class="uni-flex uni-column">
						<view class="flex-item flex-item-V">
							<image src="../../static/img/orderRecord.png" class="record">
						</view>
						<view class="flex-item flex-item-V">订餐记录</view>
					</view>
				</view>
			</view>
		</view>
		<view v-if="this.user!=null" @tap="call" style="margin: 5vw auto;width: 18vw;background:rgba(255,255,255,1);box-shadow:0px 4px 20px 0px rgba(97,169,122,0.2),0px 0px 4px 0px rgba(97,169,122,0.1);height: 10vh;margin-left: 80%;margin-top: 12vh;text-align: center;border-radius: 50%;">
			<view style="height: 100%;width: 70%;margin: 0 auto;text-align: center;padding-top: 1vh;">
				<view style="background: url(../../static/img/call.png);background-size: 100% 10.5vw;height: 60%;margin: 0 auto;width: 80%;"/>
				<view style="font-size: 12px;color: #00BE86;">
					呼叫
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				user: uni.getStorageSync('user'),
				info: {
					balance: "--",
					organizationName: "",
				},
			}
		},
		onLoad() {
			if (this.user == "") {
				this.$http.showToastOverride("请先登录");
			}
			uni.request({
				url: this.$http.contextPath + 'orderMeal/information',
				method: 'POST',
				header: {
					'Content-Type': 'application/json'
				},
				data: {
					"elderlyId": this.user.id,
					"organId": this.user.organId
				},
				success: (res) => {
					if (res.data.status == 1) {
						this.info.balance = res.data.data.balance
					}
				}
			});
		},
		methods: {
			call(){
				if(this.user==""){
					this.$http.showToastOverride("请先登录");
					return;
				}
				uni.makePhoneCall({
					phoneNumber: '055162143382',
					success: (res) => {
						console.log('拨打成功!')
					},
					fail: (res) => {
						console.log('拨打失败或取消拨打!')
					}
				});
			},
			rechargeRecord() {
				if(this.user==""){
					this.$http.showToastOverride("请先登录");
					return;
				}
				uni.navigateTo({
					url: '/pages/recharge/rechargeRecord'
				});
			},
			serviceRecord() {
				if(this.user==""){
					this.$http.showToastOverride("请先登录");
					return;
				}
				uni.navigateTo({
					url: '/pages/service/serviceRecord'
				});
			},
			orderMeal() {
				if(this.user==""){
					this.$http.showToastOverride("请先登录");
					return;
				}
				uni.navigateTo({
					url: '/pages/meal/orderMeal'
				});
			},
			mealRecord() {
				if(this.user==""){
					this.$http.showToastOverride("请先登录");
					return;
				}
				uni.navigateTo({
					url: '/pages/meal/mealRecord'
				});
			},
			recharge() {
				if(this.user==""){
					this.$http.showToastOverride("请先登录");
					return;
				}
				uni.navigateTo({
					url: '/pages/recharge/recharge'
				});
			},
			serviceOrder() {
				if(this.user==""){
					this.$http.showToastOverride("请先登录");
					return;
				}
				uni.navigateTo({
					url: '/pages/service/serviceOrder'
				});
			},
		}
	}
</script>

<style>
	.record {
		height: 6vh;
		width: 30%;
	}

	.index_view_top {
		background-image: url(../../static/img/two.png);
		width: 100%;
		background-size: 100% 40vw;
		text-align: center;
		width: 100%;
		height: 320rpx;
	}

	.flex-item {
		width: 100%;
		height: 200rpx;
		text-align: center;
		line-height: 200rpx;
	}

	.flex-item_three {
		width: 31%;
		height: 200rpx;
		text-align: center;
		line-height: 200rpx;
		margin-left: 1.5vw;
		margin-top: -4vh;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 6px 16px 0px rgba(0, 190, 134, 0.1), 0px -2px 10px 0px rgba(0, 190, 134, 0.1);
		border-radius: 6px;
	}

	.flex-item-text {
		width: 50%;
		height: 100rpx;
		font-size: 35rpx;
		line-height: 100rpx;
	}

	.flex-item-V {
		width: 100%;
		text-align: center;
		height: 46%;
		line-height: inherit;
	}

	.text {
		margin: 15rpx 10rpx;
		padding: 0 20rpx;
		background-color: #ebebeb;
		height: 70rpx;
		line-height: 70rpx;
		text-align: center;
		color: #777;
		font-size: 26rpx;
	}
</style>
