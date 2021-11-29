<template>
    <div class="com-chart" ref="map_ref" ></div>
</template>

<script>
import chinaMap from "@/assets/json/china.json";
export default {
  name: '',
  props: ["mapData"],
  data() {
    return {
      isActive: 0,
      chartInstance: null,
      allDataList: null,
      allDeadList: null,
      allNowDataList: null,
      allTodayCreadList: null,

      chinaTotal: null,
      chinaAdd: null,
    }
  },
  methods: {
    initMap() {
      // // 新建一个promise对象
      // let newPromise = new Promise((resolve => {
      //   resolve()
      // }))
      //     newPromise.then(() => {
      //   // 此dom为echarts图标展示dom
      //   this.chinaMap = echarts.init(document.getElementById('c2'),"dark")
      //   this.chinaMap.setOption(this.mapOption)
      //   window.addEventListener('resize', () => {
      //     this.chinaMap.resize()
      //   })
      // })

    },
    async initChart() {
      this.chartInstance = this.$echarts.init(this.$refs.map_ref)
      this.$echarts.registerMap("china", chinaMap );
      // const ret = await this.$http.get('./static/lib/china.json')
      // this.$echarts.registerMap('china', ret.data)

      const initOption = {
        tooltip: {
          triggerOn: 'mousemove',
          backgroundColor: 'rgba(50,50,50,0.7)',
          formatter: function (e) {
            return e.seriesName + '<br />' + e.name + '：' + (e.value || 0)
          },
          borderColor: 'rgba(255,255,255,0.2)',
          textStyle: {
            color: '#fff',
          },
        },
        geo: {
          map: 'china',
          roam: !1,
          zoom: 1.2,
          label: {
            normal: {
              show: !0,
              color: 'rgba(0,0,0,0.7)',
            },
          },
          itemStyle: {
            normal: {
              borderColor: 'rgba(0, 0, 0, 0.2)',
            },
            emphasis: {
              areaColor: '#f2d5ad',
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              borderWidth: 0,
            },
          },
        },
      }
      this.chartInstance.setOption(initOption)
    },
    updateChart(type, data) {
      const updateOption = {
        series: [
          {
            name: type,
            data: data,
            type: 'map',
            geoIndex: 0,
          },
        ],
      }
      this.chartInstance.setOption(updateOption)
    },
    screenAdapter() {
      const size = (this.$refs.map_ref.offsetWidth / 100) * 3.6
      const adaptOption = {
        geo: {
          label: {
            normal: {
              fontSize: size / 3,
            },
          },
        },
        visualMap: {
          min: 0,
          max: 1000,
          itemGap: size / 4,
          itemWidth: size / 2,
          itemHeight: size / 2,
          left: '2%',
          bottom: '2%',
          showLabel: !0,
          text: ['高', '低'],
          textStyle: {
            fontSize: size / 2,
            color: '#98999A',
          },
          pieces: [
            {
              gt: 10000,
              label: '> 1000 人',
              color: '#de1f05',
            },
            {
              gte: 1000,
              lte: 9999,
              label: '1000 - 9999 人',
              color: '#ff2736',
            },
            {
              gte: 500,
              lte: 999,
              label: '500 - 999 人',
              color: '#ff6341',
            },
            {
              gte: 100,
              lte: 499,
              label: '100 - 499 人',
              color: '#ffa577',
            },
            {
              gte: 10,
              lte: 99,
              label: '10 - 99 人',
              color: '#ffcea0',
            },
            {
              gte: 1,
              lte: 9,
              label: '1 - 9 人',
              color: '#ffe7b2',
            },
            {
              value: 0,
              label: '0 人',
              color: '#e2ebf4',
            },
          ],
          show: !0,
        },
      }
      this.chartInstance.setOption(adaptOption)
      this.chartInstance.resize()
    }
  },

  mounted() {
    this.initChart()
    this.updateChart('累计确诊', this.mapData)
    window.addEventListener('resize', this.screenAdapter)
    this.screenAdapter()
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.screenAdapter)
  },
}
</script>

<style scoped>

.com-chart {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
