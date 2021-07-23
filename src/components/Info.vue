<template>
  <v-card tile class="d-flex flex-column ma-5 pa-5">
    <div class="d-flex align-start">
      <v-text-field
        readonly
        filled
        dense
        outlined
        v-model="shareLink"
        class="rounded-0"
      ></v-text-field>
      <v-btn large tile text>
        <v-icon left>
          mdi-clipboard-multiple-outline
        </v-icon>
        copy
      </v-btn>
    </div>
    <div style="opacity: 0.5;">
      This is a prototype. Expect errors, crashed, and wipes.
    </div>
    <router-link to="/faq" class="text-decoration-none">
      <v-btn tile depressed class="mt-3">it doesn't work!</v-btn>
    </router-link>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      shareLink: "join.alienpls.com/losers",
    };
  },
};
</script>

<style></style>
