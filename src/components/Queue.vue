<template>
  <v-card
    tile
    class="d-flex flex-column ma-5"
    style="width: 320px;height: 360px;"
  >
    <!-- top bit -->
    <div class="d-flex justify-space-between align-center px-3 py-1">
      <div class="mr-5">
        <div class="text-overline">queue</div>
        <div class="text-h6 mt-n3">{{ queue.length }}/50</div>
      </div>
      <div>
        <v-icon class="mr-3">
          mdi-plus
        </v-icon>
        <v-btn
          tile
          depressed
          fab
          small
          color="#FF0000"
          class="mr-3"
          @click="display = 'youtube'"
        >
          <v-icon>
            mdi-youtube
          </v-icon>
        </v-btn>
        <v-btn
          tile
          depressed
          fab
          small
          color="#6441A4"
          class="mr-3"
          @click="display = 'twitch'"
        >
          <v-icon>
            mdi-twitch
          </v-icon>
        </v-btn>
        <v-btn
          tile
          depressed
          fab
          small
          color="#0f90fa"
          @click="display = 'streamable'"
        >
          <v-icon>
            mdi-infinity
          </v-icon>
        </v-btn>
      </div>
    </div>
    <!-- youtube -->
    <div
      v-if="display == 'youtube'"
      class="d-flex flex-column align-center justify-center"
      style="height: 100%;"
    >
      <div class="d-flex flex-column align-center mt-n5">
        <v-text-field
          filled
          dense
          outlined
          label="youtube id"
          class="rounded-0"
          v-model="youtubeInput"
          hint="example: iIpfWORQWhU"
          persistent-hint
        ></v-text-field>
        <div>
          <v-btn text tile @click="display = ''">Cancel</v-btn>
          <v-btn
            color="#FF0000"
            depressed
            tile
            @click="enqueue('youtube', youtubeInput)"
          >
            Submit
          </v-btn>
        </div>
      </div>
    </div>
    <!-- twitch -->
    <div
      v-else-if="display == 'twitch'"
      class="d-flex flex-column align-center justify-center"
      style="height: 100%;"
    >
      <div class="d-flex flex-column align-center mt-n5">
        <v-text-field
          filled
          dense
          outlined
          label="twitch clip id"
          class="rounded-0"
          v-model="twitchInput"
          hint="example: AwkwardHelplessSalamanderSwiftRage"
          persistent-hint
        ></v-text-field>
        <div>
          <v-btn text tile @click="display = ''">Cancel</v-btn>
          <v-btn
            color="#6441A4"
            depressed
            tile
            @click="enqueue('twitch', twitchInput)"
          >
            Submit
          </v-btn>
        </div>
      </div>
    </div>
    <!-- streamable -->
    <div
      v-else-if="display == 'streamable'"
      class="d-flex flex-column align-center justify-center"
      style="height: 100%;"
    >
      <div class="d-flex flex-column align-center mt-n5">
        <v-text-field
          filled
          dense
          outlined
          label="streamable id"
          class="rounded-0"
          v-model="streamableInput"
          hint="example: 7mggi4"
          persistent-hint
        ></v-text-field>
        <div>
          <v-btn text tile @click="display = ''">Cancel</v-btn>
          <v-btn
            color="#0f90fa"
            depressed
            tile
            @click="enqueue('streamable', streamableInput)"
          >
            Submit
          </v-btn>
        </div>
      </div>
    </div>
    <!-- queue -->
    <v-list class="overflow-y-auto" v-else>
      <v-list-item v-for="(item, index) in queue" :key="item.title + index">
        <v-list-item-avatar size="24" color="transparent">
          <v-icon v-if="item.host == 'youtube'" color="#FF0000">
            mdi-youtube
          </v-icon>
          <v-icon v-else-if="item.host == 'twitch'" color="#6441A4">
            mdi-twitch
          </v-icon>
          <v-icon v-else-if="item.host == 'streamable'" color="#0f90fa">
            mdi-infinity
          </v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>
            <span v-if="index == 0" class="font-italic">
              playing -
            </span>
            <a
              :href="urlFromHost(item.host) + item.id"
              style="text-decoration: none; color: inherit;"
              onmouseover="style='text-decoration: underline;color: inherit;'"
              onmouseout="style='text-decoration: none; color: inherit;'"
              target="_blank"
            >
              {{ item.title }}
            </a>
          </v-list-item-title>
          <v-list-item-subtitle>{{ item.addedBy }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
import { sendEnqueue } from "@/requester.js";
export default {
  props: {
    queue: Array,
    token: String,
  },
  data() {
    return {
      display: "",
      youtubeInput: "",
      twitchInput: "",
      streamableInput: "",
    };
  },
  methods: {
    async enqueue(host, id) {
      if (this.token.length == 0) {
        alert("You must sign in to enqueue media!");
        return;
      }
      if (host == "youtube" && !/^[A-Za-z0-9_-]{11}$/.test(this.youtubeInput)) {
        alert(
          "invalid youtube id \n make sure you only include the value after the v= \n\nfor example... \nin the url youtube.com/watch?v=iIpfWORQWhU&t=106s \nthe youtube id is iIpfWORQWhU"
        );
        return;
      }
      if (host == "twitch" && this.twitchInput < 10) {
        alert("invalid twitch id");
        return;
      }
      if (host == "streamable" && this.streamableInput < 3) {
        alert("invalid stremable id");
        return;
      }
      let res = await sendEnqueue(
        this.token,
        this.$route.params.room,
        host,
        id
      );
      if (res.err.length > 0) {
        alert(res.err);
      } else {
        this.display = "";
      }
    },
    urlFromHost(host) {
      if (host == "youtube") {
        return "https://www.youtube.com/watch?v=";
      } else if (host == "twitch") {
        return "https://clips.twitch.tv/";
      } else if (host == "streamable") {
        return "https://streamable.com/";
      }
    },
  },
};
</script>

<style></style>
