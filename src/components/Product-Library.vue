<template>
  <div class="productlibraryContent">
    <div class="productlibrary">
      <div class="headerMain">
        <h1>Product Library</h1>
      </div>
      <Menu @showMenu="showMenu" v-if="isShow" />
      <div class="contentMain">
        <div class="contentInnerPL" v-if="!productSelected">          
          <div v-if="productCategoriesFound">   
            <div v-if="isLoading">
              <img src="/img/loading.gif" />
            </div>
            <div v-else class="row" v-for="category in productCategoriesData" v-bind:key="category.id">
              <div v-bind:id="'productCategories'+category.id" class="innerRow">
                <a v-bind:id="category.id" class="white font24 bold" v-on:click="GetProductsByCategory(category)" v-html="category.id != taxonomyID ? '+ '+ category.name : '- '+ category.name"></a>
              </div>
              <div class="backgroundYellow100p" v-if="productsFound && !productSelected && (category.id == taxonomyID) ">    
                <div class="row" v-for="product in productsData" v-bind:key="product.id">
                  <div class="innerInnerRow">
                  <span class="white font24 bold">+ <a class="white font24 bold" v-on:click="UpdateProductURL(product)" v-html="product.post_title" /></span>
                  </div>
                  <div class="borderBottomFade">
                    <img src="img/bottom-border-fade.png" />
                  </div>
                </div>
              </div>
            </div>
          </div>       
        </div>

        <div v-if="productSelected">
          <div v-if="isLoading">
            <img src="/img/loading.gif" />
          </div>
          <div v-else>
            <div class="productSheetHeader padL15 white bold">
              <div v-html="categoryName" />
            </div>
            <div class="contentInnerPLProducts backgroundYellow">
              <div class="productSheets">
                <div class="specChemProductOuterCircle">
                  <div class="specChemProductCircle">
                    <div class="specChemProductCircleText" v-html="productName" />
                  </div>
                </div>
                <div v-for="product in productData" v-bind:key="product.id">       
                  <div v-bind:class="{ 'productSheetOuterCircle0': product.circlePosition == 0, 'productSheetOuterCircle1': product.circlePosition == 1, 'productSheetOuterCircle2': product.circlePosition == 2, 'productSheetOuterCircle3': product.circlePosition == 3, 'productSheetOuterCircle4': product.circlePosition == 4, 'productSheetOuterCircle5': product.circlePosition == 5, 'productSheetOuterCircle6': product.circlePosition == 6 }">
                    <div class="productSheetCircle">
                      <div class="productSheetCircleText">
                        <a target="_blank" v-bind:href="product.Link"><span v-html="product.Name" /></a>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="productDescription">
                  <div class="productDescriptionInner">
                    <p v-html="productDescription" />
                  </div>
                </div>
              </div>
              <div class="productSheetsFooter"><img src="/img/white-background.png" width="400px" /></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer @showMenu="showMenu" />
  </div>
</template>

<script lang="ts">
import axios from 'axios';
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { Route } from 'vue-router';
import Footer from '@/components/includes/Footer.vue';
import Menu from '@/components/includes/Menu/Menu.vue';
import MenuOptions from '@/components/includes/Menu/MenuOptions.vue';
import Product from '@/models/productModel.vue';

@Component({
  components: {
    Footer,
    Menu,
    MenuOptions,
  },
})
export default class Productlibrary extends Vue {
  @Prop() private msg!: string;
  private errorString: string = '';
  private finalString: string = '';
  private productCategoriesFound: boolean = false;
  private productCategories: any = '';
  private productCategoriesData: any = '';
  private baseURL: string = 'https://www.specchemllc.com/';
  //private baseURL: string = 'https://specchem.hoenigwebdesign.com/pwa/';
  private pageAPIURL: string = 'wp-json/wp/v2/pages';
  private postAPIURL: string = 'wp-json/wp/v2/posts';
  private getCategories: string = 'wp-json/wp/v2/product_categories/?per_page=60';
  private getCategoriesURL: string = this.baseURL + this.getCategories;
  private categorySelected: boolean = false;

  private getCategoryProducts: string = 'wp-json/specchem/v1/productsforcategory/';
  private getCategoryProductsURL: string = this.baseURL + this.getCategoryProducts;
  private productsFound: boolean = false;
  private products: any = '';
  private productsData: any = '';

  private getProduct: string = 'wp-json/specchem/v1/product/';
  private getProductURL: string = this.baseURL + this.getProduct;
  private getProductDescription: string = 'wp-json/wp/v2/products/';
  private getProductDescriptionURL: string = this.baseURL + this.getProductDescription;
  private productFound: boolean = false;
  private productSelected: boolean = false;
  private product: any = '';
  private productData: any = '';
  private productName: string = '';
  private productDescription: string = '';
  private isShow: boolean = false;
  private chosenCategoryID: any = '';
  private taxonomyID: any = '';
  private categoryName: any = '';
  private reload: boolean = false;
  private isLoading: boolean = false;

  @Watch('$route', { immediate: true, deep: true })
    private onUrlChange(newVal: Route) {
      if (this.$route.path.includes('productid')) {
        this.GetProduct(this.$route.params.id, this.$route.params.title);
      } else if (this.$route.path.includes('productlibrary')) {
        this.GetCategories();
      }
    }

  private showMenu(showMenu: boolean) {
    this.isShow = showMenu;
  }

  private mounted() {
    this.GetCategories();
  }

