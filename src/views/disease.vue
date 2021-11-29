<template>
  <div>
    <dv-loading class="center" v-if="loading">Loading...</dv-loading>
    <div v-else style="width: 100%;height: 100%">
    <div id="l1">
      <dv-border-box-12 :color="['#7691D9', '#161B63']">
        <centerLeft1/>
      </dv-border-box-12>
    </div>

    <div id="l2">
      <dv-border-box-8 :color="['#3C5687', '#7DABFB']">
        <centerLeft2/>
      </dv-border-box-8>
    </div>

    <dv-border-box-1 id="c1" :color="['#7691D9', '#161B63']">
      <div class="num" style="color: #f31c73"><h1>{{ centerOne.confirm }}</h1></div>
      <div class="num" style="color: #ff8d1a"><h1>{{ centerOne.suspect }}</h1></div>
      <div class="num" style="color: #35c5c8"><h1>{{ centerOne.heal }}</h1></div>
      <div class="num" style="color: #a9b9cb"><h1>{{ centerOne.dead }}</h1></div>
      <div class="txt"><h2>累计确诊</h2></div>
      <div class="txt"><h2>剩余疑似</h2></div>
      <div class="txt"><h2>累计治愈</h2></div>
      <div class="txt"><h2>累计死亡</h2></div>
      <dv-decoration-5  style="width:90%;height:25%;margin: auto" />
    </dv-border-box-1>

    <dv-border-box-11 id="c2" title="地图可视化">
      <!-- 地图 -->
      <div style="height: 120%;width: 100%" class="bgc-size flex">
        <div :class="[fullScreenStatus.map ? 'show_box h fullscreen' : 'show_box h',]">
          <myMap :mapData="mapData" ref="map"></myMap>
          <div
              @click="changeSize('map')"
              :class="[fullScreenStatus.map ? 'compress' : 'expand']"
          ></div>
        </div>
      </div>
    </dv-border-box-11>

    <div id="r1">
      <dv-border-box-12 :color="['#7691D9', '#161B63']">
        <centerRight1/>
      </dv-border-box-12>
    </div>

    <div id="r2">
      <dv-border-box-4 :reverse="true" :color="['#7691D9', '#161B63']">
        <centerRight2/>
      </dv-border-box-4>
    </div>

  </div>
  </div>
</template>

<script>
import {getCenterOne, getCenterTwo, getLeftOne, getLeftTwo, getRightOne, getRightTwo} from "../api/py/disease";
// import "/src/assets/js/china.js"
import myMap from '../components/Map'
import centerLeft1 from '../components/disease/centerLeft1'
import centerLeft2 from '../components/disease/centerLeft2'
import centerRight1 from '../components/disease/centerRight1'
import centerRight2 from "../components/disease/centerRight2";
import 'echarts-wordcloud';

export default {
  name: "disease",
  components: {
    myMap,
    centerLeft1,
    centerLeft2,
    centerRight1,
    centerRight2
  },
  data() {
    return {
      loading:true,
      mapData: [],
      centerOne: {},
      leftDataOne: {},
      fullScreenStatus: {
        map: false,
        month: false,
        top: false,
      },
    }
  },
  created() {
    this.init()
  },
  methods: {
    async init() {
      Promise.all([this.initCenterOne(), this.initCenterTwo(),
        this.initLeftOne(), this.initLeftTwo(), this.initRightOne(), this.initRightTwo()]).then(() => this.loading = false)
    },

    async initCenterOne() {
      return new Promise((resolve, reject) => {
        getCenterOne().then(res => {
          this.centerOne = res
          resolve()
        })
      })
    },

    async initCenterTwo() {
      return new Promise((resolve, reject) => {
        getCenterTwo().then(res => {
          this.mapData = res.data
          resolve()
        })
      })
    },

    async initLeftTwo() {
      return new Promise((resolve, reject) => {
        getLeftTwo().then(res => {
          this.$store.commit('initLeftTwo', res)
          resolve()
        })
      })
    },

    async initLeftOne() {
      return new Promise((resolve, reject) => {
        getLeftOne().then(res => {
          this.$store.commit('initLeftOne', res)
          resolve()
        })
      })
    },

    async initRightOne() {
      return new Promise((resolve, reject) => {
        getRightOne().then(res => {
          this.$store.commit('initRightOne', res)
          resolve()
        })
      })
    },

    async initRightTwo() {
      return new Promise((resolve, reject) => {
        getRightTwo().then(res => {
          this.$store.commit('initRightTwo', res)
          resolve()
        })
      })
    },

    changeSize(type) {
      this.fullScreenStatus[type] = !this.fullScreenStatus[type]
      this.$nextTick(() => {
        this.$refs[type].screenAdapter()
      })
    }
  }
}
</script>

<style scoped lang="scss">
@import '../assets/css/main.css';

.bgc-size {
  width: 99%;
  padding: 5px 5%;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: top center;
  overflow: hidden;
}

.flex {
  flex: 1;
}

.h {
  height: 90%;
}

.expand,
.compress {
  position: absolute;
  width: 30px;
  height: 30px;
  background-image: url(../assets/expand.png);
  background-size: 100%;
  right: 0;
  top: 8%;
  cursor: pointer;
}

.compress {
  background-image: url(../assets/compress.png);
}

.fullscreen {
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
  width: 100% !important;
  height: 100% !important;
  margin: 0 !important;
  z-index: 1000;
  background-image: url(../assets/pageBg.png);
}

.show_box {
  position: relative;
  border-radius: 0 0 10px 10px;
  overflow: auto;
  height: 85%;
  width: 100%;
}

.show_box::-webkit-scrollbar {
  width: 0 !important;
}

</style>

