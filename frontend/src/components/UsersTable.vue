<template>

  <div class="container">
    <ul class="responsive-table">
      <li class="table-header">
        <div class="col col-1"><p>Email</p></div>
        <div class="col col-2"><p>First name</p></div>
        <div class="col col-3"><p>Last name</p></div>
        <div class="col col-4"><p></p></div>
        <div class="col col-5"><p></p></div>
      </li>
      <li class="table-row" v-for="user in users" :key="user.email">
        <div class="col col-1" data-label="Email"><p>{{ user.email }}</p></div>
        <div class="col col-2" data-label="First Name"><p>{{ user.firstName }}</p></div>
        <div class="col col-3" data-label="Last Name"><p>{{ user.lastName }}</p></div>
        <div class="col col-4" data-label="Impersonnate" v-if="user.email === $root.currentUserEmail"><p>You</p></div>
        <div class="col col-5" data-label="Delete" v-if="user.email === $root.currentUserEmail"><p></p></div>
        <div class="col col-4" data-label="Impersonnate" v-if="user.email !== $root.currentUserEmail"><button v-on:click="impersonnateUser(user.email)">Impersonnate</button></div>
        <div class="col col-5" data-label="Delete" v-if="user.email !== $root.currentUserEmail"><button v-on:click="deleteUser(user.email)">Delete</button></div>
      </li>
      <li class="table-row">
        <div class="col col-1" data-label="Email"><p><input type="text" v-model="userEmail" placeholder="thon@mazino.benjou" /></p></div>
        <div class="col col-2" data-label="First Name"><p><input type="text" v-model="firstName" placeholder="frontend" /></p></div>
        <div class="col col-3" data-label="Last Name"><p><input type="text" v-model="lastName" placeholder="backend" /></p></div>
        <div class="col col-4" data-label="Impersonnate"><button v-on:click="submit()">Submit</button></div>
        <div class="col col-5" data-label="Delete"><p></p></div>
      </li>
    </ul>
  </div>
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

.container {
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 10px;
  padding-right: 10px;
}

.responsive-table li {
  border-radius: 3px;
  padding: 25px 30px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;
}
.responsive-table .table-header {
  background-color: #95A5A6;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.responsive-table .table-row {
  background-color: #ffffff;
  box-shadow: 0px 0px 9px 0px rgba(0,0,0,0.1);
}

.responsive-table .col-1 {
  flex-basis: 40%;
}

.responsive-table .col-2 {
  flex-basis: 30%;
}

.responsive-table .col-3 {
  flex-basis: 20%;
}

.responsive-table .col-4 {
  flex-basis: 20%;
}

.responsive-table .col-5 {
  flex-basis: 20%;
}

.responsive-table {
  @media all and (max-width: 767px) {
    .table-header {
      display: none;
    }
    .table-row{

    }
    li {
      display: block;
    }

    .col {
      display: flex;
      padding: 10px 0;
      flex-basis: 100%;
      &:before {
        color: #6C7A89;
        padding-right: 10px;
        /* content: attr(data-label); */
        flex-basis: 50%;
        text-align: right;
      }
    }
  }
}

input {
  vertical-align: middle;
}

p {
  vertical-align: middle;
}

button {
  margin-top: 0px;
  display: block;
  margin-left: auto;
  margin-right: auto;
}

button {
  vertical-align: middle;
  width: 140px;
  height: 45px;
  font-family: "Roboto", sans-serif;
  font-size: 11px;
  letter-spacing: 2.5px;
  font-weight: 500;
  color: #000;
  background-color: #fff;
  border: none;
  border-radius: 45px;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease 0s;
  cursor: pointer;
  outline: none;
}

button:hover {
  background-color: #95A5A6;
  box-shadow: 0px 15px 20px rgba(46, 147, 229, 0.4);
  color: #fff;
  transform: translateY(-7px);
}

</style>
