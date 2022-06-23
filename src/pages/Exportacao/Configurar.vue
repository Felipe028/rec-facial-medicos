<template>
  <div class="content">
    <!-- <div class="col-md-8 ml-auto mr-auto">
      <h2 class="text-center">Paginated Tables</h2>
    </div> -->
    <div class="row mt-0">
      <div class="col-12">
        <card card-body-classes="table-full-width">
          <h4 slot="header" class="card-title text-left">Configuração de Código Contábil</h4>
            <div class="row">
                <div class="col-md-12 pr-md-1 text-left">
                    <base-input
                    label="Empresa"
                    type="tel" v-mask="'####'"
                    placeholder="Empresa"
                    v-model="model.empresa"
                    >
                    </base-input>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6 pr-md-1 text-left">
                    <base-input
                    label="Falta em Horas"
                    type="tel" v-mask="'##'"
                    placeholder="Falta em Horas"
                    v-model="model.faltasHoras"
                    >
                    </base-input>
                </div>
                <div class="col-md-6 pr-md-1 text-left">
                    <base-input
                    label="Falta em Dias"
                    type="tel" v-mask="'##'"
                    placeholder="Falta em Dias"
                    v-model="model.faltasDias"
                    >
                    </base-input>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6 pr-md-1 text-left">
                    <base-input
                    label="Atraso em Horas"
                    type="tel" v-mask="'##'"
                    placeholder="Atraso em Horas"
                    v-model="model.atrasoHoras"
                    >
                    </base-input>
                </div>
                <div class="col-md-6 pr-md-1 text-left">
                    <base-input
                    label="Ad Noturno em Horas"
                    type="tel" v-mask="'##'"
                    placeholder="Ad Noturno em Horas"
                    v-model="model.adNoturnoHoras"
                    >
                    </base-input>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6 pr-md-1 text-left">
                    <base-input
                    label="Hora Extra 50%"
                    type="tel" v-mask="'####'"
                    placeholder="Hora Extra 50%"
                    v-model="model.horaExtra50"
                    >
                    </base-input>
                </div>
                <div class="col-md-6 pr-md-1 text-left">
                    <base-input
                    label="Hora Extra 100%"
                    type="tel" v-mask="'####'"
                    placeholder="Hora Extra 100%"
                    v-model="model.horaExtra100"
                    >
                    </base-input>
                </div>
            </div>
          <template slot="footer">
            <base-button type="success" fill>Save</base-button>
          </template>
        </card>
      </div>
    </div>

    <div class="vld-parent">
        <loading
        :active.sync="isLoading"
        :can-cancel="false"
        loader='spinner'
        color='#35a887'
        :is-full-page="true"
        >
        </loading>
    </div>
  </div>
</template>
<script>
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import { Card, BasePagination, BaseInput } from "@/components/index";
import { Table, TableColumn, Select, Option } from "element-ui";
import users from "../../pages/Tables/users.js";
import swal from "sweetalert2";
import Fuse from "fuse.js";
import NotificationHorarioLimite from "../../pages/Notifications/NotificationHorarioLimite.vue";
import Modal from "@/components/Modal.vue";

export default {
  components: {
    Card,
    Loading,
    [Select.name]: Select,
    [Option.name]: Option,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    BasePagination,
    BaseInput,
    Modal
  },
  computed: {
    /***
     * Returns a page from the searched data or the whole data. Search is performed in the watch section below
     */
    queriedData() {
      let result = this.tableData;
      if (this.searchedData.length > 0) {
        result = this.searchedData;
      }
      return result.slice(this.from, this.to);
    },
    to() {
      let highBound = this.from + this.pagination.perPage;
      if (this.total < highBound) {
        highBound = this.total;
      }
      return highBound;
    },
    from() {
      return this.pagination.perPage * (this.pagination.currentPage - 1);
    },
    total() {
      return this.searchedData.length > 0
        ? this.searchedData.length
        : this.tableData.length;
    }
  },
  data() {
    return {
      model: {
          empresa: "",
          faltasHoras: "",
          faltasDias: "",
          atrasoHoras: "",
          adNoturnoHoras: "",
          horaExtra50: "",
          horaExtra100: ""
      },
      empresa: "",
      horarioSelecionado: "",
      pagination: {
        perPage: 5,
        currentPage: 1,
        perPageOptions: [5, 10],
        total: 0
      },
      isLoading: false,
      dialogEditar: false,
      searchQuery: "",
      propsToSearch: ["name", "email", "age"],
      tableColumns: [
        {
          prop: "name",
          label: "Name",
          minWidth: 200
        },
        {
          prop: "email",
          label: "Email",
          minWidth: 250
        },
        {
          prop: "age",
          label: "Age",
          minWidth: 100
        },
        {
          prop: "salary",
          label: "Salary",
          minWidth: 120
        }
      ],
      tableData: users,
      searchedData: [],
      fuseSearch: null
    };
  },
  mounted() {
    // this.notifyVue('top', 'center');
    // Fuse search initialization.
    this.fuseSearch = new Fuse(this.tableData, {
    keys: ["name", "email"],
    threshold: 0.3
    });
  },
  methods: {
    notifyVue(verticalAlign, horizontalAlign) {
        this.$notify({
            component: NotificationHorarioLimite,
            icon: "tim-icons icon-bell-55",
            horizontalAlign: horizontalAlign,
            verticalAlign: verticalAlign,
            type: "warning",
            timeout: 30000
        });
    }
  },
  watch: {
    /**
     * Searches through the table data by a given query.
     * NOTE: If you have a lot of data, it's recommended to do the search on the Server Side and only display the results here.
     * @param value of the query
     */
    searchQuery(value) {
      let result = this.tableData;
      if (value !== "") {
        result = this.fuseSearch.search(this.searchQuery);
      }
      this.searchedData = result;
    }
  }
};
</script>
<style>
.divCorpoDialog{
    padding: 0px;
    margin-top: -25px;
}
</style>
