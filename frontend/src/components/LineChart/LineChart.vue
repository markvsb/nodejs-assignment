<template>
    <div style="height: 300px;"><canvas ref="myLine"></canvas></div>
</template>

<script>
import Chart from "chart.js";
export default {
  props: ['chartId', 'graph', 'label', 'color'],
  data() {
    return {
      chart: null,
    };
  },
  mounted() {
    this.createChart();
  },
  methods: {
    createChart: function() {
      //const ctx = document.querySelector("#soc-chart");
      const ctx = this.$refs.myLine
      this.chart = new Chart(ctx, {
        type: "line",
        data: {
          datasets: [
            {
              label: this.label,
              backgroundColor: "transparent",
              borderColor: this.color,
              data: this.graph
            }
          ]
        },
        options: {
          elements: {
            point:{
              radius: 0
            }
          },
          scales: {
            yAxes: [
              {
                ticks: {
                  fontSize: 12
                }
              }
            ],
            xAxes: [
              {
                ticks: {
                  fontSize: 10
                },
                type: "time",
                time: {
                  stepSize: 20,
                  unit: "second",
                  displayFormats: {
                    second: "h:mm:ss a"
                  }
                },
                scaleLabel: {
                  display: true,
                  labelString: "Time"
                }
              }
            ]
          }
        }
      });
    }
  },
  watch: {
    graph: function () {
      this.chart.data.datasets[0].data = this.graph
      this.chart.update(0)
    }
  }
};
</script>

<style>
</style>