<template>
  <div class="conta">
    <p id="P1" class="animation">{{ P1 }}</p>
    <p id="P2" class="animation">{{ P2 }}</p>
    <p id="P3" class="animation">{{ P3 }}</p>
    <p id="P4" class="animation">{{ P4 }}</p>
    <p id="P5" class="animation">{{ P5 }}</p>
    <p id="P6" class="animation">{{ P6 }}</p>
    <p id="P7" class="animation">{{ P7 }}</p>
    <p id="P8" class="animation">{{ P8 }}</p>
    <p id="P9" class="animation">{{ P9 }}</p>
  </div>
</template>
<script>
export default {
  name: "WelcomeHello",
  data() {
    return {
      P1: "",
      P2: "",
      P3: "",
      P4: "",
      P5: "",
      P6: "",
      P7: "",
      P8: "",
      P9: "",
      typing: false,
      endLineWrite1: false,
      endLineWrite2: false,
      endLineWrite3: false,
      endLineWrite4: false,
      endLineWrite5: false,
      endLineWrite6: false,
      endLineWrite7: false,
      endLineWrite8: false,
      endLineWrite9: false,
      reWriter1: false,
      reWriter2: false,
      reWriter3: false,
      reWriter4: false,
      reWriter5: false,
      reWriter6: false,
      reWriter7: false,
      reWriter8: false,
      reWriter9: false,
      Pin: 1,
      case: true,
    };
  },
  props: {
    TypewriterCase: Boolean,
    NewWidth: String,
  },

  watch: {
    TypewriterCase(newVal) {
      if (newVal) {
        this.checkScreenWidth();
      }
    },
    NewWidth() {
      this.checkScreenWidth();
    },
  },
  methods: {
    checkScreenWidth() {
      if (this.NewWidth === "X") {
        setTimeout(() => {
          this.clearAllPWithStart(9);
          setTimeout(() => {
            this.TypewriterSinX();
          }, 1000);
        }, 50);
        console.log("X");
      }
      if (this.NewWidth === "XX") {
        setTimeout(() => {
          this.clearAllPWithStart(9);
          setTimeout(() => {
            this.TypewriterSinXX();
          }, 1000);
        }, 50);
        console.log("XX");
      }
      if (this.NewWidth === "XXX") {
        setTimeout(() => {
          this.clearAllPWithStart(9);
          setTimeout(() => {
            this.TypewriterSinXXX();
          }, 1000);
        }, 50);
        console.log("XXX");
      }
    },
    XX() {
      this.P1 += "jjjj";
      this.P2 += "asasfacsasc";
    },
    clearP(numP, Timeouts, reWriterC) {
      if (!this.TypewriterCase) {
        this.typing = false;
        console.log("erorr");
        return;
      }
      new Promise((res) => {
        const PId = `P${numP}`;
        try {
          const element = document.getElementById(PId);
          element.classList.add("animation");

          element.style.width = "0px";
        } catch (error) {
          this.typing = false;
          console.log("erorr");
          res();
          return;
        }
        res();
      }).then(() => {
        if (!this.TypewriterCase) {
          this.typing = false;
          console.log("erorr");
          return;
        }
        return new Promise((ress) => {
          if (!this.TypewriterCase) {
            this.typing = false;
            console.log("erorr");
            ress();
            return;
          }
          let startMultiClear = false;
          let numOfP = Timeouts.length;
          if (numOfP > 1) {
            if (!this.TypewriterCase) {
              this.typing = false;
              console.log("erorr");
              ress();
              return;
            }
            startMultiClear = true;
            setTimeout(() => {
              if (!this.TypewriterCase) {
                this.typing = false;
                console.log("erorr");
                ress();
                return;
              }
              this[`P${numP}`] = "";
            }, Timeouts[0]);
          } else {
            if (!this.TypewriterCase) {
              this.typing = false;
              console.log("erorr");
              ress();
              return;
            }
            setTimeout(() => {
              if (!this.TypewriterCase) {
                this.typing = false;
                console.log("erorr");
                ress();
                return;
              }
              this.Pin = numP;
              this[`P${numP}`] = "";
              this[`endLineWrite${numP}`] = false;
              setTimeout(() => {
                if (!this.TypewriterCase) {
                  this.typing = false;
                  console.log("erorr");
                  ress();
                  return;
                } else {
                  if (reWriterC) {
                    this[`endLineWrite${numP}`] = true;
                  } else {
                    this[`endLineWrite${numP + 1}`] = true;
                  }
                }
              }, 10);
            }, Timeouts[0]);
            ress();
            return;
          }
          if (startMultiClear) {
            if (!this.TypewriterCase) {
              this.typing = false;
              console.log("erorr");
              ress();
              return;
            }
            let i = 1;
            let startInterval = false;
            const Interval = setInterval(() => {
              if (!this.TypewriterCase) {
                this.typing = false;
                console.log("erorr");
                clearInterval(Interval);

                ress();
                return;
              }
              if (startInterval) {
                this[`P${numP - i + 1}`] = "";
                this[`endLineWrite${numP - i + 1}`] = true;
              }
              if (i < numOfP) {
                this.Pin--;
                const numPrevious = numP - i;
                this[`endLineWrite${numPrevious}`] = false;
                const PIdPrevious = `P${numPrevious}`;
                try {
                  const elementPrevious = document.getElementById(PIdPrevious);
                  elementPrevious.classList.add("animation");
                  elementPrevious.style.width = "0px";
                } catch (error) {
                  this.typing = false;
                  console.log("erorr");
                  clearInterval(Interval);
                  ress();
                  return;
                }
                if (!this.TypewriterCase) {
                  this.typing = false;
                  console.log("erorr");
                  clearInterval(Interval);
                  ress();
                  return;
                }
                i++;
                startInterval = true;
              } else {
                clearInterval(Interval);
                ress();
                return;
              }
            }, Timeouts[i - 1]);
          }
        });
      });
    },
    TypewriterLine(text, numP, width, reWriter) {
      if (!this.TypewriterCase) {
        this.typing = false;
        console.log("erorr");
        return;
      }
      new Promise((res) => {
        if (!this.TypewriterCase) {
          this[`reWriter${numP}`] = false;
          this[`endLineWrite${numP}`] = false;
          this[`endLineWrite${numP + 1}`] = false;
          this.typing = false;
          console.log("erorr");
          res();
          return;
        }
        this[`endLineWrite${numP + 1}`] = false;
        this[`endLineWrite${numP + 2}`] = false;
        this[`endLineWrite${numP + 3}`] = false;
        this[`endLineWrite${numP + 4}`] = false;
        this[`endLineWrite${numP + 5}`] = false;
        const PId = `P${numP}`;
        let Pshow = text;
        this[PId] = "";
        let i = 0;
        let TimS = 50;
        try {
          document.getElementById(PId).style.width = "fit-content";
        } catch (error) {
          this.typing = false;
          console.log("erorr");
          res();
          return;
        }
        let Interval = setInterval(() => {
          if (!this.TypewriterCase) {
            this.typing = false;
            console.log("erorr");
            clearInterval(Interval);
            this[PId] = "";
            this[`reWriter${numP}`] = false;
            this[`endLineWrite${numP + 1}`] = false;
            return;
          }
          this[PId] += Pshow[i];
          i++;
          if (i > Pshow.length - 1) {
            try {
              document.getElementById(PId).classList.remove("animation");
              document.getElementById(PId).style.width = `${width}px`;
              this[`reWriter${numP}`] = false;
              this[`endLineWrite${numP + 1}`] = false;
              setTimeout(() => {
                if (!this.TypewriterCase) {
                  this.typing = false;
                  console.log("erorr");
                  clearInterval(Interval);
                  res();
                  return;
                } else {
                  if (reWriter) {
                    setTimeout(() => {
                      this[`reWriter${numP}`] = true;
                    }, 500);
                  } else {
                    if (!this.TypewriterCase) {
                      this.typing = false;
                      console.log("erorr");
                      clearInterval(Interval);
                      this[PId] = "";
                      this[`reWriter${numP}`] = false;
                      this[`endLineWrite${numP + 1}`] = false;
                      return;
                    } else {
                      this[`endLineWrite${numP + 1}`] = true;
                    }
                  }
                }
              }, 110);
            } catch (error) {
              this.typing = false;
              console.log("erorr");
              clearInterval(Interval);
              res();
              return;
            }
            clearInterval(Interval);
            res();
          }
        }, TimS);
      });
    },
    clearAllPWithStart(texts) {
      this.L = 0;
      this.typing = false;
      this.i = 0;
      this.Pin = 1;
      for (let i = 1; i <= texts; i++) {
        try {
          const elementId = `P${i}`;
          const element = document.getElementById(elementId);
          // animation
          if (!element.classList.contains("animation")) {
            element.classList.add("animation");
          }
          // emptying
          element.style.transition = "none";
          this[elementId] = "";
          this[`reWriter${i}`] = false;
          this[`endLineWrite${i}`] = false;
          element.style.width = "0px";
          element.style.transition = "all 0.9s";
        } catch (error) {
          console.log("erorr in the clean All");
        }
      }
    },
    async TypewriterSinXXX() {
      let RR = [
        "CAT is very simple social media platform",
        "1XClearX1",
        "we don't use any information about you to",
        "serve our personal interests or any",
        "external organizations",
        "We do not use this information to direct you in",
        "elections or direct you in any other actions",
        "that are racist or serve the personal",
        "interests of a person",
        "We do not track your activity outside of the app",
        "8XClearX1",
        "We do not use your in-app activity to show you",
        "certain content",
        "9XClearX2",
        "We display content to you according to",
        "your preferences",
        "9XClearX9",
        "We don't have the standards of a society",
        "that curbs freedoms, silences mouths",
        "and practices racism against",
        "minorities and the weak",
      ];
      let ArWidth = [
        372, 0, 382, 321, 208, 418, 386, 327, 193, 427, 0, 424, 144, 0, 355,
        162, 0, 374, 343, 267, 223,
      ];
      let numOfIndexs = RR.length - 1;
      let numOfClears = 0;
      let lastLineWrite = 0;
      console.log(numOfClears, lastLineWrite);
      for (let i = 0; i <= numOfIndexs; ) {
        if (!this.TypewriterCase || this.NewWidth != "XXX") {
          this.typing = false;
          console.log("erorr");
          return;
        }
        await new Promise((res) => {
          if (!this.TypewriterCase || this.NewWidth != "XXX") {
            this.typing = false;
            console.log("erorr");
            res();
            return;
          }
          let RRtxt = RR[i];
          if (RRtxt.includes("XClearX") && this.TypewriterCase) {
            if (!this.TypewriterCase || this.NewWidth != "XXX") {
              this.typing = false;
              console.log("erorr");
              res();
              return;
            }
            let isFirstChange = true;
            let clearStart = RRtxt[0];
            let ss = RRtxt.length - 1;
            let clearNumline = RRtxt[ss];
            let ArrayOfClearNumline = [];
            for (let N = 1; N <= clearNumline; ) {
              if (!this.TypewriterCase || this.NewWidth != "XXX") {
                this.typing = false;
                console.log("erorr");
                res();
                return;
              }
              ArrayOfClearNumline.push(600);
              N++;
            }
            this.$watch(`reWriter${clearStart}`, (V) => {
              if (V && isFirstChange) {
                if (!this.TypewriterCase || this.NewWidth != "XXX") {
                  this.typing = false;
                  console.log("erorr");
                  res();
                  return;
                }
                this.clearP(clearStart, ArrayOfClearNumline, true);
                let setTime = 600 * clearNumline;
                setTimeout(() => {
                  if (!this.TypewriterCase || this.NewWidth != "XXX") {
                    this.typing = false;
                    console.log("erorr");
                    res();
                    return;
                  }
                  i++;
                  numOfClears++;
                  isFirstChange = false;
                  res();
                }, setTime);
              }
            });
          }
          if (!RRtxt.includes("XClearX") && this.TypewriterCase) {
            if (!this.TypewriterCase || this.NewWidth != "XXX") {
              this.typing = false;
              console.log("erorr");
              res();
              return;
            }
            if (i === 0) {
              setTimeout(() => {
                if (!this.TypewriterCase || this.NewWidth != "XXX") {
                  this.typing = false;
                  console.log("erorr");
                  res();
                  return;
                }
                this.endLineWrite1 = true;
              }, 100);
            }
            let text = RRtxt;
            let P = this.Pin;
            let Width = ArWidth[i];
            let isFirstChange = true;
            this.$watch(`endLineWrite${P}`, (V) => {
              if (V && isFirstChange) {
                if (!this.TypewriterCase || this.NewWidth != "XXX") {
                  this.typing = false;
                  console.log("erorr");
                  res();
                  return;
                }
                try {
                  let reWriter = true;
                  let X = RR[i + 1];
                  if (X) {
                    if (X.includes("XClearX")) {
                      reWriter = true;
                    }
                    if (!X.includes("XClearX")) {
                      reWriter = false;
                      this.Pin++;
                    }
                  } else {
                    reWriter = false;
                  }
                  this.TypewriterLine(text, P, Width, reWriter);
                  lastLineWrite++;
                  isFirstChange = false;
                  let setTime = 50 * RR[i];
                  setTimeout(() => {
                    if (this.TypewriterCase) {
                      i++;
                      res();
                    }
                  }, setTime);
                  return;
                } catch (error) {
                  if (!this.TypewriterCase || this.NewWidth != "XXX") {
                    this.typing = false;
                    console.log("erorr");
                    res();
                    return;
                  }
                  res();
                  return;
                }
              }
            });
          }
        });
      }
    },
    async TypewriterSinXX() {
      let RR = [
        "We don't have the ",
        "standards of a society",
        "that curbs freedoms",
        "silences mouths",
      ];
      let ArWidth = [146, 175, 160, 132];
      let numOfIndexs = RR.length - 1;
      let numOfClears = 0;
      let lastLineWrite = 0;
      console.log(numOfClears, lastLineWrite);
      for (let i = 0; i <= numOfIndexs; ) {
        if (!this.TypewriterCase || this.NewWidth != "XX") {
          this.typing = false;
          console.log("erorr");
          return;
        }
        await new Promise((res) => {
          if (!this.TypewriterCase || this.NewWidth != "XX") {
            this.typing = false;
            console.log("erorr");
            res();
            return;
          }
          let RRtxt = RR[i];
          if (RRtxt.includes("XClearX") && this.TypewriterCase) {
            if (!this.TypewriterCase || this.NewWidth != "XX") {
              this.typing = false;
              console.log("erorr");
              res();
              return;
            }
            let isFirstChange = true;
            let clearStart = RRtxt[0];
            let ss = RRtxt.length - 1;
            let clearNumline = RRtxt[ss];
            let ArrayOfClearNumline = [];
            for (let N = 1; N <= clearNumline; ) {
              if (!this.TypewriterCase || this.NewWidth != "XX") {
                this.typing = false;
                console.log("erorr");
                res();
                return;
              }
              ArrayOfClearNumline.push(900);
              N++;
            }
            this.$watch(`reWriter${clearStart}`, (V) => {
              if (V && isFirstChange) {
                if (!this.TypewriterCase || this.NewWidth != "XX") {
                  this.typing = false;
                  console.log("erorr");
                  res();
                  return;
                }
                this.clearP(clearStart, ArrayOfClearNumline, true);
                let setTime = 900 * clearNumline;
                setTimeout(() => {
                  if (!this.TypewriterCase || this.NewWidth != "XX") {
                    this.typing = false;
                    console.log("erorr");
                    res();
                    return;
                  }
                  i++;
                  numOfClears++;
                  isFirstChange = false;
                  res();
                }, setTime);
              }
            });
          }
          if (!RRtxt.includes("XClearX") && this.TypewriterCase) {
            if (!this.TypewriterCase || this.NewWidth != "XX") {
              this.typing = false;
              console.log("erorr");
              res();
              return;
            }
            if (i === 0) {
              setTimeout(() => {
                if (!this.TypewriterCase || this.NewWidth != "XX") {
                  this.typing = false;
                  console.log("erorr");
                  res();
                  return;
                }
                this.endLineWrite1 = true;
              }, 100);
            }

            //       var element = document.getElementById('P4');
            // var contentWidth = element.scrollWidth;
            // var newWidth = contentWidth + 6;
            // element.style.width = newWidth + 'px';

            let text = RRtxt;
            let P = this.Pin;
            let Width = ArWidth[i];
            let isFirstChange = true;
            this.$watch(`endLineWrite${P}`, (V) => {
              if (V && isFirstChange) {
                if (!this.TypewriterCase || this.NewWidth != "XX") {
                  this.typing = false;
                  console.log("erorr");
                  res();
                  return;
                }
                try {
                  let reWriter = true;
                  let X = RR[i + 1];
                  if (X) {
                    if (X.includes("XClearX")) {
                      reWriter = true;
                    }
                    if (!X.includes("XClearX")) {
                      reWriter = false;
                      this.Pin++;
                    }
                  } else {
                    reWriter = false;
                  }
                  this.TypewriterLine(text, P, Width, reWriter);
                  lastLineWrite++;
                  isFirstChange = false;
                  let setTime = 50 * RR[i];
                  setTimeout(() => {
                    if (this.TypewriterCase) {
                      i++;
                      res();
                    }
                  }, setTime);
                  return;
                } catch (error) {
                  if (!this.TypewriterCase || this.NewWidth != "XX") {
                    this.typing = false;
                    console.log("erorr");
                    res();
                    return;
                  }
                  res();
                  return;
                }
              }
            });
          }
        });
      }
    },
    async TypewriterSinX() {
      let RR = [
        "CAT helps you connect and",
        "share with the people in your",
        "2XClearX2",
        "life while preserving your",
        "time and privacy",
      ];
      let ArWidth = [146, 177, 0, 163, 136, 0, 169, 250];
      let numOfIndexs = RR.length - 1;
      let numOfClears = 0;
      let lastLineWrite = 0;
      console.log(numOfClears, lastLineWrite);
      for (let i = 0; i <= numOfIndexs; ) {
        if (!this.TypewriterCase || this.NewWidth != "X") {
          this.typing = false;
          console.log("erorr");
          return;
        }
        await new Promise((res) => {
          if (!this.TypewriterCase || this.NewWidth != "X") {
            this.typing = false;
            console.log("erorr");
            res();
            return;
          }
          let RRtxt = RR[i];
          if (RRtxt.includes("XClearX") && this.TypewriterCase) {
            if (!this.TypewriterCase || this.NewWidth != "X") {
              this.typing = false;
              console.log("erorr");
              res();
              return;
            }
            let isFirstChange = true;
            let clearStart = RRtxt[0];
            let ss = RRtxt.length - 1;
            let clearNumline = RRtxt[ss];
            let ArrayOfClearNumline = [];
            for (let N = 1; N <= clearNumline; ) {
              if (!this.TypewriterCase || this.NewWidth != "X") {
                this.typing = false;
                console.log("erorr");
                res();
                return;
              }
              ArrayOfClearNumline.push(600);
              N++;
            }
            this.$watch(`reWriter${clearStart}`, (V) => {
              if (V && isFirstChange) {
                if (!this.TypewriterCase || this.NewWidth != "X") {
                  this.typing = false;
                  console.log("erorr");
                  res();
                  return;
                }
                this.clearP(clearStart, ArrayOfClearNumline, true);
                let setTime = 600 * clearNumline;
                setTimeout(() => {
                  if (!this.TypewriterCase || this.NewWidth != "X") {
                    this.typing = false;
                    console.log("erorr");
                    res();
                    return;
                  }
                  i++;
                  numOfClears++;
                  isFirstChange = false;
                  res();
                }, setTime);
              }
            });
          }
          if (!RRtxt.includes("XClearX") && this.TypewriterCase) {
            if (!this.TypewriterCase || this.NewWidth != "X") {
              this.typing = false;
              console.log("erorr");
              res();
              return;
            }
            if (i === 0) {
              setTimeout(() => {
                if (!this.TypewriterCase || this.NewWidth != "X") {
                  this.typing = false;
                  console.log("erorr");
                  res();
                  return;
                }
                this.endLineWrite1 = true;
              }, 100);
            }
            let text = RRtxt;
            let P = this.Pin;
            let Width = ArWidth[i];
            let isFirstChange = true;
            this.$watch(`endLineWrite${P}`, (V) => {
              if (V && isFirstChange) {
                if (!this.TypewriterCase || this.NewWidth != "X") {
                  this.typing = false;
                  console.log("erorr");
                  res();
                  return;
                }
                try {
                  let reWriter = true;
                  let X = RR[i + 1];
                  if (X) {
                    if (X.includes("XClearX")) {
                      reWriter = true;
                    }
                    if (!X.includes("XClearX")) {
                      reWriter = false;
                      this.Pin++;
                    }
                  } else {
                    reWriter = false;
                  }
                  this.TypewriterLine(text, P, Width, reWriter);
                  lastLineWrite++;
                  isFirstChange = false;
                  let setTime = 50 * RR[i];
                  setTimeout(() => {
                    if (this.TypewriterCase) {
                      i++;
                      res();
                    }
                  }, setTime);
                  return;
                } catch (error) {
                  if (!this.TypewriterCase || this.NewWidth != "X") {
                    this.typing = false;
                    console.log("erorr");
                    res();
                    return;
                  }
                  res();
                  return;
                }
              }
            });
          }
        });
      }
    },
  },

  mounted() {
    this.checkScreenWidth();
  },
};
</script>

