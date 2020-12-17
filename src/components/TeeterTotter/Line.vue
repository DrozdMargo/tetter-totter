<template>
  <div class="line" ref="line" :style="lineRotate">
    <ActiveBlock/>
    <BlockArea v-for="block in reachedLeftBlocks" :block="block" :key="block.shape"/>
    <BlockArea v-for="block in reachedRightBlocks" :right="true" :block="block" :key="block.shape"/>
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
    // blockFinalPosition() {
    //   const {
    //     top,
    //     bottom
    //   } = this.getSwingCoords();
    //   console.log(top, bottom);
    //   return this.angleTilt >= 0 ? top + ((bottom - top) / 2) * (1 - this.block.offset / (10 / 2))
    //     : bottom - ((bottom - top) / 2) * (1 - this.block.offset / (10 / 2));
    // },
    lineRotate() {
      return {
        transform: `rotate(${this.angleTilt / 2}deg)`,
      };
    },
  },
  // mounted() {
  //   this.$nextTick(()=>{
  //     console.log(this.$el.getBoundingClientRect().top) //get height
  //   })
  // },
  methods: {
    getSwingCoords() {
      // console.log(this.$el)
      // const {
      //   top,
      //   bottom
      // } = this.$el.getBoundingClientRect();
      // return {
      //   top,
      //   bottom
      // };
    },
  }
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
