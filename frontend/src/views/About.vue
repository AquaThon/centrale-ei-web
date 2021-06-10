<template>
  <h1>This is an about page</h1>
</template>

<script>
export default {
  created: function () {
    if (this.$root.currentUserEmail === null) {
      this.$router.push("/users");
    };
  },
}
</script>
