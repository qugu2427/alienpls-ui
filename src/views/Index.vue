<template>
  <v-container class="d-flex justify-center flex-wrap">
    <template v-for="(room, index) in rooms">
      <room-preview
        :key="room.name + index"
        :avatar="room.image"
        :name="room.name"
        :description="room.description"
        :connections="room.connections"
      />
    </template>
    <v-alert prominent outlined tile type="info">
      Hello, unfortunetly the site has ended up costing way more than I
      projected/can afford, this is my fault. Thank you to everyone who used it
      and hopefully I can monetize it in the future. In the meantime you may
      just have to watch
      <a href="https://www.twitch.tv/erobb221">twitch.tv/erobb221</a>
    </v-alert>
  </v-container>
</template>

<script>
import { fetchRooms } from "@/requester.js";
import RoomPreview from "../components/RoomPreview.vue";
export default {
  components: { RoomPreview },
  data() {
    return {
      rooms: [],
    };
  },
  async mounted() {
    let res = await fetchRooms();
    if (res.err.length > 0) {
      this.$emit("error", res.err);
    } else {
      this.rooms = res.data;
    }
  },
};
</script>

<style></style>
