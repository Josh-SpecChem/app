<template>
  <div class="calculatorPage">
    <div class="calculator">
      <div class="headerMain">
        <h1>{{ calculatorType }}</h1>
      </div>
      <Menu @showMenu="showMenu" v-if="isShow" />
      <div class="contentMain">        
        <div id="CalculatorOptions" v-if="showOptions">
          <div class="button-white padB25">
            <p @click="openEpoxy()" class="blue bolder buttonText font24">Epoxy</p>
          </div>
          <div class="button-white padB25">
            <p @click="openCementitous()" class="blue bolder buttonText font24">Cementitious</p>
          </div>
        </div>

        <div id="epoxyCalculator" v-if="showEpoxy">
          <p class="yellow font22 upper bolder alignLeft">Project Info Needed:</p>
          <div class="epoxyContentMain">
            <div class="row height50">
              <div class="rowText floatL padR12">
                <span class="white upper bolder font22">Bar Diameter</span>
              </div>
              <div class="selectSSm floatR padR5p">
                <input v-model="barDiameter" class="textSSm" onfocus="this.value=''" type="number" />
                <span class="yellow upper bolder">Inches</span>
              </div>
            </div>
            
            <div class="row height50">
                <div class="rowText floatL padR12">
                  <span class="white upper bolder font22">Hole Diameter</span>
                </div>
                <div class="selectSSm floatR padR5p">
                  <input v-model="holeDiameter" class="textSSm" onfocus="this.value=''" type="number" />
                  <span class="yellow upper bolder">Inches</span>
                </div>
            </div>

            <div class="row height75">
              <div class="rowText floatL padR8 width35">
                <span class="white upper bolder font22">Hole/Bar Depth*</span>
              </div>
              <div class="selectSSm floatR padR5p">
                <input v-model="depth" class="textSSm" onfocus="this.value=''" type="number" /><span class="yellow upper bolder">Inches</span>
              </div>
            </div>

            <div class="row height50">
              <div class="rowText floatL padR8">
                <span class="white upper bolder font22"># of Holes</span>
              </div>
              <div class="selectSSm floatR padR5p alignLeft">
                <input v-model="numberOfHoles" class="textSSm" onfocus="this.value=''" type="number" />
              </div>
            </div>

            <div class="row" style="margin-bottom: 10px;">
              <div class="rowText">
                <span class="yellow font14">* Typical minimum imbed = 10-15X bar diameter</span>
              </div>
            </div>
            
            <div class="row alignCenter">
              <div class="button-white">
                <p @click="calculateEpoxy($event)" class="blue bolder buttonText font28">Calculate</p>
              </div>
            </div>

            <div v-if="epoxyErrors.length" class="white" style="padding-top: 15px; text-align: left;">
              <b>Please correct the following error(s):</b>
              <ul>
                <li v-for="error in epoxyErrors" v-bind:key="error">{{ error }}</li>
              </ul>
            </div>
          </div>
        </div>

        <div id="epoxyCalculatorResults" v-if="showEpoxyResults">
          <p class="rowText yellow font28 bolder alignLeft">Results:</p>
          <div class="epoxyContentMain">
            <div class="row height100">
              <div class="rowText">                
                <div class="rowText white upper font22 bolder floatL padR25 width200">
                  Total Volume of Epoxy Needed: <br>
                  <span class="rowText yellow font20 upper">Gallons</span>
                </div>
                <div class="rowText yellow font28 bolder">{{ epoxyGallonsDisplay }}</div>
              </div>
            </div>

            <div class="row height100">
              <div class="rowText">               
                <div class="rowText white upper font22 bolder floatL padR25 width200">
                  Total Number of SpecPoxy 22 OZ Tubes Needed:
                </div>
                <div class="rowText yellow font28 bolder">{{ specPoxyTubesNeededDisplay }}</div>
              </div>
            </div>

            <div class="row" style="padding-bottom: 15px;">
              <div class="rowText">
                <span class="rowText yellow font20 bolder">This Does Not Include Waste Which Can Range From 10-15%</span>
              </div>
            </div>
            
            <div class="button-white">
              <p class="blue bolder buttonText font24 padT15"><router-link to="/calculator/epoxy">Start Over</router-link></p>
            </div>
          </div>
        </div>

        <div id="cementousCalculator" v-if="showCementous">
          <div class="cementitiousContentMain">
            <div class="row height50">
              <div class="rowText floatL padR12">
                <span class="white upper bolder font22">Length</span>
              </div>
              <div class="selectSSm floatR padR15">
                <input v-model="length" class="textSSm" onfocus="this.value=''" type="number" />
                <span class="yellow upper bolder">Feet</span>
              </div>
            </div>
            
            <div class="row height50">
              <div class="rowText floatL padR12">
                <span class="white upper bolder font22">Width</span>
              </div>
              <div class="selectSSm floatR padR15">
                <input v-model="width" class="textSSm" onfocus="this.value=''" type="number" />
                <span class="yellow upper bolder">Feet</span>
              </div>
            </div>

            <div class="row height50">
              <div class="rowText floatL padR12">
                <span class="white upper bolder font22">Depth</span>
              </div>
              <div class="selectSSm floatR padR15">
                <input v-model="depth" class="textSSm" onfocus="this.value=''" type="number" />
                <span class="yellow upper bolder">Inches</span>
              </div>
            </div>

            <div class="row height50">
              <div class="rowText floatL padR12">
                <span class="white upper bolder font22">Quantity</span>
              </div>
              <div class="selectSSm floatR padR15">
                  <input v-model="qty" class="textSSm" onfocus="this.value=''" type="number" />
              </div>
            </div>

            <div class="row height50">
              <div class="rowText floatL padR12">
                <span class="white upper bolder font22">Yield Per Bag</span>
              </div>
              <div class="rowAction">
                <div class="rowAction selectSSm floatR padR15">
                  <select v-model="yieldPerBag" @change="onChange($event)" v-if="!yieldOther">
                    <option value="0"></option>
                    <option value=".42">.42</option>
                    <option value=".45">.45</option>
                    <option value="other">other</option>
                  </select>
                </div>
                <input v-model="yieldPerBagOther" class="textMd" v-if="yieldOther" />
              </div>
            </div>
            
            <div class="row alignCenter">
              <div class="button-white">
                <p @click="calculateCementitous($event)" class="blue bolder buttonText font28">Calculate</p>
              </div>
            </div>

            <div v-if="cementitiousErrors.length" class="white" style="padding-top: 15px; text-align: left;">
              <b>Please correct the following error(s):</b>
              <ul>
                <li v-for="error in cementitiousErrors" v-bind:key="error">{{ error }}</li>
              </ul>
            </div>
          </div>
        </div>

        <div id="cementitiousCalculatorResults" v-if="showCementousResults">
          <p class="rowText yellow font28 bolder alignLeft">Results:</p>
          <div class="cementitiousContentMain">
            <div class="row height100">
              <div class="rowText">
                <div class="rowText white upper font26 bolder floatL padR25 width200">Total Cubic Feet:</div>
                <div class="rowText yellow font28 bolder">{{ totalCubicFeetDisplay }} <span class="rowText yellow font20 upper">Feet</span></div>
              </div>
            </div>

            <div class="row height125">
              <div class="rowText">
                <div class="rowText white upper font26 bolder floatL padR25 width200">Total Bags of Product Needed: </div>
                <div class="rowText yellow font28 bolder">{{ totalConcreteBagsDisplay }}</div>
              </div>
            </div>

            <div class="button-white">
              <p class="blue bolder buttonText font24 padT15"><router-link to="/calculator/cementitous">Start Over</router-link></p>
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
export default class Calculator extends Vue {
  @Prop() private msg!: string;
  private returnData: string = '';
  private showOptions: boolean = true;
  private showEpoxy: boolean = false;
  private showCementous: boolean = false;
  private showCementousResults: boolean = false;
  private showEpoxyResults: boolean = false;
  private barDiameter: number = 0;
  private holeDiameter: number = 0;
  private numberOfHoles: number = 0;
  private depth: number = 0;
  private length: number = 0;
  private width: number = 0;
  private yieldPerBag: number = 0;
  private qty: number = 0;
  private yieldPerBagOther: number = 0;
  private totalCubicFeetDisplay: number = 0;
  private totalConcreteBagsDisplay: number = 0;
  private epoxyGallonsDisplay: string = '';
  private specPoxyTubesNeededDisplay: string = '';
  private yieldOther: boolean = false;
  private isShow: boolean = false;
  private calculatorType: string = '';
  private cementitiousErrors: string[] = [];
  private epoxyErrors: string[] = [];

