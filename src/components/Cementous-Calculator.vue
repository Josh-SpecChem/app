<template>
  <div class="calculatorPage">
    <div v-if="initialLoad" class="calculator">
      <h1>Calculator</h1>
      
      <div class="contentMain">
        <div class="row">
          <div class="rowText">
            <span class="yellow fontThinking_of_betty">Product &nbsp;Name</span>
          </div>
          <div class="rowAction selectLg">
            <select v-model="productNames">
              <option v-bind:value="{ number: 123 }">Test1</option>
              <option v-bind:value="{ number: 456 }">Test2</option>
            </select>
          </div>
        </div>
        
        <div class="row">
          <div class="columnThird">
              <div class="rowText">
                <span class="yellow fontThinking_of_betty">Surface Type</span>
              </div>
              <div class="rowAction selectSm">
                <select v-model="surfaceType">
                  <option v-bind:value="{ number: 123 }">Test</option>
                </select>
              </div>
          </div>

          <div class="columnThird">
              <div class="rowText">
                <span class="yellow fontThinking_of_betty">Shape</span>
              </div>
              <div class="rowAction selectSm">
                <select v-model="surfaceType">
                  <option v-bind:value="{ number: 123 }">Test</option>
                </select>
              </div>
          </div>

          <div class="columnThird">
            <div class="rowText">
              <span class="yellow fontThinking_of_betty">Units</span>
            </div>
            <div class="rowAction selectSm">
              <select v-model="surfaceType">
                <option v-bind:value="{ number: 123 }">Test</option>
              </select>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="rowText">
            <span class="yellow fontThinking_of_betty">Qty</span>
          </div>
          <div class="rowAction">
            <input v-model="quantity" class="textMd" />
          </div>
        </div>

        <div class="row">
          <div class="columnThird">
            <div class="rowText">
              <span class="yellow fontThinking_of_betty">Length</span>
            </div>
            <div class="rowAction">
              <input v-model="length" class="textMd" />
            </div>
          </div>

          <div class="columnThird">
            <div class="rowText">
              <span class="yellow fontThinking_of_betty">Depth</span>
            </div>
            <div class="rowAction textSm">
              <input v-model="depth" class="textMd" />
            </div>
          </div>

          <div class="columnThird">
            <div class="rowText">
              <span class="yellow fontThinking_of_betty">Width</span>
            </div>
            <div class="rowAction textSm">
              <input v-model="width" class="textMd" />
            </div>
          </div>
        </div>
        
        <div class="row submitButton">
          <div class="rowAction">
            <img src="/img/calculate.png" alt="Calculate" width="250px" v-on:click="caluculate()" />
          </div>
        </div>
      </div>
    </div>
  
    <div v-else class="calculator-results">
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
export default class EpoxyCalculator extends Vue {
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