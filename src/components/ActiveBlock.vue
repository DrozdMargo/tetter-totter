<template>
  <BlockArea :class="isStart ? 'active-block' : ''"
             :block="activeBlock"
             :top="topStart"
             :key="activeBlock.shape"
             v-if="activeBlock"/>
</template>

<script>
import { mapGetters, mapState, mapActions, mapMutations } from 'vuex';
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
      return this.topStart < 0 && this.activeBlock && this.isStart && !this.gameOver;
    },
  },
  methods: {
    ...mapActions(['finishedMoveBlock']),
    ...mapMutations(['setTopStart']),
    toggleTimer() {
      if (this.canMove) {
        this.interval = setInterval(this.incrementTime, 300);
      } else {
        clearInterval(this.interval);
      }
    },
    incrementTime() {
      if (this.canMove) {
        this.setTopStart(10);
      } else if (this.topStart === 0) {
        clearInterval(this.interval);
        this.finishedMoveBlock();
        this.setTopStart(-250);
      }
    },
    startMove() {
      if (this.canMove) {
        this.toggleTimer();
      } else {
        clearInterval(this.interval);
      }
    }
  },
  watch: {
    isStart() {
      this.startMove();
    },
    activeBlock() {
      this.startMove();
    },
  }
};
</script>
