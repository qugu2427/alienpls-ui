<template>
  <v-app>
    <v-alert prominent tile type="error" class="mb-0" v-if="error.length > 0">
      <v-row align="center">
        <v-col class="grow">
          {{ error }}
        </v-col>
        <v-col class="shrink">
          <a href="https://www.alienpls.com" class="text-decoration-none">
            <v-btn tile depressed>Refresh</v-btn>
          </a>
        </v-col>
      </v-row>
    </v-alert>
    <top-bar
      :signedIn="signedIn"
      :signInUrl="signInUrl"
      :name="user.name"
      :avatar="user.avatar"
      @signOut="onSignOut"
    />
    <v-main>
      <router-view :token="token" @error="onError" @signIn="onSignIn" />
    </v-main>
  </v-app>
</template>

<script>
import TopBar from "@/components/TopBar.vue";
import { fetchSignInUrl, fetchUserInfo } from "@/requester.js";
export default {
  components: { TopBar },
  name: "AlienPls",
  data() {
    return {
      token: "",
      clientID: "",
      signInUrl: "",
      error: "",
      signedIn: false,
      user: {
        name: "",
        avatar: "",
      },
    };
  },
  methods: {
    onError: function(err) {
      this.error = err;
    },
    onSignIn: async function(data) {
      this.token = data.token;
      this.clientID = data.clientID;
      let res = await fetchUserInfo(this.token, this.clientID);
      if (res.err.length > 0) {
        this.onError(res.err);
        return;
      }
      this.signedIn = true;
      this.user.name = res.data.data[0].login;
      this.user.avatar = res.data.data[0].profile_image_url;
    },
    onSignOut: function() {
      this.signedIn = false;
      this.user.name = "";
      this.user.message = "";
      this.$router.push("/");
    },
  },
  async mounted() {
    let res = await fetchSignInUrl();
    if (res.err.length > 0) {
      this.onError(res.err);
    }
    this.signInUrl = res.data.url;
  },
};
</script>
