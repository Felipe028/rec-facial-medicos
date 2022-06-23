<template>
  <div class="content">
    <!-- <div class="col-md-8 ml-auto mr-auto">
      <h2 class="text-center">Paginated Tables</h2>
    </div> -->
    <div class="row mt-0">
      <div class="col-12">
        <card card-body-classes="table-full-width">
          <h4 slot="header" class="card-title text-left">Férias / Afastamentos</h4>
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
                            placeholder="Pesquisar motivo afastamento"
                            v-model="searchQuery"
                            aria-controls="datatables"
                            >
                            </el-input>
                        </base-input>
                    </div>
                    <div>
                        <base-button 
                            type="success" 
                            class="animation-on-hover"
                            style="margin: 0px 5px 0px 5px;"
                            @click="dialogRealizarAfastamento = true, listarMotivoAfastamento()"
                        >Realizar Afastamento</base-button>
                        <modal :show.sync="dialogRealizarAfastamento">
                            <template slot="header">
                            <h4 class="modal-title" id="exampleModalLabel">Realizar Afastamento</h4>
                            </template>
                            <div class="container">
                              <!-- {{realizarAfastamento}} -->
                                <div class="row">
                                    <div class="col-12">
                                        <!-- <div v-if="selected" style="padding-top:10px; width: 100%;">
                                        You have selected <code>{{selected.name}}, the {{selected.race}}</code>
                                        </div> -->
                                        <div class="autosuggest-container w-100">
                                        <vue-autosuggest
                                            v-model="query"
                                            :suggestions="filteredOptions"
                                            @focus="focusMe"
                                            @click="clickHandler"
                                            @input="onInputChange"
                                            @selected="onSelected"
                                            :get-suggestion-value="getSuggestionValue"
                                            :input-props="{id:'autosuggest__input', placeholder:'Busca Funcionário'}">
                                            <div slot-scope="{suggestion}" style="display: flex; align-items: center;">
                                            <div>{{suggestion.item.nome}}</div>
                                            </div>
                                        </vue-autosuggest>
                                        </div>
                                        
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-10 text-left">
                                        <label for="motivo" class="form-label  text-left w-100">Motivo</label>
                                        <el-select
                                            class="select-success pagination-select w-100"
                                            id="motivo"
                                            placeholder="Motivo"
                                            v-model="realizarAfastamento.motivo"
                                        >
                                            <el-option class="select-success" v-for="item in listMotivosAfastamentos" :key="item.ID_AFASTAMENTO" :label="item.DS_AFASTAMENTO" :value="item.ID_AFASTAMENTO">{{item.DS_AFASTAMENTO}}</el-option>
                                        </el-select>
                                    </div>
                                    <div class="col-2 d-flex align-items-end">
                                        <el-tooltip content="Adicionar Motivo" effect="light" :open-delay="300" placement="top">
                                            <base-button icon type="success" @click="dialogCadastrarMotivo = true" style="margin-bottom: 0px;">
                                                <i class="tim-icons icon-simple-add"></i>
                                            </base-button>
                                        </el-tooltip>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-12 text-left">
                                        <base-input
                                            label="De"
                                            type="date"
                                            placeholder="De"
                                            v-model="realizarAfastamento.de"
                                        >
                                        </base-input>
                                    </div>
                                </div>


                                <div class="row">
                                    <div class="col-12 text-left">
                                        <base-input
                                            label="Até"
                                            type="date"
                                            placeholder="Até"
                                            v-model="realizarAfastamento.ate"
                                        >
                                        </base-input>
                                    </div>
                                </div>

                            </div>
                            <template slot="footer">
                                <base-button type="danger" @click="dialogRealizarAfastamento = false">Fechar</base-button>
                                <base-button type="success" @click="realizarAfastamentoF()">Salvar</base-button>
                            </template>
                        </modal>



                        <modal :show.sync="dialogCadastrarMotivo">
                            <template slot="header">
                            <h4 class="modal-title" id="exampleModalLabel">Novo motivo de lançamento</h4>
                            </template>
                            <div class="container">
                                <div class="row">
                                    <div class="col-12 text-left">
                                        <base-input
                                          label="Motivo"
                                          type="text"
                                          placeholder="Motivo"
                                          v-model="novoMotivo.motivo"
                                        >
                                        </base-input>
                                    </div>
                                </div>

                                <!-- <div class="row">
                                    <div class="col-12 text-left">
                                        <base-input
                                          label="Sigla"
                                          type="text"
                                          placeholder="Sigla"
                                          v-model="novoMotivo.sigla"
                                        >
                                        </base-input>
                                    </div>
                                </div> -->
                                
                            </div>
                            <template slot="footer">
                                <base-button type="danger" @click="dialogCadastrarMotivo = false">Fechar</base-button>
                                <base-button type="success" @click="cadastrarMotivoLancamento()">Salvar</base-button>
                            </template>
                        </modal>


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
                  <el-tooltip content="Excluir" effect="light" :open-delay="300" placement="top">
                    <base-button
                      @click.native="handleDelete(props.$index, props.row)"
                      class="remove btn-link"
                      type="danger"
                      size="sm"
                      icon
                    >
                      <i class="tim-icons icon-simple-remove"></i>
                    </base-button>
                  </el-tooltip>
                  
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

    <Carregando v-if="isLoading"/>
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
import NotificationHorarioLimite from "../Notifications/NotificationHorarioLimite.vue";
import Modal from "@/components/Modal.vue";
import Carregando from "../../../src/pages/Loads/Carregando.vue";
import moment from 'moment';

