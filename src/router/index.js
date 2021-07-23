import Vue from "vue";
import VueRouter from "vue-router";
import Index from "@/views/Index.vue";
import Room from "@/views/Room.vue";
import SignIn from "@/views/SignIn.vue";
import Create from "@/views/Create.vue";
import FAQ from "@/views/FAQ.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Index",
    component: Index,
  },
  {
    path: "/signIn",
    name: "SignIn",
    component: SignIn,
  },
  {
    path: "/create",
    name: "Create",
    component: Create,
  },
  {
    path: "/faq",
    name: "FAQ",
    component: FAQ,
  },
  {
    path: "/rooms/:room",
    name: "Room",
    component: Room,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
