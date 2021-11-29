<template>
  <div ref="left2_ref" class="left2"></div>
</template>

<script>
export default {
  name: "centerLeft2",
  data() {
    return {
      chartInstance: null,
      initOption: null
    }
  },
  activated() {
    // 由于给echart添加了resize事件, 在组件激活时需要重新resize绘画一次, 否则出现空白bug
    // if (this.chartInstance) {
    //   this.chartInstance.resize()
    // }
  },
  methods: {
    updateChart(data) {
      this.initOption.xAxis[0].data = data.day
      this.initOption.series[0].data = data.confirm_add
      this.initOption.series[1].data = data.suspect_add
      this.chartInstance.setOption(this.initOption)

    },
    async initChart() {
      this.chartInstance = this.$echarts.init(this.$refs.left2_ref);
      this.initOption = {
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
          data: ['新增确诊', '新增疑似'],
          left: "right",
          textStyle: {
            color: 'white',
          }
        },
        //标题样式
        title: {
          text: "全国新增趋势",
          textStyle: {
            color: 'white',
            fontSize: 20
          },
          left: 'left'
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
          //x轴坐标点开始与结束点位置都不在最边缘
          boundaryGap : true,
          axisLabel:{
            color:"white"
          },
          data: []
        }],
        yAxis: [{
          type: 'value',
          //y轴字体设置

          //y轴线设置显示
          axisLine: {
            show: true
          },
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
          name: "新增确诊",
          type: 'line',
          smooth: true,
          data: []
        }, {
          name: "新增疑似",
          type: 'line',
          smooth: true,
          data: []
        }]
      };
      this.chartInstance.setOption(this.initOption)
    }
  },
  mounted() {
      this.initChart()
      this.updateChart(this.$store.state.leftTwo)
  },
  beforeDestroy() {
      // 销毁实例,释放资源
      this.chartInstance.dispose()
      this.chartInstance = null
  }
}
</script>

<style scoped>
.left2 {
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
