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
        <td v-if="user.email !== $root.currentUserEmail"><button v-on:click="impersonnateUser(user.email)">Impersonnate</button></td>
        <td v-if="user.email !== $root.currentUserEmail"><button v-on:click="deleteUser(user.email)">Delete</button></td>
      </tr>
      <tr>
        <td><input type="text" v-model="userEmail" placeholder="thon@mazino.benjou" /></td>
        <td><input type="text" v-model="firstName" placeholder="frontend" /></td>
        <td><input type="text" v-model="lastName" placeholder="backend" /></td>
        <td><button v-on:click="submit()">Submit</button></td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import axios from "axios";

export default {
  name: "UsersTable",
  data: function () {
    return {
      users: Array,
      userEmail: "",
      firstName: "",
      lastName: "",
    }
  },
  created: function () {
    this.fetchUsers();
  },
  methods: {
    fetchUsers: function () {
      axios
        .get(`${process.env.VUE_APP_BACKEND_BASE_URL}/users`)
        .then((response) => {
          this.users = response.data.users;
        })
        .catch((error) => {
          this.usersLoadingError = "An error occured while fetching users.";
          console.error(error);
        });
    },
    impersonnateUser: function (email) {
      this.$root.currentUserEmail = email;
    },
    deleteUser: function (email) {
      axios
      .delete(`${process.env.VUE_APP_BACKEND_BASE_URL}/users/delete`, { "data": { "email": email }} )
      .then((res) => {
        console.log(res)
        this.fetchUsers();
      })
      .catch((error) => {
        console.log(error)
      })
    },
    submit: function () {
      axios.post(`${process.env.VUE_APP_BACKEND_BASE_URL}/users/new/`, {
        "email": this.userEmail,
        "firstName": this.firstName,
        "lastName": this.lastName,
      })
      .then((res) => {
        if (res.status === 201) {
          console.log(res)
          this.$root.currentUserEmail = res.data.email;
          this.fetchUsers();
        } else {
          console.log(res);
          this.errorMessage = "Request failed";
        }
      })
      .catch((error) => {
        this.errorMessage = "Request failed";
        console.log(error);
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
