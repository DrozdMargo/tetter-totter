<template>
  <v-container class="fill-height">
    <v-row class="text-center">
      <v-col cols="12">
        <v-btn @click="runGame">Start</v-btn>
        <TeeterTotter/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex';
import TeeterTotter from '@/components/TeeterTotter/index.vue';
import { generateRandomBlock } from '@/helpers/functions';

export default {
  name: 'GameContent',
  components: {
    TeeterTotter,
  },
  mounted() {
    this.fillBlocks();
    this.$store.commit('setActiveBlock');
  },
  data: () => ({}),
  computed: {
    ...mapState(['leftSideBlocks', 'rightSideBlocks']),
  },
  methods: {
    runGame() {
      this.$store.commit('run', true);
      this.$store.commit('addReachedRightBlocks');
    },
    fillBlocks() {
      let left = [];
      let right = [];
      for(let i = 0; i < 10; i++) {
        left.push(generateRandomBlock())
        right.push(generateRandomBlock())
      }
      this.$store.commit('setRightBlocks', right);
      this.$store.commit('setLeftBlocks', left);
    }
  }
};
</script>
