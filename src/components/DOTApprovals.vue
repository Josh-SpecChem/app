<template>
  <div class="dotapprovalsContent">
    <div class="dotapprovals">
      <div class="headerMain">
        <h1>DOT Approvals Page</h1>
      </div>
      <Menu @showMenu="showMenu" v-if="isShow" />
      <div class="contentMain">
        <div>
          <div class="row height50">
            <div class="rowText floatL padL20 padT6">
              <span class="white upper font28 bolder">State</span>
            </div>
            <div class="rowAction selectMd2 floatR">
              <select @change="onChange($event)">
                <option></option>
                <option v-for="state in dotstates" :value="state.id" v-bind:key="state">{{state.name}}</option>
              </select>
            </div>
          </div>

          <div class="row" v-if="dotStateSelected && !productSelected">
            <div class="rowText white bold font22 upper padR12 padL30">
              <div v-if="dotProductsFound">
                <div v-if="isLoading">
                  <img src="/img/loading.gif" />
                </div>
                <div v-else v-for="product in dotstateproducts" v-bind:key="product">
                  <p class="paddingSelectProduct white nounderline font22" v-on:click="GetSpecChemProduct(product.post_title)" v-html="product.post_title" />
                </div>
              </div>
              <div v-else>
                <p class="white font22 upper">No products found for this state</p>
              </div>          
            </div>
          </div>          

          <div v-if="productSelected">
            <div v-if="isLoading">
              <img src="/img/loading.gif" />
            </div>
            <div v-else>
              <div class="productSheetHeader padL15 white bold" v-html="categoryName" />
              <div class="contentInnerDOT backgroundYellow">
                <div class="productSheets">
                  <div class="specChemProductOuterCircle">
                    <div class="specChemProductCircle">
                      <div class="specChemProductCircleText" v-html="productName" />
                    </div>
                  </div>
                  <div v-for="product in productData" v-bind:key="product">       
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
    </div> 
    <Footer @showMenu="showMenu" />
  </div>
</template>

<script lang="ts">
import axios from 'axios';
import VueAxios from 'vue-axios';
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { Route } from 'vue-router';
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
export default class HelloWorld extends Vue {
  @Prop() private msg!: string;
  private dotstates: any = '';
  private dotstateproducts: any = '';
  private productData: any = '';
  private baseURL: string = 'https://www.specchemllc.com/';
  // private baseURL: string = 'https://specchem.hoenigwebdesign.com/pwa/';
  private pageAPIURL: string = 'wp-json/wp/v2/pages';
  private postAPIURL: string = 'wp-json/wp/v2/posts';
  private dotDOTApprovalStates: string = '/wp-json/specchem/v1/dot_approvals_states';
  private dotDOTApprovalCategories: string = 'wp-json/wp/v2/dot_categories/?per_page=60';
  private dotApprovalStateProducts: string = '/wp-json/specchem/v1/dot_approval/';
  private getDOTStates: string = this.baseURL + this.dotDOTApprovalCategories;
  private getDOTStatesProducts: string = this.baseURL + this.dotApprovalStateProducts;
  private productSelected: boolean = false;
  private productIDFound: boolean = false;
  private productID: string = '';
  private productName: string = '';
  private productDescription: string = '';
  private getProduct: string = 'wp-json/specchem/v1/product/';
  private getProductURL: string = this.baseURL + this.getProduct;
  private getProductDescription: string = 'wp-json/wp/v2/products/';
  private getProductDescriptionURL: string = this.baseURL + this.getProductDescription;
  private productNotFound: boolean = false;
  private categoryName: any = '';

  private errorString: string = '';
  private finalString: string = '';
  private dotStateSelected: boolean = false;
  private dotProductsFound: boolean = true;
  private isShow: boolean = false;
  private isLoading: boolean = false;

