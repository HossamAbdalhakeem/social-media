<template>
  <div>
    <div class="mx-auto img-profile" v-if="currentUser">
      <input
        type="file"
        style="display: none"
        ref="fileInput"
        accept="image"
        @change="uploadFile"
      />
      <img
        @click="showProfileImg = true"
        v-if="currentUser.img"
        width="90"
        height="90"
        class="rounded-circle imgprofile"
        :src="currentUser.img"
      />
      <v-icon v-else class="accountIcon">mdi-account-circle</v-icon>
      <v-btn
        class="
            black
            white--text
            iconChangeProfileImg
          "
        icon
        @click="onpicfile"
      >
        <v-icon> mdi-camera</v-icon>
      </v-btn>
      <v-dialog width="400" height="400" v-model="showProfileImg">
        <v-card width="400" height="400">
          <img
            v-if="currentUser.img"
            width="100%"
            height="100%"
            :src="currentUser.img"
          />
        </v-card>
      </v-dialog>
      <v-dialog v-model="openAddImg" width="500">
        <addEditCoverImgAndProfileImg
          @closeDialog="openAddImg = false"
          :mode="mode"
          :images="images"
          :currentUser="currentUser"
        ></addEditCoverImgAndProfileImg>
      </v-dialog>
    </div>
  </div>
</template>

<script>
import addEditCoverImgAndProfileImg from "./addEditCoverImgAndProfileImg.vue";
export default {
  components: {
    addEditCoverImgAndProfileImg,
  },
  props: ["currentUser"],
  data() {
    return {
      showProfileImg: false,
      images: null,
      openAddImg: false,
      mode: "",
    };
  },
  methods: {
    onpicfile() {
      this.$refs.fileInput.click();
      this.mode = "profile";
    },
    uploadFile(e) {
      this.images = e.target.files;
      this.openAddImg = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.img-profile {
  height: 110px;
  width: 20%;
  text-align: center;
  position: relative;
  .accountIcon {
    font-size: 6.5rem;
  }
  .iconChangeProfileImg {
    position: relative;
    right: 95px;
    top: 41px;
  }
}
</style>
