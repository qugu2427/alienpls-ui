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
    <v-alert prominent tile type="info">
      <strong>ATTENTION</strong> if you are accessing this via www.4weird.org
      please switch to www.alienpls.com.
      <strong>
        www.4weird.org will give you a 'backend did not respond error'.
      </strong>
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
