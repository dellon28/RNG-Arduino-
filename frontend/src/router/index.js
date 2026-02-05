// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', name: 'Home', component: () => import('@/views/Home.vue'), meta:{ transition: 'fade'} },
  { path: '/intro', name: 'Intro', component: () => import('@/views/Intro.vue'), meta:{ transition: 'fade'} },
  { path: '/graph', name: 'Graph', component: () => import('@/views/Graph.vue'), meta:{ transition: 'fade'} },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router