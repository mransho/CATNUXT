import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/Login.vue";
import SignUp from "../views/signup.vue";
import AllPosts from "../views/allposts.vue";
import MyProfile from "../views/myprofile.vue";
import StartPage from "../views/Start.vue";
import UserProfile from "../views/UserProfile.vue";

const routes = [
  {
    path: "/",
    name: "StartPage",
    component: StartPage,
  },
  {
    path: "/user/:userId",
    name: "UserProfile",
    component: UserProfile,
  },
  {
    path: "/Login",
    name: "LoginView",
    component: LoginView,
  },
  {
    path: "/SignUp",
    name: "SignUp",
    component: SignUp,
  },
  {
    path: "/AllPosts",
    name: "AllPosts",
    component: AllPosts,
  },
  {
    path: "/MyProfile",
    name: "MyProfile",
    component: MyProfile,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
