<template>
  <v-container class="d-flex justify-center flex-wrap">
    <div class="d-flex flex-column align-center justify-center" v-if="loading">
      <img src="@/assets/loading.gif" />
      <div class="text-h6">loading</div>
    </div>
    <div v-else-if="notFound">
      <div class="text-h3">room "{{ $route.params.room }}" not found</div>
      <div class="text-body">try checking you spelling</div>
    </div>
    <div class="d-flex justify-center flex-wrap" v-else>
      <div class="d-flex flex-column justify-center">
        <player
          :host="host"
          :id="id"
          :duration="duration"
          :start="start"
          :likes="likes"
          :dislikes="dislikes"
          :voteStatus="voteStatus"
          @like="like"
          @dislike="dislike"
          @refresh="refresh"
        />
        <info />
      </div>
      <div class="d-flex flex-column justify-center">
        <queue :queue="queue" :token="token" />
        <users :connections="connections" :users="users" />
      </div>
    </div>
  </v-container>
</template>

<script>
import Player from "@/components/Player.vue";
import Queue from "@/components/Queue.vue";
import Users from "@/components/Users.vue";
import Info from "@/components/Info.vue";
import { fetchRoom, sendVote } from "@/requester.js";
export default {
  components: { Player, Queue, Users, Info },
  props: {
    token: String,
    endTime: Number,
  },
  data() {
    return {
      loading: true,
      notFound: false,
      host: "",
      id: "",
      duration: 0,
      start: 0,
      queue: [],
      connections: 0,
      users: {},
      likes: 0,
      dislikes: 0,
      voteStatus: 0,
    };
  },
  computed: {
    timeLeft() {
      let t = Math.floor((this.endTime - this.now) / 1000);
      return t > 0 ? t : 0;
    },
  },
  methods: {
    async like() {
      if (this.token.length == 0) {
        alert("You must sign in to like!");
        return;
      }
      let res = await sendVote(this.token, this.$route.params.room, 1);
      if (res.err.length > 0) {
        this.$emit("error", res.err);
      }
      this.voteStatus = res.data.voteStatus;
    },
    async dislike() {
      if (this.token.length == 0) {
        alert("You must sign in to dislike!");
        return;
      }
      let res = await sendVote(this.token, this.$route.params.room, -1);
      if (res.err.length > 0) {
        this.$emit("error", res.err);
      }
      this.voteStatus = res.data.voteStatus;
    },
    refresh(start) {
      this.start = start;
    },
  },
  sockets: {
    connect() {
      console.log("connected to socket");
    },
    join() {
      this.connections++;
    },
    leave() {
      this.connections--;
    },
    enqueue(media) {
      this.queue.push(media);
    },
    dequeue() {
      this.queue.shift();
      this.start = 0;
    },
    play(media) {
      this.host = media.host;
      this.id = media.id;
      this.duration = media.duration;

      this.voteStatus = 0;
      this.likes = 0;
      this.dislikes = 0;
    },
    error(message) {
      this.$emit("error", message);
    },
    addUser(user) {
      let key = Object.keys(user)[0];
      let val = user[key];
      this.$set(this.users, key, val);
    },
    removeUser(userName) {
      this.$delete(this.users, userName);
    },
    updateVotes(obj) {
      this.likes = obj.likes;
      this.dislikes = obj.dislikes;
    },
    skipping() {
      this.likes = -1;
    },
  },
  async mounted() {
    // connect to socket
    this.$socket.client.connect();

    let res = await fetchRoom(this.$route.params.room);
    if (res.err.length > 0) {
      if (res.err == "room not found") {
        this.notFound = true;
        this.loading = false;
      } else {
        this.$emit("error", res.err);
      }
      return;
    }
    this.connections = res.data.connections;
    this.users = res.data.users;
    this.queue = res.data.queue;
    this.likes = res.data.likes;
    this.dislikes = res.data.dislikes;
    this.$socket.client.emit("join", this.$route.params.room);
    if (this.token.length > 0) {
      this.$socket.client.emit("addUser", {
        token: this.token,
        room: this.$route.params.room,
      });
    }
    if (res.data.currentMedia != null) {
      let timeLeft =
        Math.floor(res.data.currentMedia.endTime - Date.now()) / 1000;
      let start = res.data.currentMedia.duration - timeLeft;
      if (timeLeft > 2) {
        this.queue.unshift(res.data.currentMedia);
        this.host = this.queue[0].host;
        this.id = this.queue[0].id;
        this.duration = this.queue[0].duration;
        this.start = Math.ceil(start);
      }
    }
    this.loading = false;
  },
  beforeDestroy() {
    this.$socket.client.disconnect();
  },
};
</script>

<style></style>
