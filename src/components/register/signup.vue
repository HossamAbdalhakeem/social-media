<template>
  <v-app>
    <v-icon class="info--text mt-10 mb-0" x-large>mdi-facebook</v-icon>
    <v-card width="400" class="card">
      <v-alert v-if="senderror" type="error">
        {{ senderror.message }}
      </v-alert>
      <v-card-title>
        <h4 class="mx-auto text-capitalize">sign up new account</h4>
      </v-card-title>
      <v-card-text>
        <v-text-field
          class="mb-3"
          v-model="user.name"
          solo
          label="Name"
          type="text"
          required
          hide-details
        ></v-text-field>
        <v-text-field
          class="mb-3"
          hide-details
          type="text"
          v-model="user.bio"
          solo
          label="Last Name"
          required
        ></v-text-field>
        <v-text-field
          class="mb-3"
          hide-details
          type="number"
          v-model="user.phone"
          solo
          label="phone"
          required
        ></v-text-field>

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
        <!-- <v-text-field
          type="password"
          class="mb-3"
          hide-details
          v-model="confirmpassword"
          solo
          label="Confirm password"
          required
          :rules="[surepassword]"
        ></v-text-field> -->
        <v-btn
          block
          class="text-capitalize success white--text mt-5"
          @click="save"
          >Sign Up</v-btn
        >
        <div class="mt-5">
          Already have an account?
          <router-link to="login">Sign in</router-link>
          .
        </div>
      </v-card-text>
    </v-card>
  </v-app>
</template>

<script>
import registerApi from "../services/posts";
export default {
  data() {
    return {
      // name: null,
      // lastname: null,
      // email: null,
      // password: null,
      // confirmpassword: null,
      user: {},
      image: null,
      imagecover: null,
      feedback: null,
    };
  },
  computed: {
    surepassword() {
      return this.password !== this.confirmpassword ? "password not Match" : "";
    },
    mustbe() {
      return (
        this.name !== null,
        this.lastname !== null,
        this.email !== null,
        this.password !== null,
        this.confirmpassword !== null
      );
    },
    senderror() {
      return this.$store.getters.error;
    },
  },
  methods: {
    async save() {
      try {
        console.log("register");
        const res = await registerApi.register(this.user);
        console.log(res);
      } catch {
        console.log("error");
      }
      // console.log("save");
      // if (this.password == this.confirmpassword) {
      //   this.$store.dispatch("signUp", this.user);
      //   this.$router.push({ path: "/" });
      // } else {
      //   this.feedback = "this password mot Matching";
      // }
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
  margin: 40px auto;
}
</style>
