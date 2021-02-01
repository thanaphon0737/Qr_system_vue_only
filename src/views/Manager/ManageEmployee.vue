<template>
  <v-container>
    <!-- Table section -->
    <v-card>
      <v-data-table :search="search" :headers="headers" :items="mDataArray" hide-default-footer disable-pagination>
        <!-- table top section -->
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-toolbar-title>employees</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-text-field
              v-model="search"
              append-icon="search"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
            <v-spacer></v-spacer>
          </v-toolbar>
        </template>

        <!-- table tr section -->
        <template v-slot:item="{ item }">
          <tr>
            <td>{{ item.id }}</td>
            <td>{{ item.username }}</td>
            <td>
              {{ item.role.name }}
            </td>
            <td>{{ item.first_name }}</td>
            <td>{{ item.last_name }}</td>
            <td>{{ item.contact }}</td>
            <td>{{ item.salary}}</td>
            <td>
              <v-icon class="mr-2" @click="editEmployeeInfo(item)">edit</v-icon>
              <span class="ma-1"></span>
              <v-icon @click="deleteItem(item)">delete</v-icon>
            </td>
          </tr>
        </template>
      </v-data-table>

      <v-dialog v-model="confirmDeleteDlg" max-width="290">
        <v-card>
          <v-card-title primary-title>
            Confirm Delete
          </v-card-title>

          <v-card-text class="body">
            Are you sure to delete this employee? You cannot restore it after
            clicking confirm.
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text @click="confirmDeleteDlg = false">
              Cancel
            </v-btn>

            <v-btn color="error" text @click="confirmDelete">
              Confirm
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card>
  </v-container>
</template>

<script>
import api from "@/services/api";
export default {
  name: "Stock",
  data() {
    return {
      search: "",
      selectedProductId: "",
      selectedRole: "",
      selectedRoleId: "",
      confirmDeleteDlg: false,
      confirmEditRoleDlg: false,
      mDataArray: [],
      roleArray: [],

      headers: [
        {
          text: "Id",
          align: "left",
          sortable: false,
          value: "id"
        },
        { text: "Username", value: "username" },
        { text: "Role", value: "role_name" },
        { text: "Frist Name", value: "first_name" },
        { text: "Last Name", value: "last_name" },
        { text: "Contact", value: "contact" },
        { text: "Salary", value: "salary"}
      ]
    };
  },
  async mounted() {
    this.loadData();
  },
  methods: {
    editEmployeeInfo(item) {
      this.$router.push(`/employee-edit/${item.id}`);
    },

    deleteItem(item) {
      this.selectedProductId = item.id;
      this.confirmDeleteDlg = true;
    },
    async confirmDelete() {
      await api.deleteEmployee(this.selectedProductId);
      this.confirmDeleteDlg = false;
      this.loadData();
    },

    async loadData() {
      let result = await api.getEmployee();
      this.mDataArray = result.data;
    }
  }
};
</script>

<style></style>
