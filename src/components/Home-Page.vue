<template>
  <div class="homeContent">
    <div class="home">
      <div class="headerMain">
        <p class="yellow fontThinking_of_betty font20">The Chemistry to Compete</p>
      </div>
      <Menu @showMenu="showMenu" v-if="isShow" />
      <div class="contentMain">
        <MenuOptions />
        <p class="yellow fontThinking_of_betty font20">Products For Professionals</p>
      </div>
    </div> 
    <Footer @showMenu="showMenu" />
  </div>    
</template>

<script lang="ts">
import axios from 'axios';
import VueAxios from 'vue-axios';
import { Component, Prop, Vue } from 'vue-property-decorator';
import Footer from '@/components/includes/Footer.vue';
import Menu from '@/components/includes/Menu/Menu.vue';
import MenuOptions from '@/components/includes/Menu/MenuOptions.vue';

@Component({
  components: {
    Footer,
    Menu,
    MenuOptions,
  },
})
export default class Home extends Vue {
  private isShow: boolean = false;

  private showMenu(showMenu) {
    this.isShow = showMenu;
  }
}
</script>