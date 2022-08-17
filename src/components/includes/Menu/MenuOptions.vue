<template>
  <div class="MenuOptions">
    <div class="button-white padB20">
      <p class="blue bolder buttonText font24 padT15"><router-link to="/productlibrary">Product Library</router-link></p>
    </div>
    <div class="button-white padB20">
      <p class="blue bolder buttonText font24 padT15"><router-link to="/dotapprovals">DOT Approvals</router-link></p>
    </div>
    <div class="button-white padB20">
      <p class="blue bolder buttonText font24 padT15"><router-link to="/calculator">Calculator</router-link></p>
    </div>
    <div class="button-white padB20">
      <p class="blue bolder buttonText font24 padT15"><router-link to="/crossoverchart">Crossover Chart</router-link></p>
    </div>
    <div class="button-white padB20">
      <p class="blue bolder buttonText font24 padT15"><a target="_blank" href="//www.youtube.com/channel/UCSpc6M5_gCvECW4ah5bUtXg/">Video Gallery</a></p>
    </div>
    <div class="button-white padB20">
      <p class="blue bolder buttonText font24 padT15"><router-link to="/selectproduct">Select a Product</router-link></p>
    </div>
  </div>
</template>

<script lang="ts">
import axios from 'axios';
import VueAxios from 'vue-axios';
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class MenuOptions extends Vue {

}
</script>