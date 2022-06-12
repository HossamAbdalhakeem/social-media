<template>
  <div>
    <v-card class="pa-3" width="300">
      <v-card-title class="ml-14">
        friends
        <v-icon class="black--text ml-3">mdi-account-supervisor</v-icon>
      </v-card-title>
      <div v-if="currentUser">
        <div v-for="(friend, i) in currentUser.friends" :key="i">
          <div class="friends">
            <div class="d-flex align-center">
              <div v-if="friend">
                <img
                  v-if="friend.image"
                  :src="friend.image"
                  width="50"
                  height="50"
                  class="rounded-circle"
                />
                <v-icon x-large v-else>mdi-account-circle</v-icon>
              </div>
              <h6 class="ma-0 ml-3 mr-14 text-capitalize">
                {{ friend.name }} {{ friend.lastname }}
              </h6>
              <v-btn
                class="red text-capitalize white--text"
                @click="deleteFriend(friend)"
                >remove</v-btn
              >
            </div>
          </div>
        </div>
      </div>
    </v-card>
  </div>
</template>

<script>
export default {
  props: ["currentUser"],
  data() {
    return {};
  },
  methods: {
    deleteFriend(friend) {
      console.log(friend);
      this.$store.dispatch("deletefriend", friend);
    },
  },
};
</script>

<style lang="scss" scoped></style>
