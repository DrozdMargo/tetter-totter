<template>
  <div class="line" ref="line" :style="lineRotate">
    <ActiveBlock/>
    <BlockArea v-for="block in reachedLeftBlocks" :block="block" :key="block.shape + block.weight*4"/>
    <BlockArea v-for="block in reachedRightBlocks" :right="true" :block="block" :key="block.shape + block.offset"/>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import BlockArea from '@/components/BlockArea.vue';
import ActiveBlock from '@/components/ActiveBlock.vue';

export default {
  name: 'LinePart',
  components: {
    BlockArea,
    ActiveBlock
  },
  computed: {
    ...mapGetters(['angleTilt']),
    ...mapState(['reachedLeftBlocks', 'reachedRightBlocks']),
    lineRotate() {
      return {
        transform: `rotate(${this.angleTilt / 2}deg)`,
      };
    },
  },
};
</script>
<style lang="scss">
.line {
  width: 100%;
  height: 8px;
  position: relative;
  background-color: #363636;
  transform: rotate(0deg);
  transition: transform 0.6s ease-in;
}
</style>
