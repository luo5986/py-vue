<template>
  <dv-loading class="center" v-if="loading">Loading...</dv-loading>
  <div v-else style="width: 100%;height: 100%">
    <left1/>
    <left2/>
    <right/>
  </div>
</template>

<script>

import left1 from '../components/film/left1'
import right from '../components/film/right'
import {listFilm, listLast, listType} from "../api/py/film";
import left2 from "../components/film/left2";

export default {
  name: "film",
  components: {
    left1,
    left2,
    right
  },
  data() {
    return {
      loading:true,
    }
  },
  created() {
    this.init()
  },
  methods: {
    async init() {
      Promise.all([this.getLeft1(), this.getLeft2(),this.getRight()]).then(() => this.loading = false)
    },
    async getLeft1() {
      return new Promise((resolve, reject) => {
        listType().then(response => {
          this.$store.commit('initType', response)
          resolve()
        });
      })
    },
    async getRight() {
      return new Promise((resolve, reject) => {
        listFilm().then(response => {
          this.$store.commit('initFilm', response)
          resolve()
        });
      })
    },

    async getLeft2() {
      return new Promise((resolve, reject) => {
        listLast().then(response => {
          this.$store.commit('initLast', response)
          resolve()
        });
      })
    }
  }
}
</script>

<style scoped>
@import '../assets/css/film.css';
</style>