  private SpecChemProductIDs = [
    {specChemProduct: 'Aqua Shine', ID: '70' },
    {specChemProduct: 'Bio Strip WB', ID: '72' },
    {specChemProduct: 'Crystal Shine', ID: '210' },
    {specChemProduct: 'Cure \& Seal 25', ID: '213' },
    {specChemProduct: 'Cure \& Seal 25 UV', ID: '220' },
    {specChemProduct: 'Cure \& Seal 30', ID: '226' },
    {specChemProduct: 'Cure \& Seal WB', ID: '233' },
    {specChemProduct: 'Cure \& Seal WB 25', ID: '237' },
    {specChemProduct: 'Cure \& Seal WB 30', ID: '240' },
    {specChemProduct: 'Cure Hard', ID: '243' },
    {specChemProduct: 'Deco Shine', ID: '257' },
    {specChemProduct: 'Deco Shine Matte', ID: '264' },
    {specChemProduct: 'Dry-Deck WB', ID: '267' },
    {specChemProduct: 'Duo Patch', ID: '270' },
    {specChemProduct: 'E-Cure', ID: '274' },
    {specChemProduct: 'Final Finish', ID: '278' },
    {specChemProduct: 'LithSeal Lite', ID: '294' },
    {specChemProduct: 'LithSeal SC', ID: '290' },
    {specChemProduct: 'Orange Peel', ID: '297' },
    {specChemProduct: 'Pave Cure CW', ID: '304' },
    {specChemProduct: 'Pave Cure Rez', ID: '308' },
    {specChemProduct: 'Pave Cure Rez White', ID: '315' },
    {specChemProduct: 'Pave Cure WW', ID: '321' },
    {specChemProduct: 'Precast 80', ID: '330' },
    {specChemProduct: 'Quartz Floor Hardener', ID: '339' },
    {specChemProduct: 'Rapid Flex C.J.', ID: '1056' },
    {specChemProduct: 'RepCon 928', ID: '346' },
    {specChemProduct: 'RepCon H', ID: '353' },
    {specChemProduct: 'RepCon UW Mortar', ID: '361' },
    {specChemProduct: 'RepCon V/O', ID: '364' },
    {specChemProduct: 'RevCrete', ID: '367' },
    {specChemProduct: 'SC Metallic Grout', ID: '373' },
    {specChemProduct: 'SC Multi-purpose Grout', ID: '376' },
    {specChemProduct: 'SC Precision Grout', ID: '379' },
    {specChemProduct: 'SpecBlast', ID: '520' },
    {specChemProduct: 'SpecCity White', ID: '523' },
    {specChemProduct: 'SpecEtch', ID: '527' },
    {specChemProduct: 'SpecFilm Concentrate', ID: '533' },
    {specChemProduct: 'SpecFilm RTU', ID: '537' },
    {specChemProduct: 'SpecFlow', ID: '540' },
    {specChemProduct: 'SpecGuard', ID: '544' },
    {specChemProduct: 'SpecHard', ID: '547' },
    {specChemProduct: 'SpecLevel PCT', ID: '1538' },
    {specChemProduct: 'Spec-O-Lith', ID: '551' },
    {specChemProduct: 'SpecPatch 15', ID: '920' },
    {specChemProduct: 'SpecPatch 30', ID: '554' },
    {specChemProduct: 'SpecPatch 5', ID: '926' },
    {specChemProduct: 'SpecPatch Light', ID: '923' },
    {specChemProduct: 'SpecPlug', ID: '558' },
    {specChemProduct: 'SpecPoxy 1000', ID: '562' },
    {specChemProduct: 'SpecPoxy 2000', ID: '564' },
    {specChemProduct: 'SpecPoxy 3000', ID: '568' },
    {specChemProduct: 'SpecPoxy 3000FS', ID: '571' },
    {specChemProduct: 'SpecPoxy 500', ID: '1819' },
    {specChemProduct: 'SpecPoxy Binder', ID: '574' },
    {specChemProduct: 'SpecPoxy C.J.', ID: '576' },
    {specChemProduct: 'SpecPoxy Coating', ID: '579' },
    {specChemProduct: 'SpecPoxy Grout', ID: '582' },
    {specChemProduct: 'SpecPoxy Mortar', ID: '585' },
    {specChemProduct: 'SpecPoxy Sealer', ID: '587' },
    {specChemProduct: 'SpecPrep SB', ID: '889' },
    {specChemProduct: 'SpecRez', ID: '591' },
    {specChemProduct: 'SpecRock', ID: '595' },
    {specChemProduct: 'SpecShield WB', ID: '601' },
    {specChemProduct: 'SpecSilane 40WB', ID: '609' },
    {specChemProduct: 'SpecSmooth', ID: '611' },
    {specChemProduct: 'SpecStrip', ID: '191' },
    {specChemProduct: 'SpecStrip Plus', ID: '615' },
    {specChemProduct: 'SpecStrip Supreme', ID: '619' },
    {specChemProduct: 'SpecTilt 100', ID: '628' },
    {specChemProduct: 'SpecWeld', ID: '643' },
    {specChemProduct: 'Strong Bond', ID: '646' },
    {specChemProduct: 'Surface Shine', ID: '654' },
    {specChemProduct: 'UW Grout', ID: '681' },
    {specChemProduct: 'Clean Lift 20/20', ID: '1901' },
  ];

