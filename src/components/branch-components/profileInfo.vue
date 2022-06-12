<template>
  <div>
    <v-card class="mt-3 myinfoo" width="100%" v-if="currentUser">
      <div>
        <v-card-text>
          <div class="infoinmyprofile">
            <v-icon class="mb-3 mr-5" color="black">mdi-school</v-icon>
            <p class="allinfomyprofile" v-if="currentUser">
              {{ currentUser.education }}
            </p>
          </div>
          <div class="infoinmyprofile">
            <v-icon class="mb-3" color="red">mdi-map-marker</v-icon>
            <p class="allinfomyprofile" v-if="currentUser.livein">
              {{ currentUser.livein }}
            </p>
          </div>
          <div class="infoinmyprofile">
            <v-icon class="mb-3" color="pink">mdi-hand-heart</v-icon>
            <p class="allinfomyprofile" v-if="currentUser.relation">
              {{ currentUser.relation }}
            </p>
          </div>
          <div class="infoinmyprofile">
            <v-icon class="mb-3" color="success"
              >mdi-folder-key-network-outline</v-icon
            >
            <p class="allinfomyprofile" v-if="currentUser.work">
              {{ currentUser.work }}
            </p>
          </div>
          <div class="infoinmyprofile">
            <v-icon class="mb-3" color="black">mdi-soccer</v-icon>
            <p class="allinfomyprofile" v-if="currentUser.hobby">
              {{ currentUser.hobby }}
            </p>
          </div>
          <div class="infoinmyprofile">
            <v-icon class="mb-3" color="blue">mdi-city-variant</v-icon>
            <p class="allinfomyprofile" v-if="currentUser.city">
              {{ currentUser.city }}
            </p>
          </div>
        </v-card-text>
      </div>
    </v-card>
  </div>
</template>

<script>
export default {
  props: ["currentUser"],
};
</script>

<style lang="scss" scoped>
.infoinmyprofile {
  display: flex;
  justify-content: space-between;
  font-weight: bolder;
}
// @media (max-width: 600px) {
//   .myinfoo {
//     min-width: 180px;
//   }
// }
// @media (min-width: 601px) and (max-width: 960px) {
//   .myinfoo {
//     max-width: 170px;
//   }
// }
</style>
