import { createStore } from "vuex";
import axios from "axios";

const store = createStore({
  state() {
    return {
      likes: [30, 40, 32],
      isLiked: [false, false, false],
      more: {},
    };
  },
  mutations: {
    likeUp(state, index) {
      if (!state.isLiked[index]) {
        state.likes[index]++;
        state.isLiked[index] = true;
      } else {
        state.likes[index]--;
        state.isLiked[index] = false;
      }
    },
    setMore(state, data) {
      state.more = data;
    },
  },
  actions: {
    getData(context) {
      axios
        .get("https://codingapple1.github.io/vue/more0.json")
        .then((data) => {
          context.commit("setMore", data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
});

export default store;
