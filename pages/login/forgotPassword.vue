<template>
	<view style="background-color: #F6F6F6;height: 100vh;text-align: center;">
		<view class="uni-flex uni-row" style="border: 1px #FFFFFF;padding-top: 2vh;margin: 0 auto;width: 95%;">
			<view class="flex-item" style="width: 15%;height: 6vh;line-height: 6vh;font-size: 12px;">
				手机号
			</view>
			<view class="flex-item" style="font-size: 12px;width: 75%;text-align: left;padding-left: 2vw;height: 6vh;line-height: 6vh;">
				<input class="uni-input" v-model="username" placeholder="请输入手机号" @input="onKeyInput" />
			</view>
		</view>
		<view class="uni-flex uni-row" style="border: 1px #FFFFFF;margin: 0 auto;width: 95%;">
			<view class="flex-item" style="width: 15%;height: 6vh;line-height: 6vh;font-size: 12px;">
				旧密码
			</view>
			<view class="flex-item" style="font-size: 12px;width: 75%;text-align: left;padding-left: 2vw;height: 6vh;line-height: 6vh;">
				<input class="uni-input" v-model="oldPwd" placeholder="请输入旧密码" />
			</view>
		</view>
		<view class="uni-flex uni-row" style="border: 1px #FFFFFF;margin: 0 auto;width: 95%;">
			<view class="flex-item" style="width: 15%;height: 6vh;line-height: 6vh;font-size: 12px;">
				新密码
			</view>
			<view class="flex-item" style="font-size: 12px;width: 75%;text-align: left;padding-left: 2vw;height: 6vh;line-height: 6vh;">
				<input class="uni-input" v-model="newPwd" placeholder="请输入新密码" />
			</view>
		</view>
		<view style="margin: 0 auto;width: 90%;text-align: left;margin-top: 5vh;" @tap="updatePasswd">
			<button form-type="submit" :class="[value==''?'button':'hightButton']">提交</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				value: "",
				oldPwd: "",
				newPwd: "",
				username: ""
			}
		},
		methods: {
			onKeyInput(e) {
				this.value = e.target.value
			},
			updatePasswd() {
				if (this.username == "" || this.oldPwd == "" || this.newPwd == "") {
					this.$http.showToastOverride('请输入账号或密码！')
					return;
				}
				let param = {
					userName: this.username,
					oldPwd: this.oldPwd,
					newPwd:this.newPwd
				};
				uni.request({
					url: this.$http.contextPath + 'orderMeal/updatePasswd',
					method: 'POST',
					header: {
						'Content-Type': 'application/json'
					},
					data: param,
					success: (res) => {
						if (res.data.status === 1) {
							uni.showModal({
								title: '提示',
								content: '密码修改成功，去登录?',
								success: function(res) {
									if (res.confirm) {
										uni.reLaunch({
											url: '/pages/login/login'
										});
									}
								}
							});
						} else {
							this.$http.showToastOverride(res.data.msg);
						}
					},
					fail: () => {
						this.$http.fail();
					}
				})
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