<style scoped>
.conta {
  width: 439px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 30px;
  /* padding-right: 2rem;
  padding-left: 2rem; */
}
p {
  /* outline: none; */
  font-size: 20px;
  width: fit-content;
  overflow: hidden;
  margin: 0px;
  /* margin-right: auto; */
  /* margin-left: auto; */
  position: relative;
  z-index: 1;
  margin-bottom: 7px;
  text-align: left;
  /* padding-right: 6px; */
  padding-left: 6px;
  color: white;
  white-space: nowrap;
  transition: all 0.9s;
  display: block;
}
p::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* background-color: rgb(133 98 128 / 45%); */
  background-color: rgb(133 98 147 / 51%);
  z-index: -1;
}
.animation {
  animation: Typewriter 0.05s ease-in-out infinite alternate !important;
}
@keyframes Typewriter {
  from {
    border-right: 6px solid white;
  }
  to {
    border-right: 6px solid rgba(0, 0, 255, 0.2);
  }
}
@media screen and (max-width: 850px) {
  .conta {
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
  }
  p {
    font-size: 17px;
    width: calc(max-content + 6);
  }
  /* #P3 {
    display: none;
  } */
  /* #P4 {
    display: none;
  } */
  #P5 {
    display: none;
  }
  #P6 {
    display: none;
  }
  #P7 {
    display: none;
  }
  #P8 {
    display: none;
  }
  #P9 {
    display: none;
  }
}
@media screen and (max-width: 430px) {
  .conta {
    width: calc(90% - 27px);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    margin-top: 0px;
  }
  p {
    font-size: 17px;
  }
  #P3 {
    display: none;
  }
  #P4 {
    display: none;
  }
  #P5 {
    display: none;
  }
  #P6 {
    display: none;
  }
  #P7 {
    display: none;
  }
  #P8 {
    display: none;
  }
  #P9 {
    display: none;
  }
}
/* @keyframes outP {
  from {
    width: fit-content;
  }
  to {
    width: 50px;
  }
} */
</style>
