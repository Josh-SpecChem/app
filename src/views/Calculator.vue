<template>
  <div class="calculatorMain">
    <CalculatorMain />
  </div>
</template>

<script>
// @ is an alias to /src
import CalculatorMain from '@/components/Calculator.vue';

export default {
  name: 'Calculator',
  components: {
    CalculatorMain,
  },
};
</script>