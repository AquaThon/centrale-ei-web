<template>
  <div class="nav">
    <router-link class="nav-link" to="/">Home</router-link>
    <router-link class="nav-link" to="/movies/add">Add a movie</router-link>
    <router-link class="nav-link" to="/users">Users</router-link>
  </div>
  <router-view />
</template>

<script>
export default {
  data: function () {
    return {
      currentUserEmail: null,
    };
  },
};
</script>

<style scoped>
.nav {
  display: flex;
  flex-direction: row;
  background-color: #c3dfe4;
}

.nav-link {
  font-weight: bold;
  color: #2c3e50;
  padding: 30px;
  text-decoration: none;
}
.nav-link:hover {
  background-color: #2ecae5;
}
.nav-link:active {
  background-color: #00c6e9b4;
}
</style>
