<template>
  <v-app>
    <v-card width="400" class="card">
      <form @submit.prevent="login">
        <v-alert v-if="senderror" type="error">
          {{ senderror.message }}
        </v-alert>

        <v-card-title>
          <h4 class="mx-auto">Login your account</h4>
        </v-card-title>
        <v-card-text>
          <v-text-field
            class="mb-3"
            hide-details
            type="email"
            v-model="user.email"
            solo
            label="Email"
            required
          ></v-text-field>

          <v-text-field
            type="password"
            class="mb-3"
            hide-details
            v-model="user.password"
            solo
            label="password"
            required
          ></v-text-field>
        </v-card-text>
        <v-card-actions class="mt-0">
          <v-btn class="text-capitalize info white--text mx-auto" type="submit"
            >Login</v-btn
          >
        </v-card-actions>
      </form>
    </v-card>
  </v-app>
</template>

<script>
// import { auth } from "../../firebase";
import loginApi from "../services/posts";

export default {
  data() {
    return {
      // email: "dddddsssswrg@gmail.com",
      // password: "12345hh",
      feedback: null,
      user: {},
    };
  },
  computed: {
    mustbe() {
      return this.email !== null, this.password !== null;
    },
    senderror() {
      return this.$store.getters.error;
    },
    currentUser() {
      return this.$store.getters.user;
    },
  },
  methods: {
    async login() {
      console.log("login");
      // if ((this.email, this.password)) {
      //   this.$store
      //     .dispatch("login", {
      //       email: this.email,
      //       password: this.password,
      //     })
      //     .then((res) => {
      //       console.log("Done ", res);
      //       if (res) {
      //         this.$router.push({ path: "/" });
      //       }
      //     });
      // }
      try {
        const res = await loginApi.login(this.user);
        console.log(res);
        this.$store.dispatch("setUserData", res);
      } catch {
        console.log("error");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
  margin: 40px auto;
}
// .btns {
//   margin-left: 110px;
// }
</style>
