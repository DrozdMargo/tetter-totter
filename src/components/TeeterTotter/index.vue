<template>
  <div class="teeter-totter pt-10 mt-10">
    <LinePart/>
    <div class="base-triangle"></div>
  </div>
</template>

<script>
import LinePart from '@/components/TeeterTotter/Line.vue';

export default {
  name: 'TeeterTotter',
  components: {
    LinePart,
  },
};
</script>

<style lang="scss" scoped>
.teeter-totter {
  position: relative;

  .base-triangle {
    border-style: solid;
    border-width: 0 60px 130px 60px;
    width: 0;
    height: 0;
    margin: 0 auto;
    border-color: transparent transparent #363636 transparent;
  }
}

</style>
