<template>
  <div class="homeMain">
    <HomePage />
  </div> 
</template>

<script>
// @ is an alias to /src
import HomePage from '@/components/Home-Page.vue';

export default {
  name: 'Home',
  components: {
    HomePage,
  },
};
</script>