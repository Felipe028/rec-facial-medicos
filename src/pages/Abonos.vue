<template>
  <div class="content">
    <div class="row mt-0">
      <div class="col-12">
        <card card-body-classes="table-full-width">
          <h4 slot="header" class="card-title text-left">Abonos</h4>
          <div>
            <div class="col-12 d-flex justify-content-center justify-content-sm-between flex-wrap">
                <div>
                    <el-select
                        class="select-success mb-3 pagination-select"
                        v-model="pagination.perPage"
                        placeholder="Per page"
                    >
                        <el-option
                        class="select-success"
                        v-for="item in pagination.perPageOptions"
                        :key="item"
                        :label="item"
                        :value="item"
                        >
                        </el-option>
                    </el-select>
                </div>
                <div class="d-flex justify-content-center justify-content-sm-between flex-wrap">
                    <!-- <div>
                        <base-input>
                            <el-input
                            type="search"
                            class="mb-3 search-input"
                            color="success"
                            clearable
                            prefix-icon="el-icon-search"
                            placeholder="Pesquisar abono"
                            v-model="searchQuery"
                            aria-controls="datatables"
                            >
                            </el-input>
                        </base-input>
                    </div> -->
                    <div>
                        <base-button 
                            type="success" 
                            class="animation-on-hover"
                            style="margin: 0px 5px 0px 5px;"
                            @click.native="$router.push('abono/inserir')"
                        >Enviar Abono</base-button>
                    </div>
                    

                    
                </div>

              
            </div>
            <el-table :data="queriedData">
              <el-table-column
                v-for="column in tableColumns"
                :key="column.label"
                :min-width="column.minWidth"
                :prop="column.prop"
                :label="column.label"
              >
              </el-table-column>
              <el-table-column :min-width="100" align="right" label="Actions">
                <div slot-scope="props">
                  <!-- <base-button
                    @click.native="handleLike(props.$index, props.row)"
                    class="like btn-link"
                    type="info"
                    size="sm"
                    icon
                  >
                    <i class="tim-icons icon-heart-2"></i>
                  </base-button> -->
                  
                  <base-button
                    @click.native="selecionarAbono(props.$index, props.row), dialogHorarioLimite = true, cadAlt = 'Alterar'"
                    class="edit btn-link"
                    type="info"
                    size="sm"
                    icon
                  >
                    <i class="tim-icons icon-image-02"></i>
                  </base-button>
                  <modal :show.sync="dialogHorarioLimite">
                    <template slot="header">
                        <h4 class="modal-title" id="exampleModalLabel">Imagem Enviada</h4>
                    </template>
                    <div class="row">
                      <div class="col-md-12 text-center">
                        <img :src="selecionarAbono.arquivo" alt="Card image" class="img img-raised" style="max-height: 80vh;"/>
                      </div>
                    </div>

<!--                     <template slot="footer">
                      <div class="w-100 d-flex justify-content-end">
                        <base-button type="success">Salvar</base-button>
                      </div>
                    </template> -->
                  </modal>
                  <!-- <base-button
                    @click.native="handleDelete(props.$index, props.row)"
                    class="remove btn-link"
                    type="danger"
                    size="sm"
                    icon
                  >
                    <i class="tim-icons icon-simple-remove"></i>
                  </base-button> -->
                </div>
              </el-table-column>
            </el-table>
          </div>
          <div
            slot="footer"
            class="col-12 d-flex justify-content-center justify-content-sm-between flex-wrap"
          >
            <div class="">
              <p class="card-category">
                Mostrando de {{ from + 1 }} a {{ to }} no total de {{ total }} abonos.
              </p>
            </div>
            <base-pagination
              class="pagination-no-border"
              v-model="pagination.currentPage"
              :per-page="pagination.perPage"
              :total="total"
            >
            </base-pagination>
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
        file: null
      },
      abonoSelecionado: [],
      horarioSelecionado: "",
      cadAlt: "",
      listAbonos: "",
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
      propsToSearch: ["DESCRICAO_TIPO_ABONO"],
      tableColumns: [
        {
          prop: "DESCRICAO_TIPO_ABONO",
          label: "Tipo",
          minWidth: 250
        },
        {
          prop: "DATA_ABONO",
          label: "Data",
          minWidth: 200
        },
        {
          prop: "horas",
          label: "Horas",
          minWidth: 100
        },
        {
          prop: "status_abono",
          label: "Status",
          minWidth: 100
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
      this.abono.file = file;
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


    selecionarAbono(index, row){
      this.selecionarAbono = row
    },


    listarAbono(){
      let th = this
      this.isLoading = true
      
      let bodyFormData = {
        setDB: this.$cookies.get('db'),
        id_empregado: this.$cookies.get('idEmpregado'),
        id_empregador: this.$cookies.get('idEmpregador')
      }
      this.axios.post('/api/aobnos/listarAbonosPorIdEmpregadoIdEmpregador', bodyFormData)
      .then((response) => {
        th.isLoading = false

        th.tableData = response.data.data.dados.filter((dados) => {
          if(dados.status_abono == 'S'){
            dados.status_abono = "Aprovado"
          }else{
            dados.status_abono = "Aguardando"
          }
          return dados
        })

        console.log(th.tableData)

        // th.showSwal('auto-close', 'Sucesso', 'Usuario cadastrado com sucesso!', 'success')
        // th.tableData = response.data.data.dados
        // th.tableData = response.data.data.dados
        // th.carregarFuse()
      })
      .catch((err) => {
        th.isLoading = false
        th.showSwal('auto-close', 'Erro', 'Erro ao listar!', 'error')
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
