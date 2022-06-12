<template>
  <div>
    <v-card
      v-for="(post, index) in allposts"
      :key="index"
      class="mb-3 pb-0 mt-10"
    >
      <v-card-text>
        <div class="allposts mt-0 pt-0 mb-3">
          <div class="infoInPost text-capitalize">
            <div class="postimage">
              <img
                @click="Touser(post)"
                v-if="post.userId.img"
                width="40"
                height="40"
                class="rounded-circle mt-0 pionter"
                :src="post.userId.img"
              />
            </div>
            <div class="infotext">
              <p @click="Touser(post)" class="mb-0 mt-0 pionter">
                {{ post.userId.name }}
              </p>
              <p>
                {{ post.date }}
              </p>
            </div>
          </div>
          <div class="fivourite" v-if="post.userId._id !== getinfo._id">
            <v-btn @click="savePost(post)" fab x-small>
              <v-icon v-if="checkSavePost(post) === true" class="orange--text">
                mdi-star</v-icon
              >
              <v-icon v-else> mdi-star</v-icon>
            </v-btn>
          </div>

          <div class="mt-0 dotsMenu" v-if="getinfo">
            <v-menu class="menu" bottom right>
              <template v-slot:activator="{ on, attrs }">
                <v-btn text icon v-bind="attrs" v-on="on">
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </template>

              <v-list class="lists">
                <div v-if="post.userId._id == getinfo._id">
                  <v-list-item>
                    <v-list-item-title>
                      <v-btn
                        fab
                        small
                        color="red"
                        dark
                        @click="deletePost(post)"
                      >
                        <v-icon>mdi-delete</v-icon>
                      </v-btn>
                    </v-list-item-title>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-title>
                      <v-btn
                        @click="editing(post)"
                        fab
                        small
                        color="primary"
                        dark
                      >
                        <v-icon>mdi-pencil</v-icon>
                      </v-btn>
                    </v-list-item-title>
                  </v-list-item>
                </div>
                <v-list-item v-else>
                  <v-list-item-title>
                    <v-btn
                      fab
                      @click="hiddenpost(post)"
                      color="black"
                      dark
                      small
                    >
                      <v-icon>mdi-eye-off</v-icon>
                    </v-btn>
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </div>
        </div>
        <div>
          <div class="mb-4">{{ post.description }}</div>
          <div v-if="post.img" class="postImgs d-flex justify-content-center">
            <div
              v-for="(img, index) in post.img"
              :key="index"
              class="w-100 h-100"
            >
              <!-- <div class="postImg"> -->
              <img :src="img" class="w-100 h-50 object-fit-cover" />
              <!-- </div> -->
            </div>
          </div>
        </div>
        <div class="d-flex justify-content-between align-items-center mt-3">
          <div>
            <div v-if="post.reacts.length > 0">
              <v-icon small color="red">mdi-heart-circle</v-icon>
              {{ post.reacts.length }}
            </div>
          </div>
          <div>
            <div v-if="post.comments.length > 0">
              {{ post.comments.length }} comment
            </div>
          </div>
        </div>

        <hr />
        <div class="d-flex justify-space-around">
          <div class="like">
            <v-btn @click="like(post)" small text class="text-capitalize">
              <div class="d-flex" v-if="likeColor(post) == true">
                <v-icon color="red" small>mdi-cards-heart</v-icon>
                <p class="red--text m-0">like</p>
              </div>
              <div v-else class="d-flex">
                <v-icon small>mdi-cards-heart-outline</v-icon>
                <p class="m-0">like</p>
              </div>
            </v-btn>
          </div>
          <div class="commentat">
            <v-btn
              small
              class="mb-3 text-capitalize"
              @click="showmyComments(post)"
              :id="'d' + post._id"
              text
            >
              <v-icon small>mdi-comment-outline</v-icon>
              comment
            </v-btn>
          </div>
          <div>
            <v-btn small text class="text-capitalize">
              <v-icon small>mdi-share</v-icon>
              share
            </v-btn>
          </div>
        </div>
        <form @submit.prevent="addcomment(post)" class="ml-3">
          <div class="hideAllComments" :id="'a' + post._id">
            <div v-for="(comment, index) in post.comments" :key="index">
              <div class="d-flex">
                <img
                  @click="TouserComment(comment)"
                  width="40"
                  height="40"
                  class="rounded-circle mr-2 allCommentsInHome"
                  :src="comment.img[0]"
                />
                <div class="allComments">
                  <div
                    class="d-flex justify-content-between align-items-center"
                  >
                    <h5
                      class="fromName mb-1 allCommentsInHome"
                      @click="TouserComment(comment)"
                    >
                      {{ comment.name }}
                    </h5>

                    <v-menu class="menu" bottom right>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn text icon v-bind="attrs" v-on="on">
                          <v-icon>mdi-dots-vertical</v-icon>
                        </v-btn>
                      </template>

                      <v-list class="lists">
                        <div v-if="comment.userId == getinfo._id">
                          <v-list-item>
                            <v-list-item-title>
                              <v-btn
                                fab
                                small
                                color="red"
                                dark
                                @click="deleteComment(comment)"
                              >
                                <v-icon>mdi-delete</v-icon>
                              </v-btn>
                            </v-list-item-title>
                          </v-list-item>
                          <v-list-item>
                            <v-list-item-title>
                              <v-btn
                                @click="editComment(comment)"
                                fab
                                small
                                color="primary"
                                dark
                              >
                                <v-icon>mdi-pencil</v-icon>
                              </v-btn>
                            </v-list-item-title>
                          </v-list-item>
                        </div>
                        <v-list-item v-else>
                          <v-list-item-title>
                            <v-btn
                              fab
                              @click="hiddenpost(post)"
                              color="black"
                              dark
                              small
                            >
                              <v-icon>mdi-eye-off</v-icon>
                            </v-btn>
                          </v-list-item-title>
                        </v-list-item>
                      </v-list>
                    </v-menu>
                  </div>
                  <p class="mb-0">{{ comment.description }}</p>
                  {{ comment.date }}
                </div>
              </div>
              <br />
            </div>
          </div>
          <div>
            <v-text-field
              label="Comment"
              outlined
              dense
              :id="post._id"
            ></v-text-field>
          </div>
        </form>
      </v-card-text>
    </v-card>
    <v-dialog width="700" v-model="openEditDialog">
      <AddEditPosts
        :postId="postId"
        @closeEditDialog="openEditDialog = false"
        :editPost="editPost"
      ></AddEditPosts>
    </v-dialog>
    <v-dialog v-model="editcommentDialog" width="500">
      <v-card class="pa-7">
        <h2 class="text-center">edit Your comment</h2>
        <v-text-field
          label="update comment"
          outlined
          dense
          v-model="updateComment.description"
        ></v-text-field>
        <div class="d-flex justify-content-center">
          <v-btn class="error mr-3" @click="editcommentDialog = false"
            >close</v-btn
          >
          <v-btn class="info" :loading="loading" @click="submitEdit"
            >save</v-btn
          >
        </div>
      </v-card>
    </v-dialog>
    <v-dialog v-model="deleteCommentDialog" width="500">
      <deleteItem
        :loading="loading"
        @closeDeleteDilog="deleteCommentDialog = false"
        @submit="confirmDeleteComment"
        content="comment"
      ></deleteItem>
    </v-dialog>
    <v-dialog v-model="deletePostDialog" width="500">
      <deleteItem
        :loading="loading"
        @closeDeleteDilog="deletePostDialog = false"
        @submit="confirmDeletePost"
        content="post"
      ></deleteItem>
    </v-dialog>
  </div>
