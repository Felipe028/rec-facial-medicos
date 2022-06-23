<template>
  <div class="content">
    <!-- <div class="col-md-8 ml-auto mr-auto">
      <h2 class="text-center">Paginated Tables</h2>
    </div> -->
    <div class="row mt-0">
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
                    <div>
                        <base-button 
                            type="success" 
                            class="animation-on-hover"
                            style="margin: 0px 5px 0px 5px;"
                            @click="$router.push('/cadastrarFuncionarios')"
                        >Cadastrar Funcionário</base-button>
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
                  <el-tooltip content="Editar" effect="light" :open-delay="300" placement="top">
                    <base-button
                      @click.native="handleEdit(props.$index, props.row)"
                      class="edit btn-link"
                      type="info"
                      size="sm"
                      icon
                    >
                      <i class="tim-icons icon-pencil"></i>
                    </base-button>
                  </el-tooltip>

                  <el-tooltip content="Horário Limite" effect="light" :open-delay="300" placement="top">                  
                    <base-button
                      @click="dialogHorarioLimite = true"
                      class="edit btn-link"
                      type="info"
                      size="sm"
                      icon
                    >
                      <i class="tim-icons icon-watch-time"></i>
                    </base-button>
                  </el-tooltip>
                  <modal :show.sync="dialogHorarioLimite">
                    <template slot="header">
                        <h4 class="modal-title" id="exampleModalLabel">Hórario limite</h4>
                    </template>
                    <div>
                      <h5 class="text-left"><strong>Funcionário:</strong> Felipe da Silva</h5>
                      <el-select
                          class="select-success col-sm-12 pagination-select"
                          v-model="horarioSelecionado"
                      >
                        <el-option class="select-success" label="03:00" value="03:00" selected>03:00</el-option>
                        <el-option class="select-success" label="04:00" value="04:00">04:00</el-option>
                        <el-option class="select-success" label="05:00" value="05:00">05:00</el-option>
                        <el-option class="select-success" label="06:00" value="06:00">06:00</el-option>
                        <el-option class="select-success" label="07:00" value="07:00">07:00</el-option>
                        <el-option class="select-success" label="08:00" value="08:00">08:00</el-option>
                        <el-option class="select-success" label="09:00" value="09:00">09:00</el-option>
                        <el-option class="select-success" label="10:00" value="10:00">10:00</el-option>
                      </el-select>

                      <div class="row" style="margin-top: 10px;">
                        <p class="text-left"><b>Atenção:</b></p>
                        <p class="text-left">Caso este funcionário saia exemplo <b>03:00</b> da manhã, configure para <b>04:00</b> por segurança</p>
                      </div>

                    </div>
                    <template slot="footer">
                        <base-button type="danger" @click="dialogHorarioLimite = false">Fechar</base-button>
                        <base-button type="success">Salvar</base-button>
                    </template>
                  </modal>
                  
                  <el-tooltip content="Demitir Funcionário" effect="light" :open-delay="300" placement="top">
                    <base-button
                      @click.native="handleDelete(props.$index, props.row)"
                      class="remove btn-link"
                      type="danger"
                      size="sm"
                      icon
                    >
                      <i class="tim-icons icon-alert-circle-exc"></i>
                    </base-button>
                  </el-tooltip>
                  <modal :show.sync="dialogDemitirFuncionario">
                    <template slot="header">
                      <h4 class="modal-title" id="exampleModalLabel">Demitir Funcionário</h4>
                    </template>
                    <div class="container">
                        <div class="row">
                          <div class="col-12">
                              <h5 class="text-left"><strong>Funcionário:</strong> {{selectRow.USUARIO}}</h5>
                          </div>
                        </div>

                        <div class="row">
                          <div class="col-12 text-left">
                              <base-input
                                label="Data da demissão (Ex: dd/mm/yyyy)"
                                type="tel"
                                v-mask="'##/##/####'"
                                placeholder="Data da Demissão"
                                v-model="demitir.data"
                              >
                              </base-input>
                          </div>
                        </div>

                        <div class="row">
                          <div class="col-12 text-left">
                              <base-input
                                label="Motivo"
                                type="text"
                                placeholder="Motivo"
                                v-model="demitir.motivo"
                              >
                              </base-input>
                          </div>
                        </div>

                    </div>
                    <template slot="footer">
                        <base-button type="danger" @click="dialogHorarioLimite = false">Fechar</base-button>
                        <base-button type="success" @click="demitirFuncionario()" :disabled="demitir.data.length > 9 && demitir.motivo.length > 4 ? false : true">Salvar</base-button>
                    </template>
                  </modal>

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
import NotificationHorarioLimite from "../Notifications/NotificationHorarioLimite.vue";
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
      funcionarioSelecionado: [],
      selectRow: [],
      horarioSelecionado: "",
      dialogDemitirFuncionario: false,
      pagination: {
        perPage: 5,
        currentPage: 1,
        perPageOptions: [5, 10],
        total: 0
      },
      demitir: {
        data: "",
        motivo: ""
      },
      isLoading: false,
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
      // tableData: users,
      tableData: [],
      searchedData: [],
      fuseSearch: null
    };
  },
  mounted() {
    this.listarFuncionarios()
    this.$root.$on('funcaoCadastrarFuncionario', (params) => {
      this.cadastrarFuncionario(params)
    });
    // this.notifyVue('top', 'center');
    
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
    },


    carregarFuse(){
      // Fuse search initialization.
      this.fuseSearch = new Fuse(this.tableData, {
        keys: ["nome"],
        threshold: 0.3
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


    handleEdit(index, row){
      this.funcionarioSelecionado = row
      this.$router.push(`/editarFuncionarios/${row.id}`)
    },


    handleDelete(index, row){
      this.dialogDemitirFuncionario = true
      this.selectRow = row
    },


    cadastrarFuncionario(params){
      let th = this
      this.isLoading = true

      let bodyFormData = {
        setDB: params.setDB,
        cpf: params.cpf.replace(/[. - / - -]/g, ''),
        numero_pis: params.numero_pis,
        data_pis: params.data_pis,
        nome: params.nome,
        numero_matricula_ctps: params.numero_matricula_ctps,
        codigo: params.codigo.toString(),
        endereco: params.endereco,
        complemento: params.complemento,
        bairro: params.bairro,
        cep: params.cep.replace(/[. - / - -]/g, ''),
        estado: params.estado,
        cidade: params.cidade,
        telefone: params.telefone.replace(/[. - ( - ) - / - -]/g, ''),
        email: params.email,
        escolaridade: params.escolaridade,
        sexo: params.sexo,
        filiacao_pai: params.filiacao_pai,
        filiacao_mae: params.filiacao_mae,
        data_nascimento: params.data_nascimento,
        ctps: params.ctps,
        ctps_serie: params.ctps_serie,
        expedicao: params.expedicao,
        rg: params.rg,
        orgao_expedicao: params.orgao_expeditor,
        data_expedicao: params.data_expedicao,
        titulo_numero: params.titulo_numero,
        titulo_zona: params.titulo_zona,
        titulo_secao: params.titulo_secao,
        cert_reservista_ra: params.cert_reservista_ra,
        certificado_reservista_categoria: params.certificado_reservista_categoria,
        certificado_reservista_serie: params.certificado_reservista_serie,
        data_adimissao: params.data_adimissao,
        horas_contradadas_mes: params.horas_contradadas_mes,
        funcao: params.funcao,
        departamento: params.departamento,
        contribuicao_sindical_data: params.contribuicao_sindical_data,
        contribuicao_sindical_valor: params.contribuicao_sindical_valor,
        valor_plano_saude: params.valor_plano_saude,
        nr_conta_bancaria: params.nr_conta_bancaria,
        banco: params.banco,
        empregador_id: params.empregador_id
      }


      this.axios.post('/api/empregado/cadastrarEmpregado', bodyFormData)
      .then((response) => {
        th.isLoading = false
        th.showSwal('auto-close', 'Sucesso', 'Usuario cadastrado com sucesso!', 'success')
        setTimeout(() => {
          th.$router.push("/pesquisarEmpregados")
        }, 3000)
      })
      .catch((err) => {
        th.isLoading = false
        th.showSwal('auto-close', 'Erro', 'Erro ao cadastrar funcionário!', 'error')
        setTimeout(() => {
          th.$router.push("/pesquisarEmpregados")
        }, 3000)
      })
    },


    demitirFuncionario(){
      let th = this
      this.isLoading = true

      let bodyFormData = {
        setDB: this.$cookies.get('db'),
        id_funcionario: this.selectRow.id,
        motivo: this.demitir.motivo,
        data_demissao: this.demitir.data
      }

      this.axios.post('/api/empregado/demitirEmpregado', bodyFormData)
      .then((response) => {
        th.isLoading = false
        th.dialogDemitirFuncionario = false
        th.listarFuncionarios()
        th.showSwal('auto-close', 'Sucesso', 'Funcionário demitido com successo!', 'success')
      })
      .catch((err) => {
        th.isLoading = false
        th.showSwal('auto-close', 'Erro', 'Falha ao demitir funcionário!', 'error')
        // warning, error, success, info, and question
      })
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
