<template>
  <div class="home">
    <div id="main" style="width: 400px;height: 300px;background-color: aquamarine"></div>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import * as echarts from 'echarts'
import {listFilm} from "../api/py/film";

export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  data() {
    return {
      queryParams: '',
      filmList: '',
      option : {
        backgroundColor: '#2c343c',
        title: {
          text: 'Customized Pie',
          left: 'center',
          top: 20,
          textStyle: {
            color: '#ccc'
          }
        },
        tooltip: {
          trigger: 'item'
        },
        visualMap: {
          show: false,
          min: 1,
          max: 120000,
          inRange: {
            colorLightness: [0, 1]
          }
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: '55%',
            center: ['50%', '50%'],
            data: [
              { value: 335, name: '剧情' },
              { value: 310, name: '动作' },
              { value: 274, name: '动画' },
              { value: 235, name: '喜剧' },
              { value: 400, name: '惊悚' },
              { value: 335, name: '战争' },
              { value: 310, name: '爱情' },
              { value: 274, name: '科幻' },
              { value: 235, name: '纪录片' }
            ].sort(function (a, b) {
              return a.value - b.value;
            }),
            roseType: 'radius',
            label: {
              color: 'rgba(255, 255, 255, 0.3)'
            },
            labelLine: {
              lineStyle: {
                color: 'rgba(255, 255, 255, 0.3)'
              },
              smooth: 0.2,
              length: 10,
              length2: 20
            },
            itemStyle: {
              color: '#c23531',
              shadowBlur: 200,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            },
            animationType: 'scale',
            animationEasing: 'elasticOut',
            animationDelay: function (idx) {
              return Math.random() * 200;
            }
          }
        ]
      },
      chartPie: null
    }
  },
  mounted() {
    this.initFilm()
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      console.log(111)
      listFilm(this.queryParams).then(response => {
        console.log(response)
        this.filmList = response.data;
      });
    },
    initFilm() {
      this.chartPie = echarts.init(document.getElementById('main'))
      this.chartPie.setOption(this.option)
      window.addEventListener('resize', () => {
        this.chartPie.resize()
      })
    }
  }
}
</script>
