import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueChatScroll from "vue-chat-scroll";
// import { auth } from "./firebase";
// import { db } from "./firebase";

// import VueResource from "vue-resource";u870
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Functions from "./components/services/posts";

// import firebase from "firebase";
import VueGeoLocation from "vue-browser-geolocation";
import socktConnect from "socket.io-client";

import vuetify from "./plugins/vuetify";
import navbar from "@/components/navbar";
import Mixins from "./plugins/mixins";
import socketMixins from "./plugins/socketMixins";
import deleteItem from "./components/branch-components/deleteItem.vue"
// import db from "./firebase";
Vue.use(VueGeoLocation);
Vue.mixin(Mixins);
Vue.mixin(socketMixins);
Vue.component("navbar", navbar);
Vue.component("deleteItem", deleteItem);
// Vue.prototype.firebase = firebase
Vue.use(VueChatScroll);

// Vue.use(VueResource);
// Vue.http.options.root = "https://httprequest-test-44076.firebaseio.com/";
// Vue.config.productionTip = false;

const usedUrl = {
  local: "http://localhost:3000/",
  global: "https://facebook-clones.herokuapp.com/",
};
let currentUrl = usedUrl.local;
Vue.prototype.$soketio = socktConnect(currentUrl);

new Vue({
  router,
  store,
  render: (h) => h(App),
  vuetify,

  // created() {
  //   this.$store.dispatch("autoSign");
  //   this.$store.dispatch("getrequestsuser");
  //   this.$store.dispatch("getuserposts");
  //   this.$store.dispatch("getAllPosts");
  //   this.$store.dispatch("getallusers");
  //   // this.$store.dispatch("getrequests");
  //   this.$store.dispatch("getmyfriends");
  //   this.$store.dispatch("getcomments");
  //   this.$store.dispatch("getfivuorite");
  //   this.$store.dispatch("getlikes");

  //   // this.$store.dispatch("getinfouser");

  //   // this.$store.dispatch("allpostsinuser");
  //   // auth.onAuthStateChanged((user) => {
  //   //   let datauser = null;
  //   //   if (user) {
  //   //     console.log(user.uid);
  //   //     db.collection("users")
  //   //       .doc(user.uid)
  //   //       .get()
  //   //       .then((e) => {
  //   //         console.log(e.data());
  //   //         datauser = e.data();
  //   //         console.log(datauser);
  //   //       })
  //   //       .then(() => {
  //   //         this.$store.dispatch("autoSign", datauser);
  //   //         this.$store.dispatch("getrequestsuser");
  //   //         this.$store.dispatch("getuserposts");
  //   //         this.$store.dispatch("getAllPosts");
  //   //         this.$store.dispatch("getallusers");
  //   //         // this.$store.dispatch("getrequests");
  //   //         this.$store.dispatch("getmyfriends");
  //   //         this.$store.dispatch("getcomments");
  //   //         this.$store.dispatch("getfivuorite");
  //   //         this.$store.dispatch("getlikes");

  //   //         // this.$store.dispatch("getinfouser");

  //   //         // this.$store.dispatch("allpostsinuser");
  //   //       });
  //   //   } else {
  //   //     console.log("there is no user");
  //   //   }
  //   // });
  // },
  async mounted() {
    try {
      let userToken = localStorage.getItem("userToken");
      console.log(userToken);

      return Functions.getuserWithToken(userToken).then((currentUser) => {
        console.log(currentUser);
        this.$store.dispatch("setCurrentUser", currentUser.data.user);
        // if (currentUser.data.user == null) {
        // this.$router.push("/login");
        // } else {
        // .then(() => {
        //   this.$router.push("/");
        // });
        // }
      });
      // let res = Functions.getuserWithToken(userToken);
      // console.log(res);
      // this.$store.dispatch("setUserData", res)
    } catch (err) {
      console.log(err);
    }
  },
  watch: {
    user(newValue) {
      if (newValue) {
        this.initSocket();
        // this.$store.dispatch("fetchUsersFromDb")
        this.$store.dispatch('fetchPostsFromDb')
      }
    },
  },
}).$mount("#app");
// let app = "";
// firebase.auth().onAuthStateChanged(() => {
//   if (!app) {

//   }
// });
