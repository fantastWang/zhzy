(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/uni-link/uni-link"],{"1e71":function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e={name:"uniLink",props:{href:{type:String,default:""},text:{type:String,default:""},showUnderLine:{type:[Boolean,String],default:!0},copyTips:{type:String,default:"已自动复制网址，请在手机浏览器里粘贴该网址"},color:{type:String,default:"#999999"},fontSize:{type:[Number,String],default:14}},methods:{openURL:function(){t.setClipboardData({data:this.href}),t.showModal({content:this.copyTips,showCancel:!1})}}};n.default=e}).call(this,e("543d")["default"])},"52e7e":function(t,n,e){"use strict";var a=e("daac"),u=e.n(a);u.a},"7b99":function(t,n,e){"use strict";e.r(n);var a=e("b5ac"),u=e("bd4d");for(var i in u)"default"!==i&&function(t){e.d(n,t,(function(){return u[t]}))}(i);e("52e7e");var r,o=e("f0c5"),c=Object(o["a"])(u["default"],a["b"],a["c"],!1,null,"2d1d5d28",null,!1,a["a"],r);n["default"]=c.exports},b5ac:function(t,n,e){"use strict";var a,u=function(){var t=this,n=t.$createElement;t._self._c},i=[];e.d(n,"b",(function(){return u})),e.d(n,"c",(function(){return i})),e.d(n,"a",(function(){return a}))},bd4d:function(t,n,e){"use strict";e.r(n);var a=e("1e71"),u=e.n(a);for(var i in a)"default"!==i&&function(t){e.d(n,t,(function(){return a[t]}))}(i);n["default"]=u.a},daac:function(t,n,e){}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/uni-link/uni-link-create-component',
    {
        'components/uni-link/uni-link-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("7b99"))
        })
    },
    [['components/uni-link/uni-link-create-component']]
]);
