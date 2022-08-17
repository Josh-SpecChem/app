<template>
  <div class="selectProductMain">
    <SP />
  </div>
</template>

<script>
// @ is an alias to /src
import SP from '@/components/Select-Product.vue';

export default {
  name: 'SelectProduct',
  components: {
    SP,
  },
};
</script>