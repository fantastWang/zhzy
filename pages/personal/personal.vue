<template>
	<view>
		<view class="uni-flex uni-column" style="height: 100vh;text-align: center;">
			<view class="flex-item flex-item-V " style="height: 40vh;width: 100%;margin: 0 auto;padding-bottom: 1vh;background-image: url(../../static/img/personalBg.png);
		background-size: 100% 40vw;">
				<view class="uni-flex uni-row" style="height: 30%;padding-left: 5vw;padding-top: 1.5vh;">
					<view class="flex-item" style="width: 20%;">
						<image style="border:1px solid rgba(0,190,134,1);height: 80%;border-radius: 50%;width: 80%;
						background-size: 100% 15vw;"
						:src="user.idCardFrontUrl==null?'/static/img/timg.jpg':user.idCardFrontUrl"></image>
					</view>
					<view class="flex-item" style="width: 80%;text-align: left;">
						<view style="margin-top: 2vh;margin-left: 3vw;font-weight: bolder;font-size: 18px;">{{user.name==null?"":user.name}}</view>
						<view style="margin-left: 3vw;color: #666666;font-size: 12px;">{{user.idCard==null?"":user.idCard}}</view>
					</view>
				</view>
				<view class="flex-item flex-item-V" style="height: 70%;width: 100%;margin: 0 auto;text-align: center;background-image: url(/static/img/archives.png);background-size: 100% 45vw;">
					<image v-if="this.user==null" src="../../static/img/archives.png" style="width: 100%;height: 100%;"></image>
					<view v-else style="padding-top: 10vh;">
						<label style="color: #00BE86;font-weight: bolder;font-size: 22px;">健康档案</label>
					</view>
				</view>
			</view>
			<view class="flex-item flex-item-V" style="height: 30vh;width: 95%;margin: 0 auto;box-shadow:0px 6px 16px 0px rgba(0,190,134,0.1),0px -2px 10px 0px rgba(0,190,134,0.1);
border-radius:6px;padding-bottom: 1vh;margin-bottom: 1%;">
				<view class="uni-flex uni-row" style="height: 25%;">
					<view class="flex-item" style="width: 25%;">
						<image src="../../static/img/addr.png" style="width: 4vw;height: 2vh;">
							<label style="line-height: 7vh;color: #333333;font-size: 14px;margin-left: 5%;">居住地址</label>
					</view>
					<view class="flex-item" style="width: 75%;text-align: right;padding-right: 1vw;">
						<label style="line-height: 7vh;color: #666666;">{{user.address==null?"":user.address}}</label>
					</view>
				</view>
				<view class="uni-flex uni-row" style="height: 30%;">
					<view class="flex-item" style="width: 25%;">
						<image src="../../static/img/station.png" style="width: 4vw;height: 2vh;">
							<label style="line-height: 7vh;color: #333333;font-size: 14px;margin-left: 5%;">归属站点</label>
					</view>
					<view class="flex-item" style="width: 75%;text-align: right;padding-right: 1vw;">
						<label style="line-height: 7vh;color: #666666;">{{user.organizationName==null?"":user.organizationName}}</label>
					</view>
				</view>
				<view class="uni-flex uni-row" style="height: 25%;">
					<view class="flex-item" style="width: 25%;">
						<image src="../../static/img/phone.png" style="width: 4vw;height: 2vh;">
							<label style="line-height: 7vh;color: #333333;font-size: 14px;margin-left: 5%;">手机号码</label>
					</view>
					<view class="flex-item" style="width: 75%;text-align: right;padding-right: 1vw;">
						<label style="line-height: 7vh;color: #666666;">{{user.mobile==null?"":user.mobile}}</label>
					</view>
				</view>
				<view class="uni-flex uni-row" style="height: 25%;">
					<view class="flex-item" style="width: 25%;">
						<image src="../../static/img/passwd.png" style="width: 4vw;height: 2vh;">
							<label style="line-height: 7vh;color: #333333;font-size: 14px;margin-left: 5%;">修改密码</label>
					</view>
					<view class="flex-item" style="width: 75%;text-align: right;padding-right: 1vw;" @tap="forgotPassword">
						<label style="line-height: 7vh;color: #CCCCCC;">重置密码</label>
					</view>
				</view>
			</view>
			<view class="flex-item flex-item-V" style="height: 25vh;width: 95%;margin: 0 auto;box-shadow:0px 6px 16px 0px rgba(0,190,134,0.1),0px -2px 10px 0px rgba(0,190,134,0.1);border-radius:6px;padding-bottom: 1vh;margin-bottom: 1%;">
				<view style="background:rgba(255,255,255,1);border-radius:6px;height: 5vh;line-height: 5vh;margin-top: 15vh;border:1px solid #D3D3D3;" @tap="logout">{{this.user==null?'登录':'退出登录'}}</view>
				<view style="color:#D3D3D3;font-size: 12px;" @tap="complaint()">投诉建议</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				user: uni.getStorageSync('user'),
			}
		},
		onLoad() {
			
		},
		methods: {
			complaint(){
				if(this.user==""){
					this.$http.showToastOverride("请先登录");
					return;
				}
				uni.navigateTo({
					url: '/pages/complaint/complaint'
				});
			},
			/**
			 * 退出登录，清除缓存
			 */
			logout:function() {
				uni.removeStorageSync('user')
				uni.reLaunch({
				    url: '/pages/login/login'
				});
			},
			forgotPassword(){
				uni.navigateTo({
					url: '/pages/login/forgotPassword'
				});
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
