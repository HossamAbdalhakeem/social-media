<template>
  <v-app>
    <navbar></navbar>
    <router-view></router-view>
  </v-app>
</template>

<script>
export default {
  name: "App",
  mounted() {
    this.$store.dispatch("fetchPostsFromDb");
  },
  data: () => ({
    //
  }),
};
</script>