export default {
  components: {
    Carregando,
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
    // <<Auto-Complete
    filteredOptions() {
      return [
        { 
        
          data: this.suggestions[0].data.filter(option => {
            return option.nome.toLowerCase().indexOf(this.query.toLowerCase()) > -1;
          })
        }
      ];
    },
    // Auto-Complete>>

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
      listMotivosAfastamentos: [],
      selectRow: [],
      horarioSelecionado: "",
      realizarAfastamento: {
        funcionario: {},
        motivo: "",
        de: "",
        ate: ""
      },
      novoMotivo: {
        motivo: "",
        sigla: ""
      },
      dialogRealizarAfastamento: false,
      dialogCadastrarMotivo: false,

      query: "",
      selected: "",
      suggestions: [
        {
          data: [
            /* { id: 1, USUARIO: "Frodo", race: "Hobbit", avatar: "https://upload.wikimedia.org/wikipedia/en/thumb/4/4e/Elijah_Wood_as_Frodo_Baggins.png/220px-Elijah_Wood_as_Frodo_Baggins.png" },
            { id: 2, USUARIO: "Samwise", race: "Hobbit", avatar: "https://upload.wikimedia.org/wikipedia/en/thumb/7/7b/Sean_Astin_as_Samwise_Gamgee.png/200px-Sean_Astin_as_Samwise_Gamgee.png" },
            { id: 3, USUARIO: "Gandalf", race: "Maia", avatar: "https://upload.wikimedia.org/wikipedia/en/thumb/e/e9/Gandalf600ppx.jpg/220px-Gandalf600ppx.jpg" },
            { id: 4, USUARIO: "Aragorn", race: "Human", avatar: "https://upload.wikimedia.org/wikipedia/en/thumb/3/35/Aragorn300ppx.png/150px-Aragorn300ppx.png" } */
          ]
        }
      ],


      pagination: {
        perPage: 5,
        currentPage: 1,
        perPageOptions: [5, 10],
        total: 0
      },
      isLoading: false,
      dialogHorarioLimite: false,
      searchQuery: "",
      propsToSearch: ["DS_AFASTAMENTO", "nome"],
      tableColumns: [
        {
          prop: "nome",
          label: "Funcionário",
          minWidth: 250
        },
        {
          prop: "DS_AFASTAMENTO",
          label: "Motivo Afastamento",
          minWidth: 200
        }/* ,
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
  mounted() {
    this.listarFuncionarios();
    this.listarAfastamentoFuncionario();
    // this.notifyVue('top', 'center');
    // Fuse search initialization.
  },
  methods: {
    carregarFuse(){
      this.fuseSearch = new Fuse(this.tableData, {
        keys: ["DS_AFASTAMENTO", "nome"],
        threshold: 0.3
      });
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


    handleDelete(index, row){
      this.selectRow = row
      this.showAlert('excluir_afastamento')
    },


    moment: function (data) {
      return moment(data);
    },
    
    //<< Auto-Complete
    clickHandler(item) {},
    onSelected(item) {
      this.realizarAfastamento.funcionario = item.item;
      // this.selected = item.item;
    },
    onInputChange(text) {
      console.log(text)
    },
    getSuggestionValue(suggestion) {
      return suggestion.item.USUARIO;
    },
    focusMe(e) {
      console.log(e) // FocusEvent
    },
    // Auto-Complete>>


    showAlert(param){
        if(param == "excluir_afastamento"){
            swal({
            title: "Tem certeza?",
            text: `Deseja realmente excluir?`,
            type: "warning",
            showCancelButton: true,
            confirmButtonClass: "btn btn-success btn-fill",
            cancelButtonClass: "btn btn-danger btn-fill",
            confirmButtonText: "Sim, excluir!",
            cancelButtonText: "Não!",
            buttonsStyling: false
            }).then((response) => {
              if(response.value){
                this.excluirAfastamento()
              }
            });
        }
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
        th.suggestions[0].data = response.data.data.dados
        // th.tableData = response.data.data.dados
      })
      .catch((err) => {
        th.isLoading = false
      })
    },


    listarMotivoAfastamento(){
      let th = this
      this.isLoading = true
      
      let bodyFormData = {
        setDB: this.$cookies.get('db')
      }
      this.axios.post('/api/empregado/listarMotivosAfastamento', bodyFormData)
      .then((response) => {
        th.isLoading = false
        th.listMotivosAfastamentos = response.data.data.dados
        // th.suggestions[0].data = response.data.data.dados
        // th.tableData = response.data.data.dados
      })
      .catch((err) => {
        th.isLoading = false
      })
    },


    listarAfastamentoFuncionario(){
      let th = this
      this.isLoading = true
      
      let bodyFormData = {
        setDB: this.$cookies.get('db')
      }
      this.axios.post('/api/afastamentos/listarAfastamentosFuncionarios', bodyFormData)
      .then((response) => {
        th.isLoading = false
        // th.listMotivosAfastamentos = response.data.data.dados
        // th.suggestions[0].data = response.data.data.dados
        th.tableData = response.data.data.dados
        th.carregarFuse()//Função do Mecanismo de busca
      })
      .catch((err) => {
        th.isLoading = false
      })
    },


    cadastrarMotivoLancamento(){
      let th = this
      this.isLoading = true
      
      let bodyFormData = {
        setDB: this.$cookies.get('db'),
        descricao_afastamento: this.novoMotivo.motivo,
        // ativo: this.novoMotivo.sigla
        ativo: "S"
      }
      this.axios.post('/api/afastamentos/criarMotivoAfastamento', bodyFormData)
      .then((response) => {
        th.isLoading = false
        th.dialogCadastrarMotivo = false
        th.listarMotivoAfastamento()
        // th.suggestions[0].data = response.data.data.dados
        // th.tableData = response.data.data.dados
      })
      .catch((err) => {
        th.isLoading = false
      })
    },


    realizarAfastamentoF(){
      let th = this
      this.isLoading = true
      
      let bodyFormData = {
        setDB: this.$cookies.get('db'),
        id_funcionario: this.realizarAfastamento.funcionario.id,
        data_inicial: moment(this.realizarAfastamento.de).format('DD/MM/YYYY'),
        data_final: moment(this.realizarAfastamento.ate).format('DD/MM/YYYY'),
        id_motivo: this.realizarAfastamento.motivo
      }

      this.axios.post('/api/empregado/criarAfastamentoEmpregado', bodyFormData)
      .then((response) => {
        th.isLoading = false
        th.dialogRealizarAfastamento = false
        th.listarAfastamentoFuncionario()
        th.showSwal('auto-close', 'Sucesso', 'Afastamento realizado com sucesso!', 'success')
        // th.suggestions[0].data = response.data.data.dados
        // th.tableData = response.data.data.dados
      })
      .catch((err) => {
        th.isLoading = false
        th.showSwal('auto-close', 'Erro', 'Erro ao realizar afastamento!', 'error')
      })
    },


    excluirAfastamento(){
      let th = this
      this.isLoading = true
      
      let bodyFormData = {
        setDB: this.$cookies.get('db'),
        id_afastamento: this.selectRow.ID_AFASTAMENTO,
      }

      this.axios.post('/api/afastamentos/deletarAfastamento', bodyFormData)
      .then((response) => {
        th.isLoading = false
        th.listarAfastamentoFuncionario()
        th.showSwal('auto-close', 'Sucesso', 'Afastamento excluido com sucesso!', 'success')
        // th.suggestions[0].data = response.data.data.dados
        // th.tableData = response.data.data.dados
      })
      .catch((err) => {
        th.isLoading = false
        th.showSwal('auto-close', 'Erro', 'Erro ao excluir afastamento!', 'error')
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

.autosuggest-container input {
  width: 100%;
  padding: 0.5rem;
}

.autosuggest-container ul {
  width: 100%;
  color: rgba(30, 39, 46,1.0);
  list-style: none;
  margin: 0;
  padding: 0.5rem 0 .5rem 0;
}
.autosuggest-container li {
  margin: 0 0 0 0;
  border-radius: 5px;
  padding: 0.75rem 0 0.75rem 0.75rem;
  display: flex;
  align-items: center;
}
.autosuggest-container li:hover {
  cursor: pointer;
}

.autosuggest-container {
  display: flex;
  justify-content: center;
  width: 280px;
}

#autosuggest { width: 100%; display: block;}
.autosuggest__results-item--highlighted {
  background-color: rgba(51, 217, 178,0.2);
}

</style>
