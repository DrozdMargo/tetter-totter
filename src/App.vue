<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <h3 class="title">Insider’s Teeter Totter</h3>
      </div>

      <v-spacer></v-spacer>
    </v-app-bar>

    <v-main>
      <GameContent/>
    </v-main>
  </v-app>
</template>

<script>
import GameContent from './components/GameContent.vue';

export default {
  name: 'App',

  components: {
    GameContent,
  },

  data: () => ({
    //
  }),
};
</script>
