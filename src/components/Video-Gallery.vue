<template>
  <div class="videoGalleryContent">
    <div class="videoGallery">
      <div class="headerMain">
        <h1>Video Gallery</h1>
      </div>
      <Menu @showMenu="showMenu" v-if="isShow" />
      <div>
          <p class="white font22">Videos</p>
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
export default class VideoGallery extends Vue {
  private isShow: boolean = false;

  private showMenu(showMenu) {
    this.isShow = showMenu;
  }

}
</script>