<template>
  <div class="header">
    <ul class="header-button-left">
      <li @click="step = 0">Cancel</li>
    </ul>
    <ul class="header-button-right">
      <li v-if="step === 2" @click="publish">Upload</li>
      <li v-if="step === 1" @click="step++">Next</li>
    </ul>
    <img src="./assets/logo.png" class="logo" />
  </div>

  <Container
    v-bind:feedItem="feedItem"
    :step="step"
    :imgUrl="imgUrl"
    v-on:write="writing = $event"
  />
  <button v-on:click="more">More...</button>

  <div class="footer">
    <ul class="footer-button-plus">
      <input @change="upload" type="file" id="file" class="inputfile" />
      <label for="file" class="input-plus">+</label>
    </ul>
  </div>
</template>

<script>
import Container from "./components/Container.vue";
import data from "./assets/data.js";
import axios from "axios";

export default {
  name: "App",
  components: {
    Container: Container,
  },
  data() {
    return {
      step: 0,
      feedItem: data,
      countClick: 0,
      imgUrl: "",
      writing: "",
      pickedFilter: "",
    };
  },
  methods: {
    more() {
      axios
        .get(`https://codingapple1.github.io/vue/more${this.countClick}.json`)
        .then((data) => {
          this.feedItem.push(data.data);
          this.countClick++;
        })
        .catch((error) => {
          if (error.response.status === 404) {
            alert("더보기 할 게시물이 없습니다!");
          } else {
            console.log(error);
          }
        });
    },
    upload(e) {
      let file = e.target.files[0];
      let url = URL.createObjectURL(file);
      this.imgUrl = url;
      console.log(url);
      this.step = 1;
    },
    publish() {
      let newPost = {
        name: "Anonymous",
        userImage: "https://placeimg.com/100/100/arch",
        postImage: this.imgUrl,
        likes: 0,
        date: new Date().toDateString(),
        liked: false,
        content: this.writing,
        filter: this.pickedFilter,
      };
      this.feedItem.unshift(newPost);
      this.step = 0;
    },
  },
  mounted() {
    this.emitter.on("setfilter", (name) => {
      this.pickedFilter = name;
    });
  },
  computed: {},
};
</script>

<style>
body {
  margin: 0;
}
ul {
  padding: 5px;
  list-style-type: none;
}
.logo {
  width: 22px;
  margin: auto;
  display: block;
  position: absolute;
  left: 0;
  right: 0;
  top: 13px;
}
.header {
  width: 100%;
  height: 40px;
  background-color: white;
  padding-bottom: 8px;
  position: sticky;
  top: 0;
}
.header-button-left {
  color: skyblue;
  float: left;
  width: 50px;
  padding-left: 20px;
  cursor: pointer;
  margin-top: 10px;
}
.header-button-right {
  color: skyblue;
  float: right;
  width: 50px;
  cursor: pointer;
  margin-top: 10px;
}
.footer {
  width: 100%;
  position: sticky;
  bottom: 0;
  padding-bottom: 10px;
  background-color: white;
}
.footer-button-plus {
  width: 80px;
  margin: auto;
  text-align: center;
  cursor: pointer;
  font-size: 24px;
  padding-top: 12px;
}
.sample-box {
  width: 100%;
  height: 600px;
  background-color: bisque;
}
.inputfile {
  display: none;
}
.input-plus {
  cursor: pointer;
}
#app {
  box-sizing: border-box;
  font-family: "consolas";
  margin-top: 60px;
  width: 100%;
  max-width: 460px;
  margin: auto;
  position: relative;
  border-right: 1px solid #eee;
  border-left: 1px solid #eee;
}
</style>
