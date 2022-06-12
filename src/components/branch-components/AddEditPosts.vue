<template>
  <div>
    <v-card width="100%">
      <v-form @submit.prevent="addNewPost" v-model="valid">
        <div v-if="postId" class="text-right pa-5 pb-0">
          <v-icon button @click="$emit('closeEditDialog')">mdi-close</v-icon>
        </div>
        <v-card-title>
          <h4 class="mx-auto text-capitalize">
            {{ postId ? "edit your post" : "what you need write" }}
          </h4>
        </v-card-title>
        <v-card-text>
          <v-text-field
            v-if="postId"
            outlined
            label="edit Post"
            hide-details
            v-model="editPost.description"
          ></v-text-field>
          <v-text-field
            v-else
            outlined
            label="new Post"
            hide-details
            v-model="post"
          ></v-text-field>
          <div class="mt-4 d-flex justify-content-end">
            <input
              type="file"
              style="display: none"
              ref="fileInput"
              accept="image"
              @change="uploadFile"
              multiple
            />
            <v-btn icon @click="onpicfile">
              <v-icon>mdi-image-multiple</v-icon>
            </v-btn>
          </div>
        </v-card-text>
        <v-card-actions class="ml-2 pb-4">
          <v-btn :loading="loading" class="info" type="submit">save post</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </div>
</template>

<script>
import postsApi from "../services/posts";
export default {
  props: ["postId", "editPost"],
  data() {
    return {
      valid: false,
      post: null,
      loading: false,
      images: null,
    };
  },
  computed: {
    currentUser() {
      return this.$store.getters.user;
    },
  },
  methods: {
    onpicfile() {
      this.$refs.fileInput.click();
    },
    uploadFile(e) {
      this.images = e.target.files;
    },
    async addNewPost() {
      const formData = new FormData();
      if (this.postId) {
        for (const i of Object.keys(this.images)) {
          formData.append("files", this.images[i]);
        }
        console.log(this.editPost);
        try {
          let editPost = this.editPost;
          this.loading = true;
          console.log(editPost);
          formData.append("data", JSON.stringify(this.editPost));
          let res = await postsApi.editPost(formData);
          console.log(res);
          this.loading = false;
        } catch (err) {
          console.log(err);
        }
      } else {
        if (this.post) {
          console.log("post");
          console.log(this.currentUser);
          let sendPost = {};
          sendPost.description = this.post;
          sendPost.userId = this.currentUser._id;
          formData.append("data", JSON.stringify(sendPost));
          if (this.images) {
            for (const i of Object.keys(this.images)) {
              formData.append("files", this.images[i]);
            }
            try {
              this.loading = true;
              let res = await postsApi.createPost(formData);
              console.log(res);
              this.loading = false;
              this.post = null;
            } catch (err) {
              console.log(err);
            }
          } else {
            try {
              this.loading = true;
              let res = await postsApi.createPost(formData);
              console.log(res);
              this.loading = false;
              this.post = null;
            } catch (err) {
              console.log(err);
            }
          }

          // const formData = new FormData();
          // for (const i of Object.keys(this.images)) {
          //   formData.append("files", this.images[i]);
          // }
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
