<template>
	<view style="text-align: center;height: 100vh;">
		<view style="margin: 0 auto;width: 90%;height: 25vh;">
			<view style="text-align: left;font-size: 34px;font-weight: bolder;padding-top: 6vh;padding-left: 1vw;">注册</view>
			<view style="width: 20vw;height: 4px;margin-top: -2vh;background-color: #18C491;"></view>
		</view>
		<view style="margin: 0 auto;width: 90%;text-align: left;">
			<input class="uni-input" placeholder="请输入手机号" maxlength="11" @input="onKeyInput" v-model="username" style="border-bottom: #CCCCCC 1px solid;" />
		</view>
		<view style="margin: 0 auto;width: 90%;text-align: left;margin-top: 3vh;">
			<input class="uni-input" password placeholder="请输入身份证" maxlength="18" v-model="idCard" style="border-bottom: #CCCCCC 1px solid;" />
		</view>
		<view style="margin: 0 auto;width: 90%;text-align: left;margin-top: 3vh;">
			<input class="uni-input" password placeholder="请输入密码" maxlength="16" v-model="password" style="border-bottom: #CCCCCC 1px solid;" />
		</view>
		<view style="margin: 0 auto;width: 90%;text-align: left;margin-top: 5vh;" @tap="phoneNumberLogin">
			<button form-type="submit" :class="[value==''?'button':'hightButton']">登录</button>
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
				idCard: ""
			}
		},
		computed: {},
		onLoad() {
			let that = this;
			uni.getStorage({
				key: 'user',
				success: function(res) {
					console.log("onLoad:" + res);
					that.username = res.data.wxcode;
					that.password = res.data.passwd;
				}
			})
		},
		methods: {
			onKeyInput(e) {
				this.value = e.target.value
			},
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
					url: this.$http.contextPath + 'orderMeal/register',
					method: 'POST',
					header: {
						'Content-Type': 'application/json'
					},
					data: param,
					success: (res) => {
						if (res.data.status === 1) {
							let info = res.data.data;
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
						}else {
							this.$http.showToastOverride(res.data.msg);
						}
					},
					fail: () => {
						this.$http.fail();
					}
				})
			},
			brushFaceLogin() {
				console.log(222);
				uni.navigateTo({
					url: '/pages/login/brushFaceLogin'
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
