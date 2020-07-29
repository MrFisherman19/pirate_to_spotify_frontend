<template>
  <v-app>
    <v-app-bar app color="#23D061" dark>
        <v-toolbar-title>
          Playlist Creator
        </v-toolbar-title>
      </v-app-bar>
    <v-main>
        <PlaylistCreator></PlaylistCreator>
    </v-main>
  </v-app>
</template>
<script>
import PlaylistCreator from './views/PlaylistCreator'

export default {
  name: 'App',
  components: {
    PlaylistCreator,
  },
  data: () => ({
    //
  }),
};
</script>
