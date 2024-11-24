<template>
  <div class="cont">
    <div class="rows">
      <div class="profileSec">
        <div class="profile" id="profile">
          <div class="divCovermin">
            <div class="divCover">
              <div class="Coverup">
                <span>
                  <font-awesome-icon
                    icon="arrow-up-from-bracket"
                    class="icon"
                  />
                </span>
                <input
                  class="ImageCover"
                  type="file"
                  placeholder="Image"
                  v-on:change="UploadCover($event)"
                  title="Upload Cover"
                />
              </div>
            </div>
          </div>

          <div class="divImagemin">
            <img v-bind:src="user.ProfileImage" class="profileImg" />

            <div class="divImage">
              <div class="Imageup">
                <span>
                  <font-awesome-icon
                    icon="arrow-up-from-bracket"
                    class="icon"
                  />
                </span>
                <input
                  class="Image"
                  type="file"
                  placeholder="Image"
                  v-on:change="UploadProfileImage"
                  title="Upload Image"
                />
              </div>
            </div>
          </div>

          <div class="profileName line_under Name_acc">
            {{ user.FirstName }} {{ user.Surname }}
          </div>
        </div>
      </div>

      <div class="containerMin">
        <div class="sideBar">
          <div class="info">
            <div>
              Mobile Number: <span>{{ user.Mobilenumber }}</span>
            </div>
            <div>
              Email: <span>{{ user.email }}</span>
            </div>
            <div>
              Date of birth:
              <span>{{ user.day }} | {{ user.month }} | {{ user.year }}</span>
            </div>
          </div>
          <div class="Pictures">
            <img v-bind:src="ArrPictures[1]" alt="" />
            <img v-bind:src="ArrPictures[0]" alt="" />
            <img v-bind:src="ArrPictures[3]" alt="" />
            <img v-bind:src="ArrPictures[2]" alt="" />
          </div>
        </div>
        <div class="postsBar">
          <div class="newPost">
            <div class="newPostImg">
              <img :src="user.ProfileImage" alt="" />
            </div>
            <div @click="clickNewPost()" class="cont">
              What's on your mind, {{ user.FirstName }}?
            </div>
            <!-- <textarea
              class="newPostTextarea"
              placeholder=""
              v-model="postsTOdatabase.postContent"
            ></textarea>
            <div class="postPicMin">
              <div class="postPic">
                <div class="postPicUp">
                  <span>
                    <font-awesome-icon icon="fa-solid fa-plus" class="icon" />
                  </span>
                  <input
                    multiple="multiple"
                    class="postPicInput"
                    type="file"
                    placeholder="Image"
                    v-on:change="UploadPostPic($event)"
                    title="Upload Cover"
                  />
                </div>
              </div>
            </div>
            <button type="submit" class="btn btn-primary" @click="newPost">
              SHARE
            </button> -->
          </div>
          <div
            class="post card"
            v-for="post in allPosts"
            :key="post.id"
            :data-post-id="post.postId"
            :id="post.postId"
          >
            <div class="postHead">
              <router-link :to="'/user/' + post.uid">
                <img :src="post.ProfileImagePost" class="postImg" />
              </router-link>

              <div class="postInfo">
                <router-link :to="'/user/' + post.uid" class="postName">
                  {{ post.postName }} {{ post.postSurname }}
                </router-link>
                <div class="postdate">
                  {{ formatTime(post.sortDate) }}
                </div>
              </div>
            </div>
            <div class="postContent" v-html="post.postContent"></div>
            <div class="picMin">
              <div v-for="Pic in post.ArrPic" :key="Pic" class="Pic">
                <img v-bind:src="Pic" />
              </div>
              <div class="divShowMor">
                <font-awesome-icon icon="fa-solid fa-plus" class="setIco" />
                {{ post.ArrPic.length - 4 }}
              </div>
            </div>

            <div class="postReact">
              <div class="ReactNum">
                <div class="ReactNumNum" v-show="post.postLike > 0">
                  {{ post.postLike }}
                </div>
                <div class="ReactNumNumX" v-show="post.postLike == 0">
                  Be the first to like
                </div>
                <font-awesome-icon
                  icon="thumbs-up"
                  class="icon"
                  v-show="post.postLike > 0"
                ></font-awesome-icon>
              </div>
              <hr />
              <div class="ReactButton">
                <div class="share">
                  Share
                  <font-awesome-icon icon="share" class="icon" />
                </div>
                <div class="comment" v-on:click="ViewComments($event)">
                  Comment
                  <font-awesome-icon icon="fa-message" class="icon" />
                </div>
                <div class="like" @click="postLikeActive($event)">
                  Like
                  <font-awesome-icon icon="thumbs-up" class="icon" />
                </div>
              </div>
            </div>

            <div class="CommentsArea">
              <hr />
              <div class="AddCommentTextareaMin">
                <textarea
                  class="AddCommentTextarea"
                  placeholder="Add a comment"
                  v-model="commentsTOdatabase.commentsContent"
                >
                </textarea>
                <font-awesome-icon
                  icon="fa-solid fa-paper-plane"
                  class="icon"
                  @click="newComment($event)"
                />
              </div>
              <div
                class="commentDone"
                v-for="comment in allCommentsObj[post.postId]"
                :key="comment.id"
              >
                <router-link :to="'/user/' + comment.uid" class="commentImgMin">
                  <img
                    class="commentImg"
                    v-bind:src="comment.ProfileImageComment"
                    alt=""
                  />
                </router-link>
                <div class="commentContentMin">
                  <router-link :to="'/user/' + comment.uid" class="commentName">
                    {{ comment.commentName }} {{ comment.commentSurname }}
                  </router-link>
                  <div
                    class="commentContent"
                    v-html="comment.commentContent"
                  ></div>
                </div>
                <div class="reactComment">
                  <div class="Like" @click="commentLikeActive($event)">
                    Like
                  </div>
                  <div class="Reply">Reply</div>
                  <div class="Time">
                    {{ formatTime(comment.commentDate) }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div @click="cancelNewPost()" class="backgroundTextarea"></div>
          <div class="Textarea">
            <div class="hider">
              <div>Create Post</div>
              <span @click="cancelNewPost()">X</span>
            </div>
            <hr />
            <div class="info">
              <span>
                <img :src="user.ProfileImage" alt="" />
              </span>
              <div>
                <span class="name">
                  {{ user.FirstName }} {{ user.Surname }}
                </span>
                <div>
                  <font-awesome-icon
                    :icon="['fas', 'earth-americas']"
                    class="iconX"
                  />
                  Public
                </div>
              </div>
            </div>
            <div class="TextareaPost">
              <textarea
                placeholder=""
                v-model="postsTOdatabase.postContent"
                ref="textareaX"
              ></textarea>
            </div>
            <div>
              <div class="postPicMin">
                <div class="postPic">
                  <div class="postPicUp">
                    <span>
                      <font-awesome-icon icon="fa-solid fa-plus" class="icon" />
                    </span>
                    <input
                      multiple="multiple"
                      class="postPicInput"
                      type="file"
                      placeholder="Image"
                      v-on:change="UploadPostPic($event)"
                      title="Upload Cover"
                    />
                  </div>
                </div>
              </div>
            </div>
            <button type="submit" class="btn btn-primary" @click="sharePost">
              SHARE
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  getFirestore,
  collection,
  getDoc,
  getDocs,
  doc,
  setDoc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase/init";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import moment from "../../node_modules/moment";

export default {
  name: "MyProfile",
  data() {
    return {
      postsTOdatabase: {
        ProfileImagePost: "",
        postName: "",
        postDay: "",
        postMonth: "",
        postYear: "",
        postHour: "",
        postMinute: "",
        postContent: "",
        uid: "",
        creatPost: "",
        ProfileImage: "",
        sortDate: "",
      },
      db,
      postsFromDataBase: [],
      Allpostsdatabas: [],
      allPosts: [],
      user: {
        ProfileImage: "",
      },
      commentsTOdatabase: {
        commentsContent: "",
      },
      allCommentsObj: {},
      goToThisAcc: "",
      ArrPic: [],
      ArrPictures: [],
    };
  },
  methods: {
    cancelNewPost() {
      document.getElementsByClassName("backgroundTextarea")[0].style.display =
        "none";
      setTimeout(() => {
        document.getElementsByClassName("Textarea")[0].style.display = "none";
      }, 200);
      document.getElementsByClassName("Textarea")[0].style.height = "0px";
    },
    sharePost() {
      this.cancelNewPost();
      this.newPost();
    },
    clickNewPost() {
      document.getElementsByClassName("backgroundTextarea")[0].style.display =
        "block";
      document.getElementsByClassName("Textarea")[0].style.display = "block";
      this.$refs.textareaX.focus();
      document.getElementsByClassName("Textarea")[0].style.height = "621px";
    },
    Pictures() {
      const auth = getAuth();
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const uid = user.uid;
          const docRef = doc(db, "users", uid);
          const docSnap = await getDoc(docRef);
          let ProfileImage = docSnap.data().ProfileImage;
          let cover = docSnap.data().coverImage;
          if (cover != "") {
            this.ArrPictures.push(cover);
          }
          this.ArrPictures.push(ProfileImage);
          let posts = collection(db, "posts");
          let ll = await getDocs(posts);
          ll.forEach((e) => {
            if (e.data().uid == uid) {
              // let ArrPic = e.ArrPic;
              // this.ArrPictures.push(ArrPic);
              e.data().ArrPic.forEach((x) => {
                this.ArrPictures.push(x);
              });
            }
          });
        }
      });
      // console.log(this.ArrPictures);
    },
    formatTime(time) {
      const currentTime = moment();
      const postTime = moment(time);
      const minutesAgoYear = currentTime.diff(postTime, "year");

      if (minutesAgoYear > 0) {
        return `${minutesAgoYear} year ago`;
      }

      const minutesAgoMonth = currentTime.diff(postTime, "month");
      if (minutesAgoMonth > 0) {
        return `${minutesAgoMonth} month ago`;
      }

      const minutesAgoWeek = currentTime.diff(postTime, "week");
      if (minutesAgoWeek > 0) {
        return `${minutesAgoWeek} week ago`;
      }

      const minutesAgoDay = currentTime.diff(postTime, "day");
      if (minutesAgoDay > 0) {
        return `${minutesAgoDay} day ago`;
      }

      const minutesAgoHour = currentTime.diff(postTime, "hour");
      if (minutesAgoHour > 0) {
        return `${minutesAgoHour} hour ago`;
      }

      const minutesAgoMinute = currentTime.diff(postTime, "minute");
      if (minutesAgoMinute > 0) {
        return `${minutesAgoMinute} minute ago`;
      }

      return `a few seconds ago`;
    },
    getDataFromDataBase() {
      const auth = getAuth();
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const uid = user.uid;
          const docRef = doc(db, "users", uid);
          const docSnap = await getDoc(docRef);
          this.user = docSnap.data();
          let cover = docSnap.data().coverImage;
          document.getElementById(
            "profile"
          ).style.backgroundImage = `url(${cover})`;
        }
      });
    },
    async UploadProfileImage(event) {
      console.log(this.postsFromDataBase);
      const usersOnDataRef = collection(db, "users");
      const updateDocumentRef = doc(usersOnDataRef, this.user.uid);
      const posts = collection(db, "posts");
      const updateProfileImagePosts = await getDocs(posts);

      var reader = new FileReader();
      reader.onload = async () => {
        this.user.ProfileImage = reader.result;
        updateDoc(updateDocumentRef, {
          ProfileImage: reader.result,
        });
        updateProfileImagePosts.forEach(async (x) => {
          if (x.data().uid == this.user.uid) {
            let lx = doc(posts, x.id);
            updateDoc(lx, {
              ProfileImagePost: reader.result,
            });
            let comments = collection(lx, "comments");
            const updateProfileImageComment = await getDocs(comments);
            updateProfileImageComment.forEach((y) => {
              if (y.data().uid == this.user.uid) {
                let lxx = doc(posts, x.id, "comments", y.id);
                updateDoc(lxx, {
                  ProfileImageComment: reader.result,
                });
              }
            });
          }
        });
        this.postFromDataBase();
      };
      reader.readAsDataURL(event.target.files[0]);
    },

    /////////////////////////////////////////////////////////////////////////////

    async UploadPostPic(event) {
      var reader = new FileReader();
      reader.onload = async () => {
        this.ArrPic.push(reader.result);
        console.log(this.ArrPic);
      };
      reader.readAsDataURL(event.target.files[0]);
    },

    /////////////////////////////////////////////////////////////////////////////

    async newPost() {
      //make new post and then add the post in db and view page
      const db = getFirestore();
      const uid = this.user.uid;

      try {
        const posts = collection(db, "posts");
        const newPostsId = doc(posts);
        const formattedText = this.postsTOdatabase.postContent.replace(
          /\n/g,
          "<br>"
        );
        // console.log(formattedText);
        setDoc(newPostsId, {
          postId: newPostsId.id,
          ProfileImagePost: this.user.ProfileImage,
          postName: this.user.FirstName,
          postSurname: this.user.Surname,
          postDate: serverTimestamp(),
          postContent: formattedText,
          uid: uid,
          postDay: new Date().getDate(),
          postMonth: new Date().getMonth() + 1,
          postYear: new Date().getFullYear(),
          postHour: new Date().getHours(),
          postMinute: new Date().getMinutes(),
          sortDate: Date.now(),
          postLike: 0,
          admirers: [],
          ArrPic: this.ArrPic,
        }).then(
          this.allPosts.reverse(),
          this.allPosts.push({
            postId: newPostsId.id,
            ProfileImagePost: this.user.ProfileImage,
            postName: this.user.FirstName,
            postSurname: this.user.Surname,
            postDate: serverTimestamp(),
            postContent: formattedText,
            uid: uid,
            postDay: new Date().getDate(),
            postMonth: new Date().getMonth() + 1,
            postYear: new Date().getFullYear(),
            postHour: new Date().getHours(),
            postMinute: new Date().getMinutes(),
            sortDate: Date.now(),
            postLike: 0,
            admirers: [],
            ArrPic: this.ArrPic,
          }),
          this.allPosts.reverse()
        );

        this.postsTOdatabase.postContent = "";
        this.ArrPic = [];
      } catch (error) {
        console.error("Error adding document: ", error);
      }
    },

    async newComment(event) {
      //make a new comment
      const postContainer = event.target.closest(".post");
      const postId = postContainer.dataset.postId;
      const uid = this.user.uid;
      let getProfileImageComment = "";
      try {
        const db = getFirestore();
        const ProfileImageComment = doc(db, "users", uid);
        const docSnap = await getDoc(ProfileImageComment);
        if (docSnap.exists()) {
          getProfileImageComment = docSnap.data().ProfileImage;
        } else {
          console.log("No such document!");
        }
        const formattedText = this.commentsTOdatabase.commentsContent.replace(
          /\n/g,
          "<br>"
        );
        const posts = collection(db, "posts");
        const postsIdTarget = doc(posts, postId);
        const comments = collection(postsIdTarget, "comments");
        const comment = doc(comments);
        setDoc(comment, {
          commentId: comment.id,
          ProfileImageComment: getProfileImageComment,
          commentName: this.user.FirstName,
          commentSurname: this.user.Surname,
          commentContent: formattedText,
          uid: uid,
          commentDate: Date.now(),
        });
        Promise.resolve()
          //show the Comments at the same time
          .then(() => {
            const auth = getAuth();
            onAuthStateChanged(auth, async (user) => {
              if (user) {
                const postId = event.target.closest(".post").dataset.postId;
                const db = getFirestore();
                const comments = doc(db, "posts", postId);
                const docSnap = await getDocs(collection(comments, "comments"));
                let commentInThisPost = {};
                docSnap.forEach((e) => {
                  const commentId = e.data().commentId;
                  commentInThisPost[commentId] = e.data();
                });
                Promise.resolve()
                  .then(() => {
                    this.allCommentsObj[postId] = commentInThisPost;
                  })
                  .then(() => {
                    const sortedComments = Object.values(
                      this.allCommentsObj[postId]
                    )
                      .sort(function (a, b) {
                        return a.commentDate - b.commentDate;
                      })
                      .reverse();
                    this.allCommentsObj[postId] = sortedComments;
                  });
              }
            });
          })
          .then(() => {
            this.commentsTOdatabase.commentsContent = "";
          });
      } catch (error) {
        console.error("Error adding document: ", error);
      }
    },

    postFromDataBase() {
      // get the posts from db
      const db = getFirestore();
      const auth = getAuth();
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          this.allPosts = [];
          const posts = collection(db, "posts");
          const docSnap = await getDocs(posts);
          docSnap.forEach((x) => {
            if (x.data().uid == this.user.uid) {
              this.allPosts.push(x.data());
            }
          });
          this.allPosts
            .sort(function (a, b) {
              return a.sortDate - b.sortDate;
            })
            .reverse();
          Promise.resolve().then(() => {
            this.allPosts.forEach((e) => {
              //////////////////////////////////////////////////////////////////////////
              this.SplitImage(e);

              //////////////////////////////////////////////////////////////////////////
              if (e.admirers.includes(user.uid)) {
                document
                  .getElementById(e.postId)
                  .getElementsByClassName("postReact")[0]
                  .getElementsByClassName("ReactButton")[0]
                  .getElementsByClassName("like")[0]
                  .classList.add("LikeActive");
                document
                  .getElementById(e.postId)
                  .getElementsByClassName("postReact")[0]
                  .getElementsByClassName("ReactButton")[0]
                  .getElementsByClassName("like")[0]
                  .getElementsByClassName("icon")[0]
                  .classList.add("LikeActive");
              }
            });
          });
        }
      });
    },
    SplitImage(e) {
      let XId = e.postId;
      const length = e.ArrPic.length;
      if (length == 2) {
        document
          .getElementById(XId)
          .getElementsByClassName("picMin")[0]
          .querySelectorAll(".Pic")
          .forEach((e) => {
            e.classList.add("towPic");
          });
      }
      if (length == 3) {
        document
          .getElementById(XId)
          .getElementsByClassName("picMin")[0]
          .classList.add("makMeWrap");
        document
          .getElementById(XId)
          .getElementsByClassName("picMin")[0]
          .querySelectorAll(".Pic")
          .forEach((e) => {
            e.classList.add("threePic");
          });
        document
          .getElementById(XId)
          .getElementsByClassName("picMin")[0]
          .querySelectorAll(".Pic")[2]
          .classList.remove("threePic");
        document
          .getElementById(XId)
          .getElementsByClassName("picMin")[0]
          .querySelectorAll(".Pic")[2]
          .classList.add("threePiclast");
        document
          .getElementById(XId)
          .getElementsByClassName("picMin")[0]
          .querySelectorAll(".Pic")[2]
          .querySelector("img")
          .classList.add("threePicImge");
      }
      if (length == 4) {
        document
          .getElementById(XId)
          .getElementsByClassName("picMin")[0]
          .classList.add("makMeWrap");
        document
          .getElementById(XId)
          .getElementsByClassName("picMin")[0]
          .querySelectorAll(".Pic")
          .forEach((e) => {
            e.classList.add("threePic");
          });
      }
      if (length > 4) {
        document
          .getElementById(XId)
          .getElementsByClassName("picMin")[0]
          .classList.add("makMeWrap");
        document
          .getElementById(XId)
          .getElementsByClassName("picMin")[0]
          .classList.add("morFourPicMin");
        // background-color: #000000;

        document
          .getElementById(XId)
          .getElementsByClassName("picMin")[0]
          .querySelectorAll(".Pic")
          .forEach((e) => {
            e.classList.add("morFourPic");
            e.classList.add("hiddenMorFourPic");
          });
        ///////////////////
        document
          .getElementById(XId)
          .getElementsByClassName("picMin")[0]
          .querySelectorAll(".Pic")[0]
          .classList.remove("hiddenMorFourPic");
        document
          .getElementById(XId)
          .getElementsByClassName("picMin")[0]
          .querySelectorAll(".Pic")[1]
          .classList.remove("hiddenMorFourPic");
        document
          .getElementById(XId)
          .getElementsByClassName("picMin")[0]
          .querySelectorAll(".Pic")[2]
          .classList.remove("hiddenMorFourPic");
        document
          .getElementById(XId)
          .getElementsByClassName("picMin")[0]
          .querySelectorAll(".Pic")[3]
          .classList.remove("hiddenMorFourPic");
        ///////////////////
        document
          .getElementById(XId)
          .getElementsByClassName("picMin")[0]
          .querySelectorAll(".divShowMor")[0]
          .classList.add("settings");
        ///////////////////

        document
          .getElementById(XId)
          .getElementsByClassName("picMin")[0]
          .querySelectorAll(".Pic")[3]
          .classList.add("morFourPiclast");
      }
    },
    ViewComments(event) {
      //view the comments area under its post
      const auth = getAuth();
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          if (
            !event.target
              .closest(".post")
              .getElementsByClassName("CommentsActive")[0]
          ) {
            const postId = event.target.closest(".post").dataset.postId;
            const db = getFirestore();
            const comments = doc(db, "posts", postId);
            const docSnap = await getDocs(collection(comments, "comments"));
            let commentInThisPost = {};
            docSnap.forEach((e) => {
              const commentId = e.data().commentId;
              commentInThisPost[commentId] = e.data();
            });
            Promise.resolve()
              .then(() => {
                this.allCommentsObj[postId] = commentInThisPost;
              })
              .then(() => {
                const sortedComments = Object.values(
                  this.allCommentsObj[postId]
                )
                  .sort(function (a, b) {
                    return a.commentDate - b.commentDate;
                  })
                  .reverse();
                this.allCommentsObj[postId] = sortedComments;
                event.target
                  .closest(".post")
                  .getElementsByClassName("CommentsArea")[0]
                  .classList.add("CommentsActive");
              });
          } else {
            event.target
              .closest(".post")
              .getElementsByClassName("CommentsArea")[0]
              .classList.remove("CommentsActive");
          }
        }
      });
    },
    commentLikeActive(event) {
      event.target.classList.toggle("LikeActive");
    },
    postLikeActive(event) {
      const thePost = event.currentTarget;
      thePost.classList.toggle("LikeActive");
      thePost.getElementsByClassName("icon")[0].classList.toggle("LikeActive");
      const db = getFirestore();
      const auth = getAuth();
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const uid = user.uid;
          const thePostId = thePost.closest(".post").dataset.postId;
          const posts = doc(db, "posts", thePostId);
          const docSnap = await getDoc(posts);
          const admirers = docSnap.data().admirers;
          if (!admirers.includes(uid)) {
            admirers.push(user.uid);
            let addLike = docSnap.data().postLike + 1;
            updateDoc(posts, {
              postLike: addLike,
              admirers: admirers,
            });

            thePost
              .closest(".postReact")
              .getElementsByClassName("ReactNum")[0]
              .getElementsByClassName("ReactNumNum")[0].textContent = addLike;
            thePost
              .closest(".postReact")
              .getElementsByClassName("ReactNum")[0]
              .getElementsByClassName("ReactNumNum")[0].style.display =
              "inline";
            thePost
              .closest(".postReact")
              .getElementsByClassName("ReactNum")[0]
              .getElementsByClassName("ReactNumNumX")[0].style.display = "none";
            thePost
              .closest(".postReact")
              .getElementsByClassName("ReactNum")[0]
              .getElementsByClassName("icon")[0].style.display = "inline";
          } else {
            let newAdmirers = admirers.filter((item) => item !== uid);
            let addLike = docSnap.data().postLike - 1;
            updateDoc(posts, {
              postLike: addLike,
              admirers: newAdmirers,
            });
            if (addLike > 0) {
              thePost
                .closest(".postReact")
                .getElementsByClassName("ReactNum")[0]
                .getElementsByClassName("ReactNumNum")[0].textContent = addLike;
              thePost
                .closest(".postReact")
                .getElementsByClassName("ReactNum")[0]
                .getElementsByClassName("ReactNumNumX")[0].style.display =
                "none";
              thePost
                .closest(".postReact")
                .getElementsByClassName("ReactNum")[0]
                .getElementsByClassName("icon")[0].style.display = "inline";
            }
            if (addLike == 0) {
              thePost
                .closest(".postReact")
                .getElementsByClassName("ReactNum")[0]
                .getElementsByClassName("ReactNumNum")[0].style.display =
                "none";
              thePost
                .closest(".postReact")
                .getElementsByClassName("ReactNum")[0]
                .getElementsByClassName("ReactNumNumX")[0].style.display =
                "inline";
              thePost
                .closest(".postReact")
                .getElementsByClassName("ReactNum")[0]
                .getElementsByClassName("icon")[0].style.display = "none";
            }
          }
        }
      });
    },
    /////////////////////////////////////////////////////////////////////////////
    async UploadCover(event) {
      // console.log(this.postsFromDataBase);
      const usersOnDataRef = collection(db, "users");
      const updateDocumentRef = doc(usersOnDataRef, this.user.uid);
      // const posts = collection(db, "posts");
      // const updateProfileImagePosts = await getDocs(posts);

      var reader = new FileReader();
      reader.onload = async () => {
        this.user.coverImage = reader.result;
        updateDoc(updateDocumentRef, {
          coverImage: reader.result,
        }).then(this.getDataFromDataBase());
      };
      reader.readAsDataURL(event.target.files[0]);
    },
  },

  mounted() {
    this.getDataFromDataBase();
    this.postFromDataBase();
    this.Pictures();
  },
};
</script>
<style scoped>
.cont {
  margin: 0;
  padding-top: 63px;
}
.rows {
  min-height: calc(100vh - 63px);
  margin: 0;
  background: #f0f2f5;
  padding-bottom: 1px;
}
@media screen and (max-width: 991px) {
  .rows {
    min-height: calc(100vh - 55.5px);
  }
}
.profileSec {
  background: #f0f2f5;
  min-height: 683px;
  /* padding-top: 10px; */
}
.profile {
  max-width: 1520px;
  display: grid;
  grid-template-columns: 20% 80%;
  padding: 10px;
  /* border-radius: 10px; */
  margin: 0px auto 250px auto;
  height: 500px;
  background-size: cover;
  background-position: center;
  position: relative;
}
/* --------------------------------------------------------------------------------- */
.divCovermin {
  background-color: #00000000;
  position: absolute;
  z-index: 1;
  overflow: hidden;
  bottom: 0%;
  right: 0px;
  width: 138px;
  height: 27px;
  border-radius: 9px 7px 9px 0px;
  /* background: linear-gradient(80deg, #111217, #e5e5e5, #111217); */
}
.divCovermin:hover {
  height: 37px;
  transition: all 0.2s;
}
.profile:hover .divCover {
  height: 37px;
  margin-bottom: 0px;
  /* opacity: 0.5; */
  transition: all 0.2s;
  overflow: hidden;
  /* background: linear-gradient(80deg, #11121700, #e5e5e5, #111217); */
}
/* .divCover:not(:hover),
.divCovermin:not(:hover) {
  transition: all 0.2s;
  overflow: hidden;
} */
.divCover {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  bottom: 0;
  z-index: 3;
  overflow: hidden;
  margin-bottom: -2px;
  background: linear-gradient(
    90deg,
    #11121700,
    #11121729,
    #e5e5e570,
    #11121738
  );
}
.Coverup {
  position: relative;
  z-index: 1;
  padding: 0;
  overflow: hidden;
  /* opacity: 0.2; */
}
.Coverup:hover {
  transition: all 0.2s;
}

