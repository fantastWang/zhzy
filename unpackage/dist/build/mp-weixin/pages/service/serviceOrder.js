(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/service/serviceOrder"],{"21fc":function(e,t,a){"use strict";(function(e){function a(e){var t=new Date,a=t.getFullYear(),n=t.getMonth()+1,r=t.getDate();return"start"===e?a-=60:"end"===e&&(a+=2),n=n>9?n:"0"+n,r=r>9?r:"0"+r,"".concat(a,"-").concat(n,"-").concat(r)}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n={data:function(){return{date:"",time:"",startDate:a("start"),endDate:a("end"),array:[],index:0,serviceArray:[{name:"请选择服务方式",value:""},{name:"站点",value:"station"},{name:"上门",value:"visit"},{name:"在线",value:"online"},{name:"其他",value:"other"}],serviceIndex:0,emergencyArray:[{name:"请选择紧急程度",value:""},{name:"一般",value:"一般"},{name:"次要",value:"次要"},{name:"重要",value:"重要"},{name:"严重",value:"严重"}],emergencyIndex:0,projectArray:[{name:"请选择项目名称",value:""}],projectIndex:0,user:e.getStorageSync("user"),orderKindArray:[{name:"请选择工单类型",value:""},{name:"虚拟养老院",value:"虚拟养老院"},{name:"时间银行",value:"时间银行"},{name:"银发顾问",value:"银发顾问"},{name:"家庭医生",value:"家庭医生"},{name:"紧急救助",value:"紧急救助"},{name:"投诉",value:"投诉"},{name:"其它",value:"其它"}],orderKindIndex:0,value:e.getStorageSync("user").name}},onLoad:function(){var t=this;e.request({url:this.$http.contextPath+"orderMeal/serviceKind",method:"POST",header:{"Content-Type":"application/json"},data:null,success:function(e){if(1==e.data.status){var a=e.data.data,n=[];n.push({name:"请选择项目类别",value:""}),a.forEach((function(e){n.push({name:e.name,value:e.code})})),t.array=n}}})},methods:{onKeyInput:function(e){this.value=e.target.value,""==this.value&&(this.user.address="",this.user.mobile="")},getTodayDate:function(){var e=new Date;e.setTime(e.getTime());var t=e.getMonth()+1>9?e.getMonth()+1:"0"+(e.getMonth()+1),a=e.getFullYear()+"-"+t+"-"+e.getDate();return a},getTodayTime:function(){var e=new Date,t=e.getHours(),a=e.getMinutes();return t<10&&(t="0"+t),a<10&&(a="0"+a),t+":"+a},bindTimeChange:function(e){this.time=e.detail.value,console.log(this.time)},pickOrderKind:function(e){this.orderKindIndex=e.detail.value},projectNameChange:function(e){this.projectIndex=e.detail.value},pickServiceKind:function(t){var a=this;this.index=t.detail.value,0!=this.index&&e.request({url:this.$http.contextPath+"orderMeal/serviceItems",method:"POST",header:{"Content-Type":"application/json"},data:{organizationId:this.user.organId,kind:this.array[this.index].value},success:function(e){if(1==e.data.status){var t=e.data.data,n=[];n.push({name:"请选择项目名称",value:""}),t.forEach((function(e){n.push({name:e.name,value:e.id})})),a.projectArray=n}}})},bindDateChange:function(e){this.date=e.detail.value},bindServiceMode:function(e){this.serviceIndex=e.detail.value},bindEmergency:function(e){this.emergencyIndex=e.detail.value},formSubmit:function(t){""!=t.detail.value.name?""!=t.detail.value.phone?""!=t.detail.value.addr?""!=this.orderKindArray[this.orderKindIndex].value?""!=this.array[this.index].value?""!=this.projectArray[this.projectIndex].value?""!=this.serviceArray[this.serviceIndex].value?""!=t.detail.value.serviceDate?t.detail.value.serviceDate<this.getTodayDate()?this.$http.showToastOverride("请选择正确的服务日期"):""!=t.detail.value.serviceTime&&t.detail.value.serviceTime<this.getTodayTime()?this.$http.showToastOverride("请选择正确的服务时间"):e.request({url:this.$http.contextPath+"orderMeal/saveServiceOrder",method:"POST",header:{"Content-Type":"application/json"},data:{kind:this.array[this.index].value,kindName:this.array[this.index].name,elderlyId:this.user.id,organizationId:this.user.organId,serviceItemId:this.projectArray[this.projectIndex].value,date:t.detail.value.serviceDate,time:t.detail.value.serviceTime,remark:t.detail.value.remark,orderKind:this.orderKindArray[this.orderKindIndex].value,orderFrom:"APP",address:t.detail.value.addr,emergencyLevel:this.emergencyArray[this.emergencyIndex].value,mobile:t.detail.value.phone,serviceMode:this.serviceArray[this.serviceIndex].value},success:function(t){1==t.data.status?e.reLaunch({url:"/pages/success/serviceSuccess"}):e.navigateTo({url:"/pages/fail/fail"})}}):this.$http.showToastOverride("请选择服务日期"):this.$http.showToastOverride("请选择服务方式"):this.$http.showToastOverride("请选择项目名称"):this.$http.showToastOverride("请选择项目类别"):this.$http.showToastOverride("请选择工单类型"):this.$http.showToastOverride("请输入服务地址"):this.$http.showToastOverride("请输入联系电话"):this.$http.showToastOverride("请输入老人姓名")},formReset:function(e){console.log("清空数据")}}};t.default=n}).call(this,a("543d")["default"])},"28d2":function(e,t,a){"use strict";(function(e){a("7f23");n(a("66fd"));var t=n(a("949d"));function n(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,a("543d")["createPage"])},"85a0":function(e,t,a){"use strict";var n=a("eb68"),r=a.n(n);r.a},"949d":function(e,t,a){"use strict";a.r(t);var n=a("ca6a"),r=a("d5a2");for(var i in r)"default"!==i&&function(e){a.d(t,e,(function(){return r[e]}))}(i);a("85a0");var s,u=a("f0c5"),d=Object(u["a"])(r["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],s);t["default"]=d.exports},ca6a:function(e,t,a){"use strict";var n,r=function(){var e=this,t=e.$createElement;e._self._c},i=[];a.d(t,"b",(function(){return r})),a.d(t,"c",(function(){return i})),a.d(t,"a",(function(){return n}))},d5a2:function(e,t,a){"use strict";a.r(t);var n=a("21fc"),r=a.n(n);for(var i in n)"default"!==i&&function(e){a.d(t,e,(function(){return n[e]}))}(i);t["default"]=r.a},eb68:function(e,t,a){}},[["28d2","common/runtime","common/vendor"]]]);