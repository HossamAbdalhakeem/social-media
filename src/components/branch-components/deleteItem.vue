<template>
  <div>
    <v-card class="pa-5">
      <h4 class="text-center">are you sure delete your {{content}}</h4>
      <div class="d-flex justify-content-center">
        <v-btn class="error mr-3" @click="$emit('closeDeleteDilog')"
          >close</v-btn
        >
        <v-btn class="info" :loading="loading" @click="$emit('submit')"
          >sure</v-btn
        >
      </div>
    </v-card>
  </div>
</template>

<script>
export default {
     props: ["content", "loading"],
};
</script>

<style lang="scss" scoped></style>
