<template>
  <NavBar></NavBar>
  <router-view />
</template>

<script>
import NavBar from "./views/Navbar.vue";
export default {
  components: {
    NavBar,
  },
};
</script>

<style lang="scss">
@import "~bootstrap/dist/css/bootstrap.min.css";

body {
  margin: 0px;
  padding: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding: 0;
  margin: 0;
}
</style>
