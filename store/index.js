import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const all = {
	namespaced: true,
	state: {

	},
	getters: {},
	mutations: {}
}

const my = {
	namespaced: true,
	state: {},
	mutations: {},
	actions: {},
	getters: {}
}

const store = new Vuex.Store({

	modules: {
		all: all,
		my: my
	},
	state: {
		forcedLogin: false, //是否需要强制登录
		hasLogin: false,
		account: null, //登陆账号
		accounts: [], //注册的账号
		redirect: '/pages/index/index', //重新定向路由
		target: {
			project: {}
		}
	},
	getters: {},
	mutations: {
		login(state, account) {},
		loginSuccess(state, account) {},
		logout(state) {
			state.account = null;
			state.hasLogin = false;
		},
		redirect(state, url) {
			state.redirect = url;
		},
		saveTarget(state, object) {
			state.target[object.key] = object.value;
		}
	}
})

export default store
