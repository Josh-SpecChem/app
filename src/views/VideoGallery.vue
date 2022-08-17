<template>
  <div class="videoGalleryMain">
    <VideoGallery />
  </div>
</template>

<script>
// @ is an alias to /src
import VideoGallery from '@/components/Video-Gallery.vue';

export default {
  name: 'Video-Gallery',
  components: {
    VideoGallery,
  },
};
</script>