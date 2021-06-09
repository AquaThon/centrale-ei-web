<template>
  <div class="rating">
    <span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>
  </div>
</template>

<script>
export default {
  name: "Movie",
  props: {
    rate: "",
  },
};
</script>

<style scoped>
.rating > span:hover:before {
  content: "\2605";
  position: absolute;
}
</style>
