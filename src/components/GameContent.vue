<template>
  <v-container class="fill-height">
    <v-dialog
      v-model="dialog"
      max-width="290"
    >
      <v-alert color="error" class="mb-0">
        Game Over. Try again!!!
      </v-alert>
    </v-dialog>

    <v-row class="text-center">
      <v-col cols="12">
        <v-btn @click="runGame" rounded color="primary">
          <v-icon v-if="!isStart">mdi-play</v-icon>
          <v-icon v-else>mdi-pause</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <TeeterTotter/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex';
import TeeterTotter from '@/components/TeeterTotter/index.vue';

export default {
  name: 'GameContent',
  components: {
    TeeterTotter,
  },
  mounted() {
    window.addEventListener('keydown', this.onKeyDown);
    this.initialization();
  },
  data: () => ({
    dialog: false,
  }),
  computed: {
    ...mapState(['isStart', 'initialState']),
    ...mapGetters(['gameOver']),
  },
  methods: {
    ...mapMutations(['moveActiveBlockLeft',
      'moveActiveBlockRight', 'moveActiveBlockUp', 'setInitialState', 'run']),
    ...mapActions(['restartGame', 'initialization']),
    runGame() {
      this.run(!this.isStart)
    },
    onKeyDown(ev) {
      if (ev.keyCode === 39) {
        this.moveActiveBlockRight();
      }
      if (ev.keyCode === 37) {
        this.moveActiveBlockLeft();
      }
      if (ev.keyCode === 38) {
        this.$store.commit('setTopStart', -20);
      }
      if (ev.keyCode === 40) {
        this.$store.commit('setTopStart', 30);
      }
    },
  },
  watch: {
    gameOver() {
      if (this.gameOver) {
        setTimeout(() => (this.restartGame()), 2000);
        this.dialog = true;
      }
    },
    dialog(val) {
      if (!val) return;

      setTimeout(() => (this.dialog = false), 2000);
    },
  },
  beforeDestroy() {
    window.removeEventListener('keydown', this.onKeyDown);
  }
};
</script>
