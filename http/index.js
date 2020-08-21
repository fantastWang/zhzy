import Vue from 'vue'

const test = true;
const contextPathRelease = 'https://www.qswltech.com/ecare/';
const contextPathTest = 'https://www.qswltech.com/friend-server-test/';
const contextPathLocal = 'http://192.168.0.111:7070/';
// const contextPathLocal = 'http://192.168.1.134:7070/';
const contextPath = (test) ? contextPathLocal : contextPathRelease;
const h5Path = 'https://www.qswltech.com/h5/#/'
const imgPath = 'https://friend-1251032618.cos.ap-shanghai.myqcloud.com/'; //腾讯cos
const imageView2Path = 'http://friend-1251032618.picsh.myqcloud.com/custom/avatar/'; //腾讯数据万象

/* 访问施工上传图片路径   accessAddress+数据库查出的图片名字=完整访问路径 */
const accessAddress = "http://www.fkt99.cn:9911/wxtfiles/";

const success = function(res, custom) {
	console.log(res);
	if (res.statusCode == 200) {
		if (res.data.status == 0) {
			if (!custom) {
				uni.showToast({
					icon: 'none',
					title: (res.data.msg == '') ? '未知错误，请稍后再试' : res.data.msg,
					duration: 2000
				});
			}
			return false;
		} else {
			return true;
		}
	} else {
		if (!custom) {
			uni.showToast({
				icon: 'none',
				title: '服务器内部，请稍后再试',
				duration: 2000
			});
		}
		return false;
	}
}

const fail = function(e) {
	uni.showToast({
		icon: 'none',
		title: '网络错误，请稍后再试'
	});
}

const showToastOverride = function(e) {
	uni.showToast({
		icon: 'none',
		title: e
	})
}

export default {
	test,
	contextPath,
	h5Path,
	imgPath,
	success,
	fail,
	showToastOverride,
	accessAddress
}
