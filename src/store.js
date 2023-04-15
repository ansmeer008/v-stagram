import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      likes: [30, 40, 32],
      isLiked: [false, false, false],
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
  },
});

export default store;
