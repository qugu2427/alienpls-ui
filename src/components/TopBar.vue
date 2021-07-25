<template>
  <div>
    <v-app-bar flat color="transparent">
      <v-toolbar-title>AlienPls Test</v-toolbar-title>
      <v-spacer></v-spacer>
      <router-link to="/" class="text-decoration-none">
        <v-btn text dark tile>
          <v-icon left>mdi-home</v-icon>
          Rooms
        </v-btn>
      </router-link>
      <router-link to="/create" class="text-decoration-none">
        <v-btn text dark tile>
          <v-icon left>mdi-plus-circle</v-icon>
          Create
        </v-btn>
      </router-link>
      <a
        href="https://github.com/qugu2427/alienpls-ui"
        class="text-decoration-none"
      >
        <v-btn text dark tile><v-icon left>mdi-github</v-icon>Contibute</v-btn>
      </a>
      <router-link to="/faq" class="text-decoration-none">
        <v-btn text dark tile><v-icon left>mdi-help</v-icon>FAQ</v-btn>
      </router-link>
      <v-spacer></v-spacer>
      <div class="d-flex align-center" v-if="signedIn">
        <v-menu offset-y open-on-hover rounded="0" class="rounded-0">
          <template v-slot:activator="{ on, attrs }">
            <v-btn text tile v-bind="attrs" v-on="on">
              <v-avatar size="24"><img :src="avatar"/></v-avatar>
              &nbsp;{{ name }}
            </v-btn>
          </template>
          <v-list>
            <router-link to="/create" class="text-decoration-none">
              <v-list-item link>
                <v-icon left>
                  mdi-plus
                </v-icon>
                Create
              </v-list-item>
            </router-link>
            <v-list-item link @click="$emit('signOut')">
              <v-icon left class="red--text">
                mdi-logout
              </v-icon>
              <span class="red--text">Sign Out</span>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
      <a @click="signIn()" class="text-decoration-none" v-else>
        <v-btn color="#6441A4" depressed tile
          ><v-icon left>mdi-twitch</v-icon>Sign In</v-btn
        >
      </a>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  props: {
    signedIn: Boolean,
    signInUrl: String,
    avatar: String,
    name: String,
  },
  methods: {
    signIn() {
      let room = this.$route.params.room;
      if (room != null) {
        this.$cookie.set("room", room, 1);
      }
      window.location.replace(this.signInUrl);
    },
  },
};
</script>

<style></style>
