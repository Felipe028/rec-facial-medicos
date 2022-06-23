/*!

=========================================================
* Vue White Dashboard - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/vue-white-dashboard
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/vue-white-dashboard/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Vue from "vue";
import VueRouter from "vue-router";
import SocialSharing from "vue-social-sharing";
import VueGitHubButtons from "vue-github-buttons";
import "vue-github-buttons/dist/vue-github-buttons.css";
import App from "./App.vue";
import "@/assets/scss/white-dashboard.scss";
import "@/assets/css/nucleo-icons.css";
import "@/assets/demo/demo.css";

import GlobalComponents from "./globalComponents";
import globalVariable from "./globalVariable";
import GlobalDirectives from "./globalDirectives";
import RTLPlugin from "./RTLPlugin";
import Notify from "@/components/NotificationPlugin";
import i18n from "./i18n";
import SideBar from "@/components/SidebarPlugin";
import Element from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import VueTheMask from 'vue-the-mask';
import VueGeolocation from 'vue-browser-geolocation';
import Axios from 'axios'
import VueAxios from 'vue-axios';
import VueCookies from 'vue-cookies';
import VueAutosuggest from "vue-autosuggest";

import jwt from 'jsonwebtoken';


// element ui language configuration
import lang from "element-ui/lib/locale/lang/en";
import locale from "element-ui/lib/locale";
locale.use(lang);

Vue.config.productionTip = false;
Axios.defaults.baseURL = process.env.VUE_APP_API_ADDRESS

// router setup
import routes from "./router";

// configure router
const router = new VueRouter({
  routes, // short for routes: routes
  linkExactActiveClass: "active"
});


router.beforeEach((nextPage, beforePage, next) => {
  // const token = getCookie("token")
  const levelAccess = getCookie("levelAccess")
  var validToken = false
  var lvlAccess = 0
  
  jwt.verify(levelAccess, globalVariable.KEY_LEVEL_7, function(err, decoded) {
    if(decoded){lvlAccess = 7}
  })

  jwt.verify(levelAccess, globalVariable.KEY_LEVEL_10, function(err, decoded) {
    if(decoded){lvlAccess = 10}
  })
  

  if(lvlAccess > 0){
    validToken = true
  }else{
    validToken = false
  }


  if (!validToken && !nextPage.meta.public){
    next({ name: 'login' })
  }else{
    if(nextPage.meta.levelAccess >= lvlAccess){
      next()
    }else{
      next({ name: beforePage.name })
    }
  }
})


function getCookie(name){
  var cookies = document.cookie;
  var prefix = name + "=";
  var begin = cookies.indexOf("; " + prefix);

  if (begin == -1) {
    begin = cookies.indexOf(prefix);  
    if (begin != 0) {
        return null;
    }
  }else{
    begin += 2;
  }

  var end = cookies.indexOf(";", begin);
  if (end == -1){
    end = cookies.length;                        
  }

  return unescape(cookies.substring(begin + prefix.length, end));
}

Vue.use(Element);
Vue.use(VueRouter);
Vue.use(SocialSharing);
Vue.use(VueGitHubButtons, { useCache: true });
Vue.use(GlobalComponents);
Vue.use(GlobalDirectives);
Vue.use(RTLPlugin);
Vue.use(SideBar);
Vue.use(Notify);
Vue.use(VueTheMask);
Vue.use(VueGeolocation);
Vue.use(VueAxios, Axios);
Vue.use(VueAutosuggest);
Vue.use(VueCookies);


new Vue({
  router,
  i18n,
  render: h => h(App)
}).$mount("#app");
