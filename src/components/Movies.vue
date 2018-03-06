<template>
  <div class="movies">
    <div class="container-fluid">
      <div class="row">
        <div class="col">
          <transition-group name="list-item" tag="ul" class="list__ul">
            <li v-for="(movie,key) in movies" class="boxMovie" :class="'m'+key" @click='detailMovie(movie.id)' :key="movie.id">
              <div class="boxImg">
                <img :src="imgPath+movie.poster_path" alt="" class="img-fluid">
              </div>
              <div class="infos">
                <p class="title">{{movie.title}}</p>
                <p class="genre">{{listGenres(movie.genre_ids)}}</p>
                <p class="date">{{movie.release_date | filterDate}}</p>
              </div>
            </li>
          </transition-group>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <b-pagination align="right" :total-rows="totalPages" v-model="currentPage" :per-page="perPage" hide-goto-end-buttons hide-ellipsis></b-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import VueAxios from 'vue-axios'
export default {
  name: 'Movies',
  data () {
    return {
      apiKey: 'c5850ed73901b8d268d0898a8a9d8bff',
      movies: [],
      imgPath: 'http://image.tmdb.org/t/p/w342',
      genres: [],
      totalPages: 100,
      currentPage: 1,
      perPage: 3
    }
  },
  methods: {
    loadMovies () {
      let url = 'https://api.themoviedb.org/3/movie/upcoming?api_key=' + this.apiKey + '&language=pt-BR&page=' + this.currentPage;
      let t = this;
      t.movies = [];
      axios.get(url)
        .then(function (response) {
          t.movies = response.data.results;
          t.totalPages = response.data.total_pages;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    loadGenres () {
      let url = 'https://api.themoviedb.org/3/genre/movie/list?api_key=' + this.apiKey + '&language=pt-BR';
      let t = this;
      axios.get(url)
        .then(function (response) {
          t.genres = response.data.genres
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    detailMovie (id) {
      this.$router.push({ name: 'MovieDetail', params: { id: id }})
    },
    listGenres (grs) {
      var idL;
      var gen = '';
      for (var a = 0; a < grs.length; a++ ){
        idL = grs[a];
        for(var b = 0; b < this.genres.length; b++){
          if(idL == this.genres[b]['id']) {
            if(grs.length == 1) {
              gen = this.genres[b]['name']
            } else {
              if (a != grs.length-1){
                gen += this.genres[b]['name'] + ', ';
              } else {
                gen += this.genres[b]['name'];
              }
            }
            break;
          }
        }
      }
      return gen;
    },
  },
  filters: {
    filterDate (value) {
      if (!value) return ''
      value = value.split('-');
      value = value[2] + '/' + value[1] + '/' + value[0]
      return value;
    }
  },
  computed: {
  },
  watch: {
    currentPage: function(v) {
      this.currentPage = v;
      this.loadMovies();
    }
  },
  created(){
    this.loadMovies();
    this.loadGenres();
  },
}
</script>
