<template>
  <div class="minContainer"></div>
</template>
<script>
import { getAuth, onAuthStateChanged } from "firebase/auth";
import router from "../router";

export default {
  name: "StartPage",
  data() {
    return {
      user: {},
    };
  },
  methods: {
    start() {
      const auth = getAuth();
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          router.push({
            name: "AllPosts",
          });
        } else {
          router.push({
            name: "LoginView",
          });
        }
      });
    },
  },
  created() {
    this.start();
  },
};
</script>
<style scoped>
.minContainer {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}
</style>
