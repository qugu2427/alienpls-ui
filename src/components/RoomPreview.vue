<template>
  <v-card tile class="d-flex align-center flex-column pa-5 ma-5">
    <div class="d-flex align-center">
      <v-avatar size="56">
        <img :src="avatar" alt="avatar" />
      </v-avatar>
      <div class="ml-5">
        <div class="text-body">{{ name }}</div>
        <div class="text-caption">{{ description }}</div>
      </div>
    </div>
    <router-link :to="`/rooms/${this.name}`" class="text-decoration-none">
      <v-btn tile depressed color="#6441A4" class="mt-5 text--green" large>
        Join
      </v-btn>
    </router-link>
    <div class="text-caption mt-5">{{ connections }} online</div>
  </v-card>
</template>

<script>
export default {
  props: {
    avatar: String,
    name: String,
    description: String,
    connections: Number,
  },
};
</script>

<style></style>
