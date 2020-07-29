import Vue from 'vue'
import VueRouter from 'vue-router'
import PlaylistCreator from '../views/PlaylistCreator.vue'

Vue.use(VueRouter)

  const routes = [
  
  {
    path: '/createPlaylist',
    name: 'PlaylistCreator',
    component: PlaylistCreator
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
