<template>
  <div class="productSelectionContent">
    <div class="productSelection">
      <div class="headerMain">
        <h1>Select a Product</h1>
      </div>
      <Menu @showMenu="showMenu" v-if="isShow" />
      <div class="contentMain">
        <div class="contentInnerSP" v-if="!productSelected">
          <div class="button-white height75">
            <p class="blue bolder buttonText font24 padT15" v-on:click="CreateURL('curingcompound')">Curing Compound</p>
          </div>

          <div class="backgroundYellow100p padT5 alignLeft" v-if="curingCompound">
            <p class="paddingSelectProduct white nounderline font22" v-on:click="CuringCuring()">+ Curing</p>
            <div class="borderBottomFade">
              <img src="/img/bottom-border-fade.png" />
            </div>
            <p class="paddingSelectProduct white nounderline font22" v-on:click="CuringCuringAndSealing()">+ Curing and Sealing</p>
            <div class="borderBottomFade">
              <img src="/img/bottom-border-fade.png" />
            </div>
          </div>

          <div class="backgroundYellow100p padT5 alignLeft" v-if="curingCuring">
            <p class="paddingSelectProduct white nounderline font22" v-on:click="CuringCuringExterior()">+ Exterior</p>
            <div class="borderBottomFade">
              <img src="/img/bottom-border-fade.png" />
            </div>
            <p class="paddingSelectProduct white nounderline font22" v-on:click="CuringCuringInterior()">+ Interior</p>
            <div class="borderBottomFade">
              <img src="/img/bottom-border-fade.png" />
            </div>
          </div>

          <div class="backgroundYellow100p padT5 alignLeft" v-if="curingCuringInterior">
            <p class="paddingSelectProduct white nounderline font22" v-on:click="GetSpecChemProduct('E-Cure')">+ Water Base Emulsion</p>
            <div class="borderBottomFade">
              <img src="/img/bottom-border-fade.png" />
            </div>
            <p class="paddingSelectProduct white nounderline font22" v-on:click="GetSpecChemProduct('SpecRez')">+ Water Base Dissipating Resin</p>
            <div class="borderBottomFade">
              <img src="/img/bottom-border-fade.png" />
            </div>
          </div>

          <div class="backgroundYellow100p padT5 alignLeft" v-if="curingCuringExterior">
            <p class="paddingSelectProduct white nounderline font22" v-on:click="GetSpecChemProduct('Pave Cure WW')">+ White-pigmented Wax</p>
            <div class="borderBottomFade">
              <img src="/img/bottom-border-fade.png" />
            </div>
            <p class="paddingSelectProduct white nounderline font22" v-on:click="GetSpecChemProduct('Pave Cure Rez White')">+ White-pigmented Resin</p>
            <div class="borderBottomFade">
              <img src="/img/bottom-border-fade.png" />
            </div>
            <p class="paddingSelectProduct white nounderline font22" v-on:click="GetSpecChemProduct('Pave Cure CW')">+ Clear Wax</p>
            <div class="borderBottomFade">
              <img src="/img/bottom-border-fade.png" />
            </div>
            <p class="paddingSelectProduct white nounderline font22" v-on:click="GetSpecChemProduct('Pave Cure Rez')">+ Clear Resin</p>
            <div class="borderBottomFade">
              <img src="/img/bottom-border-fade.png" />
            </div>
          </div>

          <div class="backgroundYellow100p padT5 alignLeft" v-if="curingCuringAndSealing">
            <p class="paddingSelectProduct white nounderline font22" v-on:click="CuringCuringAndSealingWaterBaseEmulsion()">+ Water Base</p>
            <div class="borderBottomFade">
              <img src="/img/bottom-border-fade.png" />
            </div>
            <p class="paddingSelectProduct white nounderline font22" v-on:click="CuringCuringAndSealingSolventBaseEmulsion()">+ Solvent Base</p>
            <div class="borderBottomFade">
              <img src="/img/bottom-border-fade.png" />
            </div>
          </div>

          <div class="backgroundYellow100p padT5 alignLeft" v-if="curingCuringAndSealingWaterBaseEmulsion">
            <p class="paddingSelectProduct white nounderline font22" v-on:click="GetSpecChemProduct('Cure \& Seal WB')">+ Cure & Seal WB</p>
            <div class="borderBottomFade">
              <img src="/img/bottom-border-fade.png" />
            </div>
            <p class="paddingSelectProduct white nounderline font22" v-on:click="GetSpecChemProduct('Cure \& Seal WB 25')">+ Cure & Seal WB 25</p>
            <div class="borderBottomFade">
              <img src="/img/bottom-border-fade.png" />
            </div>
            <p class="paddingSelectProduct white nounderline font22" v-on:click="GetSpecChemProduct('Cure \& Seal WB 30')">+ Cure & Seal WB 30</p>
            <div class="borderBottomFade">
              <img src="/img/bottom-border-fade.png" />
            </div>
          </div>

          <div class="backgroundYellow100p padT5 alignLeft" v-if="curingCuringAndSealingSolventBaseEmulsion">
            <p class="paddingSelectProduct white nounderline font22" v-on:click="GetSpecChemProduct('Cure \& Seal 25')">+ Cure & Seal 25</p>
            <div class="borderBottomFade">
              <img src="/img/bottom-border-fade.png" />
            </div>
            <p class="paddingSelectProduct white nounderline font22" v-on:click="GetSpecChemProduct('Cure \& Seal 25 UV')">+ Cure & Seal 25 UV</p>
            <div class="borderBottomFade">
              <img src="/img/bottom-border-fade.png" />
            </div>
            <p class="paddingSelectProduct white nounderline font22" v-on:click="GetSpecChemProduct('Cure \& Seal 30')">+ Cure & Seal 30</p>
            <div class="borderBottomFade">
              <img src="/img/bottom-border-fade.png" />
            </div>
          </div>

          <div class="button-white height75">
            <p class="blue bolder buttonText font24 padT15" v-on:click="CreateURL('repairmortar')">Repair Mortar</p>
          </div>

          <div class="backgroundYellow100p padT5 alignLeft" v-if="repairMortar">
            <p class="paddingSelectProduct padL30 white nounderline font22" v-on:click="RepairMortarHorizontalRepair">+ Horizontal Repair</p>
            <div class="borderBottomFade">
              <img src="/img/bottom-border-fade.png" />
            </div>
            <p class="paddingSelectProduct padL30 white nounderline font22" v-on:click="RepairMortarVerticalOverheadRepair">+ Vertical/Overhead Repair</p>
            <div class="borderBottomFade">
              <img src="/img/bottom-border-fade.png" />
            </div>
          </div>

          <div class="backgroundYellow100p padT5 alignLeft" v-if="repairMortarHorizontalRepair">
            <p class="paddingSelectProduct white nounderline font22" v-on:click="GetSpecChemProduct('Duo Patch')">+ All Applications</p>
            <div class="borderBottomFade">
              <img src="/img/bottom-border-fade.png" />
            </div>
            <p class="paddingSelectProduct white nounderline font22" v-on:click="GetSpecChemProduct('SpecPatch 15')">+ Small Repairs</p>
            <div class="borderBottomFade">
              <img src="/img/bottom-border-fade.png" />
            </div>
            <p class="paddingSelectProduct white nounderline font22" v-on:click="GetSpecChemProduct('RepCon 928')">+ Rapid Setting 1/4" - 6"</p>
            <div class="borderBottomFade">
              <img src="/img/bottom-border-fade.png" />
            </div>
          </div>

          <div class="backgroundYellow100p padT5 alignLeft" v-if="repairMortarVerticalOverheadRepair">
            <p class="paddingSelectProduct white nounderline font22" v-on:click="RepairMortarVerticalRepair018">+ 0 - 1/8"</p>
            <div class="borderBottomFade">
              <img src="/img/bottom-border-fade.png" />
            </div>
            <p class="paddingSelectProduct white nounderline font22" v-on:click="GetSpecChemProduct('RepCon V/O')">+ 1/8" - 2"</p>
            <div class="borderBottomFade">
              <img src="/img/bottom-border-fade.png" />
            </div>
          </div>

          <div class="backgroundYellow100p padT5 alignLeft" v-if="repairMortarVerticalRepair018">
            <p class="paddingSelectProduct white nounderline font22" v-on:click="GetSpecChemProduct('Final Finish')">+ No Vehicular Traffic</p>
            <div class="borderBottomFade">
              <img src="/img/bottom-border-fade.png" />
            </div>
            <p class="paddingSelectProduct white nounderline font22" v-on:click="GetSpecChemProduct('SpecSmooth')">+ Receiving Vehicular Traffic</p>
            <div class="borderBottomFade">
              <img src="/img/bottom-border-fade.png" />
            </div>
          </div>

          <div class="button-white height75">
            <p class="blue bolder buttonText font22 padT5" v-on:click="CreateURL('groutanchor')">Grouting & Anchoring</p>
          </div>

          <div class="backgroundYellow100p padT5 alignLeft" v-if="groutAnchor">
            <p class="paddingSelectProduct white nounderline font22" v-on:click="GroutAnchorIndustrialHeavyDuty()">+ Industrial Heavy Duty</p>
            <div class="borderBottomFade">
              <img src="/img/bottom-border-fade.png" />
            </div>
            <p class="paddingSelectProduct white nounderline font22" v-on:click="GroutAnchorFastSettingAnchoring()">+ Fast Setting Anchoring</p>
            <div class="borderBottomFade">
              <img src="/img/bottom-border-fade.png" />
            </div>
          </div>

          <div class="backgroundYellow100p padT5 alignLeft" v-if="groutAnchorFastSettingAnchoring">
            <p class="paddingSelectProduct white nounderline font22" v-on:click="GetSpecChemProduct('SpecRock')">+ Hand Rails Belts Posts</p>
            <div class="borderBottomFade">
              <img src="/img/bottom-border-fade.png" />
            </div>
          </div>

          <div class="backgroundYellow100p padT5 alignLeft" v-if="groutAnchorIndustrialHeavyDuty">
            <p class="paddingSelectProduct white nounderline font22" v-on:click="GroutAnchorGeneralPurposeGroutAnchoring()">+ General Purpose Grout / Anchoring</p>
            <div class="borderBottomFade">
              <img src="/img/bottom-border-fade.png" />
            </div>
            <p class="paddingSelectProduct white nounderline font22" v-on:click="GetSpecChemProduct('SC Precision Grout')">+ Light Dynamic Loading, High Density, Precision Grouting</p>
            <div class="borderBottomFade">
              <img src="/img/bottom-border-fade.png" />
            </div>
            <p class="paddingSelectProduct white nounderline font22" v-on:click="GetSpecChemProduct('SpecPoxy Grout')">+ Heavy Duty Dynamic Loading, Chemical Resistence, Heavy Vibration, High Early Strength</p>
            <div class="borderBottomFade">
              <img src="/img/bottom-border-fade.png" />
            </div>
          </div>

          <div class="backgroundYellow100p padT5 alignLeft" v-if="groutAnchorGeneralPurposeGroutAnchoring">
            <p class="paddingSelectProduct white nounderline font22" v-on:click="GetSpecChemProduct('SC Multi-purpose Grout')">+ SC Multipurpose Grout</p>
            <div class="borderBottomFade">
              <img src="/img/bottom-border-fade.png" />
            </div>
            <p class="paddingSelectProduct white nounderline font22" v-on:click="GetSpecChemProduct('SC Metallic Grout')">+ SC Metallic Grout</p>
            <div class="borderBottomFade">
              <img src="/img/bottom-border-fade.png" />
            </div>
          </div>

          <div class="button-white height75">
            <p class="blue bolder buttonText font24 padT15" v-on:click="CreateURL('sealer')">Sealer</p>
          </div>

          <div class="backgroundYellow100p padT5 alignLeft" v-if="sealer">
            <p class="paddingSelectProduct white nounderline font22" v-on:click="SealerPenetratingSealer">+ Penetrating Sealer (Invisible)</p>
            <div class="borderBottomFade">
              <img src="/img/bottom-border-fade.png" />
            </div>
            <p class="paddingSelectProduct white nounderline font22" v-on:click="SealerMembraneSealer">+ Membrane Sealer (Gloss)</p>
            <div class="borderBottomFade">
              <img src="/img/bottom-border-fade.png" />
            </div>
          </div>

          <div class="backgroundYellow100p padT5 alignLeft" v-if="sealerPenetratingSealer">
            <p class="paddingSelectProduct white nounderline font22" v-on:click="GetSpecChemProduct('SpecShield WB')">+ Sealing Concrete or brick, stone, tile, etc</p>
            <div class="borderBottomFade">
              <img src="/img/bottom-border-fade.png" />
            </div>
            <p class="paddingSelectProduct white nounderline font22" v-on:click="GetSpecChemProduct('SpecHard')">+ Interior</p>
            <div class="borderBottomFade">
              <img src="/img/bottom-border-fade.png" />
            </div>
          </div>

          <div class="backgroundYellow100p padT5 alignLeft" v-if="sealerPenetratingSealerExterior">
            <p class="paddingSelectProduct white nounderline font22" v-on:click="GetSpecChemProduct('SpecShield WB')">+ Brick or Stone</p>
            <div class="borderBottomFade">
              <img src="/img/bottom-border-fade.png" />
            </div>
            <p class="paddingSelectProduct white nounderline font22" v-on:click="SealerPenetratingSealerExteriorConcrete">+ Concrete</p>
            <div class="borderBottomFade">
              <img src="/img/bottom-border-fade.png" />
            </div>
          </div>

          <div class="backgroundYellow100p padT5 alignLeft" v-if="sealerPenetratingSealerExteriorConcrete">
            <p class="paddingSelectProduct white nounderline font22" v-on:click="GetSpecChemProduct('SpecShield WB')">+ SpecShield WB</p>
            <div class="borderBottomFade">
              <img src="/img/bottom-border-fade.png" />
            </div>
            <p class="paddingSelectProduct white nounderline font22" v-on:click="SealerPenetratingSealerExteriorConcreteHeavyDeicingSalts">+ Heavy Deicing Salts</p>
            <div class="borderBottomFade">
              <img src="/img/bottom-border-fade.png" />
            </div>
          </div>

          <div class="backgroundYellow100p padT5 alignLeft" v-if="sealerPenetratingSealerExteriorConcreteHeavyDeicingSalts">
            <p class="paddingSelectProduct white nounderline font22" v-on:click="GetSpecChemProduct('SpecSilane 20')">+ SpecSilane 20</p>
            <div class="borderBottomFade">
              <img src="/img/bottom-border-fade.png" />
            </div>
            <p class="paddingSelectProduct white nounderline font22" v-on:click="GetSpecChemProduct('SpecSilane 40')">+ SpecSilane 40</p>
            <div class="borderBottomFade">
              <img src="/img/bottom-border-fade.png" />
            </div>
          </div>

          <div class="backgroundYellow100p padT5 alignLeft" v-if="sealerMembraneSealer">
            <p class="paddingSelectProduct white nounderline font22" v-on:click="SealerMembraneSealerWaterBased">+ Water Based</p>
            <div class="borderBottomFade">
              <img src="/img/bottom-border-fade.png" />
            </div>
            <p class="paddingSelectProduct white nounderline font22" v-on:click="SealerMembraneSealerSolventBased">+ Solvent Based</p>
            <div class="borderBottomFade">
              <img src="/img/bottom-border-fade.png" />
            </div>
          </div>

          <div class="backgroundYellow100p padT5 alignLeft" v-if="sealerMembraneSealerWaterBased">
            <p class="paddingSelectProduct white nounderline font22" v-on:click="GetSpecChemProduct('Aqua Shine')">+ Low Gloss Desired</p>
            <div class="borderBottomFade">
              <img src="/img/bottom-border-fade.png" />
            </div>
            <p class="paddingSelectProduct white nounderline font22" v-on:click="GetSpecChemProduct('Aqua Shine')">+ High Gloss Desired</p>
            <div class="borderBottomFade">
              <img src="/img/bottom-border-fade.png" />
            </div>
          </div>

          <div class="backgroundYellow100p padT5 alignLeft" v-if="sealerMembraneSealerSolventBased">
            <p class="paddingSelectProduct white nounderline font22" v-on:click="GetSpecChemProduct('Deco Shine')">+ Low Gloss Desired</p>
            <div class="borderBottomFade">
              <img src="/img/bottom-border-fade.png" />
            </div>
            <p class="paddingSelectProduct white nounderline font22" v-on:click="GetSpecChemProduct('Deco Shine')">+ High Gloss Desired</p>
            <div class="borderBottomFade">
              <img src="/img/bottom-border-fade.png" />
            </div>
          </div>

        </div>    

        <div v-if="productSelected">
          <div v-if="isLoading">
            <img src="/img/loading.gif" />
          </div>
          <div v-else>
            <div v-if="productNotFound">
              <p class="white nounderline font22">No Products Found</p>
            </div>
            <div v-else>
              <div class="productSheetHeader padL15 white bold">{{ categoryName }}</div>
              <div class="contentInnerSPProducts backgroundYellow">
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
export default class SelectProduct extends Vue {
  private isShow: boolean = false;
  private curingCompound: boolean = false;
  private curingCuring: boolean = false;
  private curingCuringInterior: boolean = false;
  private curingCuringExterior: boolean = false;
  private curingCuringAndSealing: boolean = false;
  private curingCuringAndSealingWaterBaseEmulsion: boolean = false;
  private curingCuringAndSealingSolventBaseEmulsion: boolean = false;

