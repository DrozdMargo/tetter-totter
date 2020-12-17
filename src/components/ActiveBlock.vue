<template>
  <BlockArea :class="isStart ? 'active-block' : ''" :block="activeBlock" :top="top" :key="activeBlock.shape"
             v-if="activeBlock"/>
</template>

<script>
import { mapGetters, mapState, mapActions } from 'vuex';
import BlockArea from '@/components/BlockArea.vue';

export default {
  name: 'ActiveBlock',
  components: { BlockArea },
  data() {
    return {
      top: -250,
      interval: null
    };
  },
  computed: {
    ...mapGetters(['angleTilt']),
    ...mapState(['activeBlock', 'isStart']),
  },
  methods: {
    ...mapActions(['finishedMoveBlock']),
    toggleTimer() {
      if (this.isStart && this.top === 0) {
        clearInterval(this.interval);
      } else {
        this.interval = setInterval(this.incrementTime, 300);
      }
    },
    incrementTime() {
      if(this.top < 0) {
        this.top = this.top + 10;
      }
      console.log(this.top);
      if(this.top === 0) {
        clearInterval(this.interval);
        this.finishedMoveBlock();
        this.top = -250
      }
    },
  },
  watch: {
    isStart() {
      this.toggleTimer();
    }
  }
};
</script>

<style lang="scss" scoped>
@keyframes box {
  from {
    top: -250px;
  }
  to {
    top: 0;
  }
}

//.active-block {
//  top: -250px;
//  animation: box 7s ease-in-out;
//}

</style>
