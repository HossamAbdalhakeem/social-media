<template>
  <div>
    <div v-if="currentUser" class="cover" width="100%">
      <img
        v-if="currentUser.coverImg"
        width="100%"
        class="piccover"
        :src="currentUser.coverImg"
      />
      <div v-else class="cover black"></div>

      <v-btn class="white iconCover" icon @click="onpicfile">
        <v-icon>mdi-camera</v-icon>
      </v-btn>
      <input
        type="file"
        style="display: none"
        ref="fileInput"
        accept="image"
        @change="uploadFile"
      />
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
      openAddImg: false,
      mode: "",
      images: null,
    };
  },
  methods: {
    onpicfile() {
      this.$refs.fileInput.click();
      this.mode = "cover";
    },
    uploadFile(e) {
      this.images = e.target.files;
      this.openAddImg = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.cover {
  height: 300px;
  width: 100%;
}

.iconCover {
  position: absolute;

  left: 10px;
  top: 250px;
}
.piccover {
  height: 100%;
}
</style>