  private repairMortar: boolean = false;
  private repairMortarVerticalRepair018: boolean = false;
  private repairMortarHorizontalRepair: boolean = false;
  private repairMortarVerticalOverheadRepair: boolean = false;
  private repairMortarLightDynamicLoadingHDPrecisionGrouting: boolean = false;
  private repairMortarHDDynamicLoadingHighEarlyStrength: boolean = false;

  private groutAnchor: boolean = false;
  private groutAnchorGeneralPurposeGroutAnchoring: boolean = false;
  private groutAnchorFastSettingAnchoring: boolean = false;
  private groutAnchorIndustrialHeavyDuty: boolean = false;

  private sealer: boolean = false;
  private sealerPenetratingSealer: boolean = false;
  private sealerMembraneSealer: boolean = false;
  private sealerPenetratingSealerExteriorConcrete: boolean = false;
  private sealerPenetratingSealerExteriorConcreteHeavyDeicingSalts: boolean = false;
  private sealerMembraneSealerWaterBased: boolean = false;
  private sealerMembraneSealerSolventBased: boolean = false;

  private errorString: string = '';
  private finalString: string = '';
  private baseURL: string = 'https://www.specchemllc.com/';
  // private baseURL: string = 'https://specchem.hoenigwebdesign.com/pwa/';
  private getProduct: string = 'wp-json/specchem/v1/product/';
  private getProductURL: string = this.baseURL + this.getProduct;
  private getProductDescription: string = 'wp-json/wp/v2/products/';
  private getProductDescriptionURL: string = this.baseURL + this.getProductDescription;
  private productNotFound: boolean = false;
  private productSelected: boolean = false;
  private product: any = '';
  private productData: any = '';
  private productName: string = '';
  private productDescription: string = '';
  private chosenCategoryID: any = '';
  private competitorNameMatch: any = '';
  private CompetitorProductList: any = '';
  private productIDFound: boolean = false;
  private productID: any = '';
  private categoryName: any = '';
  private isLoading: boolean = false;
  private productCategoryLoaded: string = '';
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
      if (this.$route.path.includes('exterior')) {
        this.CuringCuringExterior();
      } else if (this.$route.path.includes('interior')) {
        this.CuringCuringInterior();
      } else if (this.$route.path.includes('curingcompound')) {
        this.CuringCompound();
      } else if (this.$route.path.includes('repairmortar')) {
        this.RepairMortar();
      } else if (this.$route.path.includes('groutanchor')) {
        this.GroutAnchor();
      } else if (this.$route.path.includes('sealer')) {
        this.Sealer();
      } else if (this.$route.path.includes('selectproduct')) {
        this.ResetAll();
      }
   }

  private CreateURL(pageName: any) {
    if (this.productCategoryLoaded === pageName) {
      this.productCategoryLoaded = '';
      this.$router.push('/selectproduct');
    } else {
      this.productCategoryLoaded = pageName;
      this.$router.push('/selectproduct/' + pageName);
    }
  }

  private mounted() {
    this.ResetAll();
  }

  private ResetAll() {
    this.ResetCuring();
    this.ResetRepairMortar();
    this.ResetGroutAnchor();
    this.ResetSealer();
    this.productSelected = false;
  }

  private showMenu(showMenu) {
    this.isShow = showMenu;
  }

  private ResetCuring() {
    this.curingCompound = false;
    this.sealerPenetratingSealer = false;
    this.sealerMembraneSealer = false;
    this.sealerPenetratingSealerExteriorConcrete = false;
    this.sealerPenetratingSealerExteriorConcreteHeavyDeicingSalts = false;
    this.sealerMembraneSealerWaterBased = false;
    this.sealerMembraneSealerSolventBased = false;
    this.groutAnchorIndustrialHeavyDuty = false;
    this.groutAnchorFastSettingAnchoring = false;
    this.groutAnchorGeneralPurposeGroutAnchoring = false;
    this.repairMortarVerticalRepair018 = false;
    this.repairMortarHorizontalRepair = false;
    this.repairMortarVerticalOverheadRepair = false;
    this.curingCuringAndSealingWaterBaseEmulsion = false;
    this.curingCuringAndSealingSolventBaseEmulsion = false;
    this.curingCuringInterior = false;
    this.curingCuringExterior = false;
    this.curingCuringAndSealing = false;
    this.curingCuring = false;
  }

  private CuringCompound() {
    this.ResetCuring();
    this.groutAnchor = false;
    this.sealer = false;
    this.repairMortar = false;
    this.curingCompound = true;
  }

  private CuringCuring() {
    this.ResetCuring();
    this.curingCuring = true;
  }

  private CuringCuringAndSealing() {
    this.ResetCuring();
    this.curingCuringAndSealing = true;
  }

  private CuringCuringExterior() {
    this.ResetCuring();
    this.curingCuringExterior = true;
  }

  private CuringCuringInterior() {
    this.ResetCuring();
    this.curingCuringInterior = true;
  }

  private CuringCuringAndSealingSolventBaseEmulsion() {
    this.ResetCuring();
    this.curingCuringAndSealingSolventBaseEmulsion = true;
  }

  private CuringCuringAndSealingWaterBaseEmulsion() {
    this.ResetCuring();
    this.curingCuringAndSealingWaterBaseEmulsion = true;
  }

  private ResetRepairMortar() {
    this.repairMortar = false;
    this.sealerPenetratingSealer = false;
    this.sealerMembraneSealer = false;
    this.sealerPenetratingSealerExteriorConcrete = false;
    this.sealerPenetratingSealerExteriorConcreteHeavyDeicingSalts = false;
    this.sealerMembraneSealerWaterBased = false;
    this.sealerMembraneSealerSolventBased = false;
    this.groutAnchorIndustrialHeavyDuty = false;
    this.groutAnchorFastSettingAnchoring = false;
    this.groutAnchorGeneralPurposeGroutAnchoring = false;
    this.repairMortarVerticalRepair018 = false;
    this.repairMortarHorizontalRepair = false;
    this.repairMortarVerticalOverheadRepair = false;
    this.curingCuringAndSealingWaterBaseEmulsion = false;
    this.curingCuringAndSealingSolventBaseEmulsion = false;
    this.curingCuringInterior = false;
    this.curingCuringExterior = false;
    this.curingCuringAndSealing = false;
    this.curingCuring = false;
  }

  private RepairMortar() {
    this.ResetRepairMortar();
    this.groutAnchor = false;
    this.sealer = false;
    this.curingCompound = false;
    this.repairMortar = true;
  }

  private RepairMortarVerticalRepair018() {
    this.ResetRepairMortar();
    this.repairMortarVerticalRepair018 = true;
  }

  private RepairMortarHorizontalRepair() {
    this.ResetRepairMortar();
    this.repairMortarHorizontalRepair = true;
  }

  private RepairMortarVerticalOverheadRepair() {
    this.ResetRepairMortar();
    this.repairMortarVerticalOverheadRepair = true;
  }

  private ResetGroutAnchor() {
    this.groutAnchor = false;
    this.sealerPenetratingSealer = false;
    this.sealerMembraneSealer = false;
    this.sealerPenetratingSealerExteriorConcrete = false;
    this.sealerPenetratingSealerExteriorConcreteHeavyDeicingSalts = false;
    this.sealerMembraneSealerWaterBased = false;
    this.sealerMembraneSealerSolventBased = false;
    this.groutAnchorIndustrialHeavyDuty = false;
    this.groutAnchorFastSettingAnchoring = false;
    this.groutAnchorGeneralPurposeGroutAnchoring = false;
    this.repairMortarVerticalRepair018 = false;
    this.repairMortarHorizontalRepair = false;
    this.repairMortarVerticalOverheadRepair = false;
    this.curingCuringAndSealingWaterBaseEmulsion = false;
    this.curingCuringAndSealingSolventBaseEmulsion = false;
    this.curingCuringInterior = false;
    this.curingCuringExterior = false;
    this.curingCuringAndSealing = false;
    this.curingCuring = false;
  }

  private GroutAnchor() {
    this.ResetGroutAnchor();
    this.repairMortar = false;
    this.sealer = false;
    this.curingCompound = false;
    this.groutAnchor = true;
  }

  private GroutAnchorIndustrialHeavyDuty() {
    this.ResetGroutAnchor();
    this.groutAnchorIndustrialHeavyDuty = true;
  }

  private GroutAnchorFastSettingAnchoring() {
    this.ResetGroutAnchor();
    this.groutAnchorFastSettingAnchoring = true;
  }

  private GroutAnchorGeneralPurposeGroutAnchoring() {
    this.ResetGroutAnchor();
    this.groutAnchorGeneralPurposeGroutAnchoring = true;
  }

  private ResetSealer() {
    this.sealer = false;
    this.sealerPenetratingSealer = false;
    this.sealerMembraneSealer = false;
    this.sealerPenetratingSealerExteriorConcrete = false;
    this.sealerPenetratingSealerExteriorConcreteHeavyDeicingSalts = false;
    this.sealerMembraneSealerWaterBased = false;
    this.sealerMembraneSealerSolventBased = false;
    this.groutAnchorIndustrialHeavyDuty = false;
    this.groutAnchorFastSettingAnchoring = false;
    this.groutAnchorGeneralPurposeGroutAnchoring = false;
    this.repairMortarVerticalRepair018 = false;
    this.repairMortarHorizontalRepair = false;
    this.repairMortarVerticalOverheadRepair = false;
    this.curingCuringAndSealingWaterBaseEmulsion = false;
    this.curingCuringAndSealingSolventBaseEmulsion = false;
    this.curingCuringInterior = false;
    this.curingCuringExterior = false;
    this.curingCuringAndSealing = false;
    this.curingCuring = false;
  }

  private Sealer() {
    this.ResetSealer();
    this.repairMortar = false;
    this.curingCompound = false;
    this.groutAnchor = false;
    this.sealer = true;
  }

  private SealerPenetratingSealer() {
    this.ResetSealer();
    this.sealerPenetratingSealer = true;
  }

  private SealerMembraneSealer() {
    this.ResetSealer();
    this.sealerMembraneSealer = true;
  }

  private SealerPenetratingSealerExteriorConcrete() {
    this.ResetSealer();
    this.sealerPenetratingSealerExteriorConcrete = true;
  }

  private SealerPenetratingSealerExteriorConcreteHeavyDeicingSalts() {
    this.ResetSealer();
    this.sealerPenetratingSealerExteriorConcreteHeavyDeicingSalts = true;
  }

  private SealerMembraneSealerWaterBased() {
    this.ResetSealer();
    this.sealerMembraneSealerWaterBased = true;
  }

  private SealerMembraneSealerSolventBased() {
    this.ResetSealer();
    this.sealerMembraneSealerSolventBased = true;
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
            const strLink = element.Link;
            element.Link = strLink.replace('http://', 'https://');
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