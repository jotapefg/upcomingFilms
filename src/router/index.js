import Vue from 'vue'
import Router from 'vue-router'
import Movies from '@/components/Movies'
import MovieDetail from '@/components/MovieDetail'
import Search from '@/components/Search'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Movies',
      component: Movies
    },
    {
      path: '/movie/:id',
      name: 'MovieDetail',
      component: MovieDetail
    },
    {
      path: '/search/:query',
      name: 'Search',
      component: Search
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
