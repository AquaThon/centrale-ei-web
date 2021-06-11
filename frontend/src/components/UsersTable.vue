<template>

  <div class="container">
    <ul class="responsive-table">
      <li class="table-header">
        <div class="col col-1">Email</div>
        <div class="col col-2">First name</div>
        <div class="col col-3">Last name</div>
        <div class="col col-4"></div>
        <div class="col col-5"></div>
      </li>
      <li class="table-row" v-for="user in users" :key="user.email">
        <div class="col col-1" data-label="Email">{{ user.email }}</div>
        <div class="col col-2" data-label="First Name">{{ user.firstName }}</div>
        <div class="col col-3" data-label="Last Name">{{ user.lastName }}</div>
        <div class="col col-4" data-label="Impersonnate" v-if="user.email === $root.currentUserEmail">You</div>
        <div class="col col-5" data-label="Delete" v-if="user.email === $root.currentUserEmail"></div>
        <div class="col col-4" data-label="Impersonnate" v-if="user.email !== $root.currentUserEmail"><button v-on:click="impersonnateUser(user.email)">Impersonnate</button></div>
        <div class="col col-5" data-label="Delete" v-if="user.email !== $root.currentUserEmail"><button v-on:click="deleteUser(user.email)">Delete</button></div>
      </li>
      <li class="table-row">
        <div class="col col-1" data-label="Email"><input type="text" v-model="userEmail" placeholder="thon@mazino.benjou" /></div>
        <div class="col col-2" data-label="First Name"><input type="text" v-model="firstName" placeholder="frontend" /></div>
        <div class="col col-3" data-label="Last Name"><input type="text" v-model="lastName" placeholder="backend" /></div>
        <div class="col col-4" data-label="Impersonnate"><button v-on:click="submit()">Submit</button></div>
        <div class="col col-5" data-label="Delete"></div>
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

      flex-basis: 100%;

    }
    .col {
      display: flex;
      padding: 10px 0;
      &:before {
        color: #6C7A89;
        padding-right: 10px;
        content: attr(data-label);
        flex-basis: 50%;
        text-align: right;
      }
    }
  }
}

input {
  width: inherit;
  height: inherit;
}

</style>
