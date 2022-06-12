<template>
  <v-app>
    <div v-if="user" width="100%" height="300">
      <img
        v-if="user.coverImg"
        height="300"
        class="piccover w-100 object-fit-cover"
        :src="user.coverImg"
      />
    </div>
    <div v-else height="300" class="cover black"></div>
    <div v-if="user" class=" text-center mx-auto userInfo">
      <div class="imgUser mx-auto">
        <img
          @click="showimg = true"
          v-if="user.img"
          width="100%"
          class="rounded-circle imgprofile"
          :src="user.img"
        />
      </div>
      <h6 class="text-capitalize mt-3 mb-2 mb-0 userprofile">
        {{ user.name }}
      </h6>
      <div>
        <div v-if="!checkFriends()">
          <v-btn
            v-if="!checkRequest()"
            @click="addFriends"
            :loading="loadingAddFriend"
            class="text-capitalize primary ml-0 white--text"
            >add friend
          </v-btn>
          <v-btn
            v-else
            @click="cancelReq = true"
            class="text-capitalize primary ml-0 white--text"
            >Pending
          </v-btn>
        </div>
        <v-dialog v-model="cancelReq" width="400">
          <deleteItem
            @closeDeleteDilog="cancelReq = false"
            @submit="cancelrequest"
            content="friend request?"
            :loading="loadingReq"
          ></deleteItem>
        </v-dialog>
      </div>
    </div>
    <v-icon v-else class="accountIcon">mdi-account-circle</v-icon>
    <v-dialog width="400" height="400" v-model="showimg">
      <v-card width="400" height="400" v-if="user">
        <img v-if="user.img" width="100%" height="100%" :src="user.img" />
      </v-card>
    </v-dialog>
    <v-row>
      <v-col cols="12" sm="6" offset-sm="3" class="mt-6">
        <profileInfo :currentUser="user"></profileInfo>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="6" offset-sm="3">
        <posts :allposts="userPosts" :currentUser="currentUser"></posts>
      </v-col>
    </v-row>
    <v-list>
      <v-list-item>
        <v-list-item-icon>
          <v-icon></v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title></v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-app>
</template>

<script>
import profileInfo from "./branch-components/profileInfo.vue";
import posts from "./branch-components/posts.vue";
import postsApi from "./services/posts";
export default {
  props: ["id"],
  components: {
    profileInfo,
    posts,
  },
  data() {
    return {
      // user: null,

      datapost: null,
      datapostarray: [],
      showimg: false,
      toggle: true,
      myrequest: null,
      cancel: false,
      friend: null,
      myfriend: null,
      myreq: null,
      reqq: null,
      getposts: null,

      cancelReq: false,
      loading: false,
      loadingReq: false,
      loadingAddFriend: false,
    };
  },
  computed: {
    userPosts() {
      return this.$store.getters.allpost.filter((post) => {
        return post.userId._id == this.id;
      });
    },
    globalPosts() {
      return this.$store.getters.allpost;
    },
  
    currentUser() {
      return this.$store.getters.user;
    },
    user() {
      return this.$store.getters.signleUserData;
    },
  },
  mounted() {
    this.$store.dispatch("getSingleUser", this.id);
    console.log(this.globalPosts);
    if (this.id) {
      let userPosts = this.globalPosts.filter((i) => {
        return i.userId === this.id;
      });
      this.getposts = userPosts;
    }
  },

  methods: {
    checkRequest() {
      let checkReq = this.user.friendsRequests.some((e) => {
        return e == this.currentUser._id;
      });
      return checkReq;
    },
    checkFriends() {
      let checkFriend = this.user.friendsList.some((e) => {
        return e == this.currentUser._id;
      });
      return checkFriend;
    },
    async addFriends() {
      let dataCanelReq = {
        userId: this.currentUser._id,
        friendId: this.id,
      };
      if (!this.checkFriends()) {
        if (!this.checkRequest()) {
          let CurrentUser = this.currentUser;
          const requestInfo = {
            userId: CurrentUser._id,
            name: CurrentUser.name,
            img: CurrentUser.img,
            friendId: this.id,
            action: "newNotification",
            msg: " have sent you friend request ",
          };
          try {
            this.loadingAddFriend = true;
            let res = await postsApi.sendFriendRequest(requestInfo);
            console.log(res);
            this.$soketio.emit("sendFriendRequest", requestInfo);
            this.$store.dispatch("getSingleUser", this.id);
            this.loadingAddFriend = false;
          } catch (error) {
            console.log(error);
          }
        }
      } else {
        console.log("in friend");
        const res = await postsApi.deleteFriend(dataCanelReq);
        console.log(res);
      }
    },
    async cancelrequest() {
      let dataCanelReq = {
        userId: this.currentUser._id,
        friendId: this.id,
      };
      try {
        this.loadingReq = true;
        const res = await postsApi.rejectfriend(dataCanelReq);
        console.log(res);
        this.$store.dispatch("getSingleUser", this.id);
        this.loadingReq = false;
        this.cancelReq = false;
      } catch (error) {
        console.log(error);
      }
    },
    cancelrequestorfriend() {
      this.$store.dispatch("cancelfriend", this.id);
      this.cancelReq = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.cover {
  height: 30vh;
  width: 100%;
}

.userInfo {
  position: relative;
  bottom: 70px;
}
.accountIcon {
  font-size: 6.5rem;
}
.imgUser {
  height: 120px;
  width: 120px;

  img {
    width: 100%;
    height: 100%;
  }
}
.imgprofile {
  cursor: pointer;
}

</style>
