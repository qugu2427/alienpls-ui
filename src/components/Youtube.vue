<template>
  <iframe
    ref="youtubePlayer"
    style="height: 100%;width: 100%;"
    allow="autoplay"
    :src="
      `https://www.youtube.com/embed/${id}?autoplay=1&loop=0&origin=localhost&start=${start}&mute=0`
    "
    frameborder="0"
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
