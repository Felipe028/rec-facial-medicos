<template>
  <div class="content">
    <div class="row mt-0">
      <div class="col-sm-6 ml-auto mr-auto">
        <card card-body-classes="table-full-width">
          <h4 slot="header" class="card-title text-left p-0 m-0">Abonos</h4>
          <div class="row m-0 p-0">
            <div class="col-md-6 p-2 text-left">
              <base-input
                label="Data"
                type="date"
                placeholder="Data"
                v-model="abono.data"
              >
              </base-input>
              <!-- <base-input
                label="Data"
                type="tel"
                v-mask="'##/##/####'"
                placeholder="##/##/####"
                v-model="abono.data"
              >
              </base-input> -->
            </div>
            <div class="col-md-6 p-2 text-left">
              <base-input
                label="Hora"
                type="tel"
                v-mask="'##:##'"
                placeholder="##:##"
                v-model="abono.hora"
              >
              </base-input>
            </div>
          </div>

          <div class="row m-0 p-0">
            <div class="col-sm-12 p-2">
              <el-select
                label="Hora"
                class="select-primary w-100"
                size="large"
                placeholder="Selecionar Abono"
                v-model="abono.tipo"
              >
                <el-option
                  v-for="option in listAbonos"
                  class="select-primary"
                  :value="option.id"
                  :label="option.descricao"
                  :key="option.descricao"
                >
                </el-option>
              </el-select>
            </div>
          </div>

          <div class="row m-0 p-0">
            <div class="col-md-12 p-2">
              <h4 class="card-title">Arquivo</h4>
              <image-upload
                @change="onImageChange"
                select-text="Selecione o arquivo"
              />
            </div>
          </div>

          <div class="row m-0 p-0">
            <div class="col-md-12 p-2">
              <base-button
                @click="enviarAbono()"
                native-type="submit"
                type="success"
                class="mb-3"
                size="lg"
                block
              >
                Enviar Abono
              </base-button>
            </div>
          </div>
      
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
import moment from 'moment'
import 'vue-loading-overlay/dist/vue-loading.css'
import { Card, BasePagination, BaseInput, ImageUpload } from "@/components/index";
import { Table, TableColumn, Select, Option, TimeSelect, DatePicker } from "element-ui";
import users from "../pages/Tables/users.js";
import swal from "sweetalert2";
import Fuse from "fuse.js";
import NotificationHorarioLimite from "./Notifications/NotificationHorarioLimite.vue";
import Modal from "@/components/Modal.vue";

export default {
  components: {
    [DatePicker.name]: DatePicker,
    [TimeSelect.name]: TimeSelect,
    ImageUpload,

    Card,
    Loading,
    [Select.name]: Select,
    [Option.name]: Option,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    [DatePicker.name]: DatePicker,
    [TimeSelect.name]: TimeSelect,
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
      abono:{
        data: "",
        hora: "",
        tipo: "",
        file: null
      },
      listAbonos: [],
      horarioSelecionado: "",
      cadAlt: "",
      descricao: "",
      pagination: {
        perPage: 5,
        currentPage: 1,
        perPageOptions: [5, 10],
        total: 0
      },
      isLoading: false,
      dialogHorarioLimite: false,
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
    this.listarAbono()
    // this.notifyVue('top', 'center');
    // Fuse search initialization.
    this.fuseSearch = new Fuse(this.tableData, {
    keys: ["name", "email"],
    threshold: 0.3
    });
  },
  methods: {
    onImageChange(file) {
      // https://stackoverflow.com/questions/6150289/how-can-i-convert-an-image-into-base64-string-using-javascript
      var reader = new FileReader();
      let th = this
      reader.onloadend = function() {
        th.abono.file = reader.result
        // console.log('RESULT', th.abono.file)
        // console.log(this.abono.file)
      }
      reader.readAsDataURL(file);
      
      // this.abono.file = file;
    },


    notifyVue(verticalAlign, horizontalAlign) {
      this.$notify({
          component: NotificationHorarioLimite,
          icon: "tim-icons icon-bell-55",
          horizontalAlign: horizontalAlign,
          verticalAlign: verticalAlign,
          type: "warning",
          timeout: 30000
      });
    },


    moment: function (data) {
      return moment(data);
    },


    showSwal(type, title, text, typeMsg) {
      if (type === "auto-close") {
        swal({
          title: title,
          text: text,
          type: typeMsg,
          timer: 3000,
          showConfirmButton: false,
        });
      }
    },


    listarAbono(){
      let th = this
      this.isLoading = true
      
      let bodyFormData = {
        setDB: this.$cookies.get('db'),
      }
      this.axios.post('/api/abonos/listarTiposDeAbonos', bodyFormData)
      .then((response) => {
        th.isLoading = false
        th.listAbonos = response.data.data.dados
        // th.showSwal('auto-close', 'Sucesso', 'Usuario cadastrado com sucesso!', 'success')
        // th.tableData = response.data.data.dados
        // th.tableData = response.data.data.dados
        // th.carregarFuse()
      })
      .catch((err) => {
        th.isLoading = false
        th.showSwal('auto-close', 'Erro', 'Erro ao listar!', 'error')
      })
    },


    enviarAbono(){
      let th = this
      this.isLoading = true

      /* const jsonn = new FormData
      jsonn.append("setDB", this.$cookies.get('db'))
      jsonn.append("id_funcionario", this.$cookies.get('idEmpregado'))
      jsonn.append("id_tipo_abono", this.abono.tipo)
      jsonn.append("data", this.abono.data)
      jsonn.append("horas", this.abono.hora)
      jsonn.append("arquivo", this.abono.file)
      jsonn.append("status_abono", "S")
      jsonn.append("modo_abono", "S") */

      let formData = {
        setDB: this.$cookies.get('db'),
        id_funcionario: this.$cookies.get('idEmpregado'),
        id_tipo_abono: this.abono.tipo,
        data: this.moment(this.abono.data).format('DD/MM/YYYY'),
        horas: this.abono.hora,
        arquivo: this.abono.file,
        status_abono: "N",
        modo_abono: 1
      }
      
      this.axios.post('/api/abonos/inserirAbonoFuncionario', formData)
      .then((response) => {
        th.isLoading = false
        th.showSwal('auto-close', 'Sucesso', 'Abono inserido com sucesso!', 'success')
        setTimeout(() => {
          th.$router.push("/abono")
        }, 2000)
        
        // th.tableData = response.data.data.dados
        // th.tableData = response.data.data.dados
        // th.carregarFuse()
      })
      .catch((err) => {
        th.isLoading = false
        th.showSwal('auto-close', 'Erro', 'Erro ao enviar solicitação!', 'error')
      })
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
