<template>
  <div id="r">
    <dv-border-box10>
      <div ref="right" class="inner"></div>
    </dv-border-box10>
  </div>
</template>

<script>
export default {
  data() {
    return {
      filmList: null,
      typeList: this.$store.state.typeList,
      chartInstance: null,
      initOption: null,
    }
  },
  mounted() {
    this.initChart()
  },
  beforeDestroy() {
    // 销毁实例,释放资源
    this.chartInstance.dispose()
    this.chartInstance = null
  },
  methods: {
    initChart() {
      this.chartInstance = this.$echarts.init(this.$refs.right);
      this.initOption = {
        title: {
          text: '热门电影',
          left: 'center',
          top: 20,
          textStyle: {
            color: '#ccc',
            fontSize: 30
          }
        },
        dataset: {
          source: this.$store.state.filmList,
        },
        //图形位置
        grid: {
          left: '5%',
          bottom: '7%',
          top: 100,
          containLabel: true
        },
        xAxis: {
          name: '总票房',
          axisLabel: {
            color: 'white',
            fontSize: 15
          },
          // name样式设置
          nameLocation: 'center',
          nameTextStyle: {
            color: "white",
            fontSize: 20,
            padding: [15, 0, 0, 650]
          }
        },
        yAxis: {
          type: 'category',
          axisLabel: {
            show: true,
            color: 'white',
            fontSize: 20,
          },
        },
        visualMap: {
          textStyle: {
            color: '#ccc',
            fontSize: 20
          },
          orient: 'horizontal',
          left: 'center',
          min: 10000000,
          max: 6000000000,
          text: ['爆火', '热门'],
// Map the score column to color
          dimension: 0,
          inRange: {
            color: ['#65B581', '#FFCE34', '#FD665F']
          }
        },
        series: [
          {
            type: 'bar',
            encode: {
// Map the "amount" column to X axis.
              x: 'amount',
// Map the "product" column to Y axis
              y: 'product'
            }
          }
        ]
      }
      this.chartInstance.setOption(this.initOption)
    }
  }
}
</script>

<style scoped>

</style>
