<template>
  <iframe
    ref="media"
    style="height: 100%;width: 100%;"
    allow="autoplay"
    :src="
      `https://clips.twitch.tv/embed?clip=${id}&parent=www.alienpls.com&autoplay=true&time=${start}s`
    "
    frameBorder="0"
  ></iframe>
</template>

<script>
export default {
  props: {
    id: String,
    start: Number,
    active: Boolean,
  },
};
</script>

<style></style>
