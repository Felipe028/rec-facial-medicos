<template>
  <div class="content">
    <div class="row">
      <div class="col-12">
        <card type="chart">
          <template slot="header">
            <div class="row">
              <div class="col-sm-6">
                <template>
                  <h4 class="card-title text-left">Mural de Informações</h4>
                </template>
              </div>
            </div>
          </template>
          <div class="row">
              <h4 class="text-h4">Portaria 373/2011 do MT</h4>
              <p class="text-p">A Portaria 373/2011 prevê a possibilidade de, mediante acordo coletivo, utilizar sistema alternativo eletrônico de controle de jornada. Ou seja, permite a adoção de sistema eletrônico que não seja o regulado pela Portaria 1.510/2009. Todavia, a Portaria 373/2011 estabelece requisitos mínimos para o sistema alternativo. Em nosso menu Manuais, disponibilizamos um template (modelo) para registro e formalização junto ao sindicato.</p>
              <h4 class="text-h4">Re-instalações extras do aplicativo de ponto</h4>
              <p class="text-p">Informamos que nos casos de re-instalações extras do aplicativo de ponto na máquina desktop do cliente, para estes casos terá um custo adicional no próximo boleto a vencer de 60,00. Estas instalações serão realizadas via acesso remoto teamview. 
PROCEDIMENTO: O cliente deverá enviar um email para suporte@mrmsistemas.com.br solicitando a reinstalação informando identificação da empresa e repassando ID e Senha do teamview.</p>
              <h4 class="text-h4">Solicitação de treinamento ou visita presencial na sede do cliente</h4>
              <p class="text-p">Disponibilizamos aos nossos clientes treinamentos gratuitos, estes ocorrem de forma remota mediante agendamento. Caso o cliente prefira formato presencial, é possível solicitar a presença de um técnico até a sede do cliente, este será cobrado a parte. Pagamento será incluso no próximo boleto mensal do ponto.
Custo: R$ 100,00.
Duração: 1 hora.
OBS: Necessário agendar e solicitar via email rep373@mrmsistemas.com.br</p>
              <h4 class="text-h4">Registro de Ocorrências</h4>
              <p class="text-p">Disponibilizamos um novo módulo para cadastro de ocorrências diversas. Estas ocorrências sairão impressas no cartão de ponto do(a) colocaborador(a). OBS: Estas ocorrências não referem-se a tratamento de ponto e sim fatos que podem ocorrer e que merecem seus devidos registros em folha de ponto. Para cadastrar uma ocorrência, gere o cartão de ponto e clique no ícone azul ao lado do ícone de abonos.</p>
          </div>
          
        </card>
      </div>
      
    </div>
    
  </div>
</template>
<script>
import { Card } from "@/components/index";



export default {
  components: {
    Card,
  },
  data() {
    return {};
  },
  computed: {},
  methods: {},
  mounted() {},
  beforeDestroy() {}
};
</script>
<style>
#worldMap .datamap {
  left: 0 !important;
}

.text-h4{
    padding: 0px 10px 0px 10px;
    margin: 10px 0px 0px 0px;
}

.text-p{
    text-align: left;
    padding: 0px 20px 0px 20px;
}
</style>
