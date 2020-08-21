<template>
	<view style="text-align:center;background:rgba(246,246,246,1);padding-top: 1vh;height: 100vh;">
		<view v-if="items.length>0">
			<scroll-view style="height: 95vh;" scroll-y="true" @scrolltolower="lower" @scroll="scroll">
				<view v-for="(item,index) in items" :key="index">
					<view style="background:rgba(255,255,255,1);margin: 0 auto;width: 95%;margin-bottom: 2%;border-radius:6px;height: 200upx;">
						<view class="uni-flex uni-row" style="height: 25%;">
							<view class="flex-item" style="width: 100%;text-align: left;padding-left: 2%;">
								<label style="font-weight: bolder;font-family:PingFangSC-Medium,PingFang SC;color:rgba(51,51,51,1);">{{item.weekName}}</label>
							</view>
							<view class="flex-item" style="width: 100%;text-align: right;padding-right: 1%;">
								<label style="color: #999999;font-size: 12px;">{{item.diningDate}}</label>
							</view>
						</view>
						<view class="uni-flex uni-row" style="height: 75%;">
							<view class="flex-item" style="width: 30%;text-align: left;padding-left: 2%;">
								<image style="width: 100%; height: 98%;" :src="item.url"></image>
							</view>
							<view class="flex-item" style="width: 100%;text-align: left;padding-left: 2%;">
								<view class="uni-flex uni-column" style="height: 100%;">
									<view class="flex-item flex-item-V" style="height: 65%;overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;">
										<label style="color:rgba(102,102,102,1);font-size: 12px;font-family:PingFangSC-Regular,PingFang SC;">{{item.menuContent}}</label>
									</view>
									<view class="flex-item flex-item-V" style="height: 35%;color: #FF6215;"><label>￥{{item.price}}</label></view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
			<view :style="numFlag==true?'display: none;':'color:#999999;'">
				没有更多数据了
			</view>
		</view>
		<view v-else style="height: 98vh;text-align: center;">
			<view style="padding-top: 25vh;">
				<image src="../../static/img/noMealRecord.png" style="width: 25vw;height: 17vh;">
			</view>
			<view style="margin-top: 2vh;">
				<label style="color: #999999;">暂无记录</label>
			</view>
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
					title: '加载中'
				});
				uni.request({
					url: this.$http.contextPath + 'orderMeal/mealRecord',
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
							if(data.length==0){
								this.numFlag=false;
							}
							data.forEach(item => {
								this.items.push({
									price: item.price,
									menuContent: item.menuContent,
									url: item.url,
									weekName: item.weekName + "套餐",
									price: item.price,
									diningDate: item.diningDate.replace('T', ' ').substring(0, 10)
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
