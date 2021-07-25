<template>
  <v-card tile class="d-flex flex-column ma-5" style="width: 640px;">
    <div
      v-show="overlay"
      style="height: 360px;width: 100%;margin-bottom: -360px;background-color: transparent;z-index: 10;"
    ></div>
    <div style="height: 360px;width: 100%;background-color: black;">
      <youtube v-if="host == 'youtube'" :id="id" :start="start"></youtube>
      <twitch v-else-if="host == 'twitch'" :id="id" :start="start"></twitch>
      <streamable
        v-else-if="host == 'streamable'"
        :id="id"
        :start="start"
      ></streamable>
    </div>

    <div class="d-flex justify-space-between align-center">
      <v-btn fab tile text @click="volumeAlert">
        <v-icon>
          mdi-volume-minus
        </v-icon>
      </v-btn>
      <div v-if="likes == -1">
        skipping
      </div>
      <div v-else>
        <v-btn
          tile
          text
          :color="voteStatus == 1 ? '#6441A4' : 'white'"
          @click="$emit('like')"
        >
          <v-icon left>
            mdi-thumb-up
          </v-icon>
          {{ likes }}
        </v-btn>
        <v-btn
          tile
          text
          :color="voteStatus == -1 ? '#6441A4' : 'white'"
          @click="$emit('dislike')"
        >
          {{ dislikes }}
          <v-icon right>
            mdi-thumb-down
          </v-icon>
        </v-btn>
      </div>
      <div>
        {{ formattedSecondsElapsed }} / {{ formatSeconds(Math.ceil(duration)) }}
      </div>
      <div>
        <v-btn fab tile text @click="overlay = !overlay">
          <v-icon>
            {{ overlay ? "mdi-shield-off-outline" : "mdi-shield" }}
          </v-icon>
        </v-btn>
        <v-btn fab tile text @click="$emit('refresh', secondsElapsed)">
          <v-icon>
            mdi-refresh
          </v-icon>
        </v-btn>
      </div>
    </div>
    <v-alert
      tile
      dense
      type="error"
      dark
      color="transparent"
      v-show="!overlay"
      class="ma-1 pa-1"
    >
      <strong>Caution</strong> anti-click overlay is disabled.
    </v-alert>
  </v-card>
</template>

<script>
import Twitch from "@/components/Twitch.vue";
import Streamable from "@/components/Streamable.vue";
import Youtube from "./Youtube.vue";
export default {
  components: { Youtube, Twitch, Streamable },
  props: {
    host: String,
    id: String,
    likes: Number,
    duration: Number,
    start: Number,
    dislikes: Number,
    voteStatus: Number,
  },
  data() {
    return {
      overlay: true,
      secondsElapsed: this.start,
    };
  },
  methods: {
    formatSeconds(seconds) {
      let nhours = Math.floor(((seconds % 31536000) % 86400) / 3600);
      let nminutes = Math.floor((((seconds % 31536000) % 86400) % 3600) / 60);
      let nseconds = (((seconds % 31536000) % 86400) % 3600) % 60;
      let fhours = nhours > 0 ? nhours + ":" : "";
      let fminutes = nhours > 0 && nminutes < 10 ? "0" + nminutes : nminutes;
      let fseconds = nseconds < 10 ? "0" + nseconds : nseconds;
      return `${fhours}${fminutes}:${fseconds}`;
    },
    volumeAlert() {
      alert(
        "To change the player volume click the shield icon, wich disables the anti-click overlay, then change the volume in the media's official player.\n\nP.S. I know it would be nice if we had our own universal volume slider, but they won't allow us :("
      );
    },
  },
  computed: {
    volumeIcon() {
      if (this.volume == 0) {
        return "mdi-volume-mute";
      } else if (this.volume < 10) {
        return "mdi-volume-low";
      } else if (this.volume < 60) {
        return "mdi-volume-medium";
      }
      return "mdi-volume-high";
    },
    formattedSecondsElapsed() {
      return this.formatSeconds(this.secondsElapsed);
    },
  },
  watch: {
    duration() {
      this.secondsElapsed = 0;
    },
  },
  mounted() {
    setInterval(() => {
      if (!(this.secondsElapsed >= this.duration)) {
        this.secondsElapsed++;
      }
    }, 1000);
  },
};
</script>

<style></style>