.Coverup > span .icon {
  color: black;
}
/* span:hover {
  margin-bottom: 15px;
} */
.Coverup > span {
  font-size: 1.5rem;
  display: block;
  padding: 5px;
}
.Coverup .ImageCover {
  opacity: 0;
  width: 100%;
  height: 100%;
  padding: 10px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 3;
  overflow: hidden;
}

/* --------------------------------------------------------------------------------- */
.divImagemin {
  position: relative;
  z-index: 0;
  overflow: hidden;
  margin-left: auto;
  margin-right: auto;
  border-radius: 50%;
  bottom: -83%;
  left: 116px;
  width: 250px;
  height: 250px;
  background: linear-gradient(80deg, #111217, #e5e5e5, #111217);
}

.profileImg {
  overflow: hidden;
  margin: auto;
  border: 1px solid black;
  width: 101%;
  display: block;
  height: 101%;
  object-fit: contain;
  border: none;
}
.divImage {
  width: 100%;
  position: absolute;
  left: 0;
  bottom: 0;
  z-index: 3;
  margin-bottom: -21px;
  overflow: hidden;
}
.divImagemin:hover .divImage {
  margin-bottom: 0px;
  transition: all 0.2s;
  overflow: hidden;
}
.divImage:not(:hover) {
  margin-bottom: -21px;
  transition: all 0.2s;
  overflow: hidden;
}
.Imageup {
  position: relative;
  z-index: 1;
  padding: 0;
  background-color: rgba(189, 178, 178, 0.508);
  overflow: hidden;
}
.Imageup:hover {
  background-color: rgba(14, 8, 8, 0.398);
  transition: all 0.2s;
}

.Imageup > span .icon {
  color: black;
}
span:hover {
  margin-bottom: 15px;
}
.Imageup > span {
  font-size: 1.5rem;
  display: block;
  padding: 5px;
}
.Imageup .Image {
  opacity: 0;
  width: 100%;
  height: 100%;
  padding: 10px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 3;
  overflow: hidden;
}

/* .line_under {
  border-bottom: 5px solid #2c3e50;
} */
.profileName {
  margin: auto;
}
.Name_acc {
  position: absolute;
  bottom: -75px;
  left: 450px;
  font-size: xxx-large;
  font-weight: 900;
}

@media screen and (max-width: 991px) {
  .profileSec {
    min-height: 586px;
  }
  .profile {
    max-width: 1520px;
    display: grid;
    grid-template-columns: 20% 80%;
    padding: 10px;
    border-radius: 10px;
    margin: 0px auto 50px auto;
    height: 500px;
    background-size: cover;
    background-position: center;
    position: relative;
  }
  .divImagemin {
    position: absolute;
    bottom: 8%;
    left: calc(50% - 125px);
    width: 250px;
    height: 250px;
  }
  .Name_acc {
    bottom: -75px;
    left: auto;
    right: auto;
    margin: auto;
    border: none;
    width: 100%;
  }
}

@media screen and (max-width: 550px) {
  .profileSec {
    min-height: 541px;
  }
  .profile {
    max-width: 1520px;
    display: grid;
    grid-template-columns: 20% 80%;
    padding: 10px;
    border-radius: 10px;
    margin: 0px auto 50px auto;
    height: 362px;
    background-size: cover;
    background-position: center;
    position: relative;
  }
  .divImagemin {
    bottom: -7%;
    width: 200px;
    height: 200px;
    left: calc(50% - 100px);
    position: absolute;
  }
  .Name_acc {
    bottom: -153px;
    left: auto;
    right: auto;
    width: 100%;
    position: absolute;
    font-size: 40px;
    padding: 10px;
    height: 136px;
    overflow: hidden;
  }
}
/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */
.containerMin {
  display: grid;
  grid-template-columns: 70% 30%;
  max-width: 1520px;
  margin: auto;
  min-height: calc(100vh - 303px);
}
.sideBar {
  background: linear-gradient(
    90deg,
    #11121700,
    #e5e5e50a,
    #11121724,
    #e5e5e521,
    #1112170f
  );

  width: 95%;
  order: 1;
  margin-top: 30px;
  text-align: left;
  padding-top: 10px;
  font-size: 20px;
}
.sideBar .info div {
  color: white;
  margin-bottom: 10px;
}
.sideBar .info div span {
  color: white;
}
.sideBar .Pictures {
  margin-top: 32px;
  border: 1px solid black;
  height: 300px;
  width: 100%;
  display: grid;
  grid-template-columns: 50% 50%;
}
.sideBar .Pictures img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.newPost {
  background: white;
  border: none;
  border-radius: 10px;
  margin-top: 30px !important;
  margin: auto;
  width: 80%;
  margin-bottom: 50px;
  padding: 13px;
  display: flex;
}
.newPost .newPostImg {
  width: fit-content;
}
.newPost .newPostImg img {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 50%;
}
.newPost .cont {
  padding-top: 0px;
  width: 100%;
  height: 100%;
  background-color: #efefef;
  border-radius: 31px;
  cursor: pointer;
  display: flex;
  justify-content: start;
  align-items: center;
  padding: 12px;
  color: rgba(0, 0, 0, 0.6);
  margin-left: 13px;
  overflow: hidden;
  white-space: nowrap;
}
.newPost .cont:hover {
  background-color: #e3e3e3;
}
.newPostTextarea,
.AddCommentTextarea {
  background: #ddd;
  color: #111217;
  border: none;
  border-radius: 10px;
  height: 100px;
  display: block;
  margin: auto;
  width: 70%;
  padding: 10px;
  font-size: 20px;
}
.newPostTextarea:focus,
.AddCommentTextarea:focus {
  border: none;
  outline: none;
}
.backgroundTextarea {
  background-color: #0000004a;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 1;
  display: none;
}
.Textarea {
  z-index: 1;
  width: 400px;
  /* height: 200px; */
  background-color: white;
  position: absolute;
  top: 131px;
  width: 800px;
  transform: translateX(-50%);
  left: 50%;
  display: none;
  height: 0px;
  overflow: hidden;
  transition: all 0.1s;
}
.Textarea .hider {
  display: grid;
  grid-template-columns: 94% 5%;
  height: 30px;
  align-content: center;
  height: 48px;
  align-items: center;
}
.Textarea .hider div {
  text-align: center;
  font-weight: 900;
  color: #535353;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.Textarea .hider span {
  text-align: center;
  font-weight: 900;
  color: #797979;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #d9d9d9;
  border-radius: 50%;
  cursor: pointer;
}

.Textarea .info {
  display: grid;
  grid-template-columns: 10% 90%;
  align-items: center;
  justify-items: start;
}
.Textarea .info span {
  width: 100%;
  font-weight: bolder;
  font-size: 18px;
}
.Textarea .info span img {
  width: 46px;
  border-radius: 50%;
}
.Textarea .info div {
  padding: 2px;
  border-radius: 9px;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
}
.Textarea .info div div {
  background-color: #ccd0d5;
  border-radius: 9px;
  display: flex;
  flex-direction: row;
  padding: 4px;
  align-items: center;
}
.Textarea .info div div .iconX {
  margin-right: 7px;
}
.Textarea .TextareaPost {
  height: 365px;
  /* overflow: scroll; */
}
.Textarea .TextareaPost textarea {
  width: 100%;
  height: 349px;
  outline: none;
  border: none;
  padding: 6px 15px 0px 16px;
  background-color: #f3f3f3;
  resize: none;
}

.Textarea .TextareaPost textarea::-webkit-scrollbar-thumb {
  background-color: #838487;
}

.Textarea .TextareaPost textarea::-webkit-scrollbar-track {
  margin-top: 0px;
  background-color: #d6d6d7;
}
.Textarea .TextareaPost textarea::-webkit-scrollbar {
  width: 0px;
}
.Textarea button {
  width: 98%;
  margin-bottom: 4px;
}
@media screen and (max-width: 830px) {
  .Textarea {
    background-color: red;
    width: 90%;
  }
}
/* --------------------------------------------------------------------------------- */

.postPicMin {
  width: 100px;
  height: 30px;
  background: linear-gradient(80deg, #111217, #e5e5e5, #111217);
  margin: auto;
  margin-top: 10px;
  border-radius: 20px;
}
.postPicMin:hover {
  height: 100px;
  transition: all 0.5s;
}
.postPicMin:not(:hover) {
  transition: all 0.5s;
}
.postPic {
  width: 100%;
  height: 100%;
}

.postPicUp {
  position: relative;
  z-index: 1;
  overflow: hidden;
  width: 100%;
  height: 100%;
  padding: 2px;
}
.postPicUp > span {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
}
.postPicUp > span .icon {
  margin: 42px;
}
.postPicUp .postPicInput {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
}
/* --------------------------------------------------------------------------------- */

.btn-primary {
  background: linear-gradient(80deg, #111217, #e5e5e5, #111217);
  border: none;
  color: #111217;
  font-weight: bold;
  width: 50%;
  border: 1px solid black;
  margin-top: 10px;
  margin-bottom: 10px;
}
.btn-primary:hover {
  border: 1px solid black;
}

:not(.btn-check) + .btn:active {
  color: black;
  background-color: black;
  border-color: black;
}

.post {
  width: 80%;
  margin: auto;
  margin-bottom: 50px;
  padding: 10px;
  padding-bottom: 0px;
  border: 2px solid #787878;
}

@media screen and (max-width: 991px) {
  .containerMin {
    grid-template-columns: 100%;
  }
  .postsBar {
    width: 100%;
  }
  .post {
    width: 90%;
  }
  .sideBar {
    order: -1;
    width: 100%;
    display: block;
  }
  .sideBar .info {
    width: fit-content;
    margin: auto;
  }
  .sideBar .Pictures {
    display: none;
  }
}

.postHead {
  margin-bottom: 10px;
  display: flex;
  align-items: center;
}
a {
  text-decoration: none;
  color: #111217;
  margin: 2px;
}
.postHead img,
.commentImgMin img {
  width: 40px;
  height: 40px;
  border-radius: 20px;
  display: inline;
  margin-right: 10px;
  border: 1px solid #787878;
  object-fit: cover;
}
.postInfo {
  margin-top: 0px;
}
.postName {
  font-weight: bold;
}
.postdate {
  display: flex;
  font-size: 12px;
}
.postContent {
  text-align: left;
}
/* ========================== */

.post .picMin {
  width: 100%;
  max-height: 500px;
  display: flex;
  overflow: hidden;
  flex-wrap: nowrap;
  /* flex-t */
  justify-content: center;
  position: relative;
}
.post .picMin .Pic {
  width: 100%;
  max-width: 100%;
  height: 100%;
  max-height: 500px;
  overflow: hidden;
}
.post .picMin .Pic img {
  width: 100%;
  height: 100%;
  max-height: 500px;
  object-fit: cover;
  object-position: center;
  min-height: 250px !important;
  cursor: pointer;
}
.towPic {
  height: auto !important;
}
.makMeWrap {
  flex-wrap: wrap !important;
}
.threePic {
  width: 50% !important;
  height: 50% !important;
  max-height: 250px !important;
  min-height: 250px !important;
}
.threePiclast {
  width: 100% !important;
  height: 50% !important;
  max-height: 250px !important;
  min-height: 250px !important;
}
.threePicImge {
  max-height: 250px !important;
}
/* ========================== */
.hiddenMorFourPic {
  display: none;
}
/* .showMorFourPic {
  display: inline;
} */
/* ========================== */
.morFourPicMin {
  background-color: #000000;
}
.morFourPic {
  width: 50% !important;
  height: 50% !important;
  max-height: 250px !important;
  min-height: 250px !important;
}
.morFourPiclast {
  width: 50% !important;
  height: 50% !important;
  max-height: 250px !important;
  min-height: 250px !important;
  opacity: 0.3;
}
.morFourPiclast img {
  max-height: 250px !important;
}
.divShowMor {
  display: none;
}
.picMin .settings {
  position: absolute;
  color: #737373;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50%;
  height: 50%;
  right: 0px;
  bottom: 0px;
  max-height: 250px !important;
  min-height: 250px !important;
  font-size: 78px;
  cursor: pointer;
}
.settings .setIco {
  margin-right: 4%;
}
/* ========================== */
.postReact {
  display: grid;
  grid-template-columns: 100%;
}

.ReactNum {
  display: flex;
  justify-content: left;
  width: fit-content;
}
.ReactNum:hover {
  cursor: pointer;
  text-decoration: underline;
}
.ReactNum .icon {
  background: linear-gradient(26deg, #000000, #e5e5e5);
  padding: 4px 5px 4px 5px;
  border-radius: 50%;
  stroke: #c9c9c9;
  stroke-width: 50px;
  font-size: 10px;
  color: white;
  margin-top: 2px;
}
.ReactNumNumX {
  color: #787878;
}
hr {
  margin-bottom: 1px;
  margin-top: 1px;
}
.ReactButton {
  display: flex;
  justify-content: space-around;
}
.ReactButton div {
  width: 100%;
  padding: 6px;
  margin-top: 2px;
  margin-bottom: 2px;
  position: relative;
  display: inline;
  color: #8d8a8a;
  border-radius: 5px;
  cursor: pointer;
}
.icon {
  font-size: 17px;
  color: #8d8a8a00;
  display: inline;
  margin-left: 2px;
  stroke: #8d8a8a;
  stroke-width: 50px;
}
.ReactButton div:hover {
  background-color: #cbc9c9;
  transition: all 0.3s;
}
/* ............................................................ */
.CommentsArea {
  overflow: hidden;
  max-height: 0px;
  transition: all 0.5s;
}
.CommentsActive {
  display: block;
  max-height: 400px;
  overflow: auto;
  transition: all 0.5s;
}

.CommentsActive::-webkit-scrollbar {
  width: 5px;
}

.CommentsActive::-webkit-scrollbar-thumb {
  background-color: #838487;
}

.CommentsActive::-webkit-scrollbar-track {
  margin-top: 5px;
  background-color: #d6d6d7;
}
/* ............................................................ */

.AddCommentTextarea {
  font-size: 16px;
  width: 100%;
  margin: auto;
  margin-bottom: 15px;
  margin-top: 15px;
  padding: 9px 12px 9px 13px;
  height: 40px;
  max-height: 70px;
  border-radius: 10px;
  max-width: 98%;
}
.AddCommentTextarea::-webkit-scrollbar {
  width: 0px;
}
.AddCommentTextareaMin {
  position: relative;
}
.AddCommentTextareaMin .icon {
  position: absolute;
  top: 12px;
  right: 1.5%;
}
.commentDone {
  display: grid;
  grid-template-columns: 45px 90%;
  margin-bottom: 15px;
  margin-top: 5px;
}

.commentImg {
  margin: 10px;
}

.commentContentMin {
  background-color: #ddd;
  margin: auto;
  margin-right: 20px;
  border-radius: 10px;
  padding: 5px;
  width: fit-content;
  text-align: left;
  margin-left: 10px;
  max-width: 98%;
}
.commentName {
  font-weight: bold;
  display: flex;
  margin-left: 10px;
}
.commentContent {
  margin-left: 10px;
  text-align: left;
}
.reactComment {
  width: 100%;
  display: grid;
  padding-left: 54px;
  grid-template-columns: 50px 37px max-content;
  color: #8d8a8a;
  font-size: 12px;
}
.reactComment .Like {
  font-weight: bold;
  cursor: pointer;
}
.reactComment .Like:hover {
  text-decoration: underline;
}
/* .reactComment .Like:active {
  color: aqua;
} */
.LikeActive {
  color: #3b72d9c4 !important;
  font-weight: bold;
}
.LikeActive .icon {
  stroke-width: 0px;
  font-size: 20px;
}
.reactComment .Time {
  margin-left: 9px;
}
/* .LikeActive + .icon {
  color: #3b72d9c4 !important;
  font-weight: bold;
  stroke: #8d8a8a;
} */
@media screen and (max-width: 760px) {
  .post {
    width: 95%;
  }
  .commentDone {
    display: grid;
    grid-template-columns: 10% 90%;
  }
  .reactComment {
    width: 100%;
    display: grid;
    padding-left: 100%;
    grid-template-columns: 50px 37px max-content;
  }
}
</style>
