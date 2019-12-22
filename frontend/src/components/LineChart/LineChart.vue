<script>
import { Line } from 'vue-chartjs'

export default {
  extends: Line,
  name: 'LineChart',
  props: ['data', 'options'],
  mounted () {
    this.data = [
      {
          x: new Date(),
          y: 1
      }, {
          t: new Date(),
          y: 10
      }, {
          t: new Date(),
          y: 10
      }, {
          t: new Date(),
          y: 10
      }, {
          t: new Date(),
          y: 10
      }, {
          t: new Date(),
          y: 10
      }
    ];
    // Overwriting base render method with actual data.
    this.renderChart({
      datasets: [
        {
          label: 'GitHub Commits',
          backgroundColor: '#f87979',
          data: this.data,
        }
      ]
    }, {
      responsive: true,
      maintainAspectRatio: false,
      legend: { 
        display: false,
      },
      title: {
        display: true,
        text: 'Custom Chart Title'
      },
      xAxes: [{
          type: 'time',
          time: {
              unit: 'second'
          }
      }],
      ...this.options
    })
  }
}
</script>

<style scoped>
canvas { height:200px; }
</style>
