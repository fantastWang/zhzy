<template>
	<view class="top">
		<view class="header" style="background: url(../../static/img/serviceRecordDetail.png) no-repeat;background-size: 100% 75vh;">
			<view class="view_label">
				<label class="label">项目类别：</label>
				<label>{{item.kindName==null?"":item.kindName}}</label>
			</view>
			<view class="view_label">
				<label class="label">老人姓名：</label>
				<label>{{item.name==null?"":item.name}}</label>
			</view>
			<view class="view_label">
				<label class="label">联系电话：</label>
				<label>{{item.mobile==null?"":item.mobile}}</label>
			</view>
			<view class="view_label">
				<label class="label">工单类别：</label>
				<label>{{item.orderKind==null?"":item.orderKind}}</label>
			</view>
			<view class="view_label">
				<label class="label">支付状态：</label>
				<label>{{item.paymentStatusName==null?"":item.paymentStatusName}}</label>
			</view>
			<view class="view_label">
				<label class="label">项目名称：</label>
				<label>{{item.serviceItemName==null?"":item.serviceItemName}}</label>
			</view>
			<view class="view_label">
				<label class="label">服务费用：</label>
				<label>{{item.price==null?"":item.price+"元"}}</label>
			</view>
			<view class="view_label">
				<label class="label">服务方式：</label>
				<label>{{item.serviceModeName==null?"":item.serviceModeName}}</label>
			</view>
			<view class="view_label">
				<label class="label">服务状态：</label>
				<label>{{item.serviceStatusName==null?"":item.serviceStatusName}}</label>
			</view>
			<view class="view_label">
				<label class="label">服务人员：</label>
				<label>{{item.staffName==null?"":item.staffName}}</label>
			</view>
			<view class="view_label">
				<label class="label">联系号码：</label>
				<label>{{item.mobile==null?"":item.mobile}}</label>
			</view>
			<view class="view_label">
				<label class="label">服务日期：</label>
				<label>{{item.serviceDate==null?"":item.serviceDate}}</label>
			</view>
			<view class="view_label">
				<label class="label">服务时间：</label>
				<label>{{item.serviceTime==null?"":item.serviceTime}}</label>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				item: []
			}
		},
		onLoad(options) {
			uni.showLoading({
			    title: '加载中'
			});
			uni.request({
				url: this.$http.contextPath + 'orderMeal/serviceRecordDetail/'+options.id,
				method: 'post',
				success: (res) => {
					if (res.data.status == 1) {
						let data = res.data.data;
						data.serviceDate = data.serviceDate.replace('T', ' ').substring(0, 10);
						this.item = data;
						uni.hideLoading();
					}
				}
			});
		},
		methods: {

		}
	}
</script>

<style>
	.view_label {
		padding: 2vw;
	}

	.label {
		color: #999999;
	}

	.top {
		height: 100vh;
		text-align: center;
		background-color: #F6F6F6;
	}

	.header {
		margin: 0 auto;
		width: 95%;
		text-align: left;
		padding-left: 3vw;
		padding-top: 2vh;
		height: 80vh;
	}
</style>
