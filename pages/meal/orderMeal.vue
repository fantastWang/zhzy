<template>
	<view style="background:rgba(246,246,246,1);padding-top: 1vh;height: 100vh;text-align: center;">
		<view v-if="items.length>0">
			<checkbox-group @change="checkboxChange" style="margin: 0 auto;width: 95%;">
				<view v-for="(item,index) in items" :key="index">
					<view class="uni-flex uni-row global_item">
						<view class="flex-left">
							<label class="radio">
								<checkbox v-if="item.orderStatus=='预约'" style="transform:scale(0.7)" color="#FF3333" :value="String(item.id)"
								 :price="item.price" :checked="checkedArr.includes(String(item.id))" :class="{'checked':checkedArr.includes(String(item.id))}"></checkbox>
							</label>
						</view>
						<view class="flex-middle">
							<image style="width: 100%; height: 85%; background-color: #eeeeee;margin-top: 1vh;" :src="item.url"></image>
						</view>
						<view class="flex-right">
							<view class="uni-flex uni-column" style="height: 100%;">
								<view class="flex-item-V-top" style="font-family:PingFangSC-Medium,PingFang SC;font-weight: bolder;color:rgba(51,51,51,1);">
									<label>{{item.weekName}}</label>
								</view>
								<view class="flex-item-V-middle" style="font-family:PingFangSC-Regular,PingFang SC;color:rgba(102,102,102,1);
								overflow: hidden;
								text-overflow: ellipsis;
								display: -webkit-box;
								-webkit-line-clamp: 2;
								-webkit-box-orient: vertical;">
									<label>{{item.menuContent}}</label>
								</view>
								<view class="flex-item-V-bottom uni-flex uni-row">
									<view style="width: 65%;" class="flex-item ">
										<label style="color: #FF0000;">¥{{item.price}}</label>
									</view>
									<view style="width: 35%;" class="flex-item ">
										<view v-if="item.orderStatus=='预约'" style="text-align: center;width: 15vw;background-color: #00BE86;color: #ffffff;" @click="orderSingle(item.id,item.price)">{{item.orderStatus}}</view>
										<label v-else-if="item.orderStatus=='联系订餐员'" class="label_order" @click="makePhoneCall()">{{item.orderStatus}}</label>
										<view v-else style="text-align: center;width: 15vw;background-color: #c1c1c1;color: #ffffff;">{{item.orderStatus}}</view>
									</view>
								</view>
							</view>
						</view>
					</view>
					<view style="height: 15rpx;" />
				</view>
			</checkbox-group>

			<!-- 底部占位 -->
			<view class="uni-flex uni-row bottom_location">
				<view style="width: 25%;" class="flex-item ">
					<checkbox-group @change="checkAll">
						<checkbox style="margin: 10%;transform:scale(0.7)" color="#FF3333" value="all" :class="{'checked':allChecked}"
						 :checked="allChecked?true:false"></checkbox>全选
					</checkbox-group>
				</view>
				<view style="width: 5%;text-align: center;padding-top: 3%;" class="flex-item ">
					<label style="color: #FF0000;">¥{{menuPrice}}</label>
				</view>
				<view style="width: 70%;height: 100upx;text-align: center;line-height:100upx;" class="flex-item ">
					<button class="button_order" style="color: #FFFFFF;" @click="order()">预约</button>
				</view>
			</view>
		</view>
		<view v-else style="height: 98vh;text-align: center;">
			<view style="padding-top: 25vh;">
				<image src="../../static/img/cooking.png" style="width: 25vw;height: 22vh;">
			</view>
			<view>
				<label style="color: #999999;">正在努力做饭中~</label>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				items: [],
				checkboxChangeVal: [],
				checkedArr: [], //选中的值
				allChecked: false, //是否全选
				user: uni.getStorageSync('user'),
				menuPrice: 0
			}
		},
		onLoad() {
			uni.request({
				url: this.$http.contextPath + '/orderMeal/orderList',
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
						let data = res.data.data;
						let arr = [];
						data.forEach(item => {
							let obj = {
								id: item.id,
								price: item.price,
								menuContent: item.menuContent,
								url: item.url,
								weekName: item.weekName + "套餐",
								orderStatus: item.orderStatus,
								price: item.price
							}
							arr.push(obj)
						})
						this.items = arr;
					}
				}
			});
		},
		methods: {
			//单个预订
			orderSingle(id, price) {
				this.checkedArr = [];
				this.checkedArr.push(id);
				this.createOrder(price);
			},
			//批量预订
			order() {
				this.createOrder(this.menuPrice);
			},
			//创建订单，扣除金额
			createOrder(price) {
				uni.request({
					url: this.$http.contextPath +  'consume-order/addSettlementManually',
					method: 'POST',
					header: {
						'Content-Type': 'application/json'
					},
					data: {
						"paymentStatus": 0,
						"elderlyName": this.user.userName,
						"organizationId": this.user.organId,
						"paymentType": "account",
						"elderlyId": this.user.id,
						"servicesItemsKind": "HF",
						"servicesItemsKindName": "助餐",
						"paymentTotal": price,
						"paymentSelf": price,
						"subsidyTotal": 0,
						"servicesItemsId": 28,
						"servicesItemsName": "午餐"
					},
					success: (res) => {
						if (res.data.status == 1) {
							this.mealRecord();
						} else {
							this.$http.showToastOverride(res.data.msg);
						}
					},
				})
			},
			//添加菜单记录
			mealRecord() {
				uni.request({
					url: this.$http.contextPath + 'orderMeal/saveMealRecord',
					method: 'POST',
					header: {
						'Content-Type': 'application/json'
					},
					data: {
						"organId": this.user.organId,
						"elderlyId": this.user.id,
						"menuIds": this.checkedArr
					},
					success: (res) => {
						if (res.data.status == 1) {
							uni.navigateTo({
								url: '/pages/success/orderMealSuccess'
							});
						} else {
							this.$http.showToastOverride(res.data.msg);
						}
					},
				})
			},
			//联系订餐员
			makePhoneCall() {
				uni.makePhoneCall({
					phoneNumber: '13667088868',
					success: (res) => {
						console.log('拨打成功!')
					},
					fail: (res) => {
						console.log('拨打失败或取消拨打!')
					}
				});
			},
			//多选
			checkboxChange: function(e) {
				this.checkedArr = e.detail.value;
				this.menuPrice = 0;
				for (let item of this.items) {
					let itemOrderId = String(item.id);
					let itemOrderStatus = String(item.orderStatus);
					let itemOrderprice = item.price;
					for (let check of this.checkedArr) {
						if (check == itemOrderId && itemOrderStatus == '预约') {
							this.menuPrice += itemOrderprice;
						}
					}
				}
				// 如果选择的数组中有值，并且长度等于列表的长度，就是全选
				if (this.checkedArr.length > 0 && this.checkedArr.length == this.items.length) {
					this.allChecked = true;
				} else {
					this.allChecked = false;
				}
			},
			//全选/反选
			checkAll(e) {
				let chooseItem = e.detail.value;
				// 全选
				if (chooseItem[0] == 'all') {
					this.allChecked = true;
					for (let item of this.items) {
						let itemOrderId = String(item.id);
						let itemOrderStatus = String(item.orderStatus);
						let itemOrderprice = item.price;
						if (!this.checkedArr.includes(itemOrderId) && itemOrderStatus == '预约') {
							this.menuPrice += itemOrderprice;
							this.checkedArr.push(itemOrderId);
						}
					}
				} else {
					this.menuPrice = 0;
					// 取消全选
					this.allChecked = false;
					this.checkedArr = [];
				}
			}
		}
	}