  private GetCategories() {
    this.productCategoriesFound = true;
    this.isLoading = true;
    this.productSelected = false;
    axios.get(this.getCategoriesURL)
      .then((response: any) => {
        this.isLoading = false;
        this.productCategoriesData = response.data;
      })
      .catch((error: any) => {
        // handle error
        if (error.response) {
            /*
            * The request was made and the server responded with a
            * status code that falls out of the range of 2xx
            */
            this.errorString = 'Data: ' + error.data;
            this.errorString += '<br> Status: ' + error.status + '<br> Header: ' + error.headers + '<br>';
        } else if (error.request) {
            /*
            * The request was made but no response was received, `error.request`
            * is an instance of XMLHttpRequest in the browser and an instance
            * of http.ClientRequest in Node.js
            */
            this.errorString = 'Request Error occured: ' + error.request + '<br>';
        } else {
            // Something happened in setting up the request and triggered an Error
            this.errorString = 'Else Error occured: ' + error.message + '<br>';
        }
      })
      .then(() => {
        // always executed
        this.finalString = 'Done processing!';
      });
  }

  private GetProductsByCategory(category: any) {
    this.productsFound = false;
    if (category.id === this.chosenCategoryID) {
      this.taxonomyID = '';
      return false;
    }
    this.chosenCategoryID = category.id;
    this.categoryName = category.name;
    axios.get(this.getCategoryProductsURL + category.id)
      .then((response: any) => {
        this.productsFound = true;
        this.productsData = response.data;
        this.taxonomyID = this.productsData[0].term_taxonomy_id;
        this.Scroll(category.id);
      })
      .catch((error: any) => {
        // handle error
        if (error.response) {
            /*
            * The request was made and the server responded with a
            * status code that falls out of the range of 2xx
            */
            this.errorString = 'Data: ' + error.data;
            this.errorString += '<br> Status: ' + error.status + '<br> Header: ' + error.headers + '<br>';
        } else if (error.request) {
            /*
            * The request was made but no response was received, `error.request`
            * is an instance of XMLHttpRequest in the browser and an instance
            * of http.ClientRequest in Node.js
            */
            this.errorString = 'Request Error occured: ' + error.request + '<br>';
        } else {
            // Something happened in setting up the request and triggered an Error
            this.errorString = 'Else Error occured: ' + error.message + '<br>';
        }
      })
      .then(() => {
        // always executed
        this.finalString = 'Done processing!';
      });
  }

  private UpdateProductURL(product: any) {
    const productName = product.post_title.replace('/', '').replace(/[^ -~]+/g, '');
    this.$router.push(this.$route.path + '/productid/' + product.object_id + '/' + productName);
  }

  private GetProduct(productID: any, productTitle: any) {
    window.scrollTo(0, 0);
    this.isLoading = true;
    let circlePosition = 1;
    this.productName = productTitle;
    this.GetProductDescription(productID);
    axios.get(this.getProductURL + productID)
      .then((response: any) => {
        this.isLoading = false;
        this.productFound = true;
        this.productData = response.data;

        this.productData.forEach((item, index) => {
          if (item.meta_key === 'video_link_1') {
            item.Name = 'Watch Video';
            item.Link = item.meta_value;
          }
        });

        this.productData.forEach((item, index) => {
          if (item.Link === null) {
            this.productData.splice(index, 1);
          }
        });

        this.productData.forEach((element) => {
          element.circlePosition = circlePosition++;
        });

        if (this.productData) {
          this.productsFound = true;
          this.productSelected = true;
        }
      })
      .catch((error: any) => {
        // handle error
        if (error.response) {
            /*
            * The request was made and the server responded with a
            * status code that falls out of the range of 2xx
            */
            this.errorString = 'Data: ' + error.data;
            this.errorString += '<br> Status: ' + error.status + '<br> Header: ' + error.headers + '<br>';
        } else if (error.request) {
            /*
            * The request was made but no response was received, `error.request`
            * is an instance of XMLHttpRequest in the browser and an instance
            * of http.ClientRequest in Node.js
            */
            this.errorString = 'Request Error occured: ' + error.request + '<br>';
        } else {
            // Something happened in setting up the request and triggered an Error
            this.errorString = 'Else Error occured: ' + error.message + '<br>';
        }
      })
      .then(() => {
        // always executed
        this.isLoading = false;
        this.productSelected = true;
        this.finalString = 'Done processing!';
      });
  }

  private GetProductDescription(productID: any) {
    axios.get(this.getProductDescriptionURL + productID)
      .then((response: any) => {
        this.productDescription = response.data.description;
      })
      .catch((error: any) => {
        // handle error
        if (error.response) {
            /*
            * The request was made and the server responded with a
            * status code that falls out of the range of 2xx
            */
            this.errorString = 'Data: ' + error.data;
            this.errorString += '<br> Status: ' + error.status + '<br> Header: ' + error.headers + '<br>';
        } else if (error.request) {
            /*
            * The request was made but no response was received, `error.request`
            * is an instance of XMLHttpRequest in the browser and an instance
            * of http.ClientRequest in Node.js
            */
            this.errorString = 'Request Error occured: ' + error.request + '<br>';
        } else {
            // Something happened in setting up the request and triggered an Error
            this.errorString = 'Else Error occured: ' + error.message + '<br>';
        }
      })
      .then(() => {
        // always executed
        this.isLoading = false;
        this.productSelected = true;
        this.finalString = 'Done processing!';
      });
  }

  private Scroll(elementid: any) {
    const element = document.getElementById(elementid);
    const bodyRect = document.body.getBoundingClientRect();
    const elemRect = element.getBoundingClientRect();
    const offset  = elemRect.top - bodyRect.top;
    const scrollToLocation = offset + 100;
    if (offset > 900) {
      setTimeout(() => window.scrollTo(0, scrollToLocation), 1);
    }
  }
}
</script>