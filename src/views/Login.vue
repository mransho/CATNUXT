<template>
  <div class="bigcontain">
    <div class="contain">
      <div class="Welcome fluidityWelcomeA">
        <router-link class="logo" to="/">
          <img src="../assets/New.png" alt="" />
        </router-link>
        <WelcomeHello
          v-if="stabled"
          :NewWidth="NewWidth"
          :TypewriterCase="typewriterActive"
        />
        <!-- <p id="PR1">{{ PR1 }}</p>
        <p id="PR2">{{ PR2 }}</p>
        <p id="PR3">{{ PR3 }}</p>
        <p id="PR4">{{ PR4 }}</p> -->
      </div>
      <div class="Login fluidityLoginA">
        <div class="divform">
          <form class="form" @submit.prevent="loginUser">
            <div class="divCont EmailBox">
              <label for="emailInput">
                <input
                  v-model="user.email"
                  :rules="username.rules"
                  type="text"
                  name="username"
                  placeholder
                  id="emailInput"
                />
                <span>Email</span>
                <font-awesome-icon class="icon" icon="fa-solid fa-envelope" />
                <div class="bord"></div>
              </label>
            </div>
            <div class="divCont EmailBox">
              <label for="passwordInput">
                <input
                  v-model="user.password"
                  :rules="password.rules"
                  type="password"
                  name="password"
                  placeholder
                  id="passwordInput"
                />
                <span>Password</span>
                <font-awesome-icon class="icon" icon="fa-solid fa-lock" />
                <div class="bord"></div>
              </label>
            </div>
            <button @click="this.typewriterActiveLog = false">Login</button>
            <div class="forgottens" @click="forgottens">
              Forgotten Password ?
            </div>
            <div class="alert alert-primary" role="alert" v-if="forgotten">
              We are working on activating this feature<br />
              Now relax and try to remember your password
            </div>
            <div class="alert alert-primary" role="alert" v-if="messageError">
              {{ messageError }}
            </div>

            <hr />
            <div class="SignUpbutton" @click="ToSnUp">Create new account</div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "../firebase/init";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import router from "../router";
