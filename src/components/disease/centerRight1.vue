<template>
  <div ref="right1_ref" class="right1"></div>
</template>

<script>
// 使用this.$echarts.xx鼠标悬浮样式失效,只能new echarts.xx
import * as echarts from "echarts";

export default {
  name: "centerRight1",
  data() {
    return {
      chartInstance: null,
      initOption: null
    }
  },
  methods: {
     initChart() {
       this.chartInstance = this.$echarts.init(this.$refs.right1_ref)
       let dataAxis = this.$store.state.rightOne.city
      let data = this.$store.state.rightOne.confirm
      // 防止点击缩放方法中this指向错误
      let that = this
      this.initOption = {
        animation:true,
        title: {
          text: '非湖北地区城市确诊人数TOP5',
          textStyle: {
            color: 'white',
            fontSize: 20
          },
        },
        xAxis: {
          data: dataAxis,
          axisLabel: {
            inside: true,
            color: '#fff'
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          z: 10
        },
        yAxis: {
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            color: 'white',
            fontSize: 12
          }
        },
        dataZoom: [
          {
            type: 'inside'
          }
        ],
        series: [
          {
            type: 'bar',
            showBackground: true,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#83bff6' },
                { offset: 0.5, color: '#188df0' },
                { offset: 1, color: '#188df0' }
              ])
            },
            emphasis: {
              itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: '#2378f7' },
                  { offset: 0.7, color: '#2378f7' },
                  { offset: 1, color: '#83bff6' }
                ])
              }
            },
            data: data
          }
        ]
      }
      const zoomSize = 6;
      that.chartInstance.on('click', function (params) {
        console.log(dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)]);
        that.chartInstance.dispatchAction({
          type: 'dataZoom',
          startValue: dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)],
          endValue:
              dataAxis[Math.min(params.dataIndex + zoomSize / 2, data.length - 1)]
        });
      },true);
      this.chartInstance.setOption(this.initOption,true)
    }
  },
  mounted() {
      this.initChart()
  },
  beforeDestroy() {
    // 销毁实例,释放资源
    this.chartInstance.dispose()
    this.chartInstance = null
  }
}
</script>

<style scoped>
.right1 {
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
