<template>
  <div :class="block.shape" :style="getBlockStyles">
    {{ block.weight }}
  </div>
</template>

<script>

import { mapGetters, mapState } from 'vuex';

export default {
  name: 'BlockArea',
  props: {
    block: {
      type: Object,
    },
    right: {
      type: Boolean,
      default: false,
    },
    top: {
      type: Number
    }
  },
  computed: {
    ...mapGetters(['angleTilt']),
    ...mapState(['isStart']),
    getBlockStyles() {
      const left = this.right ? 50 + this.block.offset * 10 : 50 - this.block.offset * 10;

      return {
        width: `${this.block.width}px`,
        height: `${this.block.width}px`,
        borderRightWidth: `${this.block.width / 2}px`,
        borderLeftWidth: `${this.block.width / 2}px`,
        borderBottomWidth: `${this.block.width}px`,
        left: `${left}%`,
        top: `${this.top}px`,
        // transform: `rotate(${this.angleTilt / 2}deg)`
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.circle, .rectangle, .triangle {
  position: absolute;
  transform: translate(-50%, -100%);
  text-align: center;
  //transition: .6s;
}

.circle {
  width: 50px;
  height: 50px;
  background-color: #c45fbb;
  border-radius: 50%;
}

.triangle {
  width: 0;
  height: 0;
  border-left: 50px solid transparent;
  border-right: 50px solid transparent;
  border-bottom: 100px solid #1edec7;
}

.rectangle {
  width: 50px;
  height: 50px;
  border-width: 0;
  background-color: #f5c338;
}
</style>
