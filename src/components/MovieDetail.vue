<template>
  <div class="detail">
    <div class="container-fluid">
    	<div class="row">
    		<div class="col">
    			<div class="boxImg">
    				<img :src="imgPath+movie.poster_path" alt="" class="img-fluid">
    			</div>
    			<div class="infos">
    				<h2>{{movie.title}}</h2>
    				<ul>
    					<li v-for="genre in movie.genres">
    						{{genre.name}}
    					</li>
    				</ul>
    				<p class="data">{{movie.release_date | filterDate}}</p>
    				<p class="overview">{{movie.overview}}</p>
    			</div>
    		</div>
    	</div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import VueAxios from 'vue-axios'
export default {
	name: 'MovieDetail',
	data () {
		return {
	      id: 0,
	      apiKey: 'c5850ed73901b8d268d0898a8a9d8bff',
	      imgPath: 'http://image.tmdb.org/t/p/w342',
	      movie: []
	    }
	},
  	methods: {
  		getInfos () {
	  		this.id = this.$route.params.id;
	  		let url = 'https://api.themoviedb.org/3/movie/' + this.id + '?api_key=' + this.apiKey + '&language=pt-BR';
	  		let t = this;
	  		axios.get(url)
	  		  .then(function (response) {
	  		    t.movie = response.data;
	  		  })
	  		  .catch(function (error) {
	  		    console.log(error);
	  		  });
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
	created () {
		this.getInfos();
	}
}
</script>