<!-- <template>
	<view class="content">
		<view class="title-nav">
			<image style="width: 100%;height: 100upx;"  src="/static/img/logo.png"></image>
			<text class="text">福康通智慧养老</text>
		</view>
		<view>
			
			<mInput></mInput>
			<input type="number" :model="" maxlength="11" placeholder="请输入手机号"></input>
			<input type="text" maxlength="11" placeholder="请输入验证码"></input>
		</view>
		<button type="primary" @tap="login">登录</button>
	</view>
</template>

<script>
	import mInput from '@/components/m-input/m-input.vue'
	
	export default {
		components: {
		    mInput
		},
		data() {
			return {

			}
		},
		methods: {
			login() {
				console.log("login...")
				uni.switchTab({
					url: '/pages/list/list'
				})
			}
		}
	}
</script>

<style>

</style>
 -->
<template>
	<view class="content">
		<view class="title-nav">
			<image class="image-content" mode="aspectFit" src="/static/img/logo.png"></image>
			<text class="text">福康通智养</text>
		</view>

		<view class="content padding">
			<view class="input-group">
				<view class="input-row border" style="width: 100%;">
					<text class="title" style="width: 20%;">账号：</text>
					<m-input type="text" style="width: 80%;" clearable v-model="username" placeholder="请输入账号"></m-input>
				</view>
				<view class="input-row border" style="width: 100%;">
					<text class="title" style="width: 20%;">密码：</text>
					<m-input type="password" style="width: 80%;" displayable v-model="password" placeholder="请输入密码"></m-input>
				</view>
			</view>
			<view class="btn-row">
				<button type="primary" class="primary" @tap="bindLogin">登录</button>
			</view>
			<!-- <view class="action-row">
 				<navigator url="../reg/reg">注册账号</navigator>
 				<text class="split-line">|</text>
 				<navigator url="pwd">忘记密码</navigator>
 			</view>		 -->
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapGetters,
		mapMutations
	} from 'vuex'
	import mInput from '@/components/m-input/m-input.vue'

	export default {
		components: {
			mInput
		},
		data() {
			return {
				providerList: [],
				hasProvider: false,
				username: '',
				password: '',
				user: null,
				positionTop: 0
			}
		},
		computed: {
			...mapState(['account', 'hasLogin', 'redirect']),
			...mapGetters(['purposes', 'loginCheck'])
		},
		onLoad() {
			let that = this;
			//that.initProvider();
			uni.getStorage({
				key: 'user',
				success: function(res) {
					that.username = res.data.wxcode;
					that.password = res.data.passwd;
				}
			})
		},
		methods: {
			...mapMutations(['login', 'loginSuccess']),
			initProvider() {
				const filters = ['weixin', 'qq', 'weibo'];
				uni.getProvider({
					service: 'oauth',
					success: (res) => {
						if (res.provider && res.provider.length) {
							for (let i = 0; i < res.provider.length; i++) {
								if (~filters.indexOf(res.provider[i])) {
									this.providerList.push({
										value: res.provider[i],
										image: '../../static/img/logos/' + res.provider[i] + '.png'
									});
								}
							}
							this.hasProvider = true;
						}
					},
					fail: (err) => {
						console.error('获取服务供应商失败：' + JSON.stringify(err));
					}
				});
			},
			bindLogin() {
				let that = this;
				if (this.password.length == 0 || this.password.length == 0) {
					that.$http.showToastOverride('请输入账号密码！')
					return;
				}
				let param = {
					userCode: this.username,
					userPwd: this.password
				};
				uni.request({
					url: this.$http.contextPath + 'sys/user/login',
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
									that.$http.fail();
								}
							});
						} else {
							that.$http.showToastOverride("账号或密码错误！");
						}
					},
					fail: () => {
						that.$http.fail();
					}
				})
			},
			toMain() {
				this.$croute.enter(this.loginCheck(this.redirect));
			}
		}
	}
</script>

<style>
	.login {
		flex: 1;
		padding: 0px;
		border: 1px solid blue;
	}

	.title-nav {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin-top: 200upx;
	}

	.title-nav .text {
		font-size: 22px;
		font-weight: bold;
		flex-grow: 1;
		margin-top: 30upx;
	}

	.title-nav .image-content {
		width: 200upx;
		height: 200upx;
	}

	.action-row {
		display: flex;
		flex-direction: row;
		justify-content: center;
		color: #7558ff;
	}

	.action-row navigator {
		color: #007aff;
		padding: 0 20upx;
	}

	.statement {
		display: flex;
		margin-top: 30upx;
		justify-content: center;
	}

	.statement .link {
		text-decoration: underline;
	}

	.split-line {
		color: #c8c7cc;
	}

	.oauth-login {
		width: 100%;
		align-self: flex-end;
	}

	.other-login {
		position: relative;
		height: 16px;
		margin: 0 40upx;
	}

	.other-login .text {
		color: #8F8F94;
		position: absolute;
		width: 280upx;
		left: 0;
		right: 0;
		top: 0;
		background-color: #FFFFFF;
		margin: auto;
		text-align: center;
	}

	.other-login .line {
		position: absolute;
		width: 100%;
		height: 1upx;
		left: 0;
		top: 6px;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #c8c7cc;
	}

	.oauth-row {
		display: flex;
		flex-direction: row;
		justify-content: center;
		width: 100%;
		padding-top: 50upx;
		padding-bottom: 50upx;
	}

	.oauth-image {
		width: 100upx;
		height: 100upx;
		border-radius: 100upx;
		margin: 0 40upx;
		background-color: #ffffff;
		box-shadow: 5upx 5upx 30upx 5upx #efecf4;
	}

	.oauth-image image {
		width: 60upx;
		height: 60upx;
		margin: 20upx;
	}

	/* 去掉自带边框 */
	.oauth-button::after {
		border: none;
	}
</style>
