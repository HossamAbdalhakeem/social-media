<template>
  <div>
    <v-card width="600" class="pa-3">
      <div class="text-right pa-4 pb-0">
        <v-icon button @click="$emit('closeEditInfoDialog')">mdi-close</v-icon>
      </div>
      <v-card-title>
        <h5 class="mx-auto">Your all informations</h5>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field
              dense
              outlined
              label="city"
              v-model="user.city"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              dense
              outlined
              label="education"
              v-model="user.education"
            >
            </v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              dense
              outlined
              label="relation"
              v-model="user.relation"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              dense
              outlined
              label="hobby"
              v-model="user.hobby"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              dense
              outlined
              label="livein"
              v-model="user.livein"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              dense
              outlined
              label="work"
              v-model="user.work"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions class=" d-block text-center">
        <div class="saveinfo">
          <v-btn class="primary text-capitalize mr-3" @click="saveEditInfo"
            >save</v-btn
          >
          <v-btn
            class="red white--text text-capitalize"
            @click="$emit('closeEditInfoDialog')"
            >close</v-btn
          >
        </div>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  props: ["user"],
  data() {
    return {};
  },
  methods: {
    saveEditInfo() {
      this.$store.dispatch("updatetinfo", this.user);
      this.$emit("closeEditInfoDialog");
    },
  },
};
</script>

<style lang="scss" scoped></style>
