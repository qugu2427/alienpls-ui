<template>
  <v-container
    class="d-flex flex-column align-center justify-center"
    fill-height
    fluid
  >
    <img src="@/assets/loading.gif" />
    <div class="text-h6">signing in</div>
  </v-container>
</template>

<script>
import { fetchSignIn } from "@/requester.js";
export default {
  async mounted() {
    let res = await fetchSignIn(this.$route.query.code);
    if (res.err.length > 0) {
      this.$emit("error", res.err);
    } else {
      this.$emit("signIn", res.data);
    }
    let room = this.$cookie.get("room");
    if (room != null) {
      this.$router.push(`/rooms/${this.$cookie.get("room")}`);
      this.$cookie.delete("room");
    } else {
      this.$router.push("/");
    }
  },
};
</script>

<style></style>
