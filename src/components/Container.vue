<template>
  <div v-if="step === 0">
    <Post v-bind:item="item" v-for="(item, i) in feedItem" :key="i" />
  </div>

  <div v-if="step === 1">
    <div
      class="upload-image"
      :class="getFilter"
      :style="`background-image:url(${imgUrl})`"
    ></div>
    <div class="filters">
      <FilterBox
        v-for="(one, i) in filter"
        :filtername="one"
        :key="i"
        :imgUrl="imgUrl"
      >
        {{ one }}
      </FilterBox>
    </div>
  </div>

  <div v-if="step === 2">
    <div
      class="upload-image"
      :class="getFilter"
      :style="`background-image:url(${imgUrl})`"
    ></div>
    <div class="write">
      <textarea @change="$emit('write', $event.target.value)" class="write-box">
write!</textarea
      >
    </div>
  </div>
</template>

<script>
import Post from "./Post.vue";
import FilterBox from "./FilterBox.vue";
import filter from "../assets/filter";

export default {
  name: "Container",
  data() {
    return {
      filter: filter,
      getFilter: "",
    };
  },
  components: {
    Post: Post,
    FilterBox: FilterBox,
  },
  props: {
    step: Number,
    feedItem: Array,
    imgUrl: String,
  },
  mounted() {
    this.emitter.on("setfilter", (name) => {
      this.getFilter = name;
    });
  },
};
</script>

<style>
.upload-image {
  width: 100%;
  height: 450px;
  background: cornflowerblue;
  background-size: cover;
}
.filters {
  overflow-x: scroll;
  white-space: nowrap;
}
.filter-1 {
  width: 100px;
  height: 100px;
  background-color: cornflowerblue;
  margin: 10px 10px 10px auto;
  padding: 8px;
  display: inline-block;
  color: white;
  background-size: cover;
}
.filters::-webkit-scrollbar {
  height: 5px;
}
.filters::-webkit-scrollbar-track {
  background: #f1f1f1;
}
.filters::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 5px;
}
.filters::-webkit-scrollbar-thumb:hover {
  background: #555;
}
.write-box {
  border: none;
  width: 90%;
  height: 100px;
  padding: 15px;
  margin: auto;
  display: block;
  outline: none;
}
</style>
