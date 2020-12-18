<template>
  <BlockArea :class="isStart ? 'active-block' : ''" :block="activeBlock" :top="topStart" :key="activeBlock.shape"
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
      interval: null
    };
  },
  computed: {
    ...mapGetters(['angleTilt', 'gameOver']),
    ...mapState(['activeBlock', 'isStart', 'topStart']),
    canMove() {
      return this.topStart < 0 && this.activeBlock && this.isStart && !this.gameOver
    }
  },
  methods: {
    ...mapActions(['finishedMoveBlock']),
    toggleTimer() {
      if (this.isStart && this.topStart < 0 && !this.gameOver) {
        this.interval = setInterval(this.incrementTime, 300);
      } else {
        clearInterval(this.interval);
      }
    },
    incrementTime() {
      if (this.canMove) {
        this.$store.commit('setTopStart', 10);
      } else if (this.topStart === 0) {
        clearInterval(this.interval);
        this.finishedMoveBlock();
        this.$store.commit('setTopStart', -250);
      }
      clearInterval(this.interval);
    },
  },
  watch: {
    isStart(newVal, oldVal) {
      if (newVal && !this.gameOver) {
        this.toggleTimer();
      } else {
        clearInterval(this.interval);
      }
    },
    activeBlock(newVal, oldVal) {
      console.log(this.isStart, ' activeblock');
      if (newVal && !this.gameOver) {
        this.toggleTimer();
      } else {
        clearInterval(this.interval);
      }
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
