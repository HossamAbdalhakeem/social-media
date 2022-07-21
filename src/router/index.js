import Vue from "vue";
import VueRouter from "vue-router";
import home from "@/components/home.vue";
import signup from "@/components/register/signup";
import login from "@/components/register/login";
import profile from "@/components/user/profile";
import singleuser from "@/components/singleuser";
import fivourite from "@/components/user/fivourite";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: home,
  },
  {
    path: "/signup",
    name: "signup",
    component: signup,
  },
  {
    path: "/login",
    name: "login",
    component: login,
  },
  {
    path: "/profile",
    name: "profile",
    component: profile,
  },

  {
    path: "/singleuser/:id",
    name: "singleuser",
    component: singleuser,
    props: true,
  },

  {
    path: "/fivourite",
    name: "fivourite",
    component: fivourite,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
