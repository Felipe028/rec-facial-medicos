<template>
    <div>
        <div class="w-100 d-flex justify-content-between mb-1" >
            <h4 class="card-title text-left" style="margin-top: 5px;">Período</h4>
            <input type="month" class="form-label" v-model="mesSelected"/>
        </div>
        

        
        
        <!-- Dia: <select id="dias"></select> -->


        <div class="table-responsive">
            <table class="table table-hover align-middle">
                <thead class="thead thead-dark">
                    <tr>
                        <th scope="col" style="color: #fff;">Data</th>
                        <!-- <th scope="col" style="color: #fff;">Sem</th> -->
                        <th scope="col" style="color: #fff;">Turno</th>
                        <th scope="col" style="color: #fff;">Setor</th>
                        <th scope="col" style="color: #fff;">Entrada</th>
                        <th scope="col" style="color: #fff;">Saída</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in diasMes" :key="item">
                        <th>{{item.dia}}/{{month}}</th>
                        <!-- <td>ss</td> -->
                        <td>
                            <div v-for="turno in item.batidas" :key="turno">
                                {{turno.TURNO}}
                            </div>
                        </td>
                        <td>
                            <div v-for="setor in item.batidas" :key="setor">
                                {{setor.SETOR}}
                            </div>
                        </td>
                        <td>
                            <div v-for="entrada in item.batidas" :key="entrada">
                                {{entrada.HORA_ENTRADA1}}
                            </div>
                        </td>
                        <td>
                            <div v-for="saida in item.batidas" :key="saida">
                                {{saida.HORA_SAIDA1 ? saida.HORA_SAIDA1 : "--:--"}}
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>


    </div>
</template>


<script>
import jwt from 'jsonwebtoken';
import globalVariable from "../../globalVariable";
export default {
    
    data() {
        return {
            isLoading: false,
            mesSelected: "",
            diasMes: [],
            month: "",
            year: "",
        };
    },

    mounted() {
        const hoje = new Date()
        this.month = hoje.getMonth()
        this.year = hoje.getFullYear()
        let mesTemp = hoje.getMonth()+1
        this.mesSelected = hoje.getFullYear()+"-"+mesTemp;
        this.getDiasMes(mesTemp, hoje.getFullYear())
    },

    methods: {
        getDiasMes(month, year) {
            month--;
            var date = new Date(year, month, 1);
            var days = [];
            while (date.getMonth() === month) {
                days.push({
                    "dia": date.getDate(),
                    "batidas": [],
                });
                date.setDate(date.getDate() + 1);
            }
            this.diasMes = days;
            return days;
        },


        listarFolha(mes, ano){
            
            let th = this
            this.isLoading = true
            let w1 = jwt.sign({ foo: 'bar', exp: Math.floor(Date.now() / 1000) + (30) * 60 }, globalVariable.KEY_RECORD)
            let config = {
                headers: {
                    token: w1,
                }
            };
            let bodyFormData = {
                mes: parseInt(mes),
                ano: parseInt(ano)
            }
            this.axios.post(`/getFolhaPonto/${this.$cookies.get('cod')}`, bodyFormData, config)
            .then((response) => {
                th.isLoading = false
                let cont = 0;
                response.data.dados.map((dados)=>{
                    cont = 0;
                    this.diasMes.map((data) => {
                        if(data.dia == parseInt(dados.DIA_ENTRADA)){
                            this.diasMes[cont].batidas.push(dados)
                        }
                        cont ++;
                    })
                })
            })
            .catch((err) => {
                th.isLoading = false
            })
        },
        
    },


    watch: {
        mesSelected(newVal){
            this.getDiasMes(newVal.substr(5), newVal.substr(0, 4))
            this.month = newVal.substr(5)
            this.year = newVal.substr(0, 4)
            this.listarFolha(newVal.substr(5), newVal.substr(0, 4))
        }
    }
}
</script>