</script>

<style>
	.label_order {
		height: 85%;
		width: 32%;
		margin-left: 60%;
		line-height: inherit;
		font-size: 14px;
		color: rgba(2, 122, 255, 1);
	}

	.bottom_location {
		background-color: #FFFFFF;
		height: 100upx;
		position: fixed;
		bottom: 0;
		width: 100%;
		flex-direction: row;
	}

	.button_order {
		background: linear-gradient(90deg, rgba(154, 212, 178, 1) 0%, rgba(97, 169, 122, 1) 100%);
		width: 30%;
		margin-top: 3%;
		height: 70%;
		margin-right: 3vw;
		font-size: 14px;
	}

	.global_item {
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 6px 16px 0px rgba(97, 169, 122, 0.1), 0px -2px 10px 0px rgba(97, 169, 122, 0.1);
		border-radius: 6px;
	}

	.flex-left {
		width: 10%;
		height: 200rpx;
		text-align: center;
		line-height: 200rpx;
	}

	.flex-middle {
		width: 25%;
		height: 200rpx;
		text-align: center;
		line-height: 200rpx;
	}

	.flex-right {
		width: 65%;
		height: 200rpx;
		text-align: center;
		line-height: 200rpx;
	}

	.flex-item-text {
		width: 50%;
		height: 100rpx;
		font-size: 35rpx;
		line-height: 100rpx;
	}

	.flex-item-V-top {
		width: 100%;
		height: 20%;
		text-align: left;
		padding-left: 3%;
	}

	.flex-item-V-middle {
		width: 95%;
		height: 50%;
		padding-left: 3%;
		text-align: left;
	}

	.flex-item-V-bottom {
		width: 100%;
		height: 30%;
		padding-left: 5%;
		text-align: left;
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
