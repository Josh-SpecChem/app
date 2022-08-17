<template>
  <div class="slide-up">
    <p @click="closeModal"><img src="/img/menu-close.jpg" alt="Close Menu" width="50px" /></p>
    <MenuOptions />
  </div>
</template>

<script lang="ts">
import axios from 'axios';
import VueAxios from 'vue-axios';
import { Component, Prop, Vue } from 'vue-property-decorator';
import MenuOptions from '@/components/includes/Menu/MenuOptions.vue';

@Component({
  components: {
    MenuOptions,
  },
})
export default class Menu extends Vue {
  private closeModal() {
    this.$emit('showMenu', false);
  }
}
</script>