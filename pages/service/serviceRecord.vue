<template>
	<view style="text-align: center;background-color: #F6F6F6;">
		<view v-if="items.length>0">
			<scroll-view style="height: 100vh;" scroll-y="true" @scrolltolower="lower" @scroll="scroll">
				<view v-for="(item,index) in items" :key="index" @click="detail(item.id)" style="background-color: #FFFFFF;margin: 0 auto;width: 95%;margin-top: 2vh;height: 16vh;">
					<view class="uni-flex uni-row" style="text-align: center;height: 5vh;">
						<view class="flex-item" style="background-color: #00BE86;width: 3px;
border-radius:19px;height: 3vh;margin-top: 1vh;margin-left: -1vw;"></view>
						<view class="flex-item" style="line-height: 5vh;;font-size: 16px;margin-left: 2vw;">
							<label>项目类型：</label>
							<label style="font-weight: bolder;">{{item.kindName==null?"":item.kindName}}</label>
						</view>
					</view>
					<view class="uni-flex uni-row" style="margin: 0 auto;width: 95%;text-align: left;">
						<view class="flex-item" style="width: 50%;">
							<label style="color: #999999;">联系电话：</label>
							<label>{{item.mobile==null?"":item.mobile}}</label>
						</view>
						<view class="flex-item" style="width: 50%;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">
							<label style="color: #999999;overflow: hidden;
								">项目名称：</label>
							<label>{{item.serviceItemName==null?"":item.serviceItemName}}</label>
						</view>
					</view>
					<view class="uni-flex uni-row" style="margin: 0 auto;width: 95%;text-align: left;">
						<view class="flex-item" style="width: 50%;">
							<label style="color: #999999;">工单类别：</label>
							<label>{{item.orderKind==null?"":item.orderKind}}</label>
						</view>
						<view class="flex-item" style="width: 50%;">
							<label style="color: #999999;">支付状态：</label>
							<label>{{item.paymentStatusName==null?"":item.paymentStatusName}}</label>
						</view>
					</view>
					<view class="uni-flex uni-row" style="margin: 0 auto;width: 95%;text-align: left;">
						<view class="flex-item" style="width: 50%;">
							<label style="color: #999999;">服务人员：</label>
							<label>{{item.staffName==null?"":item.staffName}}</label>
						</view>
						<view class="flex-item" style="width: 50%;">
							<label style="color: #999999;">费用：</label>
							<label>{{item.price==null?"":item.price+"元"}}</label>
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
				<image src="../../static/img/noMealRecord.png" style="width: 27vw;height: 15vh;">
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
				current:1,
				numFlag:true
			}
		},
		onPullDownRefresh() {
			this.loadData();
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		onLoad() {
			this.loadData();
		},
		methods: {
			lower: function(e) {
				this.current++;
				if(this.numFlag){
					this.loadData();
				}
			},
			scroll(){
				if(!this.numFlag){
					this.numFlag=true;
				}
			},
			daata() {
				console.log(111);
			},
			loadData() {
				uni.showLoading({
					title: '加载中',
					mask:true
				});
				uni.request({
					url: this.$http.contextPath + 'orderMeal/serviceRecord',
					method: 'POST',
					header: {
						'Content-Type': 'application/json'
					},
					data: {
						"elderlyId": this.user.id,
						"current":this.current
					},
					success: (res) => {
						if (res.data.status == 1) {
							let data = res.data.data;
							if(data.length==0){
								this.numFlag=false;
							}
							data.forEach(item => {
								this.items.push({
									"id": item.id,
									"kindName": item.kindName,
									"mobile": item.mobile,
									"serviceItemName": item.serviceItemName,
									"orderKind": item.orderKind,
									"paymentStatusName": item.paymentStatusName,
									"staffName": item.staffName,
									"price": item.price
								})
							})
						}
						uni.hideLoading()
					}
				});
			},
			detail(id) {
				uni.navigateTo({
					url: '/pages/service/serviceRecordDetail?id=' + id
				});
			}
		}
	}
</script>

<style>

</style>
