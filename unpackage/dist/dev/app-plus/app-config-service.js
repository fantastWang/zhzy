
var isReady=false;var onReadyCallbacks=[];
var isServiceReady=false;var onServiceReadyCallbacks=[];
var __uniConfig = {"pages":["pages/list/list","pages/meal/orderMeal","pages/personal/personal","pages/login/login","pages/login/forgotPassword","pages/service/serviceOrder","pages/service/serviceRecordDetail","pages/recharge/recharge","pages/success/rechargeSuccess","pages/recharge/rechargeRecord","pages/service/serviceRecord","pages/success/serviceSuccess","pages/complaint/complaint","pages/success/orderMealSuccess","pages/meal/mealRecord","pages/index/index","pages/login/brushFaceLogin","pages/login/phoneNumberLogin","pages/success/complaintSuccess","pages/fail/fail","pages/login/register"],"window":{"navigationBarTextStyle":"white","navigationBarTitleText":"uni-app","navigationBarBackgroundColor":"#00BE86","backgroundColor":"#FFFFFF","enablePullDownRefresh":true},"tabBar":{"color":"#7A7E83","selectedColor":"#3cc51f","borderStyle":"black","backgroundColor":"#ffffff","list":[{"pagePath":"pages/list/list","iconPath":"/static/img/indexNoIcon.png","selectedIconPath":"/static/img/indexIcon.png","text":"首页"},{"pagePath":"pages/personal/personal","iconPath":"/static/img/personlIcon.png","selectedIconPath":"/static/img/personalNoIcon.png","text":"我的"}]},"nvueCompiler":"uni-app","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"zhzy","compilerVersion":"2.8.3","entryPagePath":"pages/list/list","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/list/list","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"首页","enablePullDownRefresh":false}},{"path":"/pages/meal/orderMeal","meta":{},"window":{"navigationBarTitleText":"订餐"}},{"path":"/pages/personal/personal","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"我的"}},{"path":"/pages/login/login","meta":{},"window":{"navigationBarTitleText":"登录"}},{"path":"/pages/login/forgotPassword","meta":{},"window":{"navigationBarTitleText":"修改密码"}},{"path":"/pages/service/serviceOrder","meta":{},"window":{"navigationBarTitleText":"服务预约"}},{"path":"/pages/service/serviceRecordDetail","meta":{},"window":{"navigationBarTitleText":"服务记录-详情"}},{"path":"/pages/recharge/recharge","meta":{},"window":{"navigationBarTitleText":"充值"}},{"path":"/pages/success/rechargeSuccess","meta":{},"window":{"navigationBarTitleText":"充值"}},{"path":"/pages/recharge/rechargeRecord","meta":{},"window":{"navigationBarTitleText":"充值记录","enablePullDownRefresh":false}},{"path":"/pages/service/serviceRecord","meta":{},"window":{"navigationBarTitleText":"服务记录","enablePullDownRefresh":false}},{"path":"/pages/success/serviceSuccess","meta":{},"window":{"navigationBarTitleText":"服务预约"}},{"path":"/pages/complaint/complaint","meta":{},"window":{"navigationBarTitleText":"投诉建议"}},{"path":"/pages/success/orderMealSuccess","meta":{},"window":{"navigationBarTitleText":"订餐"}},{"path":"/pages/meal/mealRecord","meta":{},"window":{"navigationBarTitleText":"订餐记录"}},{"path":"/pages/index/index","meta":{},"window":{"navigationBarTitleText":"uni-ui基础项目"}},{"path":"/pages/login/brushFaceLogin","meta":{},"window":{"navigationBarTitleText":"刷脸登录"}},{"path":"/pages/login/phoneNumberLogin","meta":{},"window":{"navigationBarTitleText":"手机号登录"}},{"path":"/pages/success/complaintSuccess","meta":{},"window":{"navigationBarTitleText":"投诉建议"}},{"path":"/pages/fail/fail","meta":{},"window":{"navigationBarTitleText":"投诉建议"}},{"path":"/pages/login/register","meta":{},"window":{"navigationBarTitleText":"注册"}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
__uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});