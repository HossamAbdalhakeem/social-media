<template>
  <div>
    <v-card class="pa-3">
      <v-card-title class="ml-10">
        Your Requests
        <v-icon class="black--text ml-3">mdi-account-arrow-right</v-icon>
      </v-card-title>
      <div v-if="getRequests">
        <div v-for="(request, i) in getRequests" :key="i">
          <div class="d-flex align-center">
            <div v-if="request" class="">
              <img
                v-if="request.image"
                :src="request.image"
                width="50"
                height="50"
                class="rounded-circle"
              />
              <v-icon x-large v-else>mdi-account-circle</v-icon>
            </div>
            <h6 class="text-capitalize ma-0 ml-4">
              {{ request.name }} {{ request.lastname }}
            </h6>
          </div>
          <p class="text-capitalize text-center">You want to be friend?</p>
          <v-card-actions class="ml-11">
            <v-btn
              class="red text-capitalize white--text"
              @click="deletereq(request)"
              >remove</v-btn
            >
            <v-btn class="info text-capitalize" @click="acceptFriend(request)"
              >accept</v-btn
            >
          </v-card-actions>
        </div>
      </div>
      <div v-else>You don't have friend requests</div>
    </v-card>
  </div>
</template>

<script>
export default {
  props: ["getRequests"],
  data() {
    return {};
  },
  mounted() {
    this.$store.dispatch("getrequests");
  },
  methods: {
    deletereq(request) {
      this.$store.dispatch("removeReq", request);
      if (this.getRequests >= 0) {
        this.$emit("closeReqDialog");
      }
    },
    acceptFriend(request) {
      console.log(request);
      this.$store.dispatch("acceptReq", request);
      if (this.getRequests >= 0) {
        this.$emit("closeReqDialog");
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