import WelcomeHello from "../components/WelcomeLogin.vue";
export default {
  name: "LoginView",
  components: {
    WelcomeHello,
  },
  data() {
    return {
      firebase,
      typewriterActiveLog: true,
      PR1: "",
      PR2: "",
      PR3: "",
      PR4: "",
      username: {
        rules: {
          required: true,
          min: 4,
        },
        error: "",
      },
      password: {
        rules: {
          required: true,
          min: 4,
        },
        error: "",
      },
      user: {
        email: "",
        password: "",
      },
      messageError: "",
      forgotten: "",

      typewriterActive: true,
      NewWidth: "",
      stabled: true,
    };
  },

  methods: {
    forgottens() {
      this.forgotten = true;
    },
    loginUser() {
      signInWithEmailAndPassword(getAuth(), this.user.email, this.user.password)
        .then((dataUser) => {
          localStorage.setItem("uidUser", dataUser.user.uid);
          router.push({
            name: "AllPosts",
          });
        })
        .catch(() => {
          this.messageError =
            "The email address or mobile number you entered isn't connected to an account";
        });
    },
    // Typewriter() {
    //   let i = 0;
    //   let TimS = 100;
    //   const Shot1 = new Promise((res) => {
    //     let Pshow = "CAT helps you connect and";
    //     try {
    //       document.getElementById("PR1").style.width = "fit-content";
    //     } catch (error) {
    //       return;
    //     }
    //     let w = setInterval(() => {
    //       if (!this.typewriterActiveLog) {
    //         clearInterval(w);
    //         return;
    //       }
    //       this.PR1 += Pshow[i];
    //       i++;
    //       if (i > Pshow.length - 1 && this.typewriterActiveLog) {
    //         try {
    //           document.getElementById("PR1").style.animation = "none";
    //         } catch (error) {
    //           clearInterval(w);
    //           return;
    //         }
    //         clearInterval(w);
    //         res();
    //       }
    //     }, TimS);
    //   });
    //   Shot1.then(() => {
    //     return new Promise((res) => {
    //       let Pshow = "share with the people in your";
    //       let TimS = 100;
    //       let i = 0;
    //       let s = setInterval(() => {
    //         if (!this.typewriterActiveLog && this.typewriterActiveLog) {
    //           clearInterval(s);
    //           return;
    //         }
    //         try {
    //           document.getElementById("PR2").style.width = "fit-content";
    //         } catch (error) {
    //           clearInterval(s);
    //           return;
    //         }
    //         this.PR2 += Pshow[i];
    //         i++;
    //         if (i > Pshow.length - 1) {
    //           try {
    //             document.getElementById("PR2").style.animation = "none";
    //           } catch (error) {
    //             clearInterval(s);
    //             return;
    //           }
    //           clearInterval(s);
    //           res();
    //         }
    //       }, TimS);
    //     });
    //   })
    //     .then(() => {
    //       return new Promise((res) => {
    //         let Pshow = "life while preserving your";
    //         let TimS = 100;
    //         let i = 0;
    //         let s = setInterval(() => {
    //           if (!this.typewriterActiveLog) {
    //             clearInterval(s);
    //             return;
    //           }
    //           this.PR3 += Pshow[i];
    //           i++;
    //           if (i > Pshow.length - 1 && this.typewriterActiveLog) {
    //             try {
    //               document.getElementById("PR3").style.animation = "none";
    //             } catch (error) {
    //               clearInterval(s);
    //               return;
    //             }
    //             clearInterval(s);
    //             res();
    //           }
    //         }, TimS);
    //       });
    //     })
    //     .then(() => {
    //       return new Promise((res) => {
    //         let Pshow = "time and privacy";
    //         let TimS = 100;
    //         let i = 0;
    //         let s = setInterval(() => {
    //           if (!this.typewriterActiveLog && this.typewriterActiveLog) {
    //             clearInterval(s);
    //             return;
    //           }
    //           this.PR4 += Pshow[i];
    //           i++;
    //           if (i > Pshow.length - 1) {
    //             try {
    //               document.getElementById("PR4").style.animation = "none";
    //             } catch (error) {
    //               clearInterval(s);
    //               return;
    //             }
    //             clearInterval(s);
    //             res();
    //           }
    //         }, TimS);
    //       });
    //     });
    // },
    ToSnUp() {
      this.typewriterActiveLog = false;
      const divLogin = document.getElementsByClassName("Login")[0].classList;
      divLogin.remove("fluidityLoginA");
      divLogin.add("fluidityLoginOutB");
      const divWelcome =
        document.getElementsByClassName("Welcome")[0].classList;
      divWelcome.remove("fluidityWelcomeA");
      divWelcome.add("fluidityWelcomeB");
      setTimeout(() => {
        router.push("/SignUp");
      }, 400);
    },
    resizeing() {
      if (window.innerWidth <= 430) {
        //اصغر
        this.NewWidth = "X";
      }
      if (window.innerWidth > 430 && window.innerWidth <= 850) {
        //وسط
        this.NewWidth = "XX";
      }
      if (window.innerWidth > 850) {
        //اكبر
        this.NewWidth = "XXX";
      }
    },
    check() {
      this.$watch("NewWidth", () => {
        this.stabled = false;
        setTimeout(() => {
          this.stabled = true;
        }, 10);
      });
    },
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
    this.resizeing();
    this.check();
    this.start();
    // setTimeout(() => {
    //   this.Typewriter();
    // }, 400);
  },
  mounted() {
    window.addEventListener("resize", this.resizeing);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.resizeing);
  },
};
</script>
<style lang="scss" scoped>
.bigcontain {
  height: 100vh;
  background-image: url(a.jpg);
  background-position: 50% 50%;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
}
.contain {
  display: grid;
  grid-template-columns: auto auto;
  text-align: center;
  justify-content: space-evenly;
  width: 100%;
  overflow: hidden;
}
.Welcome {
  max-width: 500px;
  text-align: center;
  width: 400px;
  position: relative;
  padding-right: 40.5px;
  padding-left: 40.5px;
  margin-right: 0px;
  margin-left: 0px;
}
.fluidityWelcomeA {
  animation: fluidityWelcomeA 0.4s ease-in-out;
}
@keyframes fluidityWelcomeA {
  from {
    left: -131%;
  }
  to {
    left: 0px;
  }
}
.fluidityWelcomeB {
  position: relative;
  left: -2000%;
  animation: fluidityWelcomeOut 0.4s ease-in-out;
}
@keyframes fluidityWelcomeOut {
  from {
    left: 0px;
  }
  to {
    left: -200%;
  }
}
.logo img {
  display: block;
  // color: white;
  // font-weight: bolder;
  // font-size: 100px;
  // text-decoration: none;
  // text-align: center;
  // -webkit-text-stroke: rgb(67 28 61 / 45%) 2px;
  text-align: center;
  width: 200px;
  margin: auto;
}
// p {
//   position: relative;
//   z-index: 1;
//   text-align: left;
//   font-size: 24px;
//   color: white;
//   width: fit-content;
//   margin-top: auto;
//   padding-right: 2px;
//   margin-bottom: 7px;
//   padding-right: 6px;
//   padding-left: 6px;
//   animation: Typewriter 0.05s ease-in-out infinite alternate;
// }
// p::before {
//   content: "";
//   position: absolute;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   background-color: rgb(133 98 128 / 45%);
//   z-index: -1;
// }
@keyframes Typewriter {
  from {
    border-right: 6px solid white;
  }
  to {
    border-right: 6px solid rgba(0, 0, 255, 0.2);
  }
}
.Login {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: rgb(0 0 0 / 18%);
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(3px);
  width: 500px;
  margin-right: 30px;
  margin-left: 15px;
  position: relative;
  border: 1px solid white;
  border-radius: 29px;
  max-width: 400px;
}
.fluidityLoginA {
  animation: fluidityLogin 0.4s ease-in-out;
}
@keyframes fluidityLogin {
  from {
    right: -131%;
  }
  to {
    right: 0px;
  }
}
.fluidityLoginOutB {
  position: relative;
  right: -2000%;
  animation: fluidityLoginOut 0.4s ease-in-out;
}
@keyframes fluidityLoginOut {
  from {
    right: 0px;
  }
  to {
    right: -200%;
  }
}
@media screen and (max-width: 991px) {
  .bigcontain {
    align-content: flex-start;
    flex-wrap: wrap;
    display: flex;
  }
  .contain {
    display: grid;
    grid-template-columns: auto;
    text-align: center;
    justify-content: center;
    margin-top: 0px;
  }
  .Welcome {
    max-width: 400px;
    width: 400px;
    text-align: center;
    justify-content: center;
    min-height: 259px;
    // padding-right: 85px;
    // padding-left: 85px;
    margin-right: 0px;
    margin-left: 0px;
  }
  .logo {
    display: block;
    color: #ffffff;
    font-weight: bolder;
    font-size: 70px;
    text-decoration: none;
    text-align: center;
    margin: auto;
    margin-top: 20px;
  }
  p {
    text-align: center;
    font-size: 17px;
    color: #ffffff;
    margin-right: auto;
    margin-left: 0px;
  }

  .Login {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    padding-right: 1rem;
    padding-left: 1rem;
    width: auto;
    margin-left: 0px;
    margin-top: 20px;
    margin-right: 0px;
    margin-left: 0px;
  }
  .SignUpbutton {
    min-width: 80%;
  }
}

