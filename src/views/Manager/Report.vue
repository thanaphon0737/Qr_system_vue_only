<template>
  <v-container>
    <v-card>
      <v-btn class="success" @click="fillData()">Refresh</v-btn>
      <LineChart
        style="height: 300px;"
        v-if="datacollection != null"
        :chartData="datacollection"
      />
      <BarChart
        style="height: 300px;"
        v-if="datacollection != null"
        :chartData="datacollection"
      />
    </v-card>
  </v-container>
</template>

<script>
import LineChart from "@/components/charts/LineChart";
import BarChart from "@/components/charts/BarChart";
import api from "@/services/api";

export default {
  components: {
    LineChart,
    BarChart,
  },
  data() {
    return {
      datacollection: null,
      fectchData: [],
      allYearNumber: 0 ,
      stYear:0,
      endYear:0,
    };
  },
  mounted() {
    this.loadData();
  },
  methods: {
    findMaxYear(years) {
      let max = years[0].year;
      years.forEach((elem) => {
        if (elem.year > max) {
          max = elem.year;
        }
      });
      return max;
    },
    findMinYear(years) {
      let min = years[0].year;
      years.forEach((elem) => {
        if (elem.year < min) {
          min = elem.year;
        }
      });
      return min;
    },
    async loadData() {
      const result = await api.getOrdersPriceAllYear();
      console.table(result.data);
      let years = result.data.map((o) => {
        return {
          year: o.Year,
        };
      });
      this.stYear = this.findMinYear(years)
      this.endYear = this.findMaxYear(years)
      this.allYearNumber = this.findMaxYear(years) - this.findMinYear(years) +1

      for (
        let yearSt = this.findMinYear(years); yearSt <= this.findMaxYear(years); yearSt++) {
          let slotYear = [];
            for (let i = 0; i < 12; i++) {
              slotYear.push(0);
            }
            result.data.forEach((elem) => {
              if(elem.Year == yearSt){
                slotYear[elem.Month - 1] = elem.totalPriceInMonth;
              }
            });
            this.fectchData.push(slotYear);
      }

      this.fillData();
      // console.table(this.fectchData);
    },

    generateDataset(){
      function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      }
      
      let data = {}
      let dataset = []
      let index_fD = 0
      for(let y = this.stYear; y<= this.endYear; y ++){
        dataset.push({
            label: y,
            pointBackgroundColor: "white",
            borderWidth: 1,
            pointBorderColor: getRandomColor().toString(),
            data: this.fectchData[index_fD++],

            borderColor: [getRandomColor().toString()],
            borderWidth: 2,
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
            ],

        })
      }
      return dataset
    },
    fillData() {
      this.datacollection = {
        //Data to be represented on x-axis
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ],
        datasets: this.generateDataset()
        // datasets: [
        //   {
        //     label: "2020",
        //     pointBackgroundColor: "white",
        //     borderWidth: 1,
        //     pointBorderColor: "#249EBF",
        //     data: this.fectchData[0],

        //     borderColor: ["#43A047"],
        //     borderWidth: 2,
        //     backgroundColor: [
        //       "rgba(255, 99, 132, 0.2)",
        //       "rgba(54, 162, 235, 0.2)",
        //       "rgba(255, 206, 86, 0.2)",
        //       "rgba(75, 192, 192, 0.2)",
        //       "rgba(153, 102, 255, 0.2)",
        //       "rgba(255, 159, 64, 0.2)",
        //       "rgba(255, 99, 132, 0.2)",
        //       "rgba(54, 162, 235, 0.2)",
        //       "rgba(255, 206, 86, 0.2)",
        //       "rgba(75, 192, 192, 0.2)",
        //       "rgba(153, 102, 255, 0.2)",
        //       "rgba(255, 159, 64, 0.2)",
        //     ],
        //   },

        //   {
        //     label: "2021",
        //     pointBackgroundColor: "white",
        //     borderWidth: 1,
        //     pointBorderColor: "#249EBF",
        //     data: this.fectchData[1],

        //     borderColor: ["#ff0000"],
        //     borderWidth: 2,
        //     backgroundColor: [
        //       "rgba(54, 162, 235, 0.2)",
        //       "rgba(255, 99, 132, 0.2)",
        //       "rgba(255, 206, 86, 0.2)",
        //       "rgba(75, 192, 192, 0.2)",
        //       "rgba(153, 102, 255, 0.2)",
        //       "rgba(255, 159, 64, 0.2)",
        //       "rgba(255, 99, 132, 0.2)",
        //       "rgba(54, 162, 235, 0.2)",
        //       "rgba(255, 206, 86, 0.2)",
        //       "rgba(75, 192, 192, 0.2)",
        //       "rgba(153, 102, 255, 0.2)",
        //       "rgba(255, 159, 64, 0.2)",
        //     ],
        //   },
        // ],
      };
    },
  },
};
</script>

<style>
.small {
  max-width: 600px;
  margin: 150px auto;
}
</style>
