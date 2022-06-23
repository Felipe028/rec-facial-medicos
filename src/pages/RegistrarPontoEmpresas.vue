<template>
  <div class="content">

    <div class="row mt-0" v-if="!showRecFacial">
      <div class="col-12">
        <card card-body-classes="table-full-width">
          <h4 slot="header" class="card-title text-left">Lista de Funcionários</h4>
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
                    <div>
                        <base-input>
                            <el-input
                            type="search"
                            class="mb-3 search-input"
                            color="success"
                            clearable
                            prefix-icon="el-icon-search"
                            placeholder="Pesquisar funcionário"
                            v-model="searchQuery"
                            aria-controls="datatables"
                            >
                            </el-input>
                        </base-input>
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
              <el-table-column :min-width="135" align="right" label="Actions">
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

                  <el-tooltip content="Registrar Ponto" effect="light" :open-delay="300" placement="top">
                    <base-button
                        @click.native="handleRecFacial(props.$index, props.row)"
                        class="edit btn-link"
                        type="info"
                        size="sm"
                        icon
                    >
                        <i class="tim-icons icon-camera-18"></i>
                    </base-button>
                  </el-tooltip>
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
                Mostrando de {{ from + 1 }} a {{ to }} no total de {{ total }} funcionários.
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







    <div v-else>
      <div class="row">
        <div class="col-sm-12 mb-2 d-flex justify-content-start">
          <base-button type="primary" size="sm" @click="showRecFacial = false">
            <i class="tim-icons icon-minimal-left"></i> Voltar
          </base-button>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6 mr-auto">
          <card class="card-register card-white">
            <div class="row" style="margin-top: 10px;">
              <div class="col-md-12 text-left">
                <h4 slot="header" class="card-title text-uppercase">{{selectRow.nome}}</h4>
                
                <img class="d-none d-lg-block d-xl-block" :src="'data:image/png;base64,'+imgRecente" id='vitrine'/>

              </div>
            </div>
          </card>
        </div>

        <div class="col-md-6 mr-auto">
            <card class="card-register card-white">
              <modal-rec-facial :typePonto="2"/>
            </card>
        </div>
      </div>
    </div>
    <Carregando v-if="isLoading"/>
  </div>
</template>
<script>
import { BaseCheckbox, Card, BaseInput, BasePagination } from "@/components/index";
import { Table, TableColumn, Select, Option } from "element-ui";
import Carregando from "../../src/pages/Loads/Carregando.vue";
// import users from "../../../pages/Tables/users.js";
import Fuse from "fuse.js";
// import Fuse from "fuse.js";
import ModalRecFacial from "./Components/ModalRecFacial.vue"
export default {
  components: {
    [Select.name]: Select,
    [Option.name]: Option,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    BaseCheckbox,
    Carregando,
    Card,
    BaseInput,
    BasePagination,
    ModalRecFacial
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
      isLoading: false,
      selectRow: [],
      showRecFacial: false,
      imgRecente: "",
      pagination: {
        perPage: 5,
        currentPage: 1,
        perPageOptions: [5, 10],
        total: 0
      },
      dialogHorarioLimite: false,
      searchQuery: "",
      propsToSearch: ["nome"],
      tableColumns: [
        {
          prop: "nome",
          label: "Funcionário",
          minWidth: 200
        }/* ,
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
        } */
      ],
      tableData: [],
      searchedData: [],
      fuseSearch: null
    };
  },

  created(){
 
  },

  mounted(){
    this.listarFuncionarios()
  },


  methods: {
    itemSelecionado(){
      this.showRecFacial = true
    },


    carregarFuse(){
      this.fuseSearch = new Fuse(this.tableData, {
        keys: ["nome"],
        threshold: 0.3
      });
    },


    carregarFotoF(cpf){
      let th = this
      let jsonn = new FormData
      jsonn.append("nrCpf", cpf)
      
      this.axios.post(`${process.env.VUE_APP_API_ADDRESS_REC_FACIAL}/getFotoRecente`, jsonn)
      .then((response) => {
        th.imgRecente = response.data.ImagemRecente
      })
      .finally(() => {})
      .catch(() => {
      });
    },


    handleRecFacial(index, row){
      this.selectRow = row
      // console.log(row)
      this.$cookies.set("cpf", this.selectRow.cpf, "2MIN")
      this.$cookies.set("idEmpregado", this.selectRow.id, "2MIN")
      this.showRecFacial = true
      this.carregarFotoF(row.cpf)
      setTimeout(() => {
        location.reload()
      },60000)
    },


    listarFuncionarios(){
      let th = this
      this.isLoading = true
      
      let bodyFormData = {
        setDB: this.$cookies.get('db')
      }
      this.axios.post('/api/empregado/listarEmpregados', bodyFormData)
      .then((response) => {
        th.isLoading = false
        th.tableData = response.data.data.dados
        th.carregarFuse()
      })
      .catch((err) => {
        th.isLoading = false
      })
    },


    async register() {
      let isValidForm = await this.$validator.validateAll();
      if (isValidForm) {
        // TIP use this.model to send it to api and perform register call
      }
    }
  },


  watch: {
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
<style></style>
