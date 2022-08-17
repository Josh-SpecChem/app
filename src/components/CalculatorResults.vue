<template>
  <div class="calculatorPage">
    <div class="calculator-results">
      <p><router-link to="/">Back to Home</router-link></p>
      <h1>Results</h1>
      <p>Total: {{ total }}</p>
      <p>Amount to Order: {{ amount }}</p>
      
      <p>* All calculations include an estimated 10% spillage, leak and waste factor</p>
      
      <button v-on:click="reset()">Reset!</button>
    </div>
  </div>
</template>

<script lang="ts">
import axios from 'axios';
import VueAxios from 'vue-axios';
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class HelloWorld extends Vue {
  @Prop() private msg!: string;
  private returnData: string = '';
  private initialLoad: boolean = true;

  private mounted() {
    this.initialLoad = true;
  }

  private reset() {
    this.initialLoad = true;
  }

  private caluculate() {
    this.initialLoad = false;
  }
}
</script>