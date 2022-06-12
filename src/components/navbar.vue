<template>
  <div>
    <v-navigation-drawer
      dark
      absolute
      temporary
      v-model="drawer"
      min-height="500"
    >
      <v-list dense>
        <v-list-item
          class="information mt-5 text-capitalize d-flex d-sm-none"
          @click="tocurrentuser"
          v-if="userisregister"
        >
          <img
            class="rounded-circle img-profile"
            v-if="userisregister.image"
            width="40"
            height="40"
            :src="userisregister.image"
          />
          <h5>{{ userisregister.name }} {{ userisregister.lastname }}</h5>
        </v-list-item>

        <v-list-item
          v-for="item in menuitems"
          :key="item.title"
          router
          :to="item.link"
        >
          <v-list-item-icon class="mr-2">
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item v-if="userisregister" class="logOutAcc">
          <v-list-item-icon class="mr-2">
            <v-icon>exit_to_app</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar color="primary" dense dark>
      <v-app-bar-nav-icon
        class="hidden-sm-and-up"
        @click.stop="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <v-toolbar-title class="web-title">
        <router-link
          v-if="userisregister"
          to="/"
          tag="span"
          style="cursor: pointer"
          >Facebook
        </router-link>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-toolbar-items>
        <v-btn
          text
          small
          outlined
          class="hidden-xs-only primary text-capitalize"
          v-for="item in menuitems"
          :key="item.title"
          :to="item.link"
        >
          <v-icon dark v-if="!userisregister" class="icons">{{
            item.icon
          }}</v-icon>
          <v-list-item-title v-if="!userisregister" class="titls">
            {{ item.title }}</v-list-item-title
          >
        </v-btn>

        <div
          class="information mt-3 text-capitalize d-flex d-sm-none"
          @click="tocurrentuser"
          v-if="userisregister"
        >
          <img
            class="rounded-circle img-profile"
            v-if="userisregister.image"
            width="40"
            height="40"
            :src="userisregister.image"
          />
        </div>

        <v-btn
          @click="logout"
          text
          small
          outlined
          v-if="userisregister"
          class="visble-xs-and-up logout"
        >
          <v-icon class="icons">exit_to_app</v-icon>
          <v-list-item-title class="titls">Logout</v-list-item-title>
        </v-btn>
        <!--  -->
      </v-toolbar-items>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
    };
  },
  methods: {
    logout() {
      console.log("logout");
      this.$store.dispatch("logout");
      this.$router.push({ path: "/login" });
    },
    tocurrentuser() {
      this.$router.push({ path: "/profile" });
    },
  },
  computed: {
    userisregister() {
      return this.$store.getters.user;
    },
    menuitems() {
      let menuitem = [
        { icon: "face", title: "Sign up", link: "/signup" },
        { icon: "lock_open", title: "Login", link: "/login" },
      ];

      return menuitem;
    },
  },
};
</script>

<style lang="scss" scoped>
* {
  font-size: 20px;
}

.icons {
  font-size: 15px;
}

.titls {
  font-size: 13px;
}
.logOutAcc {
  cursor: pointer;
}

@media (max-width: 600px) {
  * {
    font-size: 14px;
  }
  .img-profile {
    width: 30px;
    height: 30px;
    margin-right: 10px;
  }
  .web-title {
    margin-bottom: 2px;
  }
  .titls {
    font-size: 10px;
  }
}
</style>