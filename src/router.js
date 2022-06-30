import DashboardLayout from "@/pages/Layout/DashboardLayout.vue";
import AuthLayout from "@/pages/Pages/AuthLayout.vue";
import RegistrarPontoFuncionario from "@/pages/Pages/RegistrarPontoFuncionario.vue";
import RegistrarPontoEmpresa from "@/pages/Pages/RegistrarPontoEmpresa.vue";

const Login = () => import("@/pages/Pages/Login.vue");
const SelecionarSetor = () => import("@/pages/Pages/SelecionarSetor.vue");

const ReconhecimentoFacial = () => import("@/pages/Pages/RegistrarPontoFuncionario/ReconhecimentoFacial.vue");
const ReconhecimentoFacialEmpresa = () => import("@/pages/Pages/RegistrarPontoEmpresa/ReconhecimentoFacialEmpresa.vue");

const Home = () => import("@/pages/Home.vue");

const Abonos = () => import("@/pages/Abonos.vue");
const AbonosInserir = () => import("@/pages/AbonosInserir.vue");


const RegistrarPontoColaborador = () => import("@/pages/RegistrarPontoColaborador.vue");
const RegistrarPonto = () => import("@/pages/RegistrarPonto.vue");

const RegistrarPontoEmpresas = () => import("@/pages/RegistrarPontoEmpresas.vue");


let authPages = {
  path: "/",
  component: AuthLayout,
  name: "Authentication",
  children: [
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        levelAccess: 10,
        public: true
      }
    },
    {
      path: '/selecionarSetor',
      name: 'Selecionar Setor',
      component: SelecionarSetor,
      meta: {
        levelAccess: 10,
        public: false
      }
    },
  ]
};

/* let registrarPontoFuncionarioPages = {
  path: "/registrarPonto",
  component: RegistrarPontoFuncionario,
  name: "REGISTRAR CHECK IN / CHECK OUT DO PLANTÃO s",
  children: [
    {
      path: "/",
      name: "Reconhecimento Facial",
      component: ReconhecimentoFacial,
      meta: {
        levelAccess: 10,
        public: false
      }
    }
  ]
}; */

/* let RegistrarPontoEmpresaPages = {
  path: "/registraPonto",
  component: RegistrarPontoEmpresa,
  name: "REGISTRAR CHECK IN / CHECK OUT DO PLANTÃO Funcionário",
  children: [
    {
      path: "/",
      name: "Reconhecimento Facial Empresa",
      component: ReconhecimentoFacialEmpresa,
      meta: {
        levelAccess: 7,
        public: false
      }
    }
  ]
}; */

const routes = [
  authPages,
  // registrarPontoFuncionarioPages,
  // RegistrarPontoEmpresaPages,
  {
    path: "/",
    component: DashboardLayout,
    children: [
      {
        path: "home",
        name: "Home",
        component: Home,
        meta: {
          levelAccess: 10,
          public: false
        }
      },
      {
        path: "abono",
        name: "Abonos",
        component: Abonos,
        meta: {
          levelAccess: 10,
          public: false
        }
      },
      {
        path: "abono/inserir",
        name: "Inserir Abono",
        component: AbonosInserir,
        meta: {
          levelAccess: 10,
          public: false
        }
      },
      {
        path: "registrarPonto",
        name: "REGISTRAR CHECK IN / CHECK OUT DO PLANTÃO",
        component: RegistrarPonto,
        meta: {
          levelAccess: 10
        }
      },
      {
        path: "registrarPonto/colaborador",
        name: "REGISTRAR CHECK IN / CHECK OUT DO PLANTÃO",
        component: RegistrarPontoColaborador,
        meta: {
          levelAccess: 10
        }
      },
      {
        path: "registrarPonto/empresa",
        name: "REGISTRAR CHECK IN / CHECK OUT DO PLANTÃO",
        component: RegistrarPontoEmpresas,
        meta: {
          levelAccess: 7,
          public: false
        }
      },
    ]
  }
];

export default routes;
