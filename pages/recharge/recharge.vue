<template>
	<view style="text-align: center;background-color: #F6F6F6;height: 100vh;">
		<view style="margin: 0 auto;width: 95%;margin-top: 3vw;height: 50vh;background-color: #FFFFFF;">
			<view style="text-align: left;margin: 2vw;font-weight: bolder;font-size: 14px;">充值金额</view>
			<view class="uni-flex uni-row" style="text-align: center;height: 5vh;">
				<view :class="[whichSelected=='50'?'selected_view':'not_select_view']" @click="changeMoney($event,50)">50元</view>
				<view :class="[whichSelected=='100'?'selected_view':'not_select_view']" @click="changeMoney($event,100)">100元</view>
				<view :class="[whichSelected=='150'?'selected_view':'not_select_view']" @click="changeMoney($event,150)">150元</view>
			</view>
			<view class="uni-flex uni-row" style="text-align: center;height: 5vh;margin-top: 8vw;">
				<view :class="[whichSelected=='300'?'selected_view':'not_select_view']" @click="changeMoney($event,300)">300元</view>
				<view :class="[whichSelected=='500'?'selected_view':'not_select_view']" @click="changeMoney($event,500)">500元</view>
				<view :class="[whichSelected=='1000'?'selected_view':'not_select_view']" @click="changeMoney($event,1000)">1000元</view>
			</view>
			<view class="money_desc">输入其他金额</view>
			<view class="uni-flex uni-row">
				<view class="flex-item" style="width: 80%;text-align: left;">
					<input class="uni-input" type="number" maxlength="5" @input="onKeyUserNameInput($event)" placeholder="请输入充值金额" />
				</view>
				<view class="flex-item" style="width: 20%;line-height: 5vh;font-size: 18px;">元</view>
			</view>
		</view>
		<view class="bottom_view">
			<button class="button" @click="getOpenId()">确定</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				user: uni.getStorageSync('user'),
				money: 50,
				whichSelected: "50"
			}
		},
		onLoad() {},
		methods: {
			//选择金额
			changeMoney(obj, money) {
				this.money = money;
				this.whichSelected = money;
			},
			//输入金额
			onKeyUserNameInput(event) {
				this.money = event.target.value;
			},
			//授权，获取openId
			getOpenId() {
				uni.login({
					provider: this.user.provider,
					success: (e) => {
						if (this.user.provider == 'weixin') {
							uni.request({
								url: this.$http.contextPath + 'orderMeal/getOpenId',
								method: 'POST',
								header: {
									'Content-Type': 'application/json'
								},
								data: {
									"code": e.code
								},
								success: (res) => {
									if (res.data.status == 1) {
										this.payment(res.data.data.openid);
									} else {
										this.$http.showToastOverride(res.data.msg);
									}
								}
							})
						} else {
							that.$http.showToastOverride('目前只支持微信支付，当前平台不是微信');
						}
					},
					fail: (err) => {
						this.$http.showToastOverride('授权登录失败：' + JSON.stringify(err));
					}
				});
			},
			//支付
			payment(openId){
				console.log(this.user);
				uni.request({
					url: this.$http.contextPath + 'orderMeal/wxPayOrder',
					method: 'POST',
					header: {
						'Content-Type': 'application/json'
					},
					data: {
						"ip": this.user.ipAddr,
						"money": this.money,
						"elderlyId": this.user.id,
						"openId": openId
					},
					success: (res) => {
						if (res.data.status == 1) {
							uni.requestPayment({
								provider: 'wxpay',
								timeStamp: res.data.data.timeStamp + "",
								nonceStr: res.data.data.nonceStr,
								package: 'prepay_id=' + res.data.data.prepayId,
								signType: res.data.data.signType,
								service: "3",
								paySign: res.data.data.prepayIdSign,
								_debug: 1,
								success: function(res) {
									console.log('success:支付成功');
									this.recharge();
								},
								fail: function(err) {
									console.log('fail:支付失败' + JSON.stringify(err));
								}
							});
						} else {
							this.$http.showToastOverride(res.data.msg);
						}
					}
				})
			},
			//充值操作
			recharge() {
				let data = {
					//充值操作人员：也就是自己
					operator: this.user,
					elderlyId: this.user.id,
					organizationId: this.user.organId,
					rechargeAmount: this.money,
					//elderly_account中的account
					account: this.user.elderlyOrganizationAccount,
					//elderly_account中的balance
					balance: this.user.balance,
					//elderly_account中的id
					id: this.user.accountId
				}
				uni.request({
					url: this.$http.contextPath + 'elderly-organization-account/recharge',
					method: 'POST',
					header: {
						'Content-Type': 'application/json'
					},
					data: data,
					success: (res) => {
						if (res.data.status == 1) {
							uni.navigateTo({
								url: '/pages/success/rechargeSuccess?money=' + this.money
							});
						} else {
							this.$http.showToastOverride(res.data.msg);
						}
					},
					fail: () => {
						that.$http.fail();
					}
				})
			},
		}
	}
</script>

<style>
	.selected_view {
		width: 29.5%;
		line-height: 7vh;
		height: 7vh;
		background: rgba(0, 190, 134, 0.2);
		border-radius: 2px;
		border: 1px solid rgba(0, 194, 129, 1);
		margin-left: 2vw;
	}

	.not_select_view {
		width: 29.5%;
		line-height: 7vh;
		height: 7vh;
		border-radius: 2px;
		border: 1px solid rgba(235, 235, 235, 1);
		margin-left: 2vw;
	}

	.bottom_view {
		margin: 0 auto;
		width: 95%;
		margin-top: 35vh;
		height: 8vh;
		font-size: 16px;
		line-height: 8vh;
		border-radius: 6px;
	}

	.button {
		background: rgba(24, 196, 145, 1);
		color: #FFFFFF;
	}

	.money_desc {
		text-align: left;
		margin-top: 10vh;
		font-weight: bolder;
		font-size: 14px;
		margin-left: 2vw;
	}
</style>
