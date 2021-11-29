<template>
      <div id="l-b" >
        <dv-border-box10>
          <div ref="line" class="inner"></div>
        </dv-border-box10>
      </div>
</template>

<script>

export default {
  name: 'left2',
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
      this.chartInstance = this.$echarts.init(this.$refs.line);
        const data = this.$store.state.lastList
        const dateList = data.map(function (item) {
          return item[0];
        });
        const valueList = data.map(function (item) {
          return item[1];
        });
        this.initOption = {
          // Make gradient line here
          visualMap:
              {
                show: false,
                type: 'continuous',
                seriesIndex: 0,
                min: 1000000,
                max: 200000000
              },

          title:
              {
                left: 'center',
                text: '近七天电影票房',
                top: 20,
                textStyle: {
                  color: '#ccc',
                  fontSize: 30
                }
              },

          tooltip: {
            trigger: 'axis'
          },

          xAxis:
              {
                data: dateList,
                axisLabel: {
                  color: 'white',
                  fontSize: 15
                },
              },

          yAxis:
              {
                axisLabel: {
                  color: 'white',
                  fontSize: 15
                },
              },
          grid:
              {
                left:'4%',
                right:'5%',
                bottom: '3%',
                top: 100,
                containLabel: true
              },

          series: [
            {
              type: 'line',
              showSymbol: false,
              data: valueList
            },

          ]
        }
      this.chartInstance.setOption(this.initOption)
    }
  }
}
</script>

<style scoped>

</style>
