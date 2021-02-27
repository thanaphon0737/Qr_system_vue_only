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
        v-if="databar != null"
        :chartData="databar"
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
      databar: null,
      fectchData: [],
      allProduct: [],
      allYearNumber: 0,
      stYear: 0,
      endYear: 0,
    };
  },
  mounted() {
    this.loadData();
  },
  methods: {
    getRandomColor() {
      var letters = "0123456789ABCDEF";
      var color = "#";
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    },
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
      let years = result.data.map((o) => {
        return {
          year: o.Year,
        };
      });
      this.stYear = this.findMinYear(years);
      this.endYear = this.findMaxYear(years);
      this.allYearNumber =
        this.findMaxYear(years) - this.findMinYear(years) + 1;

      for (
        let yearSt = this.findMinYear(years);
        yearSt <= this.findMaxYear(years);
        yearSt++
      ) {
        let slotYear = [];
        for (let i = 0; i < 12; i++) {
          slotYear.push(0);
        }
        result.data.forEach((elem) => {
          if (elem.Year == yearSt) {
            slotYear[elem.Month - 1] = elem.totalPriceInMonth;
          }
        });
        this.fectchData.push(slotYear);
      }

      this.allProduct = await this.getAllProduct();
      this.fillData();
      // console.table(this.fectchData);
    },

    generateDataset() {
      let data = {};
      let dataset = [];
      let index_fD = 0;
      for (let y = this.stYear; y <= this.endYear; y++) {
        dataset.push({
          label: y,
          pointBackgroundColor: "white",
          borderWidth: 1,
          pointBorderColor: this.getRandomColor().toString(),
          data: this.fectchData[index_fD++],

          borderColor: [this.getRandomColor().toString()],
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
        });
      }
      return dataset;
    },
    async getdataForBar() {
      const result = await api.getOrderTypeQtyAllTime();
      let dataset = [];
      result.data.forEach((er) => {
        dataset.push(er.qty);
      });
      let datasets = [
        {
          label: "2021",
          pointBackgroundColor: "white",
          borderWidth: 1,
          pointBorderColor: this.getRandomColor().toString(),
          data: dataset,

          borderColor: [this.getRandomColor().toString()],
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
        },
      ];

      return datasets;
    },
    async getAllProduct() {
      const allProduct = await api.getAllProductName();
      let labels = [];
      allProduct.data.forEach((el) => {
        labels.push(el.product_name.toString());
      });
      return labels;
    },
    async fillData() {
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
        datasets: this.generateDataset(),
      };
      this.databar = {
        labels:this.allProduct,
        datasets: await this.getdataForBar(),
      };
      // console.log(this.databar)
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
