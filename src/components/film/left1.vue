<template>
      <div id="l" >
        <dv-border-box10>
          <div ref="pie" class="inner"></div>
        </dv-border-box10>
      </div>
</template>

<script>

export default {
  name: 'left1',
  data() {
    return {
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
      this.chartInstance = this.$echarts.init(this.$refs.pie);
      this.initOption = {
        // backgroundColor: '#2c343c',
        title: {
          text: '电影类别',
          left: 'center',
          top: 20,
          textStyle: {
            color: '#ccc',
            fontSize: 30
          }
        },
        tooltip: {
          trigger: 'item'
        },
        visualMap: {
          show: false,
          min: 100000000,
          max: 2000000000,
          inRange: {
            colorLightness: [0, 1]
          }
        },
        series: [
          {
            name: '电影类别',
            type: 'pie',
            radius: '55%',
            center: ['50%', '50%'],
            data: this.$store.state.typeList,
            roseType: 'radius',
            label: {
              color: 'rgb(255,255,255)',
              fontSize: 20
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
      }
      this.chartInstance.setOption(this.initOption)
    }
  }
}
</script>

<style scoped>

</style>
