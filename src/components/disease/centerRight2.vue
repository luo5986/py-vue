<template>
  <div ref="right2_ref" class="right2"></div>
</template>

<script>
export default {
  name: "centerRight2",
  data() {
    return {
      chartInstance: null,
      initOption: null,
      dataMessage: null
    }
  },
  methods: {
    updateChart(data) {
      this.initOption.series[0].data = data.kws
      this.chartInstance.setOption(this.initOption);
    },
    async initChart() {
      this.chartInstance = this.$echarts.init(this.$refs.right2_ref)
      this.initOption = {
        title: {
          text: "今日热搜",
          textStyle: {
            color: 'white',
            fontSize: 20
          },
          left: 'left'
        },
        tooltip: {
          show: false
        },
        //图形位置
        grid: {
          left: '0%',
          right: '0%',
          bottom: '4%',
          top: 50,
          containLabel: true
        },
        series: [{
          type: 'wordCloud',
          gridSize: 1,
          sizeRange: [12, 55], //文字范围
          //文本旋转范围，文本将通过rotationStep45在[-90,90]范围内随机旋转
          rotationRange: [-45, 0, 45, 90],
          // rotationStep: 45,
          // textRotation: [0, 45, 90, -45],
          // //形状
          // shape: 'circle',
          textStyle: {
              color: function() { //文字颜色的随机色
                // return 'rgb(' + [
                // 	Math.round(Math.random() * 250),
                // 	Math.round(Math.random() * 250),
                // 	Math.round(Math.random() * 250)
                // ].join(',') + ')';
                return 'rgb(' +
                    Math.round(Math.random() * 255) +
                    ',' + Math.round(Math.random() * 255) +
                    ',' + Math.round(Math.random() * 255) + ')'
              }
          },
          right: null,
          bottom: null,
          data: []
        }]
      }
      this.chartInstance.setOption(this.initOption)
    }
  },
  mounted() {
    // 加上$nextTick防止没有图表加载过渡动画
    this.$nextTick(()=> {
      this.initChart()
      this.updateChart(this.$store.state.rightTwo)
      // 监听大小变化
      window.addEventListener('resize', this.chartInstance.resize());
      // 重绘图表
      this.chartInstance.resize()
    })
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.chartInstance.resize());
    // 销毁实例,释放资源
    this.chartInstance.dispose()
    this.chartInstance = null
  }
}
</script>

<style scoped>
.right2 {
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
