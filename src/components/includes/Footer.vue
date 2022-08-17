<template>
  <div class="footer">
    <div class="footerIcons">
      <div class="column">
        <a href="javascript:history.back(1)"><img src="/img/back.jpg" alt="Back" width="50px" /></a> 
      </div>
      <div class="column">
        <a href="/"><img src="/img/home.jpg" alt="Home" width="50px" /></a>
      </div>
      <div class="column">
        <div id="trigger" @click="openModal"><img src="/img/menu.jpg" alt="Menu" width="50px" /></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Footer extends Vue {
  private openModal() {
    this.$emit('showMenu', true);
  }
}
</script>