<template>
	<view style="text-align: center;height: 100vh;">
		<view style="margin: 0 auto;width: 90%;height: 25vh;">
			<view style="text-align: left;font-size: 34px;font-weight: bolder;padding-top: 6vh;padding-left: 1vw;">登录</view>
			<view style="width: 20vw;height: 4px;margin-top: -2vh;background-color: #18C491;"></view>
		</view>
		<view style="margin: 0 auto;width: 90%;text-align: left;">
			<input class="uni-input" placeholder="请输入手机号" maxlength="11" @input="onKeyInput" v-model="username" style="border-bottom: #CCCCCC 1px solid;" />
		</view>
		<view style="margin: 0 auto;width: 90%;text-align: left;margin-top: 3vh;">
			<input class="uni-input" password placeholder="请输入密码" maxlength="16" v-model="password" style="border-bottom: #CCCCCC 1px solid;" />
		</view>
		<view style="margin: 0 auto;width: 90%;text-align: left;margin-top: 5vh;" @tap="phoneNumberLogin">
			<button form-type="submit" :class="[value==''?'button':'hightButton']">登录</button>
		</view>
		<view style="margin: 0 auto;width: 90%;text-align: right;font-size: 14px;margin-top: 1vh;" @tap="forgotPassword">
			<label style="color: #CCCCCC;">忘记密码</label>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				value: "",
				username: "",
				password: "",
				provider: null,
				ipAddr: ""
			}
		},
		computed: {},
		onLoad() {
			//获取供应商信息
			this.initProvider();
			//获取用户ip地址
			this.getIp();
			let that = this;
			//从缓存中获取用户数据
			uni.getStorage({
				key: 'user',
				success: function(res) {
					that.username = res.data.wxcode;
					that.password = res.data.passwd;
				}
			})
		},
		methods: {
			initProvider() {
				const filters = ['weixin', 'qq', 'weibo'];
				uni.getProvider({
					service: 'oauth',
					success: (res) => {
						this.provider = res.provider[0]
					},
					fail: (err) => {
						console.error('获取服务供应商失败：' + JSON.stringify(err));
					}
				});
			},
			getIp() {
				let that = this;
				wx.request({
					url: 'http://ip-api.com/json',
					success: function(e) {
						that.ipAddr = e.data.query;
					}
				});
			},
			onKeyInput(e) {
				this.value = e.target.value
			},
			//手机号登录
			phoneNumberLogin() {
				if (this.value == "") {
					return;
				}
				if (this.username == "" || this.password == "") {
					this.$http.showToastOverride('请输入账号密码！')
					return;
				}
				let param = {
					userName: this.username,
					passWord: this.password
				};
				uni.request({
					url: this.$http.contextPath + 'orderMeal/login',
					method: 'POST',
					header: {
						'Content-Type': 'application/json'
					},
					data: param,
					success: (res) => {
						if (res.data.status === 1) {
							let info = res.data.data;
							info.provider = this.provider;
							info.ipAddr = this.ipAddr;
							uni.setStorage({
								key: 'user',
								data: info,
								success: function() {
									uni.switchTab({
										url: '/pages/list/list'
									})
								},
								fail: () => {
									this.$http.fail();
								}
							});
							
						} else if (res.data.status === 2) {
							this.$http.showToastOverride("用户不存在，请联系管理员添加");
							// uni.showModal({
							// 	title: '提示',
							// 	content: '用户不存在，现在去注册吗？',
							// 	success: function(res) {
							// 		if (res.confirm) {
							// 			uni.reLaunch({
							// 				url: '/pages/login/register'
							// 			});
							// 		}
							// 	}
							// });
						} else {
							this.$http.showToastOverride(res.data.msg);
						}
					},
					fail: () => {
						this.$http.fail();
					}
				})
			},
			//忘记密码
			forgotPassword() {
				uni.reLaunch({
					url: '/pages/login/forgotPassword'
				});
			}
		}
	}
</script>

<style>
	.button {
		background-color: #E5E5E5;
		border-radius: 6px;
		color: #999999;
	}

	.hightButton {
		background-color: #18C491;
		border-radius: 6px;
		color: #FFFFFF;
	}
</style>
