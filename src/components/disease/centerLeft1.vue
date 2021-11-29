<template>
  <div ref="left1_ref" class="left1"></div>
</template>

<script>
export default {
  name: "centerLeft1",
  data() {
    return {
      chartInstance: null,
      initOption: null
    }
  },
  methods: {
    updateChart(data) {
      this.initOption.xAxis[0].data = data.day
      this.initOption.series[0].data = data.confirm
      this.initOption.series[1].data = data.suspect
      this.initOption.series[2].data = data.heal
      this.initOption.series[3].data = data.dead
      this.chartInstance.clear()
      this.chartInstance.setOption(this.initOption)
    },
    async initChart() {
      this.chartInstance = this.$echarts.init(this.$refs.left1_ref);
      this.initOption = {
        //标题样式
        title: {
          text: "全国累计趋势",
          textStyle: {
            color: 'white',
            fontSize: 20
          },
          left: 'left'
        },
        tooltip: {
          trigger: 'axis',
          //指示器
          axisPointer: {
            type: 'line',
            lineStyle: {
              color: '#7171C6'
            }
          },
        },
        legend: {
          data: ['累计确诊', '现有疑似', "累计治愈", "累计死亡"],
          left: "right",
          textStyle: {
            color: 'white',
          }
        },

        //图形位置
        grid: {
          left: '0%',
          right: '2%',
          bottom: '4%',
          top: 50,
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          // x轴坐标点开始与结束点位置都不在最边缘
          boundaryGap : true,
          axisLabel:{
            color:"white"
          },
          data: []//['01.20', '01.21', '01.22']
        }],
        yAxis: [{
          type: 'value',
          //y轴字体设置
          axisLabel: {
            show: true,
            color: 'white',
            fontSize: 12,
            formatter: function (value) {
              if (value >= 1000) {
                value = value / 1000 + 'k';
              }
              return value;
            }
          },
          //y轴线设置显示
          axisLine: {
            show: true
          },
          //与x轴平行的线样式
          splitLine: {
            show: true,
            lineStyle: {
              color: '#17273B',
              width: 1,
              type: 'solid',
            }
          }
        }],
        series: [{
          name: "累计确诊",
          type: 'line',
          smooth: true,
          data: []//[260, 406, 529]
        }, {
          name: "现有疑似",
          type: 'line',
          smooth: true,
          data: []//[54, 37, 3935]
        },
          {
            name: "累计治愈",
            type: 'line',
            smooth: true,
            data: []//[25, 25, 25]
          }, {
            name: "累计死亡",
            type: 'line',
            smooth: true,
            data: []//[6, 9, 17]
          }]
      };
      this.chartInstance.setOption(this.initOption, true) // 设置true清空echart缓存
    }
  },
  mounted() {
    this.initChart()
    this.updateChart(this.$store.state.leftOne)
  },
  beforeDestroy() {
      // 销毁实例,释放资源
      this.chartInstance.dispose()
      this.chartInstance = null
  }
}
</script>

<style scoped>
.left1 {
  width: 90%;
  height: 97%;
  position: absolute;
  top: 3%;
  bottom: 0;
  right: 0;
  left: 0;
  margin: auto;
}
</style>
