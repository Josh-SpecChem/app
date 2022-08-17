<template>
  <div class="calculatorEpoxy">
    <CalculatorEpoxy />
  </div>
</template>

<script>
// @ is an alias to /src
import CalculatorEpoxy from '@/components/Calculator-Epoxy.vue';

export default {
  name: 'CalculatorEpoxy',
  components: {
    CalculatorEpoxy,
  },
};
</script>