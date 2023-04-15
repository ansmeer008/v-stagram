<template>
  <div
    :class="`filter-item ${filtername}`"
    :style="`background-image:url(${imgUrl})`"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "FilterBox",
  props: {
    imgUrl: String,
    filtername: String,
  },
};
</script>

<style>
.filter-item {
  width: 100px;
  height: 100px;
  margin: 10px 10px 10px auto;
  padding: 8px;
  display: inline-block;
  color: white;
  background-size: cover;
  background-position: center;
}
</style>
