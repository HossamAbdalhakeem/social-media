<template>
  <v-app>
    <v-container>
      <v-row class="mt-3">
        <v-col cols="12" sm="6" offset-sm="3">
          <AddEditPosts></AddEditPosts>
          <posts :currentUser="getinfo" :allposts="allposts"></posts>
        </v-col>
        <v-col cols="3" class="d-none d-sm-flex">
          <div class="information mt-3 text-capitalize" v-if="getinfo">
            <img
              @click="tocurrentuser"
              class="rounded-circle d-block mx-auto"
              v-if="getinfo.image"
              width="40"
              height="40"
              :src="getinfo.image"
            />
            <v-icon
              @click="tocurrentuser"
              x-large
              v-else
              class="d-block mx-auto"
              >mdi-account-circle</v-icon
            >
            <p @click="tocurrentuser">
              {{ getinfo.name }} {{ getinfo.lastname }}
            </p>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
// import moment from "moment";
import AddEditPosts from "./branch-components/AddEditPosts.vue";
import posts from "./branch-components/posts.vue";

export default {
  data() {
    return {
      postId: null,
      post: null,
      editPost: null,
      // allposts: [],

    };
  },
  components: {
    AddEditPosts,
    posts,
  },
  methods: {
    addNewPost(post) {
      console.log(post);
    },
    tocurrentuser() {
      this.$router.push({ path: "/profile" });
    },
  },
  computed: {
    getinfo() {
      return this.$store.getters.user;
    },
    allposts() {
      return this.$store.getters.allpost;
    },
  },
};
</script>

<style lang="scss" scoped>
.information {
  position: relative;
  left: 100px;
  font-weight: bolder;
  font-size: 16px;
  height: 80px;
}
.information img {
  cursor: pointer;
}
.information p {
  cursor: pointer;
}

@media (max-width: 600px) {
  * {
    font-size: 10px;
  }
}
@media (min-width: 601px) and (max-width: 960px) {
  .information {
    margin-right: 100px;
  }
  .information img {
    display: block;
  }
  * {
    font-size: 10px;
  }
}
@media (min-width: 960px) and (max-width: 1264px) {
  .information {
    margin-right: 70px;
  }
  .information img {
    margin-left: 40px;
  }
}
</style>
