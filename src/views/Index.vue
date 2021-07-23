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
