<template>
  <v-card
    tile
    class="d-flex flex-column ma-5"
    style="width: 320px;height: 360px;"
  >
    <div class="px-3 py-1">
      <div class="mr-5">
        <div class="text-overline">users</div>
        <div class="text-h6 mt-n3">{{ Object.keys(users).length }}</div>
      </div>
    </div>
    <v-list class="overflow-y-auto">
      <v-list-item v-for="(avatar, name) in users" :key="name">
        <v-list-item-avatar size="36" left color="transparent">
          <img :src="avatar" />
        </v-list-item-avatar>
        <v-list-item-content color="yellow">
          <v-list-item-title>{{ name }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>
            {{ connections }} total connections
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
export default {
  props: {
    connections: Number,
    users: Object,
  },
};
</script>

<style></style>
