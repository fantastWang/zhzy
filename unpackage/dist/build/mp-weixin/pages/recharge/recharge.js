(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/recharge/recharge"],{"0f2c":function(n,e,t){"use strict";t.r(e);var r=t("c663"),c=t("6d6c");for(var i in c)"default"!==i&&function(n){t.d(e,n,(function(){return c[n]}))}(i);t("e7dd");var o,u=t("f0c5"),a=Object(u["a"])(c["default"],r["b"],r["c"],!1,null,null,null,!1,r["a"],o);e["default"]=a.exports},"1b16":function(n,e,t){"use strict";(function(n){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var t={data:function(){return{user:n.getStorageSync("user"),money:50,whichSelected:"50"}},onLoad:function(){this.initProvider()},methods:{initProvider:function(){n.getProvider({service:"payment",success:function(n){console.log(n.provider)},fail:function(n){console.error("获取服务供应商失败："+JSON.stringify(n))}})},changeMoney:function(n,e){this.money=e,this.whichSelected=e},onKeyUserNameInput:function(n){this.money=n.target.value},guid:function(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,(function(n){var e=16*Math.random()|0,t="x"==n?e:3&e|8;return t.toString(16)}))},recharge:function(){n.requestPayment({provider:"wxpay",timeStamp:String(Date.now()),nonceStr:this.guid(),package:"prepay_id=wx20180101abcdefg",signType:"MD5",service:"3",paySign:"",_debug:1,orderInfo:"",success:function(n){console.log("success:"+JSON.stringify(n))},fail:function(n){console.log("fail:"+JSON.stringify(n))}})}}};e.default=t}).call(this,t("543d")["default"])},"1dd6":function(n,e,t){},5311:function(n,e,t){"use strict";(function(n){t("7f23");r(t("66fd"));var e=r(t("0f2c"));function r(n){return n&&n.__esModule?n:{default:n}}n(e.default)}).call(this,t("543d")["createPage"])},"6d6c":function(n,e,t){"use strict";t.r(e);var r=t("1b16"),c=t.n(r);for(var i in r)"default"!==i&&function(n){t.d(e,n,(function(){return r[n]}))}(i);e["default"]=c.a},c663:function(n,e,t){"use strict";var r,c=function(){var n=this,e=n.$createElement;n._self._c},i=[];t.d(e,"b",(function(){return c})),t.d(e,"c",(function(){return i})),t.d(e,"a",(function(){return r}))},e7dd:function(n,e,t){"use strict";var r=t("1dd6"),c=t.n(r);c.a}},[["5311","common/runtime","common/vendor"]]]);