@media screen and (max-width: 430px) {
  .contain {
    grid-template-columns: 100%;
    backdrop-filter: blur(16px);
    height: 100%;
    grid-auto-rows: 30% 70%;
  }
  .Welcome {
    max-width: 100%;
    width: 100%;
    margin: 0;
  }
  .Login {
    max-width: 100%;
    margin: 0;
    width: 100%;
    margin-top: 0px;
    border: none;
    border-radius: 0px;
    background: none;
    backdrop-filter: blur(0px);
    justify-content: flex-start;
  }
}

.divform {
  width: 90%;
}
.divCont {
  margin-bottom: 40px;
}
input {
  width: calc(100% - 20px);
  outline: none;
  border: none;
  // background-color: #ffffff26;
  color: #111217;
  padding: 10px;
  // border-radius: 10px;
}
.EmailBox {
  position: relative;
}
label {
  position: relative;
  display: grid;
  grid-template-columns: 94% 6%;
  border-bottom: 2px solid #d9d9d9;
}
.bord {
  position: absolute;
  bottom: -2px;
  width: 0%;
  height: 2px;
  background-color: white;
  transition: 0.1s ease-in-out;
}
.EmailBox input:focus-within ~ .bord,
input:not(:focus-within):not(:placeholder-shown) ~ .bord {
  width: 100%;
}
.EmailBox span {
  position: absolute;
  top: 24%;
  left: 2%;
  transition: 0.1s;
  font-weight: 600;
  color: white;
}
.EmailBox input {
  width: 100%;
  outline: none;
  border: none;
  background-color: rgb(255 255 255 / 0%);
  color: white;
  padding: 10px;
  padding-right: 2px;
  border-radius: 0px;
  border: none;
  font-weight: 600;
}
input:focus + span,
input:not(:focus):not(:placeholder-shown) + span {
  top: -21%;
}

.EmailBox .icon {
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
}

.form-error {
  color: red;
}
.form-password {
  float: left;
}
button {
  display: block;
  width: calc(100% - 20px);
  padding: 15px;
  background: rgb(0 0 0 / 58%);
  color: #000;
  outline: none;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  margin-right: 10px;
  margin-left: 10px;
  margin-bottom: 20px;
  color: white;
}
button:hover {
  opacity: 0.7;
}
button:disabled {
  opacity: 0.5;
}

.forgottens {
  color: white;
  font-size: 17px;
  text-decoration: none;
  cursor: pointer;
}

.alert-primary {
  background: rgba(0, 0, 0, 0.2117647059);
  border: #000;
  color: white;
  margin-top: 10px;
}
hr {
  color: white;
}
.SignUpbutton {
  color: white;
  font-size: 15px;
  text-decoration: none;
  background: rgba(0, 0, 0, 0.58);
  display: flex;
  width: 86%;
  height: 45px;
  justify-content: center;
  text-align: center;
  padding: 10px;
  border-radius: 10px;
  margin: auto;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
}
.SignUpbutton:hover {
  background: rgb(0 0 0 / 58%);
}
</style>
