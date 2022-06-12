<template>
  <v-app>
    <v-container>
      <v-card width="400" class="mx-auto">
        <v-card-title>
          <h5 class="mx-auto">Your Fivourite Posts</h5>
        </v-card-title>
      </v-card>
      <v-card
        v-for="(fivourite, i) in getFivourite"
        :key="i"
        class="mb-3 mx-auto mt-3"
        width="500"
      >
        <v-card-text>
          <div>
            <img
              :src="fivourite.image"
              width="50"
              height="50"
              class="rounded-circle"
            />
            {{ fivourite.name }}
            {{ fivourite.lastname }}
          </div>
          <div>
            {{ fivourite.post }}
          </div>
        </v-card-text>
      </v-card>
    </v-container>
  </v-app>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    getFivourite() {
      return this.$store.getters.getFivourite;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>