<template>
  <div id="app">
    <div class="boxTop">
      <div class="container-fluid">
        <div class="row">
          <div class="col-auto mr-auto align-self-center">
            <router-link to="/" class="logo">Upcoming Movies</router-link>
          </div>
          <div class="col-auto align-self-center">
            <form class="form-inline">
              <div class="form-group">
                  <input type="text" class="form-control form-control-sm" id="search" placeholder="Digite o nome do filme" v-model="search">
                </div>
              <button type="submit" class="btn btn-outline-light btn-sm" @click.prevent="Search()"><i class="material-icons">search</i></button>
            </form>
          </div>
        </div>
      </div>
    </div>
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      search: ''
    }
  },
  methods: {
    Search (){
      this.$router.push({ name: 'Search', params: { query: this.search }})
    }
  }
}
</script>