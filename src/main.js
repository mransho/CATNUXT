import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import moment from "../node_modules/moment";
// import { VueVirtualScroller } from "vue-virtual-scroll-list";
import VueVirtualScroller from "vue-virtual-scroller";

/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";

/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

/* import specific icons */
import {
  faUserSecret,
  faPowerOff,
  faHouse,
  faUser,
  faArrowUpFromBracket,
  faShare,
  faMessage,
  faThumbsUp,
  faPaperPlane,
  faPlus,
  faEnvelope,
  faLock,
  faPhone,
  faVenusMars,
  faVenus,
  faMars,
  faEarthAmericas,
} from "@fortawesome/free-solid-svg-icons";

/* add icons to the library */
library.add(
  faLock,
  faThumbsUp,
  faShare,
  faMessage,
  faUserSecret,
  faPowerOff,
  faEnvelope,
  faHouse,
  faUser,
  faArrowUpFromBracket,
  faPaperPlane,
  faPlus,
  faPhone,
  faVenusMars,
  faVenus,
  faMars,
  faEarthAmericas
);
const app = createApp(App);
app.component("font-awesome-icon", FontAwesomeIcon);
app.use(store);
app.use(router);
app.use(moment);
app.use(VueVirtualScroller);
app.mount("#app");
