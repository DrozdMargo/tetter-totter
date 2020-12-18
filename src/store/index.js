import Vue from 'vue';
import Vuex from 'vuex';
import { generateRandomBlock, getBlockPower } from '@/helpers/functions';

Vue.use(Vuex);

const MAX_ANGLE = 30;
const MIN_ANGLE = -30;
const WEIGHT_DIFFERENCE = 20;

export default new Vuex.Store({
  state: {
    rightSideBlocks: [],
    leftSideBlocks: [],
    reachedLeftBlocks: [],
    reachedRightBlocks: [],
    activeBlock: null,
    isStart: false,
    initialState: true,
    topStart: -250,
  },
  getters: {
    angleTilt(state, getters) {
      const {
        leftBlockPowerSum,
        rightBlockPowerSum
      } = getters;

      if (!leftBlockPowerSum || leftBlockPowerSum === rightBlockPowerSum) {
        return MAX_ANGLE;
      }
      return leftBlockPowerSum > rightBlockPowerSum ? (leftBlockPowerSum - rightBlockPowerSum) / leftBlockPowerSum * -100 : (rightBlockPowerSum - leftBlockPowerSum) / rightBlockPowerSum * 100;
    },

    leftBlockPowerSum(state) {
      return getBlockPower(state.reachedLeftBlocks);
    },
    rightBlockPowerSum(state) {
      return getBlockPower(state.reachedRightBlocks);
    },

    gameOver(state, getters) {
      const {
        leftBlockPowerSum,
        rightBlockPowerSum,
        angleTilt
      } = getters;

      if (state.reachedLeftBlocks.length === state.reachedRightBlocks.length) {
      }
      // return false;
      return angleTilt > MAX_ANGLE || angleTilt < MIN_ANGLE || Math.abs(leftBlockPowerSum - rightBlockPowerSum) > WEIGHT_DIFFERENCE;

    },
  },
  mutations: {
    run(state, value) {
      state.isStart = value;
    },
    setInitialState(state, value) {
      state.initialState = value;
    },
    setActiveBlock(state) {
      const block = state.leftSideBlocks.shift();
      state.activeBlock = Object.assign({}, block);
    },
    addReachedLeftBlocks(state) {
      if (state.activeBlock) {
        state.reachedLeftBlocks.push(state.activeBlock);
      }
    },
    addReachedRightBlocks(state) {
      const block = state.rightSideBlocks.shift();
      state.reachedRightBlocks.push(block);
    },
    setRightBlocks(state, blocks) {
      state.rightSideBlocks = blocks;
    },
    setLeftBlocks(state, blocks) {
      state.leftSideBlocks = blocks;
    },
    moveActiveBlockRight(state) {
      if (!state.isStart || state.activeBlock.offset - 1 <= 0) {
        return;
      }
      state.activeBlock.offset -= 1;
    },
    moveActiveBlockLeft(state) {
      if (!state.isStart || state.activeBlock.offset - 1 <= 0) {
        return;
      }
      state.activeBlock.offset += 1;
    },
    moveActiveBlockUp(state) {
      if (!state.isStart || state.activeBlock.top - 1 <= 0) {
        return;
      }
      state.activeBlock.top -= 10;
    },
    setTopStart(state, top) {
      if (!state.isStart || state.activeBlock.top - 1 <= 0) {
        return;
      }
      state.topStart += top;
    },
    initialBlocksSet(state, blocks) {
      let randomBlocks = [];
      for (let i = 0; i < 10; i++) {
        randomBlocks.push(generateRandomBlock());
      }
      state[blocks] = randomBlocks;
    },
    resetReachedLeftBlocks(state) {
      state.reachedLeftBlocks = [];
    },
    resetReachedRightBlocks(state) {
      state.reachedRightBlocks = [];
    },
    resetActiveBlock(state) {
      state.activeBlock = null;
    }
  },
  actions: {
    finishedMoveBlock({
      commit,
      state,
      getters,
      dispatch
    }) {
      console.log('finish', getters.gameOver);

      if (state.isStart && !getters.gameOver) {
        commit('addReachedLeftBlocks', state);
        commit('setActiveBlock');

        setTimeout(() => {
          commit('addReachedRightBlocks', state);

        }, 8000);
      }
    },
    restartGame({
      commit,
      state,
      getters,
      dispatch
    }) {
      commit('run', false);
      commit('resetReachedLeftBlocks', []);
      commit('resetReachedRightBlocks', []);
      commit('resetActiveBlock');
      commit('setInitialState', true);
      dispatch('initialization');
    },
    initialization({
      commit,
      state,
      getters,
      dispatch
    }) {
      commit('initialBlocksSet', 'leftSideBlocks');
      commit('initialBlocksSet', 'rightSideBlocks');
      commit('addReachedRightBlocks');
      commit('setActiveBlock');
      commit('setInitialState', false);
    }
  },
  modules: {},
});
