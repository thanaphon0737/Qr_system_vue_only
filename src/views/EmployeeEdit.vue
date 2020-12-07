<template>
  <v-container>
    <v-row class="justify-center">
      <v-col cols="8">
        <v-card class="mx-10  pa-5" outlined>
          <v-form @submit.prevent="submit">
            <v-row>
              <v-col>
                <v-menu offset-y>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn color="primary" dark v-bind="attrs" v-on="on">
                      {{ employee.role }}
                    </v-btn>
                  </template>
                  <v-list dense>
                    <v-list-item-group color="primary">
                      <v-list-item v-for="(items, i) in roleArray" :key="i">
                        <v-list-item @click="editRole(items)">
                          {{ items }}
                        </v-list-item>
                      </v-list-item>
                    </v-list-item-group>
                  </v-list>
                </v-menu>
              </v-col>
              <v-col>Username: {{ employee.username }}</v-col>
            </v-row>

            <br />
            

            <v-text-field
              v-model="employee.first_name"
              label="First Name"
              required
            ></v-text-field>
            <v-text-field
              v-model="employee.last_name"
              label="Last Name"
              required
            ></v-text-field>
            <v-text-field
              v-model="employee.contact"
              label="Contact"
              required
            ></v-text-field>

            <br />

            <br />
            <v-row>
              <v-spacer></v-spacer>
              <v-btn class="mr-4" @click="cancel">
                Cancel
              </v-btn>

              <v-btn color="success" type="submit">
                Confirm
              </v-btn>
            </v-row>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import api from "@/services/api";

export default {
  name: "employee-edit",
  data: () => ({
    employee: {
      username: "",
      role: "",
      first_name: "",
      last_name: "",
      contact: "",
    },
    roleArray: [],
    selectedRole: "",
  }),
  async mounted() {
    let result = await api.getEmployeeById(this.$route.params.id);
    this.getRole();
    let getData = {}
    getData = result.data.message;
    this.employee.username = getData.username;
    this.employee.first_name = getData.first_name;
    this.employee.last_name = getData.last_name;
    this.employee.contact = getData.contact;
    this.employee.role = getData.role_name;
  },

  methods: {
    cancel() {
      this.$router.back();
    },
    editRole(name) {
      this.employee.role = name;
      this.selectedRole = name;
      console.log(name);
    },
    async getRole() {
      let result = await api.getRoles();
      let tempa = [];
      for (var i = 0; i < result.data.length; i++) {
        tempa.push(result.data[i].name);
      }
      this.roleArray = tempa;
    },
    async submit() {
   
      if(this.employee.username == this.$store.getters.username){
        this.employee.role = this.$store.getters.role_name;
      }
        let result = await api.updateEmployee(this.$route.params.id,this.employee);
      console.log(result.data.message);
      this.$router.back();
    },
  },
};
</script>

<style></style>