  @Watch('$route', { immediate: true, deep: true })
   private onUrlChange(newVal: Route) {
      if (this.$route.path.includes('calculateepoxy')) {
        this.doEpoxyCalculation();
      } else if (this.$route.path.includes('epoxy')) {
        this.showEpoxyInfo();
      } else if (this.$route.path.includes('calculatecementitous')) {
        this.doCementitousCalculation();
      } else if (this.$route.path.includes('cementitous')) {
        this.showCementousInfo();
      } else if (this.$route.path.includes('calculator')) {
        this.calculatorType = 'Calculators';
        this.openOptions();
      }
    }

  private showMenu(showMenu) {
    this.isShow = showMenu;
  }

  private onChange(event: any) {
    if (event.target.value === 'other') {
      this.yieldOther = true;
    }
  }

  private mounted() {
    this.showOptions = true;
    this.calculatorType = 'Calculators';
  }

  private openOptions() {
    this.showOptions = true;
    this.showEpoxy = false;
    this.showCementous = false;
  }

  private openEpoxy() {
    if (!this.$route.path.includes('epoxy')) {
       this.$router.push(this.$route.path + '/epoxy');
    } else {
      this.showEpoxyInfo();
    }
  }

  private showEpoxyInfo() {
    this.showOptions = false;
    this.showEpoxy = true;
    this.showCementous = false;
    this.showEpoxyResults = false;
    this.barDiameter = 0;
    this.holeDiameter = 0;
    this.numberOfHoles = 0;
    this.depth = 0;
    this.calculatorType = 'Epoxy Calculator';
  }

