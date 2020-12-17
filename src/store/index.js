import Vue from 'vue';
import Vuex from 'vuex';
import { generateRandomBlock } from '@/helpers/functions';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    rightSideBlocks: [],
    leftSideBlocks: [],
    reachedLeftBlocks: [],
    reachedRightBlocks: [],
    activeBlock: null,
    isStart: false,
  },
  getters: {
    angleTilt() {
      return 15;
    },
  },
  mutations: {
    run(state, value) {
      state.isStart = value;
    },
    setActiveBlock(state) {
      const block = state.leftSideBlocks.shift()
      state.activeBlock = Object.assign({}, block);
    },
    addReachedLeftBlocks(state) {
      console.log(state.activeBlock, 'state.activeBlock')
      state.reachedLeftBlocks.push(state.activeBlock);
    },
    addReachedRightBlocks(state) {
      const block = state.rightSideBlocks.shift()
      state.reachedRightBlocks.push(block);
    },
    setRightBlocks(state, blocks) {
      state.rightSideBlocks.push(...blocks);
    },
    setLeftBlocks(state, blocks) {
      state.leftSideBlocks.push(...blocks);
    }
  },
  actions: {
    finishedMoveBlock({commit, state, getters, dispatch}) {
      console.log('finish')
      commit('addReachedRightBlocks', state);
      commit('addReachedLeftBlocks', state);
      // commit(ADD_FALLING_BLOCK);
      // if (state.leftSideBlocks.length && state.leftSideBlocks.length !== state.rightSideBlocks.length)
      //   commit(ADD_RIGHT_SIDE_BLOCK);
      //
      // if (getters.gameOverStatus) setTimeout(() => {
      //   alert('game over');
      //   dispatch(START_NEW_GAME);
      // }, 0);
    },
  },
  modules: {
  },
});
