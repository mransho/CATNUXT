<template>
  <div class="bigcontain">
    <div class="contain">
      <div class="WelcomeSignUp fluidityWelcomeASignUp">
        <div class="cat">
          <span><img src="../assets/New2.png" alt="" /></span>
        </div>
        <WelcomeHello
          v-if="stabled"
          :NewWidth="NewWidth"
          :TypewriterCase="typewriterActive"
        />
      </div>
      <div class="SignUp fluidityLoginASignUp">
        <div class="divform">
          <form class="form" @submit.prevent="registerUser">
            <div class="NameBox">
              <label for="FirstName" class="FirstName">
                <input
                  v-model="user.FirstName"
                  type="text"
                  name="FirstName"
                  placeholder
                  id="FirstName"
                />
                <span>First Name</span>
                <font-awesome-icon class="icon" icon="fa-solid fa-user" />
                <div class="bord"></div>
              </label>
              <label for="Surname" class="Surname">
                <input
                  v-model="user.Surname"
                  type="text"
                  name="Surname"
                  placeholder
                  id="Surname"
                />
                <span>Surname</span>
                <font-awesome-icon class="icon" icon="fa-solid fa-user" />
                <div class="bord"></div>
              </label>
            </div>
            <div class="MobilenumberBox">
              <label for="Mobilenumber" class="Mobilenumber">
                <input
                  v-model="user.Mobilenumber"
                  type="number"
                  name="Mobilenumber"
                  placeholder
                  id="Mobilenumber"
                />
                <span>Mobile Number</span>
                <font-awesome-icon class="icon" icon="fa-solid fa-phone" />
                <div class="bord"></div>
              </label>
            </div>
            <div class="EmailBox">
              <label for="Email" class="Email">
                <input
                  v-model="user.email"
                  type="text"
                  name="Email"
                  placeholder
                  id="Email"
                />
                <span>Email</span>
                <font-awesome-icon class="icon" icon="fa-solid fa-envelope" />
                <div class="bord"></div>
              </label>
            </div>
            <div class="PasswordBox">
              <label for="Password" class="Password">
                <input
                  v-model="user.Password"
                  type="Password"
                  name="Password"
                  placeholder
                  id="Password"
                />
                <span>Password</span>
                <font-awesome-icon class="icon" icon="fa-solid fa-lock" />
                <div class="bord"></div>
              </label>
            </div>
            <div class="DateBox">
              <label for="day" class="dayLabel">
                <input
                  id="day"
                  class="X"
                  type="text"
                  v-model="user.day"
                  placeholder
                />

                <div class="bord"></div>
                <ul class="day">
                  <li v-for="day in 30" @click="user.day = day" :key="day">
                    {{ day }}
                  </li>
                </ul>
                <span>Day</span>
              </label>
              <label for="month" class="monthIabel">
                <input
                  id="month"
                  type="text"
                  v-model="user.month"
                  placeholder
                />
                <div class="bord"></div>
                <ul>
                  <li
                    v-for="month in ArrMonth"
                    @click="user.month = month"
                    :key="month"
                  >
                    {{ month }}
                  </li>
                </ul>
                <span>month</span>
              </label>
              <label for="year" class="yearIabel">
                <input id="year" type="text" v-model="user.year" placeholder />

                <div class="bord"></div>
                <ul class="year">
                  <li
                    @click="user.year = year"
                    v-for="year in ArrYears"
                    :key="year"
                    id="year"
                  >
                    {{ year }}
                  </li>
                  <!-- <RecycleScroller
                    class="scroller"
                    :items="ArrYears"
                    :item-size="10"
                    key-field="year"
                    v-slot="{ item }"
                  >
                    <li @click="user.year = item">{{ item }} s</li>
                  </RecycleScroller> -->
                </ul>
                <span>year</span>
              </label>
            </div>
            <div class="genderBox">
              <label for="gender" class="genderIabel">
                <div class="gender">
                  {{ user.gender }}
                  <font-awesome-icon
                    v-if="user.gender == ''"
                    icon="fa-solid fa-venus-mars"
                    class="icon"
                  />
                  <font-awesome-icon
                    v-if="user.gender == 'Male'"
                    icon="fa-solid fa-mars"
                    class="icon"
                  />
                  <font-awesome-icon
                    v-if="user.gender == 'Female'"
                    icon="fa-solid fa-venus"
                    class="icon"
                  />
                </div>

                <ul>
                  <li @click="(user.gender = 'Male'), SelectGender()">
                    Male
                    <font-awesome-icon icon="fa-solid fa-mars" />
                  </li>
                  <li @click="(user.gender = 'Female'), SelectGender()">
                    Female
                    <font-awesome-icon icon="fa-solid fa-venus" />
                  </li>
                </ul>
              </label>
              <div class="bord"></div>
              <span>Gender</span>
            </div>
            <button class="SignUpbutton">Sign Up</button>
            <hr />
            <div class="Login" @click="Login()">Login?</div>
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
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase/init";
import router from "../router";
import WelcomeHello from "../components/Welcome.vue";
export default {
  name: "SignUp",
  components: {
    WelcomeHello,
  },
  data() {
    return {
      ArrMonth: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      user: {
        FirstName: "",
        Surname: "",
        Mobilenumber: "",
        email: "",
        Password: "",
        uid: "",
        month: "",
        day: "",
        year: "",
        gender: "",
        ProfileImage: "",
      },
      typewriterActive: true,
      NewWidth: "",
      stabled: true,
      firebase,
      ArrYears: Array.from(
        { length: 2013 - 1940 + 1 },
        (_, index) => 1940 + index
      ).reverse(),
    };
  },
  methods: {
    SelectGender() {
      document.querySelector(".genderBox span").style.top = "-16px";
      document.querySelector(".genderBox .bord").style.width = "100%";
    },
    Login() {
      this.typewriterActive = false;
      const divLogin =
        document.getElementsByClassName("WelcomeSignUp")[0].classList;
      divLogin.remove("fluidityWelcomeASignUp");
      divLogin.add("fluidityWelcomeBSignUp");
      const divWelcome = document.getElementsByClassName("SignUp")[0].classList;
      divWelcome.remove("fluidityWelcomeASignUp");
      divWelcome.add("fluidityLoginOutBSignUp");
      setTimeout(() => {
        router.push("Login");
      }, 400);
    },
    registerUser() {
      createUserWithEmailAndPassword(
        getAuth(),
        this.user.email,
        this.user.Password
      ).then((dataUser) => {
        try {
          setDoc(doc(db, "users", dataUser.user.uid), {
            FirstName: this.user.FirstName,
            Surname: this.user.Surname,
            Mobilenumber: this.user.Mobilenumber,
            email: this.user.email,
            Password: this.user.Password,
            uid: dataUser.user.uid,
            month: this.user.month,
            day: this.user.day,
            year: this.user.year,
            gender: this.user.gender,
            coverImage: "",
            ProfileImage:
              "data:image/jpeg;base64,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",
          });
        } catch (error) {
          console.error("Error adding document: ", error);
        }

        router.push({
          name: "AllPosts",
        });
      });
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
    chek() {
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
            name: "SignUp",
          });
        }
      });
    },
  },
  created() {
    this.resizeing();
    this.chek();
    this.start();
  },
  mounted() {
    window.addEventListener("resize", this.resizeing);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.resizeing);
  },
};
</script>
<style scoped>
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
  grid-template-columns: 53% 47%;
  text-align: center;
  justify-content: space-evenly;
  width: 100%;
  overflow: hidden;
}
.WelcomeSignUp {
  position: relative;
}
/* ------------------------------------------------------------------------------------------------ */
.fluidityWelcomeASignUp {
  animation: fluidityWelcomeASignUp 0.4s ease-in-out;
}
@keyframes fluidityWelcomeASignUp {
  from {
    left: -131%;
  }
  to {
    left: 0px;
  }
}
.fluidityWelcomeBSignUp {
  position: relative;
  left: -2000%;
  animation: fluidityWelcomeOutSignUp 0.4s ease-in-out;
}
@keyframes fluidityWelcomeOutSignUp {
  from {
    left: 0px;
  }
  to {
    left: -200%;
  }
}
/* ------------------------------------------------------------------------------------------------ */
.WelcomeSignUp .cat {
  font-size: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.WelcomeSignUp .cat span img {
  /* font-size: 100px; */
  /* color: white; */
  /* font-weight: bolder; */
  /* font-size: 100px; */
  /* text-decoration: none; */
  text-align: center;
  width: 269px;
  /* -webkit-text-stroke: rgb(67 28 61 / 45%) 2px; */
}
.SignUp {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: rgb(0 0 0 / 18%);
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(3px);
  width: 500px;
  position: relative;
  border: 1px solid white;
  border-radius: 29px;
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
}
/* ------------------------------------------------------------------------------------------------ */
.fluidityLoginASignUp {
  animation: fluidityLoginSignUp 0.4s ease-in-out;
}
@keyframes fluidityLoginSignUp {
  from {
    right: -131%;
  }
  to {
    right: 0px;
  }
}
.fluidityLoginOutBSignUp {
  position: relative;
  right: -2000%;
  animation: fluidityLoginOutSignUp 0.4s ease-in-out;
}
@keyframes fluidityLoginOutSignUp {
  from {
    right: 0px;
  }
  to {
    right: -200%;
  }
}

/* ------------------------------------------------------------------------------------------------ */
.divform {
  width: 90%;
}

.NameBox {
  position: relative;
  display: grid;
  grid-template-columns: 45% 45%;
  justify-content: space-between;
}
.NameBox label {
  position: relative;
  display: grid;
  grid-template-columns: 80% 20%;
  border-bottom: 2px solid #d9d9d9;
}

.MobilenumberBox,
.EmailBox,
.PasswordBox {
  position: relative;
  display: grid;
  grid-template-columns: 100%;
}
.MobilenumberBox label,
.EmailBox label,
.PasswordBox label {
  position: relative;
  display: grid;
  grid-template-columns: 80% 20%;
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
.NameBox .FirstName input:focus-within ~ .bord,
.NameBox .FirstName input:not(:focus-within):not(:placeholder-shown) ~ .bord,
.NameBox .Surname input:focus-within ~ .bord,
.NameBox .Surname input:not(:focus-within):not(:placeholder-shown) ~ .bord,
.MobilenumberBox input:focus-within ~ .bord,
.MobilenumberBox input:not(:focus-within):not(:placeholder-shown) ~ .bord,
.EmailBox input:focus-within ~ .bord,
.EmailBox input:not(:focus-within):not(:placeholder-shown) ~ .bord,
.PasswordBox input:focus-within ~ .bord,
.PasswordBox input:not(:focus-within):not(:placeholder-shown) ~ .bord,
.DateBox .dayLabel input:focus-within ~ .bord,
.DateBox .dayLabel input:not(:focus-within):not(:placeholder-shown) ~ .bord,
.DateBox .yearIabel input:focus-within ~ .bord,
.DateBox .yearIabel input:not(:focus-within):not(:placeholder-shown) ~ .bord,
.DateBox .monthIabel input:focus-within ~ .bord,
.DateBox .monthIabel input:not(:focus-within):not(:placeholder-shown) ~ .bord {
  width: 100%;
}
.SignUp span {
  position: absolute;
  top: 24%;
  left: 2%;
  transition: 0.1s;
  font-weight: 600;
  color: white;
}
.NameBox .FirstName input:focus + span,
.NameBox .FirstName input:not(:focus):not(:placeholder-shown) + span,
.NameBox .Surname input:focus + span,
.NameBox .Surname input:not(:focus):not(:placeholder-shown) + span,
.MobilenumberBox input:focus + span,
.MobilenumberBox input:not(:focus):not(:placeholder-shown) + span,
.EmailBox input:focus + span,
.EmailBox input:not(:focus):not(:placeholder-shown) + span,
.PasswordBox input:focus + span,
.PasswordBox input:not(:focus):not(:placeholder-shown) + span {
  top: -21%;
}
input {
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
.DateBox {
  position: relative;
  display: grid;
  grid-template-columns: 30% 30% 30%;
  justify-content: space-between;
  width: 100%;
  background-color: transparent;
}
.DateBox label {
  width: 100%;
  height: 38px;
  position: relative;
}
.DateBox label span {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.DateBox ul {
  width: 100%;
  display: grid;
  grid-template-columns: 100%;
  position: relative;
  background-color: transparent;
  backdrop-filter: blur(179px);
  list-style: none;
  bottom: 31px;
  z-index: 5;
  padding: 0;
  max-height: 0px;
  overflow: scroll;
  transition: all 0.5s;
  border-radius: 8px;
}
.DateBox label:hover ul {
  max-height: 200px;
}
.DateBox ul::-webkit-scrollbar {
  width: 0px;
  height: 0px;
}
/* ============================================= */
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  appearance: none;
  margin: 0;
}
input[type="number"] {
  pointer-events: none;
}
/* ============================================= */
.DateBox ul li {
  color: white;
  background-color: #95b2cb3d;
  width: 100%;
}
.DateBox li:hover {
  background: #00000057;
}
.DateBox input {
  padding: 12px 10px 4px 10px;
  border-bottom: 2px solid #d9d9d9;
  text-align: center;
}
.icon {
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translate(0, -50%);
  color: white;
}

.form div:not(:first-child) {
  margin-top: 28px;
}
.DateBox label .bord {
  position: relative;
  bottom: 30px;
}
.DateBox .dayLabel input:focus-within ~ span,
.DateBox .dayLabel input:not(:focus-within):not(:placeholder-shown) ~ span,
.DateBox .yearIabel input:focus-within ~ span,
.DateBox .yearIabel input:not(:focus-within):not(:placeholder-shown) ~ span,
.DateBox .monthIabel input:focus-within ~ span,
.DateBox .monthIabel input:not(:focus-within):not(:placeholder-shown) ~ span,
.DateBox .monthIabel input:hover ~ span,
.DateBox .yearIabel input:hover ~ span,
.DateBox .dayLabel input:hover ~ span,
.DateBox .monthIabel ul:hover ~ span,
.DateBox .yearIabel ul:hover ~ span,
.DateBox .dayLabel ul:hover ~ span {
  top: 1px;
}
.genderBox {
  text-align: start;
  position: relative;
  height: 46px;
  margin-top: 41px !important;
}
.genderBox .genderIabel {
  width: 100%;
  position: relative;
}
.genderBox span {
  position: absolute;
  top: 4px;
}
.genderIabel:hover ~ span {
  top: -16px;
}
.genderBox .genderIabel .gender {
  width: 100%;
  color: white;
  margin: 0px;
  padding: 6px;
  height: 46px;
  border-bottom: 2px solid #d9d9d9;
  display: grid;
  align-items: center;
}
.genderBox .bord {
  width: 0%;
  background-color: white;
  position: absolute;
  height: 2px;
  margin-top: 0px !important;
  margin: 0px;
  bottom: 0px;
}
.genderBox .genderIabel ul {
  width: 100%;
  color: white;
  margin-bottom: 0px;
  padding: 0px;
  max-height: 0px;
  transition: all 0.5s;
  overflow: hidden;
  z-index: 5;
  position: absolute;
  background-color: transparent;
  backdrop-filter: blur(179px);
}
.genderIabel:hover ul {
  max-height: 200px;
}
.genderBox .genderIabel ul li {
  list-style: none;
  padding: 5px;
}
.genderBox .genderIabel ul li:hover {
  background-color: #00000057;
}
button {
  display: block;
  width: calc(100% - 20px);
  padding: 12px;
  background: rgba(0, 0, 0, 0.58);
  color: #000;
  outline: none;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: bold;
  margin-right: auto;
  margin-left: auto;
  color: white;
  margin-top: 28px;
}
button:hover {
  opacity: 0.7;
}
.SignUpbutton:hover {
  background: rgb(0 0 0 / 58%);
}
hr {
  color: white;
  opacity: 1;
}
.Login {
  color: white;
  margin-top: 0px !important;
  cursor: pointer;
}
/* @media screen and (max-width: 991px) {
  .bigcontain {
    display: flex;
    flex-wrap: wrap;
  }
  .contain {
    justify-content: center;
    margin-top: 0px;
  }
  .SignUp {
    padding-right: 1rem;
    padding-left: 1rem;
    width: auto;
    margin-left: 0px;
    margin-right: 0px;
    margin-left: 0px;
  }
  .SignUpbutton {
    min-width: 80%;
  }
} */
@media screen and (max-width: 850px) {
  .contain {
    grid-template-rows: 20% 80%;
  }
  .bigcontain {
    align-content: center;
  }
  .contain {
    grid-template-columns: 100%;
    backdrop-filter: blur(16px);
    height: 100%;
  }
  .WelcomeSignUp {
    display: grid;
    grid-template-columns: 50% 50%;
    width: 400px;
    margin-left: auto;
    margin-right: auto;
  }
  .WelcomeSignUp .cat {
  }
  .WelcomeSignUp .cat span img {
    width: 195px;
  }
  .SignUp {
    height: 83%;
  }
}
@media screen and (max-width: 430px) {
  .contain {
    grid-template-rows: 20% 80%;
  }
  .bigcontain {
    align-content: center;
  }
  .contain {
    grid-template-columns: 100%;
    backdrop-filter: blur(16px);
    height: 100%;
  }
  .WelcomeSignUp {
    display: block;
    width: 100%;
  }
  .WelcomeSignUp .cat span {
    font-size: 70px;
  }
  .SignUp {
    max-width: 100%;
    margin: 0;
    padding-top: 111px;
    width: 100%;
    border: none;
    border-radius: 0px;
    background: none;
    backdrop-filter: blur(0px);
  }
}
</style>
