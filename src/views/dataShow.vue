<template>
  <div id="index" ref="appRef">
    <dv-loading v-if="loading">Loading...</dv-loading>
    <div v-else class="bg">
      <div class="host-body">
        <div class="d-flex jc-center">
          <dv-decoration-10 class="dv-dec-10"/>
          <div class="d-flex jc-center">
            <dv-decoration-8 class="dv-dec-8" :color="['#568aea', '#000000']"/>
            <div class="title">
              <span class="title-text">大数据可视化平台</span>
              <dv-decoration-6
                  class="dv-dec-6"
                  :reverse="true"
                  :color="['#50e3c2', '#67a1e5']"
              />
            </div>
            <dv-decoration-8
                class="dv-dec-8"
                :reverse="true"
                :color="['#568aea', '#000000']"
            />
          </div>
          <dv-decoration-10 class="dv-dec-10-s"/>
        </div>

        <!-- 第二行 -->
        <div class="d-flex jc-between px-2">
          <div class="d-flex aside-width">
            <div class="react-left ml-4 react-l-s">
              <span class="react-before"></span>
              <span class="text"></span>
            </div>
            <div class="react-left ml-3 " :class="filmVis === true ? 'bg-color-blue' : 'normal'"  @click="showFilm()">
              <span class="text">电影实时大数据</span>
            </div>
          </div>
          <div class="d-flex aside-width">
            <div class="react-right mr-3" :class="disVis === true ? 'bg-color-blue' : 'normal'"  @click="showDis()">
              <span class="text fw-b">全国疫情实时追踪</span>
            </div>
            <div class="react-right mr-4 react-l-s">
              <span class="react-after"></span>
              <span class="text"
              >{{ dateYear }} {{ dateWeek }} {{ dateDay }}</span
              >
            </div>
          </div>
        </div>

        <disease ref="dis" v-if="disVis"/>

        <film ref="film" v-if="filmVis"/>

      </div>
    </div>
  </div>
</template>
<script>
import drawMixin from "../utils/drawMixin";
import {getTime} from "../api/py/time";
import disease from "./disease";
import film from "./film";
import {formatTime} from "../utils";


export default {
  components: {disease,film},
  mixins: [drawMixin],
  data() {
    return {
      filmVis:true,
      disVis: false,
      time: null,
      timing: null,
      loading: true,
      dateDay: null,
      dateYear: null,
      dateWeek: null,
      weekday: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
    }
  },
  mounted() {
    this.timeFn()
    this.cancelLoading()
  },
  beforeDestroy() {
    clearInterval(this.timing)
  },
  created() {

  },
  methods: {
    showFilm() {
      this.disVis = false
      this.filmVis = true

    },
    showDis() {
      this.filmVis = false
      this.disVis = true

    },
    timeFn() {
      // this.time =
      //     setInterval(() => {
      //       getTime().then(res => {
      //         this.timing = res.time
      //       })
      //     }, 1000)
      this.timing = setInterval(() => {
        this.dateDay = formatTime(new Date(), 'HH: mm: ss')
        this.dateYear = formatTime(new Date(), 'yyyy-MM-dd')
        this.dateWeek = this.weekday[new Date().getDay()]
      }, 1000)
    },
    cancelLoading() {
      setTimeout(() => {
        this.loading = false
      }, 500)
    },

  }
}
</script>

<style scoped lang="scss">
@import '../assets/css/index';
.normal{
  background-color: #0D1325;
  cursor: pointer;
}
.normal:hover{
  background-color: #1a5cd7;
}
</style>
