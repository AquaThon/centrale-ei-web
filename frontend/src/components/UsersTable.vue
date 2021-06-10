<template>
  <table>
    <thead>
      <th>Email</th>
      <th>First name</th>
      <th>Lirst name</th>
    </thead>
    <tbody>
      <tr v-for="user in users" :key="user.email">
        <td>{{ user.email }}</td>
        <td>{{ user.firstName }}</td>
        <td>{{ user.lastName }}</td>
        <td v-if="user.email === $root.currentUserEmail">You</td>
        <td v-if="user.email === $root.currentUserEmail"></td>
        <td v-if="user.email !== $root.currentUserEmail"><button @click="impersonnateUser(user.email)">Impersonnate</button></td>
        <td v-if="user.email !== $root.currentUserEmail"><button @click="deleteUser(user.email)">Delete</button></td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import axios from "axios";

export default {
  name: "UsersTable",
  props: {
    users: Array,
  },
  methods: {
    impersonnateUser: function (email) {
      this.$root.currentUserEmail = email;
    },
    deleteUser: function (email) {
      axios
      .delete(`${process.env.VUE_APP_BACKEND_BASE_URL}/users/delete`, { params: { "email": email } })
      .then((res) => {
        console.log(res)
      })
      .catch((error) => {
        console.log(error)
      })
    },
  }
};
</script>

<style scoped>
table {
  border-collapse: collapse;
}

th,
td {
  border: 1px solid #000000;
  padding: 10px;
}
</style>
