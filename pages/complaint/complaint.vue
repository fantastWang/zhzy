<template>
	<view>
		<view style="height: 100vh;text-align: center;background-color: #F6F6F6;">
			<form @submit="formSubmit" @reset="formReset">
				<view style="height: 55vh;margin: 0 auto;width: 95%;margin-top: 2vh;background-color: #FFFFFF;">
					<view class="uni-flex uni-row" style="border: 1px #FFFFFF;padding-top: 2vh;padding-bottom: 1vh;" name="uuit">
						<view class="flex-item" style="width: 25%;height: 6vh;line-height: 6vh;font-size: 12px;">
							受理单位
						</view>
						<view class="flex-item" style="font-size: 12px;width: 75%;text-align: left;padding-left: 2vw;height: 6vh;line-height: 6vh;">
							<input class="uni-input" value="政府用户" disabled="true" name="unit" />
						</view>
					</view>
					<view class="uni-flex uni-row" style="border: 1px #FFFFFF;padding-top: 2vh;padding-bottom: 1vh;">
						<view class="flex-item" style="width: 25%;height: 6vh;line-height: 6vh;font-size: 12px;">
							服务人员
						</view>
						<view class="flex-item" style="font-size: 12px;width: 75%;text-align: left;padding-left: 2vw;height: 6vh;line-height: 6vh;">
							<picker @change="bindPickerChange" :value="index" :range="array">
								<input v-if="index==0" class="uni-input" name="servicePerson" placeholder="请选择服务人员" />
								<input v-else class="uni-input" :value="array[index]" name="servicePerson" />
							</picker>
						</view>
					</view>
					<view class="uni-flex uni-row" style="border: 1px #FFFFFF;padding-top: 2vh;padding-bottom: 1vh;">
						<view class="flex-item" style="width: 25%;height: 6vh;line-height: 6vh;font-size: 12px;">
							服务时间
						</view>
						<view class="flex-item" style="font-size: 12px;width: 75%;text-align: left;padding-left: 2vw;height: 6vh;line-height: 6vh;">
							<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
								<input v-if="date==''" class="uni-input" name="serviceTime" placeholder="请选择服务时间" />
								<input v-else class="uni-input" :value="date" name="serviceTime" />
							</picker>
						</view>
					</view>
					<view class="uni-flex uni-row" style="border: 1px #FFFFFF;padding-top: 2vh;padding-bottom: 1vh;">
						<view class="flex-item" style="width: 25%;height: 6vh;line-height: 6vh;font-size: 12px;">
							投诉理由
						</view>
						<view class="flex-item" style="font-size: 12px;width: 75%;text-align: left;padding-left: 2vw;height: 6vh;line-height: 6vh;">
							<input class="uni-input" @input="onKeyInput" placeholder="请输入投诉理由" name="reason" />
						</view>
					</view>
					<view class="uni-flex uni-row" style="border: 1px #FFFFFF;padding-top: 2vh;padding-bottom: 1vh;">
						<view class="flex-item" style="width: 25%;height: 6vh;line-height: 6vh;font-size: 12px;">
							备注
						</view>
						<view class="flex-item" style="font-size: 12px;width: 75%;text-align: left;padding-left: 2vw;height: 6vh;line-height: 6vh;">
							<input class="uni-input" focus placeholder="请输入备注" name="remark" />
						</view>
					</view>
				</view>
				<view style="margin: 0 auto;width: 95%;margin-top: 30vh;">
					<view class="uni-btn-v">
						<button form-type="submit" :class="[value==''?'button':'hightButton']">提交</button>
					</view>
				</view>
			</form>
		</view>
	</view>
</template>

<script>
	function getDate(type) {
		const date = new Date();
		let year = date.getFullYear();
		let month = date.getMonth() + 1;
		let day = date.getDate();
		if (type === 'start') {
			year = year - 60;
		} else if (type === 'end') {
			year = year + 2;
		}
		month = month > 9 ? month : '0' + month;;
		day = day > 9 ? day : '0' + day;
		return `${year}-${month}-${day}`;
	}

	export default {
		data() {
			return {
				date: "",
				array: [],
				index: 0,
				startDate: getDate('start'),
				endDate: getDate('end'),
				user: uni.getStorageSync('user'),
				value: ""
			}
		},
		onLoad() {
			uni.request({
				url: this.$http.contextPath + 'orderMeal/servicePersonList',
				method: 'POST',
				header: {
					'Content-Type': 'application/json'
				},
				data: {
					"organId": this.user.organId
				},
				success: (res) => {
					if (res.data.status == 1) {
						let data = res.data.data;
						let arr = [];
						arr.push("请选择服务人员");
						data.forEach(item => {
							arr.push(item.name + "  (" + item.kind + ")")
						})
						this.array = arr;
					}
				}
			});
		},
		methods: {
			onKeyInput(e) {
				this.value = e.target.value
			},
			bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.index = e.target.value
			},
			bindDateChange: function(e) {
				this.date = e.detail.value
			},
			formSubmit: function(e) {
				if (this.value == "") {
					return;
				}
				if (e.detail.value.serviceTime == "") {
					this.$http.showToastOverride("请选择服务时间");
					return;
				}
				if (e.detail.value.reason == "") {
					this.$http.showToastOverride("请输入投诉理由");
					return;
				};
				uni.request({
					url: this.$http.contextPath + 'orderMeal/complain',
					method: 'POST',
					header: {
						'Content-Type': 'application/json'
					},
					data: {
						"elderlyId": this.user.id,
						"organizationId": this.user.organId,
						"serviceStatus": 2,
						"serviceDate": e.detail.value.serviceTime,
						"complaintReason": e.detail.value.reason,
						"remark": e.detail.value.remark,
						"orderKind": "投诉",
						"orderFrom": "APP"
					},
					success: (res) => {
						if (res.data.status == 1) {
							this.formReset();
							uni.navigateTo({
								url: '/pages/success/complaintSuccess'
							});
						} else {
							uni.navigateTo({
								url: '/pages/fail/fail'
							});
						}
					}
				});
			},
			formReset: function(e) {
				console.log('清空数据')
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
