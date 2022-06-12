<template>
  <v-app>
    <profileImgCover :currentUser="currentUser"></profileImgCover>
    <div class="main-container">
      <profileImg :currentUser="currentUser"></profileImg>
      <hr />
      <v-row v-if="currentUser">
        <v-col cols="12" md="6" offset-md="3">
          <addEditPost class="mb-3"></addEditPost>
          <div>
            <posts :currentUser="currentUser" :allposts="allposts"></posts>
          </div>
        </v-col>
        <v-col cols="12" md="3" class="pa-0 myinfo">
          <v-dialog width="300" v-model="showRequest">
            <requests
              @closeReqDialog="showRequest = false"
              :getRequests="getRequests"
            ></requests>
          </v-dialog>
          <v-dialog width="300" v-model="showfriends">
            <friends :currentUser="currentUser"></friends>
          </v-dialog>

          <profileInfo :currentUser="currentUser"></profileInfo>
          <v-btn class="primary--text mt-2" block @click="openmyinfo"
            >Edit information profile</v-btn
          >
          <div class="mt-3 d-flex justify-content-around">
            <v-btn @click="showfriends = true" class="text-capitalize"
              >friends
              <v-icon>mdi-account-supervisor</v-icon>
            </v-btn>
            <v-btn @click="showRequest = true" class="text-capitalize"
              >Requests
              <v-icon>mdi-account-arrow-right</v-icon>
            </v-btn>
          </div>
        </v-col>
      </v-row>
      <v-dialog v-model="showProfileinfo" width="600" persistent>
        <editInfoProfile
          :user="user"
          @closeEditInfoDialog="showProfileinfo = false"
        ></editInfoProfile>
      </v-dialog>
    </div>
  </v-app>
</template>

<script>
// import { auth } from "../../firebase";
import addEditPost from "../branch-components/AddEditPosts.vue";
// import { db } from "../../firebase";
import posts from "../branch-components/posts.vue";
import editInfoProfile from "../branch-components/editInfoProfile.vue";
import profileInfo from "../branch-components/profileInfo.vue";
import friends from "../branch-components/friends.vue";
import requests from "../branch-components/requests.vue";
import profileImg from "../branch-components/profileImg.vue";
import profileImgCover from "../branch-components/profileImgCover.vue";
export default {
  components: {
    addEditPost,
    posts,
    editInfoProfile,
    profileInfo,
    friends,
    requests,
    profileImg,
    profileImgCover,
  },
  data() {
    return {
      post: null,
      showRequest: false,
      showfriends: false,
      showProfileinfo: false,
      user: {},
      getPosts: null,
      getrequest: null,
    };
  },
  methods: {
    openmyinfo() {
      this.showProfileinfo = true;
      this.user = { ...this.currentUser };
    },
  },
  computed: {
    currentUser() {
      return this.$store.getters.user;
    },
    allposts() {
      return this.$store.getters.allpost.filter((post) => {
        return post.userId._id == this.currentUser._id;
      });
    },
    getRequests() {
      return this.$store.getters.getrequests;
    },
  },
};
</script>

<style lang="scss" scoped>
.main-container {
  width: 90%;
  margin: 0 auto;
}

@media (max-width: 960px) {
  .myinfo {
    order: -1;
  }
}
</style>
