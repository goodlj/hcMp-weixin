import App from './App'
import request from 'utils/request.js'  //引入异步请求函数
import share from '@/utils/share.js'
Vue.mixin(share)
// #ifndef VUE3
import Vue from 'vue'
// uview
import uView from 'uview-ui';
Vue.use(uView);
Vue.prototype.request = request.request //挂载到全局
let imgurl = 'https://xhzl.sxhcyywl.com:1443/prod-api'
// let imgurldev = 'http://10.142.150.3:8099'
// let imgurl = 'https://ga.rasmall.cn/prod-api'
Vue.prototype.myimgurl = function () {
  return imgurl;
};
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App
})
let adlist = [
	{
		bannerAd: 'adunit-3187490d80ba92ca',//Banner广告
		gridAd:   'adunit-26da28df208c002c',//原生广告
		videoAd:  'adunit-e3777ebcaaad92af',//视频广告
		awardAd:  'adunit-c6b420834b40ddbb',//激励式广告
		plaqueAd: 'adunit-67e3b026600b6582',//插屏广告
	}
]
function myad(){
	return adlist;
}
function jump(url){
	uni.navigateTo({
	    url: url
	});
}
// function GoLogin(url){
// 	uni.redirectTo({
// 		url: '/pages/login/login'
// 	});
// uni.switchTab({
//     url: '/pages/index/index'
// });
// }

function Godetails(v,url){
	console.log(JSON.stringify(v))
	uni.navigateTo({
		url:url+'?params='+ JSON.stringify(v)
	})
}
function ZH(json){
	return JSON.parse(json)
}
function mes(str){
	uni.showToast({
		title:str,
		icon:'none'
	})
}
//方案一
// if(uni.getSystemInfoSync().platform!=="devtools"){
// 	console.log=()=>{}
// }
//方案二
if (process.env.NODE_ENV !== 'development') {
  console.log = () => {}  // 非开发环境禁用日志
}
Vue.prototype.jump = jump;
Vue.prototype.myad = myad;
Vue.prototype.mes = mes;
Vue.prototype.Godetails = Godetails;
Vue.prototype.ZH = ZH;
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif