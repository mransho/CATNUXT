<template>
  <div class="minDiv" v-if="user">
    <nav class="navbar navbar-expand-lg">
      <div class="cont-fluid">
        <div id="navbarSupportedContent">
          <ul class="navbar-nav flex-row">
            <li class="logo" to="/">
              <img src="../assets/New.png" alt="" />
            </li>
            <li class="nav-item AllPosts">
              <router-link class="nav-link" to="/" @click="selectActive">
                <font-awesome-icon
                  icon="fa-solid fa-house fa-lg"
                  class="icon"
                />
              </router-link>
            </li>
            <li class="nav-item MyProfile">
              <router-link
                class="nav-link"
                to="/MyProfile"
                @click="selectActive"
              >
                <font-awesome-icon icon="fa-solid fa-user fa-lg" class="icon" />
              </router-link>
            </li>
            <li class="nav-item">
              <router-link
                class="nav-link LogOut"
                to="/AllPosts"
                v-on:click="signOut"
              >
                <font-awesome-icon
                  icon="fa-solid fa-power-off fa-lg"
                  class="icon"
                />
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>
<script>
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

import router from "../router";

export default {
  name: "NavBar",
  data() {
    return {
      user: null,
    };
  },
  methods: {
    signOut() {
      signOut(getAuth())
        .then(() => {
          localStorage.removeItem("uidUser");
          router.push({
            name: "LoginView",
          });
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
    },
    selectActive() {
      setTimeout(() => {
        try {
          // console.log(this.$route.path);
          if (this.$route.path === "/MyProfile") {
            document
              .getElementsByClassName("MyProfile")[0]
              .classList.add("selectActive");
            document.getElementsByClassName("icon")[1].style.color = "#1876f2";

            document
              .getElementsByClassName("AllPosts")[0]
              .classList.remove("selectActive");
            document.getElementsByClassName("icon")[0].style.color = "#858585";
          }
          if (this.$route.path === "/AllPosts") {
            document
              .getElementsByClassName("MyProfile")[0]
              .classList.remove("selectActive");
            document.getElementsByClassName("icon")[1].style.color = "#858585";

            document
              .getElementsByClassName("AllPosts")[0]
              .classList.add("selectActive");
            document.getElementsByClassName("icon")[0].style.color = "#1876f2";
          }
        } catch (error) {
          console.log(error);
        }
      }, 500);
    },
  },
  created() {
    onAuthStateChanged(getAuth(), (userAuth) => {
      if (userAuth) {
        this.user = userAuth;
      } else {
        this.user = null;
      }
    });
    this.selectActive();
  },
};
</script>
<style scoped lang="scss">
.minDiv {
  background: white;
  position: fixed;
  width: 100%;
  height: 63px;
  z-index: 1;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3);
}
div,
ul {
  height: 100%;
}
.navbar {
  padding: 0px;
  height: 100%;
}
.cont-fluid {
  width: 100%;
  height: 100%;
}
.navbar-nav {
  width: 100%;
  display: grid;
  grid-template-columns: 30% 20% 20% 30%;
}
.nav-item {
  width: 94px;
  margin-right: auto;
  margin-left: auto;
  display: flex;
  align-items: center;
}
.selectActive {
  border-bottom: 3px solid #1876f2;
}
// .logo {
//   color: #ffffff;
//   font-weight: bold;
//   text-decoration: none;
//   font-size: 30px;
// }
a {
  color: #858585;
  font-size: 20px;
  width: 94px;
  margin-right: auto;
  margin-left: auto;
  transition: all 0.1s;
}
// .icon {
//   color: #1876f2;
// }
// a:hover {
//   color: #858585;
// }
a:hover {
  background-color: #ededed;
  border-radius: 9px;
}
// nav {
//   a {
//     &.router-link-exact-active {
//       color: #ffffff !important;
//     }
//   }
// }

// .LogOut {
//   border-bottom: none !important;
//   color: blue;
//   justify-content: center;
//   display: flex;
//   align-items: center;
// }
.logo {
  display: flex;
  justify-content: center;
  align-items: center;
}
.logo img {
  width: 82px;
}
// .LogOut {
//   color: #858585;
// }
// @media screen and (max-width: 991px) {
//   a {
//     font-size: 15px;
//   }
// }
</style>