</template>

<script>
import moment from "moment";
import AddEditPosts from "./AddEditPosts.vue";
import postApi from "../services/posts";
export default {
  props: ["allposts", "currentUser"],
  components: {
    AddEditPosts,
  },
  data() {
    return {
      postId: null,
      editPost: {},
      openEditDialog: false,
      showComments: false,
      editcommentDialog: false,
      updateComment: {},
      deleteCommentDialog: false,
      comment: null,
      loading: false,
      deletePostDialog: false,
      post: {},
    };
  },
  methods: {
    addNewPost(post) {
      console.log(post);
      this.allposts.push(post);
      console.log(this.allposts);
    },

    deletePost(post) {
      console.log(post);
      (this.deletePostDialog = true), (this.post = post);
    },
    async confirmDeletePost() {
      try {
        this.loading = true;
        await postApi.deletPost(this.post._id);
        this.loading = false;
        this.deletePostDialog = false;
      } catch (error) {
        this.errors = error;
      }
    },
    hiddenpost(post) {
      console.log(post);
      this.$store.dispatch("deletePost", post._id);
    },
    Touser(post) {
      if (post.userId._id == this.currentUser._id) {
        this.$router.push({ path: "/profile" });
      } else {
        this.$router.push({ path: "/singleuser/" + post.userId._id });
        console.log(post.userId);
      }
    },
    TouserComment(comment) {
      console.log(comment);
      if (comment.userId == this.currentUser._id) {
        this.$router.push({ path: "/profile" });
      } else {
        this.$router.push({
          path: "/singleuser/" + comment.userId,
        });
      }
    },
    editing(post) {
      console.log(post);
      this.openEditDialog = true;
      this.postId = post._id;
      this.editPost = { ...post };
    },
    async like(post) {
      // this.$store.dispatch("toLikes", post);
      console.log(post);
      console.log(this.likeColor(post));
      let postData = {
        postId: post._id,
        user: this.currentUser,
      };
      if (!this.likeColor(post)) {
        try {
          let res = await postApi.addLike(postData);
          post.reacts = res.data.post.reacts;
          console.log(post.reacts);
          // this.$emit("AddLike", res.data.post.reacts);
          // console.log(res);
          // const noti = {
          //   userId: this.currentUser._id,
          //   name: this.currentUser.name,
          //   img: this.currentUser.img,
          //   friendId: post.userId._id,
          //   postId: post._id,
          //   action: "newLikeNotification",
          //   msg: " have like on your post  ",
          // };

          // this.$store.dispatch("editPost", res.data.post);
          // // await postApi.pushToAllNotifications(noti);
          // this.socket.emit("addLike", noti);
        } catch (err) {
          console.log(err);
        }
      } else {
        try {
          let res = await postApi.removeLike(postData);
          post.reacts = res.data.post.reacts;
          console.log(res);
        } catch (err) {
          console.log(err);
        }
      }
    },
    likeColor(post) {
      let like = post.reacts.some((i) => {
        return i.userId._id == this.currentUser._id;
      });
      return like;
    },
    checkSavePost(post) {
      let check = this.currentUser.savedPosts.some((i) => {
        return i.postId == post._id;
      });
      return check;
    },
    async savePost(post) {
      console.log(post);
      try {
        console.log(this.checkSavePost(post));
        if (!this.checkSavePost(post)) {
          const res = await postApi.savePost({
            post,
            userId: this.currentUser._id,
          });
          console.log(res);
          this.$store.dispatch("updateUser", res.data);
        } else {
          const res = await postApi.removeSaved({
            postId: post._id,
            userId: this.currentUser._id,
          });
          console.log(res);
          this.$store.dispatch("RemoveSavePost", res.data);
        }
      } catch (error) {
        this.errors = error;
      }
    },
    showmyComments(post) {
      let show = document.getElementById("a" + post._id);
      if (show.classList.contains("showmyAllComments")) {
        show.classList.add("hideAllComments");
        show.classList.remove("showmyAllComments");
      } else {
        show.classList.add("showmyAllComments");
        show.classList.remove("hideAllComments");
      }
    },
    async addcomment(post) {
      console.log(post);
      console.log(this.currentUser);
      let comment = document.getElementById(post._id).value;
      console.log(comment);
      let user = {};
      user.name = post.userId.name;
      try {
        let res = await postApi
          .creatComment({
            user: this.currentUser,
            postId: post._id,
            comment: comment,
          })
          .then(() => {
            let comment = document.getElementById(post._id);
            comment.value = "";
            // let test = comment.onblur;
            // test.value = "";
          });
        console.log(res);
      } catch (err) {
        console.log(err);
      }

      let show = document.getElementById("a" + post._id);
      if (show.classList.contains("hideAllComments")) {
        show.classList.add("showmyAllComments");
        show.classList.remove("hideAllComments");
      }
    },
    deleteComment(comment) {
      this.deleteCommentDialog = true;
      this.comment = comment;
    },
    async confirmDeleteComment() {
      console.log(this.comment);

      const commentId = this.comment._id;
      const postId = this.comment.postId;
      console.log(commentId);
      console.log(postId);
      try {
        this.loading = true;
        let res = await postApi.deleteComment({ commentId, postId });
        console.log(res);
        this.deleteCommentDialog = false;
        this.loading = false;
      } catch (err) {
        console.log(err);
        this.deleteCommentDialog = false;
      }
    },
    async editComment(comment) {
      this.editcommentDialog = true;
      this.updateComment = { ...comment };
      console.log(comment);
    },
    async submitEdit() {
      try {
        this.loading = true;
        let data = {
          commentId: this.updateComment._id,
          newComment: this.updateComment.description,
          postId: this.updateComment.postId,
        };
        await postApi.editComment(data);
        this.editcommentDialog = false;
        this.loading = false;
      } catch (err) {
        console.log(err);
        this.editcommentDialog = false;
      }
    },
  },
  mounted() {
    this.socket = this.$soketio;
    this.$soketio.on("test", (data) => {
      console.log("testTTTTTTTTTTTTTT", data);
    });
    this.$soketio.on("post", (data) => {
      console.log(data);
      switch (data.action) {
        case "create":
          this.$store.dispatch("addPost", data);
          break;
        case "delete":
          this.$store.dispatch("deletePost", data.post._id);
          break;
        case "edit":
          this.$store.dispatch("editPost", data.post);
          break;
        case "comment":
          this.$store.dispatch("pushNewComment", data.comment);
          break;
        case "deleteComment":
          this.$store.dispatch("deleteComment", {
            commentId: data.commentId,
            postId: data.postId,
          });
          break;
        case "editComment":
          this.$store.dispatch("editComment", data);
          break;
        case "signupNewUser":
          this.$store.dispatch("setNewUser", data.user);
          break;
      }
    });
  },

  computed: {
    // allposts() {
    //   return this.$store.getters.allpost;
    // },
    getinfo() {
      return this.$store.getters.user;
    },
    getcomment() {
      return this.$store.getters.getcomments;
    },
    getFivourite() {
      return this.$store.getters.getFivourite;
    },
    getallLikes() {
      return this.$store.getters.getMyLikes;
    },
  },
  filters: {
    moment(date) {
      return moment(date).format("MMMM Do YYYY, h:mm:ss a");
    },
  },
};
</script>

