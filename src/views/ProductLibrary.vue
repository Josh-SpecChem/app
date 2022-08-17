<template>
  <div class="productlibraryMain">
    <PL />
  </div>
</template>

<script>
// @ is an alias to /src
import PL from '@/components/Product-Library.vue';

export default {
  name: 'ProductLibrary',
  components: {
    PL,
  },
};
</script>