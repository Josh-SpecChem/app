<template>
  <div class="productSheet">
    <!-- <div class="backgroundYellow">
      <div class="specChemProductOuterCircle">
        <div class="specChemProductCircle">
          <div class="specChemProductCircleText">{{ productName }}</div>
        </div>
      </div>
      <div v-for="product in productData" v-bind:key="product">       
        <div v-bind:class="{ 'productSheetOuterCircle0': product.circlePosition == 0, 'productSheetOuterCircle1': product.circlePosition == 1, 'productSheetOuterCircle2': product.circlePosition == 2, 'productSheetOuterCircle3': product.circlePosition == 3, 'productSheetOuterCircle4': product.circlePosition == 4, 'productSheetOuterCircle5': product.circlePosition == 5, 'productSheetOuterCircle6': product.circlePosition == 6 }">
          <div class="productSheetCircle">
            <div class="productSheetCircleText"><a v-bind:href="product.Link">{{ product.Name }}</a></div>
          </div>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script lang="ts">
import axios from 'axios';
import VueAxios from 'vue-axios';
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class ProductSheet extends Vue {
  // private baseURL: string = 'https://specchem.hoenigwebdesign.com/pwa/';
  // private getProduct: string = 'wp-json/specchem/v1/product/';
  // private getProductURL: string = this.baseURL + this.getProduct;
  // private product: any = '';
  // private productData: any = '';
  // private productName: string = '';
  // private productDescription: string = '';
  // private isShow: boolean = false;
  // private chosenCategoryID: any = '';
  // private taxonomyID: any = '';
  // private categoryName: any = '';

  // private openModal() {
  //   this.$emit('showMenu', true);
  // }

  // private GetProduct(product: any) {
  //   let circlePosition = 1;
  //   this.productName = product.post_title;
  //   console.log(product.object_id);
  //   axios.get(this.getProductURL + product.object_id)
  //     .then((response: any) => {
  //       this.productData = response.data;

  //       this.productData.forEach((item, index) => {
  //         if (item.Link === null) {
  //           this.productData.splice(index, 1);
  //         }
  //       });

  //       this.productData.forEach((element) => {
  //         element.circlePosition = circlePosition++;
  //       });

  //       if (this.productData) {
  //         this.productsFound = true;
  //         this.productSelected = true;
  //       }
  //     })
  //     .catch((error: any) => {
  //       // handle error
  //       if (error.response) {
  //           /*
  //           * The request was made and the server responded with a
  //           * status code that falls out of the range of 2xx
  //           */
  //           this.errorString = 'Data: ' + error.data;
  //           this.errorString += '<br> Status: ' + error.status + '<br> Header: ' + error.headers + '<br>';
  //       } else if (error.request) {
  //           /*
  //           * The request was made but no response was received, `error.request`
  //           * is an instance of XMLHttpRequest in the browser and an instance
  //           * of http.ClientRequest in Node.js
  //           */
  //           this.errorString = 'Request Error occured: ' + error.request + '<br>';
  //       } else {
  //           // Something happened in setting up the request and triggered an Error
  //           this.errorString = 'Else Error occured: ' + error.message + '<br>';
  //       }
  //     })
  //     .then(() => {
  //       // always executed
  //       this.productSelected = true;
  //       this.finalString = 'Done processing!';
  //     });
  // }
}
</script>