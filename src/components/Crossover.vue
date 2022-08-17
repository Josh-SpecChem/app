<template>
  <div class="crossoverChartContent">
    <div class="crossoverChart">
      <div class="headerMain">
        <h1>CrossOver Chart</h1>
      </div>
      <Menu @showMenu="showMenu" v-if="isShow" />
      <div class="contentMain">
        <div class="contentInnerCrossover" v-if="!productSelected">
          <div>
            <div v-for="competitorName in CompetitorNames" v-bind:key="competitorName">
              <div class="button-white height75">
                <p class="blue bolder buttonText font24 padT15" v-bind:id="competitorName.name" ><a v-on:click="GetCompetitorProducts(competitorName.name)">{{competitorName.name}}</a></p>
              </div>
              <div class="backgroundYellow100p" v-if="productsFound && !productSelected && (competitorName.name == competitorNameMatch) ">
                <div v-for="competitorProduct in CompetitorProductList" v-bind:key="competitorProduct">
                  <div class="row innerRow width80p">
                    <span class="white font24 bold">+ <a class="white font24 bold" v-on:click="GetSpecChemProductURL(competitorProduct.specChemProduct)">{{ competitorProduct.name}}</a></span>
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
          <div v-else class="contentInnerCrossoverProducts backgroundYellow">
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
  // private baseURL: string = 'https://specchem.hoenigwebdesign.com/pwa/';
  private pageAPIURL: string = 'wp-json/wp/v2/pages';
  private postAPIURL: string = 'wp-json/wp/v2/posts';
  private getCategories: string = 'wp-json/wp/v2/product_categories/';
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
  private competitorNameMatch: any = '';
  private CompetitorProductList: any = '';
  private productIDFound: boolean = false;
  private productID: any = '';
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
    {specChemProduct: 'RepCon V_O', ID: '364' },
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

  private CompetitorNames = [
    { name: 'Euclid/Tamms' },
    { name: 'BASF' },
    { name: 'SIKA' },
    { name: 'W.R. Meadows' },
    { name: 'Dayton' },
    { name: 'MISC' },
  ];

  private CompetitorProducts = [
    { name: 'Euclid/Tamms',
      products: [
        { name: 'Aqua-Cure VOX', specChemProduct: 'Cure & Seal WB' },
        { name: 'Crystal Release VOC', specChemProduct: 'SpecStrip Supreme' },
        { name: 'Concrete Blaster', specChemProduct: 'SpecBlast' },
        { name: 'Concrete Surface Retarders S', specChemProduct: 'SpecEtch' },
        { name: 'Diamond Clear, Rez Seal', specChemProduct: 'Cure & Seal 25' },
        { name: 'Euco Clean & Strip', specChemProduct: 'Orange Peel' },
        { name: 'Ever Clear', specChemProduct: 'Surface Shine' },
        { name: 'Eucosil', specChemProduct: 'Cure Hard' },
        { name: 'Euco Diamond Hard', specChemProduct: 'SpecHard' },
        { name: 'Eucobar', specChemProduct: 'SpecFilm Concentrate' },
        { name: 'Euco #452 LV', specChemProduct: 'SpecPoxy 1000' },
        { name: 'Euco #452 MV', specChemProduct: 'SpecPoxy 2000' },
        { name: 'Euco #452 Gel', specChemProduct: 'SpecPoxy 3000' },
        { name: 'Euco #620 Gel, Dural Fast Set Gel', specChemProduct: 'SpecPoxy 3000 FS' },
        { name: 'Flex-con', specChemProduct: 'Strong Bond' },
        { name: 'Form Shield Pure', specChemProduct: 'SpecStrip' },
        { name: 'FormShield Pure Plus', specChemProduct: 'SpecStrip Plus' },
        { name: 'Form-EZE Natural', specChemProduct: 'Bio Strip WB' },
        { name: 'Super Floor Coat', specChemProduct: 'Cure & Seal 30' },
        { name: 'Super Aqua-Cure VOX, Super Diamond Clear VOX', specChemProduct: 'Cure & Seal WB 25' },
        { name: 'Lusterseal 300, Super Diamond Clear', specChemProduct: 'Cure & Seal 25 UV' },
        { name: 'Kurez VOX', specChemProduct: 'SpecRez' },
        { name: 'Kurez VOX White Pigmented', specChemProduct: 'Pave Cure WW' },
        { name: 'SurfHard', specChemProduct: 'Spec-O-Lith' },
        { name: 'Ultrasil Li+', specChemProduct: 'LithSeal SC' },
        { name: 'Ultra Guard', specChemProduct: 'SpecGuard' },
        { name: 'Super Diamond Clear', specChemProduct: 'Deco Shine' },
        { name: 'Lusterseal 350', specChemProduct: 'Crystal Shine' },
        { name: 'Lusterseal 300 WB', specChemProduct: 'Aqua Shine' },
        { name: 'Weather-Guard, ChemStop WB', specChemProduct: 'SpecShield WB' },
        { name: 'Baracade Silane 40', specChemProduct: 'SpecSilane 40WB' },
        { name: 'EucoWeld', specChemProduct: 'SpecWeld' },
        { name: 'Flexolith', specChemProduct: 'SpecPoxy Binder' },
        { name: 'Dural 50', specChemProduct: 'SpecPoxy 500' },
        { name: 'Duralkote 240', specChemProduct: 'SpecPoxy Coating' },
        { name: 'Euco 700', specChemProduct: 'SpecPoxy C.J.' },
        { name: 'Euco QWIKjoint UVR', specChemProduct: 'Rapid Flex C.J.' },
        { name: 'E-3F, E-3G, E-3HP, Polygrout', specChemProduct: 'SpecPoxy Grout' },
        { name: 'Dural Flex Fastpatch', specChemProduct: 'SpecPoxy Mortar' },
        { name: 'Dural 50LM', specChemProduct: 'SpecPoxy Sealer' },
        { name: 'NS Grout/NC Grout', specChemProduct: 'SC Multi-purpose Grout' },
        { name: 'Hi- Flow Grout', specChemProduct: 'SC Precision Grout' },
        { name: 'NS Metallic Grout', specChemProduct: 'SC Metallic Grout' },
        { name: 'Tremie Grout', specChemProduct: 'UW Grout' },
        { name: 'Surflex', specChemProduct: 'Quartz Floor Hardener' },
        { name: 'SpecCrete Red Line', specChemProduct: 'SpecPatch 5' },
        { name: 'Speed Crete Redline', specChemProduct: 'SpecPatch 15' },
        { name: 'Eucopatch, Thin Patch, EucoCrete, Eucopatch', specChemProduct: 'SpecPatch 30' },
        { name: 'Speed Crete Redline', specChemProduct: 'SpecPatch Light' },
        { name: 'Tammspatch II, DuraTop Flowable Mortar', specChemProduct: 'Duo Patch' },
        { name: 'Tammscrete', specChemProduct: 'SpecSmooth' },
        { name: 'Verticoat Supreme, Verticoat', specChemProduct: 'RepCon V_O' },
        { name: 'Concrete Top Supreme', specChemProduct: 'RepCon H' },
        { name: 'Versaspeed LS', specChemProduct: 'RepCon 928' },
        { name: 'Speed Crete Blue Line', specChemProduct: 'RepCon UW Mortar' },
        { name: 'Speed Plug', specChemProduct: 'SpecPlug' },
        { name: 'Euco Rock', specChemProduct: 'SpecRock' },
        { name: 'Flop Top, Super Flo Top', specChemProduct: 'SpecFlow' },
        { name: 'Tammscrete', specChemProduct: 'Final Finish' },
        { name: 'Thin Top Supreme, Euco Recover', specChemProduct: 'RevCrete' },
        { name: 'FormShield WB', specChemProduct: 'SpecStrip WB' },
        { name: 'Diamond Clear, Rez Seal, Super RezSeal', specChemProduct: 'Cure & Seal 25' },
        { name: 'Super Aqua-Cure VOX, Super Diamond Clear VOX', specChemProduct: 'Cure & Seal WB 25' },
        { name: 'Kurez DR VOX, Kurez 100', specChemProduct: 'SpecRez' },
        { name: 'Kurez DR VOX, Kurez R 100', specChemProduct: 'Pave Cure Rez' },
        { name: 'Weather-Guard, ChemStop WB, Baracade WB 244', specChemProduct: 'SpecShield WB' },
        { name: 'Baracade Silane 100C', specChemProduct: 'SpecSilane 100' },
        { name: 'Flex-con, Akkro-7t', specChemProduct: 'Strong Bond' },
        { name: 'EucoWeld, Tammsweld', specChemProduct: 'SpecWeld' },
        { name: 'Eucopatch, Thin Patch', specChemProduct: 'SpecPatch 30' },
      ]},
    { name: 'BASF',
      products: [
        { name: 'Cast-Off', specChemProduct: 'SpecStrip' },
        { name: 'MasterKure CC 250 SB', specChemProduct: 'Cure & Seal 25' },
        { name: 'MasterKure CC 300 SB', specChemProduct: 'Cure & Seal 30' },
        { name: 'MasterKure CC 160 WB', specChemProduct: 'Cure & Seal WB' },
        { name: 'MasterKure CC 250 SB', specChemProduct: 'Cure & Seal 25 UV' },
        { name: 'MasterKure HD 110 WB', specChemProduct: 'Cure Hard' },
        { name: 'Lapidolith', specChemProduct: 'Spec-O-Lith' },
        { name: 'MasterKure HD 210 WB', specChemProduct: 'SpecHard' },
        { name: 'MasterKure ER 50', specChemProduct: 'SpecFilm Concentrate' },
        { name: 'Citrus Degreaser', specChemProduct: 'Orange Peel' },
        { name: 'White Roc 10 WB', specChemProduct: 'SpecShield WB' },
        { name: 'MasterEmaco A660', specChemProduct: 'Strong Bond' },
        { name: 'Eco Weld', specChemProduct: 'SpecWeld' },
        { name: 'MasterInject 1701', specChemProduct: 'SpecPoxy 1000' },
        { name: 'MasterEmaco ADH 330', specChemProduct: 'SpecPoxy 2000' },
        { name: 'MasterEmaco ADH 335', specChemProduct: 'SpecPoxy 3000' },
        { name: 'Rapid Gel', specChemProduct: 'SpecPoxy 3000 FS' },
        { name: 'MasterSeal CR 335', specChemProduct: 'SpecPoxy C.J.' },
        { name: 'MasterFlow 648 CP', specChemProduct: 'SpecPoxy Grout' },
        { name: 'MasterFlow GP', specChemProduct: 'SpecPoxy Sealer' },
        { name: 'MB Construction Grout', specChemProduct: 'SC Multi-purpose Grout' },
        { name: 'MasterFlow 928', specChemProduct: 'SC Precision Grout' },
        { name: 'Embaco 885', specChemProduct: 'SC Metallic Grout' },
        { name: 'MasterTop 100', specChemProduct: 'Quartz Floor Hardener' },
        { name: 'MasterEmaco N 425, Sonopatch TC', specChemProduct: 'SpecPatch 30' },
        { name: 'Sonopatch 300', specChemProduct: 'Duo Patch' },
        { name: 'Gel Patch/Sonopatch 200', specChemProduct: 'RepCon V_O' },
        { name: 'MasterEmaco R310 CL, Emaco 566', specChemProduct: 'RepCon H' },
        { name: 'Lapidolith, HD 300WB', specChemProduct: 'Spec-O-Lith' },
        { name: 'Masterprotect H-400', specChemProduct: 'SpecSilane 40WB' },
        { name: 'MasterSeal 350', specChemProduct: 'Flexolith' },
        { name: 'MasterEmaco P 160', specChemProduct: 'Dural 50' },
        { name: 'MasterTop 1213', specChemProduct: 'Duralkote 240' },
        { name: 'MasterSeal CR 335, 190', specChemProduct: 'Euco 700' },
        { name: 'MasterFlow GP, MaterEmaco P 160', specChemProduct: 'Dural 50 LM' },
        { name: 'MB Construction Grout, MasterFlow 713, MasterFlow 555', specChemProduct: 'SC Multi-purpose Grout' },
        { name: 'Masterflow 4316', specChemProduct: 'SC Precision Grout HS' },
        { name: 'SC Metallic Grout', specChemProduct: 'Embeco 885' },
      ]},
    { name: 'SIKA',
      products: [
        { name: 'Sika Film', specChemProduct: 'SpecFilm Concentrate' },
        { name: 'Rugasol S', specChemProduct: 'SpecEtch' },
        { name: 'Aggribrite VOC', specChemProduct: 'Surface Shine' },
        { name: 'SIKA LATEX ACRYLIC', specChemProduct: 'Strong Bond' },
        { name: 'Sikadur Hi Mod 35', specChemProduct: 'SpecPoxy 1000' },
        { name: 'Sikadur Hi Mod 32', specChemProduct: 'SpecPoxy 2000' },
        { name: 'Sikadur Hi Mod 31', specChemProduct: 'SpecPoxy 3000' },
        { name: 'Sikadur Hi Mod 33', specChemProduct: 'SpecPoxy 3000 FS' },
        { name: 'Sikadur 51 SL', specChemProduct: 'SpecPoxy C.J.' },
        { name: 'Sika Loadflex 524 EZ', specChemProduct: 'Rapid Flex C.J.' },
        { name: 'Sikadur 42', specChemProduct: 'SpecPoxy Grout' },
        { name: 'SikaGrout 212', specChemProduct: 'SC Multi-purpose Grout' },
        { name: 'SikaGrout 328', specChemProduct: 'SC Precision Grout' },
        { name: 'Sika Repair 223, Sika Quick VOH', specChemProduct: 'SpecPatch 15' },
        { name: 'Sika Repair 222, Top 121', specChemProduct: 'SpecPatch 30' },
        { name: 'Sika Top 122 Plus', specChemProduct: 'Duo Patch' },
        { name: 'Sika Top 123 Plus', specChemProduct: 'RepCon V_O' },
        { name: 'Sika Set Mortar', specChemProduct: 'RepCon H' },
        { name: 'Sika Smooth', specChemProduct: 'Final Finish' },
        { name: 'Sika Armatec 110', specChemProduct: 'SpecPrep SB' },
        { name: 'Sikadur 22', specChemProduct: 'SpecPoxy Binder' },
        { name: 'Sikafloor 261, Sikagard 62', specChemProduct: 'SpecPoxy Coating' },
        { name: 'Sikadur 43, Patch-Pak', specChemProduct: 'SpecPoxy Mortar' },
        { name: 'Sika Repair 222', specChemProduct: 'SpecPatch 30' },
        { name: 'Sika Top 111 and 122 Plus', specChemProduct: 'Duo Patch' },
        { name: 'Sikaset Plug', specChemProduct: 'SpecPlug' },
        { name: 'SikaLevel SkimCoat', specChemProduct: 'RevCrete' },
      ]},
    { name: 'W.R. Meadows',
      products: [
        { name: 'Duogard, Duogard Citrus, Duoguard NE', specChemProduct: 'SpecStrip' },
        { name: 'Duogard Plus', specChemProduct: 'SpecStrip Supreme' },
        { name: 'CS-309-25', specChemProduct: 'Cure & Seal 25' },
        { name: 'CS-309-30', specChemProduct: 'Cure & Seal 30' },
        { name: 'VOCOMP-20', specChemProduct: 'Cure & Seal WB' },
        { name: 'VOCOMP-25, VOCOMP-30', specChemProduct: 'Cure & Seal WB 25' },
        { name: 'CS-309-35', specChemProduct: 'Cure & Seal 25 UV' },
        { name: '1100 - Clear', specChemProduct: 'SpecRez' },
        { name: '1600-White', specChemProduct: 'Pave Cure WW' },
        { name: '1100-Clear', specChemProduct: 'Pave Cure Rez' },
        { name: '1200-White', specChemProduct: 'Pave Cure Rez White' },
        { name: 'Med-Cure', specChemProduct: 'Cure Hard' },
        { name: 'Liqui-Hard', specChemProduct: 'SpecHard' },
        { name: 'Evapre-RTU', specChemProduct: 'SpecFilm RTU' },
        { name: 'Evapre', specChemProduct: 'SpecFilm Concentrate' },
        { name: 'Top Stop', specChemProduct: 'SpecEtch' },
        { name: 'Ultrite Degreaser', specChemProduct: 'Orange Peel' },
        { name: 'Tiah', specChemProduct: 'Surface Shine' },
        { name: 'Decra-seal', specChemProduct: 'Deco Shine' },
        { name: 'Expo-Gloss OTC', specChemProduct: 'Crystal Shine' },
        { name: 'Deck-O-Shield', specChemProduct: 'SpecSilane 40WB' },
        { name: 'Acryl-Lok', specChemProduct: 'Strong Bond' },
        { name: 'Everweld', specChemProduct: 'SpecWeld' },
        { name: 'Rezi-Weld LV', specChemProduct: 'SpecPoxy 1000' },
        { name: 'Rezi-Weld 1000', specChemProduct: 'SpecPoxy 2000' },
        { name: 'Rezi-weld Gel Paste', specChemProduct: 'SpecPoxy 3000' },
        { name: 'Rezi-Weld Gel Paste', specChemProduct: 'SpecPoxy 3000 FS' },
        { name: 'Rezi-Weld Flex', specChemProduct: 'SpecPoxy C.J.' },
        { name: 'Rezi-Weld 3/2', specChemProduct: 'SpecPoxy Grout' },
        { name: 'SG-86', specChemProduct: 'SC Multi-purpose Grout' },
        { name: '588', specChemProduct: 'SC Precision Grout' },
        { name: 'Meadow-Patch 20, T-1', specChemProduct: 'SpecPatch 30' },
        { name: 'Futura 15', specChemProduct: 'RepCon H' },
        { name: 'Duogard II', specChemProduct: 'SpecStrip WB' },
        { name: 'CS-309-30, Decra-Seal', specChemProduct: 'Cure & Seal 30' },
        { name: 'Liqui-Hard Ultra', specChemProduct: 'LithSeal Lite' },
        { name: 'Meadow-Patch T1', specChemProduct: 'SpecPatch Light' },
        { name: 'Meadow-Patch T2', specChemProduct: 'Duo Patch' },
        { name: 'Futura 45', specChemProduct: 'RepCon 928' },
        { name: 'Meadow-Plug', specChemProduct: 'SpecPlug' },
        { name: 'Speed-E-Roc', specChemProduct: 'SpecRock' },
      ]},
    { name: 'Dayton',
      products: [
        { name: 'J-1, J-1-A', specChemProduct: 'SpecStrip' },
        { name: 'J-2', specChemProduct: 'SpecStrip Plus' },
        { name: 'J-3', specChemProduct: 'SpecStrip Supreme' },
        { name: 'J-4 Bio, J-1EF, Farm Fresh XL ', specChemProduct: 'Bio Strip WB' },
        { name: 'J-20, J-22', specChemProduct: 'Cure & Seal 25' },
        { name: 'J-23', specChemProduct: 'Cure & Seal 30' },
        { name: 'J-18, J-19', specChemProduct: 'Cure & Seal WB' },
        { name: 'J-19, J-22 WB', specChemProduct: 'Cure & Seal WB 25' },
        { name: 'J-22UV', specChemProduct: 'Cure & Seal 25 UV' },
        { name: 'J9 - A', specChemProduct: 'SpecRez' },
        { name: 'J9-A', specChemProduct: 'SpecCity White' },
        { name: 'White Wax Cure', specChemProduct: 'Pave Cure WW' },
        { name: 'Clear Resin Cure', specChemProduct: 'Pave Cure Rez' },
        { name: 'White Resin Cure', specChemProduct: 'Pave Cure Rez White' },
        { name: 'J-13', specChemProduct: 'Cure Hard' },
        { name: 'Pentra Hard-Densifier', specChemProduct: 'LithSeal Lite' },
        { name: 'J-17', specChemProduct: 'SpecHard' },
        { name: 'J-6 WB, Maxi-Tilt', specChemProduct: 'SpecTilt WB' },
        { name: 'J-6, SUper Maxi Tilt', specChemProduct: 'SpecTilt 100' },
        { name: 'Aquafilm, J-74 RTU', specChemProduct: 'SpecFilm RTU' },
        { name: 'J-74, Aquafilm Conc.', specChemProduct: 'SpecFilm Concentrate' },
        { name: 'Top Cast', specChemProduct: 'SpecEtch' },
        { name: 'J-48', specChemProduct: 'Orange Peel' },
        { name: 'J-24', specChemProduct: 'Surface Shine' },
        { name: 'J-25', specChemProduct: 'Deco Shine' },
        { name: 'Ultra Seal EF', specChemProduct: 'Aqua Shine' },
        { name: 'J-26 WB', specChemProduct: 'SpecShield WB' },
        { name: 'J-29', specChemProduct: 'SpecSilane 40WB' },
        { name: 'J-40', specChemProduct: 'Strong Bond' },
        { name: 'J-41', specChemProduct: 'SpecWeld' },
        { name: 'J-56', specChemProduct: 'SpecPoxy 1000' },
        { name: 'J-58', specChemProduct: 'SpecPoxy 2000' },
        { name: 'J-50', specChemProduct: 'SpecPoxy 3000' },
        { name: 'J-51 FS', specChemProduct: 'SpecPoxy 3000 FS' },
        { name: 'J-52', specChemProduct: 'SpecPoxy C.J.' },
        { name: 'J-55', specChemProduct: 'SpecPoxy Grout' },
        { name: 'Sure Patch', specChemProduct: 'SpecPoxy Mortar' },
        { name: '#1107', specChemProduct: 'SC Multi-purpose Grout' },
        { name: 'High Performance Grout', specChemProduct: 'SC Precision Grout' },
        { name: 'Dalton Metallic Grout', specChemProduct: 'SC Metallic Grout' },
        { name: 'Quartz Tuff', specChemProduct: 'Quartz Floor Hardener' },
        { name: 'Recrete, Thin Resurfacer', specChemProduct: 'SpecPatch 30' },
        { name: 'Special Patch', specChemProduct: 'Duo Patch' },
        { name: 'Architectural Finish', specChemProduct: 'SpecSmooth' },
        { name: 'Permapatch V/O', specChemProduct: 'RepCon V_O' },
        { name: 'Polyfast', specChemProduct: 'RepCon H' },
        { name: 'J-23, J-25', specChemProduct: 'Cure & Seal 30' },
        { name: 'J-19, J-22 WB, Cure & Seal 1315 EF', specChemProduct: 'Cure & Seal WB 25' },
        { name: 'J9 - A, Clear Cure VOC J-7WB', specChemProduct: 'SpecRez' },
        { name: 'Pentra-Hard Guard', specChemProduct: 'SpecGuard' },
        { name: 'J-29A', specChemProduct: 'SpecSilane 20WB' },
        { name: 'Pro Poxy 40 LV LM', specChemProduct: 'SpecPoxy 500' },
        { name: 'J-58, Pro Poxy 204', specChemProduct: 'SpecPoxy 2000' },
        { name: 'J-50, Pro-Poxy 300', specChemProduct: 'SpecPoxy 3000' },
        { name: 'J-51 FS, Pro-Poxy 300 Fast', specChemProduct: 'SpecPoxy 3000 FS' },
        { name: 'J-37', specChemProduct: 'SpecPoxy Coating' },
        { name: 'J-55, Pro-Poxy 2000 NS', specChemProduct: 'SpecPoxy Grout' },
        { name: 'Sure Patch, Pro-Poxy 2500', specChemProduct: 'SpecPoxy Mortar' },
        { name: 'Pro-Poxy 50-1', specChemProduct: 'SpecPoxy Sealer' },
        { name: 'Dayton Metallic Grout', specChemProduct: 'SC Metallic Grout' },
        { name: 'Anchor All, Anchoring Cement', specChemProduct: 'SpecRock' },
      ]},
    { name: 'MISC',
      products: [
        { name: 'Cresset 727, Cresset Super Strip 60', specChemProduct: 'SpecStrip' },
        { name: 'L\&M Debond', specChemProduct: 'SpecStrip Plus' },
        { name: 'Crete-Lease 880 VOC', specChemProduct: 'SpecStrip Supreme' },
        { name: 'Crete-Lease 880', specChemProduct: 'Precast 80' },
        { name: 'Nox-PCE', specChemProduct: 'Dry-Deck WB' },
        { name: 'Crete-Lease BioTru', specChemProduct: 'Bio Strip WB' },
        { name: 'L\&M E-Z Strip', specChemProduct: 'SpecStrip' },
        { name: 'NoxCrete Form Coating 250', specChemProduct: 'SpecStrip Supreme' },
        { name: 'NoxCrete Plus, L\&M De Bond Gold', specChemProduct: 'Precast 80' },
        { name: 'NoxCrete Bio-Nox', specChemProduct: 'Bio Strip WB' },
        { name: 'NoxCrete Chembeton 250', specChemProduct: 'SpecStrip' },
        { name: 'NoxCrete RA-10', specChemProduct: 'Precast 80' },
        { name: 'L\&M Dress & Seal 25', specChemProduct: 'Cure & Seal 25' },
        { name: '(NX) Cure & Seal 1315 A', specChemProduct: 'Cure & Seal 30' },
        { name: '(GS) Multi-Purpose Sealer', specChemProduct: 'Cure & Seal WB' },
        { name: '(NX) Cure & Seal 250 E', specChemProduct: 'Cure & Seal WB 25' },
        { name: 'L\&M LumiSeal Plus', specChemProduct: 'Cure & Seal 25 UV' },
        { name: 'L & M Cure R', specChemProduct: 'SpecRez' },
        { name: 'L\&M Dress & Seal 30', specChemProduct: 'Cure & Seal 30' },
        { name: '(NX) Cure & Seal 120 E', specChemProduct: 'Cure & Seal WB' },
        { name: 'L\&M Dress & Seal WB 25', specChemProduct: 'Cure & Seal WB 25' },
        { name: '(NX) CityCure WW', specChemProduct: 'SpecCity White' },
        { name: '(RP) White Water Wax', specChemProduct: 'Pave Cure WW' },
        { name: '(RP) Clear Water Resin', specChemProduct: 'Pave Cure Rez' },
        { name: '(RP) White Water Resin', specChemProduct: 'Pave Cure Rez White' },
        { name: '(NX) DOT Road Cure WW', specChemProduct: 'Pave Cure WW' },
        { name: 'L\&M Cure R', specChemProduct: 'Pave Cure Rez' },
        { name: 'L\&M Cure R-2', specChemProduct: 'Pave Cure Rez White' },
        { name: 'L\&M Cure W', specChemProduct: 'Pave Cure WW' },
        { name: 'L\&M Chem Hard', specChemProduct: 'Cure Hard' },
        { name: 'ConSolideck LS', specChemProduct: 'LithSeal SC' },
        { name: 'ConSolideck LS CS', specChemProduct: 'LithSeal Lite' },
        { name: '(NX) DuroPolish Plus', specChemProduct: 'SpecGuard' },
        { name: 'Ashford Formula', specChemProduct: 'SpecHard' },
        { name: 'L\&M Cure', specChemProduct: 'Cure Hard' },
        { name: 'L\&M Lion Hard', specChemProduct: 'LithSeal SC' },
        { name: 'Nox-Crete Duro-Nox LSC', specChemProduct: 'LithSeal Lite' },
        { name: '(NX) DuroNox', specChemProduct: 'SpecHard' },
        { name: 'L\&M Seal Hard', specChemProduct: 'SpecHard' },
        { name: '(NX) Silcoseal 2000F', specChemProduct: 'SpecTilt WB' },
        { name: '(NX) Silcoseal 100', specChemProduct: 'SpecTilt 100' },
        { name: 'Silcoseal Select', specChemProduct: 'SpecTilt WB' },
        { name: 'Silcoseal Classic', specChemProduct: 'SpecTilt 100' },
        { name: 'L\&M E-Con', specChemProduct: 'SpecFilm Concentrate' },
        { name: '(NX) BioClean', specChemProduct: 'Orange Peel' },
        { name: 'L\&M Citrex', specChemProduct: 'Orange Peel' },
        { name: '(NX) Nox-Carb', specChemProduct: 'Surface Shine' },
        { name: '(GS) Original Wet Lacquer', specChemProduct: 'Deco Shine' },
        { name: '(S) CureSeal - S Matte', specChemProduct: 'Deco Shine Matte' },
        { name: '(GS) Wet Lacquer 2000', specChemProduct: 'Crystal Shine' },
        { name: '(GS) Wet Look II Sealer', specChemProduct: 'Aqua Shine' },
        { name: '(NX) Sparkl-Seal', specChemProduct: 'Deco Shine' },
        { name: '(NX) Sparkl-Seal E', specChemProduct: 'Aqua Shine' },
        { name: '(S) CureSeal - S', specChemProduct: 'Deco Shine' },
        { name: '(S) CureSeal - W', specChemProduct: 'Aqua Shine' },
        { name: '(GS) Natural Look', specChemProduct: 'SpecShield WB' },
        { name: 'L\&M AquaPel Plus', specChemProduct: 'SpecShield WB' },
        { name: 'L\&M AquaPel', specChemProduct: 'SpecSilane 40WB' },
        { name: 'L\&M Everbond', specChemProduct: 'Strong Bond' },
        { name: 'Larsen\'s Weld Crete', specChemProduct: 'SpecWeld' },
        { name: 'L\&M Everweld', specChemProduct: 'SpecWeld' },
        { name: 'Concressive 1375', specChemProduct: 'SpecPoxy 1000' },
        { name: 'Concressive LPL', specChemProduct: 'SpecPoxy 2000' },
        { name: 'Concressive 1444', specChemProduct: 'SpecPoxy 3000' },
        { name: '(AT) Ultrabond 1300', specChemProduct: 'SpecPoxy 3000 FS' },
        { name: 'MM-80', specChemProduct: 'SpecPoxy C.J.' },
        { name: 'VersaFlex SL 85, 88  / Adhesives Technology Crackbond JF 311', specChemProduct: 'Rapid Flex C.J.' },
        { name: 'L\&M Epogrout 758', specChemProduct: 'SpecPoxy Grout' },
        { name: '(AT) Crackbond LR 321', specChemProduct: 'SpecPoxy 1000' },
        { name: '(AT) Ultrabond 2100', specChemProduct: 'SpecPoxy 2000' },
        { name: '(AT) Ultrabond 2300', specChemProduct: 'SpecPoxy 3000' },
        { name: 'Metzger/McGuire  RS 88 / HiTech HT-PE85 MI', specChemProduct: 'Rapid Flex C.J.' },
        { name: 'ARDEX ARDISEAL RAPID PLUS', specChemProduct: 'Rapid Flex C.J.' },
        { name: 'CTS MP Grout', specChemProduct: 'SC Multi-purpose Grout' },
        { name: '14K Hy-Flow', specChemProduct: 'SC Precision Grout' },
        { name: 'L\&M Duragrout', specChemProduct: 'SC Multi-purpose Grout' },
        { name: 'Five Star Grout', specChemProduct: 'SC Precision Grout' },
        { name: 'L\&M Crystex', specChemProduct: 'SC Precision Grout' },
        { name: 'Quartzplate FF', specChemProduct: 'Quartz Floor Hardener' },
        { name: 'Rapid Set Cement All', specChemProduct: 'SpecPatch 5' },
        { name: 'Ardex OVP, SKM, CP', specChemProduct: 'SpecPatch 15' },
        { name: 'Lyons Pave Crete', specChemProduct: 'SpecPatch 30' },
        { name: 'Ardex CD', specChemProduct: 'Duo Patch' },
        { name: 'Ardex B20', specChemProduct: 'RepCon V_O' },
        { name: 'EMACO 566', specChemProduct: 'RepCon H' },
        { name: 'Rapid Set DOT Repair Mix', specChemProduct: 'RepCon 928' },
        { name: 'Ardex K15, LU 100, K10,V1200', specChemProduct: 'SpecFlow' },
        { name: 'Rapid Set Wunderfixx', specChemProduct: 'Final Finish' },
        { name: 'Rapid Set Skim coat', specChemProduct: 'RevCrete' },
        { name: 'Rapid Set TRU Self Leveling', specChemProduct: 'SpecLevel PCT' },
        { name: 'Lyons Cast Patch', specChemProduct: 'SpecPatch 15' },
        { name: 'L\&M Duracrete', specChemProduct: 'SpecPatch 30' },
        { name: 'CTS Mortar Mix', specChemProduct: 'RepCon V_O' },
        { name: 'Rapid Set LevelFlor', specChemProduct: 'SpecFlow' },
        { name: 'Ardex CD fine and corse', specChemProduct: 'RevCrete' },
        { name: 'Ardex PC-T', specChemProduct: 'SpecLevel PCT' },
        { name: 'Ardex GPS, Rapid Set Cement All', specChemProduct: 'SpecPatch 30' },
        { name: 'Lyons PatchCrete', specChemProduct: 'Duo Patch' },
        { name: 'Rapid Set V/O Repair Mix', specChemProduct: 'RepCon V_O' },
        { name: 'Mapei Ultraplan Easy, Novoplan Easy, Self Leveling Plus', specChemProduct: 'SpecFlow' },
        { name: 'NoxCrete Form Coating 250, Plus', specChemProduct: 'SpecStrip Supreme' },
        { name: 'L&M DeBond Gold', specChemProduct: 'SpecStrip Supreme' },
        { name: 'PCE', specChemProduct: 'Dry-Deck WB' },
        { name: 'L & M Cure R, W-2, Vexcon Certi-Vex Envio RC 1000', specChemProduct: 'SpecRez' },
        { name: 'ChemMasters Spray- Cure & Seal 25', specChemProduct: 'Cure & Seal 25' },
        { name: 'ChemMasters Traz 25', specChemProduct: 'Cure & Seal 25 UV' },
        { name: 'Anti-Hydro Curing Compound #2 WP WB', specChemProduct: 'SpecRez' },
        { name: 'TK-DC WB Dissipating Cure 2519', specChemProduct: 'Pave Cure Rez' },
        { name: 'ChemMasters Safe-Cure 1000', specChemProduct: 'SpecStrip Supreme' },
        { name: 'TK-Kure & Seal 1315', specChemProduct: 'Cure & Seal 25' },
        { name: 'Certi-Vex Gloss Sealer FT', specChemProduct: 'Cure & Seal 30' },
        { name: 'Lambert Corp. Glazecote 20', specChemProduct: 'Cure & Seal WB' },
        { name: 'V-Seal Industra-Gloss 350', specChemProduct: 'Cure & Seal WB 25' },
        { name: 'Lambert Corp. Exposite SB', specChemProduct: 'Cure & Seal 25 UV' },
        { name: 'Lambert Corp. Solidus®', specChemProduct: 'v' },
        { name: 'TK-LS Hard N Guard Lithium Silicate Blend', specChemProduct: 'SpecGuard' },
        { name: 'Vexcon StarSeal PS Clear', specChemProduct: 'Spec-O-Lith' },
        { name: 'ChemMasters Chemisil', specChemProduct: 'Cure Hard' },
        { name: 'Mapei Mapecrete™ Hard LI', specChemProduct: 'LithSeal SC' },
        { name: 'Prosoco LS Guard', specChemProduct: 'SpecGuard' },
        { name: 'TK-Tri-Film 2120', specChemProduct: 'SpecFilm Concentrate' },
        { name: 'TK-Concrete Surface Retarder 6000', specChemProduct: 'SpecEtch' },
        { name: 'Vexcon StarSeal Envio Set', specChemProduct: 'SpecEtch' },
        { name: 'Prosoco 600', specChemProduct: 'SpecBlast' },
        { name: 'Vexcon Certi-Vex Concrete Remover', specChemProduct: 'SpecBlast' },
        { name: 'Vexcon MoistureBloc Floor Cleaner & Strip', specChemProduct: 'Orange Peel' },
        { name: 'TK-590-100', specChemProduct: 'SpecEtch' },
        { name: 'Vexcon Certi-Vex Penseal 244 100', specChemProduct: 'SpecSilane 20WB' },
        { name: 'Silocks Plus Silpro', specChemProduct: 'SpecShield WB' },
        { name: 'Pecora KlereSeal® 9100S', specChemProduct: 'SpecSilane 20WB' },
        { name: 'Anti-Hydro Airdox 20', specChemProduct: 'SpecSilane 40WB' },
        { name: 'TK-Liquid Bonding Agent 225', specChemProduct: 'Strong Bond' },
        { name: 'US Concrete Products HP Bondit', specChemProduct: 'Strong Bond' },
        { name: 'TK-Tri-Bond', specChemProduct: 'SpecWeld' },
        { name: 'TK-Epoxy Bridge Deck Overlay 2109', specChemProduct: 'SpecPoxy Binder' },
        { name: 'ChemMasters Duraguard 120', specChemProduct: 'SpecPoxy Coating' },
        { name: 'Anti-Hydro Silica Epoxy Topping #140', specChemProduct: 'SpecPoxy Mortar' },
        { name: 'TK-Bridge Deck & Crack Sealer 2110', specChemProduct: 'SpecPoxy Sealer' },
        { name: 'Poly-Carb, Inc. Mark-151.6, 154 Safe-T-Grid, 163', specChemProduct: 'SpecPoxy Binder' },
        { name: 'TK-Epoxy Crack Filler 9000', specChemProduct: 'SpecPoxy 3000 FS' },
        { name: 'Tennant Eco-CEP', specChemProduct: 'SpecPoxy Coating' },
        { name: 'Tennant Eco-EJF System', specChemProduct: 'SpecPoxy C.J.' },
        { name: 'Vexcon Certi-Vex Epoxy Grout 100', specChemProduct: 'SpecPoxy Grout' },
        { name: 'Metzger/McGuire Armor-Hard', specChemProduct: 'SpecPoxy Mortar' },
        { name: 'DeNeef Denepox I-40', specChemProduct: 'SpecPoxy Sealer' },
        { name: 'TK-Epoxy Patch 211', specChemProduct: 'SpecPoxy 1000' },
        { name: 'TK-EPO 2000 Bonding Agent', specChemProduct: 'SpecPoxy 2000' },
        { name: 'Quikrete DOT Anchoring Epoxy', specChemProduct: 'SpecPoxy 3000' },
        { name: 'DeNeef Denepox Rapid Gel', specChemProduct: 'SpecSilane 20WB' },
        { name: 'Vexcon PowerCoat Epoxy HD', specChemProduct: 'SpecPoxy Coating' },
        { name: 'Metzer-McGuire MM-80, MM-80P', specChemProduct: 'SpecSilane 20WB' },
        { name: 'L&M Epogrout 758', specChemProduct: 'SpecPoxy Grout' },
        { name: 'Lambert Corp. Epiweld® 9-N-7', specChemProduct: 'SpecPoxy Mortar' },
        { name: 'Five Star Products Rapid Surface Repair R-60', specChemProduct: 'SpecPoxy Sealer' },
        { name: 'Five Star Strength Grout', specChemProduct: 'SC Precision Grout HS' },
        { name: 'Anti-Hydro Axpandcrete', specChemProduct: 'SC Metallic Grout' },
        { name: 'US Concrete Products HP Underwater Grout', specChemProduct: 'UW Grout' },
        { name: 'ChemMasters Met-OX Grout', specChemProduct: 'SC Metallic Grout' },
        { name: 'Vexcon Certi-Vex Grout UW', specChemProduct: 'UW Grout' },
        { name: 'Lambert Vibrapruf #11', specChemProduct: 'SC Multi-purpose Grout' },
        { name: 'Five Star High Strength UW Grout', specChemProduct: 'UW Grout' },
        { name: 'US Spec Dense Top', specChemProduct: 'Quartz Floor Hardener' },
        { name: 'Anti-Hydro S-Q Hardener', specChemProduct: 'Quartz Floor Hardener' },
        { name: 'US Spec 3-2-1', specChemProduct: 'SpecSmooth' },
        { name: 'Five Star Products Structural Concrete: Underwater HP', specChemProduct: 'RepCon UW Mortar' },
        { name: 'L&M Duraplug', specChemProduct: 'SpecPlug' },
        { name: 'Por, Rock, Super Por', specChemProduct: 'SpecRock' },
        { name: 'US Concrete Products US Thin Patch V/O 103', specChemProduct: 'SpecPatch 5' },
        { name: 'Vexcon Certi-Vex Patch', specChemProduct: 'SpecPoxy 2000' },
        { name: 'Ardex OVP™, TWP™', specChemProduct: 'SpecSmooth' },
        { name: 'US Spec H2', specChemProduct: 'SpecSilane 20WB' },
        { name: 'Cement All CTS Rapid Set', specChemProduct: 'RepCon 928' },
        { name: 'Vexcon Certi-Vex Patch UW', specChemProduct: 'RepCon UW Mortar' },
        { name: 'Lambco® Plug', specChemProduct: 'SpecPlug' },
        { name: 'Quikrete Anchoring Cement- Exterior Use', specChemProduct: 'SpecRock' },
        { name: 'Nox-Crete Panel Patch', specChemProduct: 'Final Finish' },
        { name: 'US Spec Quickset 20', specChemProduct: 'SpecPatch 5' },
        { name: 'L&M Duracrete', specChemProduct: 'SpecPatch 15' },
        { name: 'Conproco Conpro Set, Quick Shot', specChemProduct: 'RepCon H' },
        { name: 'Vexcon Certi-Vex Rapid Patch', specChemProduct: 'RepCon 928' },
        { name: 'Lyons Plug-Crete', specChemProduct: 'SpecPlug' },
        { name: 'Vexcon Certi-Vex Anchor Cement', specChemProduct: 'SpecRock' },
        { name: 'Pro Spec Feather Edge', specChemProduct: 'Final Finish' },
        { name: 'Vexcon Certi-Vex All Patch', specChemProduct: 'RevCrete' },
      ]},
  ];

  @Watch('$route', { immediate: true, deep: true })
   private onUrlChange(newVal: Route) {
      if (this.$route.path.includes('productname')) {
        if (this.$route.params.reload) {
          this.$router.push(this.$route.path + '/productname/' + this.$route.params.name + '/false');
        }

        this.GetSpecChemProduct(this.$route.params.name);
      } else if (this.$route.path.includes('crossoverchart')) {
        this.ResetPage();
      }
   }

  private showMenu(showMenu) {
    this.isShow = showMenu;
  }

  private ResetPage() {
    this.productSelected = false;
  }

  private GetCompetitorProducts(competitorName) {
    this.productsFound = false;
    if (this.competitorNameMatch === competitorName) {
      this.competitorNameMatch = '';
      return false;
    }

    const CompetitorProductItems = this.CompetitorProducts.find((e) => e.name === competitorName);
    this.competitorNameMatch = competitorName;
    if (CompetitorProductItems === undefined) {
        throw new Error('One of the params must be provided.');
    } else if (CompetitorProductItems !== undefined) {
        this.productsFound = true;
        this.Scroll(competitorName);
        this.CompetitorProductList = CompetitorProductItems.products.slice().sort((a, b) => {
          return (a.name > b.name) ? 1 : -1;
        });
    }
  }

  private GetSpecChemProductURL(specChemProductName: any) {
    this.$router.push(this.$route.path + '/productname/' + specChemProductName);
  }

  private GetSpecChemProduct(specChemProductName: any) {
    const SpecChemProductName = this.SpecChemProductIDs.find((e) => e.specChemProduct === specChemProductName);
    if (SpecChemProductName === undefined) {
        throw new Error('One of the params must be provided.');
    } else if (SpecChemProductName !== undefined) {
        this.productIDFound = true;
        const SpecChemProductID = SpecChemProductName.ID;
        this.GetProduct(SpecChemProductID, specChemProductName);
    }
  }

  private GetProduct(productID: any, productName: any) {
    this.isLoading = true;
    window.scrollTo(0, 0);
    this.productSelected = true;
    let circlePosition = 1;
    this.productName = productName.replace("_","/");
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
      });
  }

  private GetProductDescription(productID: any) {
    axios.get(this.getProductDescriptionURL + productID)
      .then((response: any) => {
        this.productDescription = response.data.description;
      });
  }

  private Scroll(elementid: any) {
    const element = document.getElementById(elementid);
    const bodyRect = document.body.getBoundingClientRect();
    const elemRect = element.getBoundingClientRect();
    const offset = elemRect.top - bodyRect.top;
    if (offset > 500) {
      const scrollToLocation = offset;
      setTimeout(() => window.scrollTo(0, scrollToLocation), 1);
    }
  }
}
</script>