  @Watch('$route', { immediate: true, deep: true })
    private onUrlChange(newVal: Route) {
      if (this.$route.path.includes('state')) {
        this.GetStateProducts(this.$route.params.ID);
      } else {
        this.GetStates();
      }
    }

  private showMenu(showMenu) {
    this.isShow = showMenu;
  }

  private onChange(event: any) {
    if (this.$route.path.includes('state')) {
      this.$router.push('/dotapprovals/state/' + event.target.value);
    } else {
      this.$router.push(this.$route.path + '/state/' + event.target.value);
    }
  }

  private GetStateProducts(stateID: any) {
    this.dotStateSelected = false;
    this.GetDOTStateProducts(stateID);
  }

  private mounted() {
    this.GetStates();
  }

  private GetStates() {
    this.dotStateSelected = false;
    this.productSelected = false;
    axios.get(this.getDOTStates)
      .then((response: any) => {
        this.dotstates = response.data;
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

  private GetDOTStateProducts(stateID: any) {
    this.dotStateSelected = true;
    this.dotProductsFound = true;
    this.isLoading = true;
    axios.get(this.getDOTStatesProducts + stateID)
      .then((response: any) => {
        this.isLoading = false;
        this.dotstateproducts = response.data;

        if (this.dotstateproducts == null) {
          this.dotProductsFound = false;
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
        this.finalString = 'Done processing!';
      });
    }

  private GetSpecChemProduct(specChemProductName: any) {
    const SpecChemProductName = this.SpecChemProductIDs.find((e) => e.specChemProduct === specChemProductName);
    if (SpecChemProductName === undefined) {
        throw new Error('One of the params must be provided.');
    } else if (SpecChemProductName !== undefined) {
        this.productIDFound = true;
        this.categoryName = specChemProductName;
        const SpecChemProductID = SpecChemProductName.ID;
        this.GetProduct(SpecChemProductID, specChemProductName);
    }
  }

  private GetProduct(productID: any, productName: any) {
    this.productSelected = true;
    this.isLoading = true;
    let circlePosition = 1;
    this.productName = productName;
    this.GetProductDescription(productID);

    axios.get(this.getProductURL + productID)
      .then((response: any) => {
        this.productData = response.data;

        if (this.productData) {
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
          this.productNotFound = false;
        } else {
          this.productNotFound = true;
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
        this.productSelected = true;
        this.finalString = 'Done processing!';
        this.isLoading = false;
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
}
</script>
