<script>
import { Line, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  extends: Line,
  mixins: [reactiveProp],
  data() {
    return {
      options: {
        legend: {
          display: true
        },
        maintainAspectRatio: false,
         scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
                callback: function (value, index, values) {
                return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
              }
            },
            gridLines: {
              display: true
            }
          }],
          xAxes: [ {
            gridLines: {
              display: true
            }
          }]
        },
      }
    }
  }, 
  mounted () {
    // this.chartData is created in the mixin.
    // If you want to pass options please create a local options object
    this.renderChart(this.chartData, this.options)
  }
}
</script>

<style>
</style>