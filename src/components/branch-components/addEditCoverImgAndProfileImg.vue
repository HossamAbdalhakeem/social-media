<template>
  <div>
    <v-card class="pa-5">
      <h5 class="text-center">are you sure change {{ mode }} image</h5>
      <div class="d-flex justify-content-center">
        <v-btn class="error mr-3" @click="$emit('closeDialog')">close</v-btn>
        <v-btn class="success" @click="updateImg" :loading="imgloading"
          >sure</v-btn
        >
      </div>
    </v-card>
  </div>
</template>

<script>
import InfoApi from "../services/posts";
export default {
  props: ["mode", "images", "currentUser"],
  data() {
    return {
      imgloading: false,
    };
  },
  methods: {
    async updateImg() {
      try {
        this.imgloading = true;
        const formData = new FormData();
        formData.append("files", this.images[0]);
        formData.append("mode", this.mode);
        const res = await InfoApi.uploadCroppedImage({
          userId: this.currentUser._id,
          formData,
        });
        console.log(res);
        if (this.mode == "profile") {
          this.$store.commit("updateProfileImg", res.data.newImg);
        } else {
          this.$store.commit("updateCoverImg", res.data.newImg);
        }
        this.imgloading = false;
        this.$emit("closeDialog");
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