  private openCementitous() {
    if (!this.$route.path.includes('cementitous')) {
        this.$router.push(this.$route.path + '/cementitous');
    } else {
      this.showCementousInfo();
    }
  }

  private showCementousInfo() {
    this.showOptions = false;
    this.showEpoxy = false;
    this.showCementous = true;
    this.showCementousResults = false;
    this.length = 0;
    this.width = 0;
    this.depth = 0;
    this.qty = 0;
    this.yieldPerBagOther = 0;
    this.yieldPerBag = 0;
    this.calculatorType = 'Cementitious Calculator';
  }

  private calculateEpoxy(event) {
    this.checkEpoxyForm();

    if (this.epoxyErrors.length > 0) {
      event.preventDefault();
      return false;
    }

    this.$router.push(this.$route.path + '/calculateepoxy');
  }

  private doEpoxyCalculation() {
    this.showEpoxyResults = true;
    this.showEpoxy = false;

    const volumeOfHole = .785 * this.holeDiameter * this.holeDiameter * this.depth;
    const volumeOfBar = .785 * this.barDiameter * this.barDiameter * this.depth;
    const volumeOfAnnulus = volumeOfHole - volumeOfBar;
    const gallonsOfEpoxyPerHole = volumeOfAnnulus / 231;
    const numberOfHolesPerGallon = 1 /  gallonsOfEpoxyPerHole;
    const epoxyGallons = +Number(this.numberOfHoles *  gallonsOfEpoxyPerHole).toFixed(1);
    const specPoxyTubesNeededDisplay = Number(epoxyGallons * 6).toFixed(0);

    this.epoxyGallonsDisplay = epoxyGallons.toString();
    this.specPoxyTubesNeededDisplay = Math.floor(+specPoxyTubesNeededDisplay).toString();
  }

  private calculateCementitous(event) {
    this.checkCementitiousForm();

    if (this.cementitiousErrors.length > 0) {
      event.preventDefault();
      return false;
    }
    this.$router.push(this.$route.path + '/calculatecementitous');
  }

  private checkCementitiousForm() {
    this.cementitiousErrors = [];
    this.cementitiousErrors.length = 0;

    if (this.length && this.width && this.depth && this.qty && (Number(this.yieldPerBag)
        || Number(this.yieldPerBag) !== 0)) {
      return true;
    }

    if (this.yieldOther && Number(this.yieldPerBagOther) !== 0) {
      return true;
    }

    if (!this.length) {
      this.cementitiousErrors.push('Length required.');
    }
    if (!this.width) {
      this.cementitiousErrors.push('Width required.');
    }
    if (!this.depth) {
      this.cementitiousErrors.push('Depth required.');
    }
    if (!this.qty) {
      this.cementitiousErrors.push('Quantity required.');
    }
    if (!this.yieldOther) {
      if (Number(this.yieldPerBag) === 0) {
        this.cementitiousErrors.push('Yield required.');
      }
    } else {
      if (Number(this.yieldPerBagOther) === 0) {
        this.cementitiousErrors.push('Yield required.');
      }
    }
  }

  private checkEpoxyForm() {
    this.epoxyErrors = [];
    this.epoxyErrors.length = 0;

    if (this.barDiameter && this.holeDiameter && this.depth && this.numberOfHoles) {
      return true;
    }

    if (!this.barDiameter) {
      this.epoxyErrors.push('Bar Diameter required.');
    }
    if (!this.holeDiameter) {
      this.epoxyErrors.push('Hole Diameter required.');
    }
    if (!this.depth) {
      this.epoxyErrors.push('Depth required.');
    }
    if (!this.numberOfHoles) {
      this.epoxyErrors.push('Number of Holes required.');
    }
  }

  private doCementitousCalculation() {
    this.showCementousResults = true;
    this.showCementous = false;
    let selectedYieldPerBag = 0;

    if (!this.yieldOther) {
      selectedYieldPerBag = this.yieldPerBag;
    } else {
      selectedYieldPerBag = this.yieldPerBagOther;
    }

    const cubicFeet = Number(((this.length * 12) * (this.width * 12) * this.depth) / 1728).toFixed(2);
    const cubicYards = Number(+cubicFeet * this.qty).toFixed(2);
    const bagsNeeded = Number(+cubicYards / selectedYieldPerBag).toFixed(2);

    this.totalCubicFeetDisplay = +cubicYards;
    this.totalConcreteBagsDisplay = +bagsNeeded;
  }
}
</script>