<template>
	<view style="text-align: center;background-color: #F6F6F6;height: 100%;">
		<view style="margin: 0 auto;background-color: #FFFFFF;width: 95%;margin-top: 2vh;">
			<form @submit="formSubmit" @reset="formReset">
				<view style="height: 80%;margin: 0 auto;width: 95%;margin-top: 2vh;background-color: #FFFFFF;">
					<view class="uni-flex uni-row" style="border: 1px #FFFFFF;padding-top: 2vh;">
						<view class="flex-item" style="width: 25%;height: 6vh;line-height: 6vh;font-size: 12px;">
							受理单位
						</view>
						<view class="flex-item" style="font-size: 12px;width: 75%;text-align: left;padding-left: 2vw;height: 6vh;line-height: 6vh;">
							<input class="uni-input" value="政府用户" disabled="true" />
						</view>
					</view>
					<view class="uni-flex uni-row" style="border: 1px #FFFFFF;padding-top: 2vh;">
						<view class="flex-item" style="width: 25%;height: 6vh;line-height: 6vh;font-size: 12px;">
							老人姓名
						</view>
						<view class="flex-item" style="font-size: 12px;width: 75%;text-align: left;padding-left: 2vw;height: 6vh;line-height: 6vh;">
							<input class="uni-input" placeholder="请输入姓名" @input="onKeyInput" name="name" :value="user.name" />
						</view>
					</view>
					<view class="uni-flex uni-row" style="border: 1px #FFFFFF;padding-top: 2vh;">
						<view class="flex-item" style="width: 25%;height: 6vh;line-height: 6vh;font-size: 12px;">
							联系电话
						</view>
						<view class="flex-item" style="font-size: 12px;width: 75%;text-align: left;padding-left: 2vw;height: 6vh;line-height: 6vh;">
							<input class="uni-input" maxlength="11" placeholder="请输入联系电话" name="phone" :value="user.mobile" />
						</view>
					</view>
					<view class="uni-flex uni-row" style="border: 1px #FFFFFF;padding-top: 2vh;">
						<view class="flex-item" style="width: 25%;height: 6vh;line-height: 6vh;font-size: 12px;">
							服务地址
						</view>
						<view class="flex-item" style="font-size: 12px;width: 75%;text-align: left;padding-left: 2vw;height: 6vh;line-height: 6vh;">
							<input class="uni-input" placeholder="请输入服务地址" name="addr" :value="user.address" />
						</view>
					</view>
					<view class="uni-flex uni-row" style="border: 1px #FFFFFF;padding-top: 2vh;">
						<view class="flex-item" style="width: 25%;height: 6vh;line-height: 6vh;font-size: 12px;">
							工单类型
						</view>
						<view class="flex-item" style="font-size: 12px;width: 75%;text-align: left;padding-left: 2vw;height: 6vh;line-height: 6vh;">
							<picker @change="pickOrderKind" :value="orderKindIndex" :range="orderKindArray" range-key="name">
								<!-- <input v-if="orderKindIndex==0" class="uni-input" name="orderKind" placeholder="请选择工单类型" />
								<input v-else class="uni-input" :value="orderKindArray[orderKindIndex].name" name="orderKind" /> -->
								<view name="orderKind" :class="[orderKindArray[orderKindIndex].value==''?'view_input_no':'view_input_yes']">{{orderKindArray[orderKindIndex].name}}</view>
							</picker>
						</view>
					</view>
					<view class="uni-flex uni-row" style="border: 1px #FFFFFF;padding-top: 2vh;">
						<view class="flex-item" style="width: 25%;height: 6vh;line-height: 6vh;font-size: 12px;">
							项目类别
						</view>
						<view class="flex-item" style="font-size: 12px;width: 75%;text-align: left;padding-left: 2vw;height: 6vh;line-height: 6vh;">
							<picker @change="pickServiceKind" :value="index" :range="array" range-key="name">
								<!-- <input v-if="index==0" class="uni-input" name="kind" placeholder="请选择项目类别" />
								<input v-else class="uni-input" :value="array[index].name" name="kind" /> -->
								<view name="kind" :class="[array[index].value==''?'view_input_no':'view_input_yes']">{{array[index].name}}</view>
							</picker>
						</view>
					</view>
					<view class="uni-flex uni-row" style="border: 1px #FFFFFF;padding-top: 2vh;">
						<view class="flex-item" style="width: 25%;height: 6vh;line-height: 6vh;font-size: 12px;">
							项目名称
						</view>
						<view class="flex-item" style="font-size: 12px;width: 75%;text-align: left;padding-left: 2vw;height: 6vh;line-height: 6vh;">
							<picker @change="projectNameChange" :value="projectIndex" :range="projectArray" range-key="name">
								<!-- <input v-if="projectIndex==0" class="uni-input" name="serviceItemId" placeholder="请选择项目名称" />
								<input v-else class="uni-input" :value="projectArray[projectIndex].name" name="serviceItemId" /> -->
								<view name="serviceItemId" :class="[projectArray[projectIndex].value==''?'view_input_no':'view_input_yes']">{{projectArray[projectIndex].name}}</view>
							</picker>
						</view>
					</view>
					<view class="uni-flex uni-row" style="border: 1px #FFFFFF;padding-top: 2vh;">
						<view class="flex-item" style="width: 25%;height: 6vh;line-height: 6vh;font-size: 12px;">
							服务方式
						</view>
						<view class="flex-item" style="font-size: 12px;width: 75%;text-align: left;padding-left: 2vw;height: 6vh;line-height: 6vh;">
							<picker @change="bindServiceMode" :value="serviceIndex" :range="serviceArray" range-key="name">
								<!-- <input v-if="serviceIndex==0" class="uni-input" name="serviceMode" placeholder="请选择服务方式" />
								<input v-else class="uni-input" :value="serviceArray[serviceIndex].name" name="serviceMode" /> -->
								<view name="serviceMode" :class="[serviceArray[serviceIndex].value==''?'view_input_no':'view_input_yes']">{{serviceArray[serviceIndex].name}}</view>
							</picker>
						</view>
					</view>
					<view class="uni-flex uni-row" style="border: 1px #FFFFFF;padding-top: 2vh;">
						<view class="flex-item" style="width: 25%;height: 6vh;line-height: 6vh;font-size: 12px;">
							紧急程度
						</view>
						<view class="flex-item" style="font-size: 12px;width: 75%;text-align: text;padding-left: 2vw;height: 6vh;line-height: 6vh;">
							<picker @change="bindEmergency" :value="emergencyIndex" :range="emergencyArray" range-key="name">
								<!-- <input v-if="emergencyIndex==0" hold-keyboard=true class="uni-input" name="emergency" placeholder="请选择紧急程度" />
								<input v-else class="uni-input" hold-keyboard=true :value="emergencyArray[emergencyIndex].name" name="emergency" /> -->
								<view name="emergency" :class="[emergencyArray[emergencyIndex].value==''?'view_input_no':'view_input_yes']">{{emergencyArray[emergencyIndex].name}}</view>
							</picker>
						</view>
					</view>
					<view class="uni-flex uni-row" style="border: 1px #FFFFFF;padding-top: 2vh;">
						<view class="flex-item" style="width: 25%;height: 6vh;line-height: 6vh;font-size: 12px;">
							服务日期
						</view>
						<view class="flex-item" style="font-size: 12px;width: 75%;text-align: left;padding-left: 2vw;height: 6vh;line-height: 6vh;">
							<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
								<input v-if="date==''" class="uni-input" name="serviceDate" placeholder="请选择服务日期" />
								<input v-else class="uni-input" :value="date" name="serviceDate" />
							</picker>
						</view>
					</view>
					<view class="uni-flex uni-row" style="border: 1px #FFFFFF;padding-top: 2vh;">
						<view class="flex-item" style="width: 25%;height: 6vh;line-height: 6vh;font-size: 12px;">
							服务时间
						</view>
						<view class="flex-item" style="font-size: 12px;width: 75%;text-align: left;padding-left: 2vw;height: 6vh;line-height: 6vh;">
							<picker mode="time" :value="time" @change="bindTimeChange">
								<input v-if="time==''" class="uni-input" name="serviceTime" placeholder="请选择服务时间" />
								<input v-else class="uni-input" :value="time" name="serviceTime" />
							</picker>
						</view>
					</view>
					<view class="uni-flex uni-row" style="border: 1px #FFFFFF;padding-top: 2vh;">
						<view class="flex-item" style="width: 25%;height: 6vh;line-height: 6vh;font-size: 12px;">
							备注
						</view>
						<view class="flex-item" style="font-size: 12px;width: 75%;text-align: left;padding-left: 2vw;height: 6vh;line-height: 6vh;">
							<input class="uni-input" placeholder="请输入备注" name="remark" />
						</view>
					</view>
				</view>
				<view style="margin: 0 auto;width: 95%;">
					<view class="uni-btn-v">
						<button form-type="submit" :class="[value==''?'button':'hightButton']">提交工单</button>
						<!-- <button form-type="reset" ref="resrtBtn">Reset</button> -->
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
		month = month > 9 ? month : '0' + month;
		day = day > 9 ? day : '0' + day;
		return `${year}-${month}-${day}`;
	}
	export default {
		data() {
			return {
				date: "",
				time: "",
				startDate: getDate('start'),
				endDate: getDate('end'),
				array: [],
				index: 0,
				serviceArray: [{
					name: '请选择服务方式',
					value: ""
				}, {
					name: '站点',
					value: "station"
				}, {
					name: '上门',
					value: "visit"
				}, {
					name: '在线',
					value: "online"
				}, {
					name: '其他',
					value: "other"
				}],
				serviceIndex: 0,
				emergencyArray: [{
					name: '请选择紧急程度',
					value: ''
				}, {
					name: '一般',
					value: '一般'
				}, {
					name: '次要',
					value: '次要'
				}, {
					name: '重要',
					value: '重要'
				}, {
					name: '严重',
					value: '严重'
				}],
				emergencyIndex: 0,
				projectArray: [{
					"name": "请选择项目名称",
					"value": ""
				}],
				projectIndex: 0,
				user: uni.getStorageSync('user'),
				orderKindArray: [{
					name: '请选择工单类型',
					value: ''
				}, {
					name: '虚拟养老院',
					value: '虚拟养老院'
				}, {
					name: '时间银行',
					value: '时间银行'
				}, {
					name: '银发顾问',
					value: '银发顾问'
				}, {
					name: '家庭医生',
					value: '家庭医生'
				}, {
					name: '紧急救助',
					value: '紧急救助'
				}, {
					name: '投诉',
					value: '投诉'
				}, {
					name: '其它',
					value: '其它'
				}],
				orderKindIndex: 0,
				value: uni.getStorageSync('user').name
			}
		},
		onLoad() {
			uni.request({
				url: this.$http.contextPath + 'orderMeal/serviceKind',
				method: 'POST',
				header: {
					'Content-Type': 'application/json'
				},
				data: null,
				success: (res) => {
					if (res.data.status == 1) {
						let data = res.data.data;
						let arr = [];
						arr.push({
							"name": "请选择项目类别",
							"value": ""
						});
						data.forEach(item => {
							arr.push({
								"name": item.name,
								"value": item.code
							})
						})
						this.array = arr;
					}
				}
			});
		},
		methods: {
			onKeyInput(e) {
				this.value = e.target.value;
				if (this.value == "") {
					this.user.address = "";
					this.user.mobile = ""
				}
			},
			getTodayDate() {
				let day2 = new Date();
				day2.setTime(day2.getTime());
				let month = (day2.getMonth() + 1) > 9 ? (day2.getMonth() + 1) : '0' + (day2.getMonth() + 1);;
				let date = day2.getFullYear() + "-" + month + "-" + day2.getDate();
				return date;
			},
			getTodayTime() {
				var now = new Date();
				var hour = now.getHours(); //得到小时
				var minu = now.getMinutes(); //得到分钟
				if (hour < 10) hour = "0" + hour;
				if (minu < 10) minu = "0" + minu;
				return hour + ":" + minu;
			},
			bindTimeChange: function(e) {
				this.time = e.detail.value;
				console.log(this.time)
			},
			pickOrderKind: function(e) {
				this.orderKindIndex = e.detail.value;
			},
			//项目名称
			projectNameChange: function(e) {
				this.projectIndex = e.detail.value;
			},
			//项目类别
			pickServiceKind: function(e) {
				this.index = e.detail.value;
				if (this.index != 0) {
					uni.request({
						url: this.$http.contextPath + 'orderMeal/serviceItems',
						method: 'POST',
						header: {
							'Content-Type': 'application/json'
						},
						data: {
							"organizationId": this.user.organId,
							"kind": this.array[this.index].value
						},
						success: (res) => {
							if (res.data.status == 1) {
								let data = res.data.data;
								let arr = [];
								arr.push({
									"name": "请选择项目名称",
									"value": ""
								});
								data.forEach(item => {
									arr.push({
										"name": item.name,
										"value": item.id
									})
								})
								this.projectArray = arr;
							}
						}
					});
				}
			},
			bindDateChange: function(e) {
				this.date = e.detail.value;
			},
			bindServiceMode: function(e) {
				this.serviceIndex = e.detail.value;
			},
			bindEmergency: function(e) {
				this.emergencyIndex = e.detail.value;
			},
			formSubmit: function(e) {
				if (e.detail.value.name == "") {
					this.$http.showToastOverride("请输入老人姓名");
					return;
				}
				if (e.detail.value.phone == "") {
					this.$http.showToastOverride("请输入联系电话");
					return;
				}
				if (e.detail.value.addr == "") {
					this.$http.showToastOverride("请输入服务地址");
					return;
				}
				if (this.orderKindArray[this.orderKindIndex].value == "") {
					this.$http.showToastOverride("请选择工单类型");
					return;
				}
				if (this.array[this.index].value == "") {
					this.$http.showToastOverride("请选择项目类别");
					return;
				}
				if (this.projectArray[this.projectIndex].value == "") {
					this.$http.showToastOverride("请选择项目名称");
					return;
				}
				if (this.serviceArray[this.serviceIndex].value == "") {
					this.$http.showToastOverride("请选择服务方式");
					return;
				}
				if (e.detail.value.serviceDate == "") {
					this.$http.showToastOverride("请选择服务日期");
					return;
				}
				if (e.detail.value.serviceDate < this.getTodayDate()) {
					this.$http.showToastOverride("请选择正确的服务日期");
					return;
				}
				if (e.detail.value.serviceTime != "" && e.detail.value.serviceTime < this.getTodayTime()) {
					this.$http.showToastOverride("请选择正确的服务时间");
					return;
				}
				uni.request({
					url: this.$http.contextPath + 'orderMeal/saveServiceOrder',
					method: 'POST',
					header: {
						'Content-Type': 'application/json'
					},
					data: {
						"kind": this.array[this.index].value,
						"kindName": this.array[this.index].name,
						"elderlyId": this.user.id,
						"organizationId": this.user.organId,
						"serviceItemId": this.projectArray[this.projectIndex].value,
						"date": e.detail.value.serviceDate,
						"time": e.detail.value.serviceTime,
						"remark": e.detail.value.remark,
						"orderKind": this.orderKindArray[this.orderKindIndex].value,
						"orderFrom": "APP",
						"address": e.detail.value.addr,
						"emergencyLevel": this.emergencyArray[this.emergencyIndex].value,
						"mobile": e.detail.value.phone,
						"serviceMode": this.serviceArray[this.serviceIndex].value
					},
					success: (res) => {
						if (res.data.status == 1) {
							uni.reLaunch({
								url: '/pages/success/serviceSuccess'
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
				console.log('清空数据');
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

	.view_input_no {
		margin: 0 auto;
		text-align: left;
		margin-left: 3vw;
		color: #999999;
		line-height: 6vh;
	}
	
	.view_input_yes {
		margin: 0 auto;
		text-align: left;
		margin-left: 3vw;
		line-height: 6vh;
	}
</style>
