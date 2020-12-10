<template>
  <v-container>
    <v-card>
      <v-btn class="success" @click="fillData()">Refresh</v-btn>
      <LineChart style="height: 300px;" :chartData="datacollection" />
      <BarChart style="height: 300px;"  :chartData="datacollection" />
    </v-card>
  </v-container>
</template>

<script>
  import LineChart from '@/components/charts/LineChart'
  import BarChart from '@/components/charts/BarChart'


  export default {
    components: {
      LineChart,
      BarChart
    },
    data () {
      return {
        datacollection: null
      }
    },
    mounted () {
      this.fillData()
    },
    methods: {
    fillData () {
      this.datacollection = {
          //Data to be represented on x-axis
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
          datasets: [
            {
              label: '2019',
              pointBackgroundColor: 'white',
              borderWidth: 1,
              pointBorderColor: '#249EBF',
              data: this.getRandomInt(),

              borderColor: [
                '#43A047'
               ],
               borderWidth: 2,
               backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                 'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            },

              {
              label: '2019',
              pointBackgroundColor: 'white',
              borderWidth: 1,
              pointBorderColor: '#249EBF',
              data: this.getRandomInt(),

              borderColor: [
                '#ff0000'
               ],
               borderWidth: 2,
               backgroundColor: [
                 'rgba(54, 162, 235, 0.2)',
                'rgba(255, 99, 132, 0.2)',                
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                 'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            },
          ]};
          
      },
      getRandomInt () {
        let randoms = []
        for (let index = 0; index < 12; index++) {
          randoms.push(Math.floor(Math.random() * (50000 - 5 + 1)) + 5)
        }
        return randoms
      }
    }
  }
</script>

<style>
  .small {
    max-width: 600px;
    margin:  150px auto;
  }
</style>