<style lang="scss" scoped>
.postImgs {
  gap: 0.7rem;
}
.postImg {
  width: 30%;

}
.hideAllComments {
  display: none;
}
.showmyAllComments {
  display: block;
}
.allposts {
  display: flex;
  justify-content: space-between;
}
.postimage {
  margin-right: 10px;
}
.infoInPost {
  font-weight: bolder;
  font-size: 16px;
  display: flex;
}
.pionter {
  cursor: pointer;
}
.infotext {
  position: relative;
  top: 5px;
}
.lists {
  cursor: pointer;
}
.fivourite {
  position: absolute;
  right: 60px;
}
.changeColor {
  color: orange;
}
.allComments {
  width: 300px;
  padding: 10px 7px;
  background-color: rgb(233, 233, 233);
  color: black;
  border-radius: 10px;
  font-size: 13px;
}
.fromName {
  font-size: 15px;
  margin-bottom: 0;
  font-weight: bold;
}
.allCommentsInHome {
  cursor: pointer;
}
@media (max-width: 600px) {
  .fivourite {
    position: absolute;
    right: 60px;
    top: 20px;
  }
  .fivourite button {
    width: 30px;
    height: 30px;
  }
  * {
    font-size: 10px;
  }
}
@media (min-width: 601px) and (max-width: 960px) {
  .fivourite {
    position: absolute;
    right: 45px;
    top: 20px;
  }
  .dotsMenu {
    position: absolute;
    right: 7px;
  }
  .fivourite button {
    width: 25px;
    height: 25px;
  }

  * {
    font-size: 10px;
  }
}
</style>
