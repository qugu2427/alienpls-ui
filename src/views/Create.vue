<template>
  <v-container style="max-width: 600px;">
    <v-form>
      <v-alert tile prominent text>
        Create is currently disabled during alpha testing. Later this will allow
        you to create your own room.
      </v-alert>
      <v-text-field
        v-model="name"
        label="Name"
        outlined
        required
        class="rounded-0"
      ></v-text-field>
      <v-text-field
        v-model="description"
        label="Description"
        outlined
        class="rounded-0"
        required
      ></v-text-field>
      <v-text-field
        v-model="imageLink"
        label="Image Link"
        outlined
        required
        class="rounded-0"
      ></v-text-field>
    </v-form>
    <div class="d-flex justify-end">
      <router-link to="/" class="text-decoration-none">
        <v-btn text tile>Cancel</v-btn>
      </router-link>
      <v-btn color="#6441A4" depressed tile @click="submit">Create</v-btn>
    </div>
  </v-container>
</template>

<script>
import { sendCreate } from "@/requester.js";
export default {
  props: {
    token: String,
  },
  data() {
    return {
      name: "",
      description: "",
      imageLink: "",
    };
  },
  methods: {
    async submit() {
      let res = await sendCreate(
        this.token,
        this.name,
        this.description,
        this.imageLink
      );
      if (res.err.length > 0) {
        this.$emit("error", res.err);
      }
    },
  },
};
</script>

<style></style>
