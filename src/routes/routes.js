import {
  FileAddOutlined,
  HomeOutlined,
  OrderedListOutlined,
  SelectOutlined,
  UnorderedListOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { roles } from "../utils/enums/roles";
import Dashboard from "../views/DashboardView";
import Evaluations from "../views/EvaluationsView";
import NewEvaluation from "../views/NewEvaluationView";
import MyEvaluations from "../views/MyEvaluations";
import EvaluationResponse from "../views/EvaluationResponse";
import Profile from "../views/Profile";

const routes = [
  {
    name: "INICIO",
    path: "/",
    component: Dashboard,
    roles: [roles.ADMIN, roles.MANAGER, roles.EMPLOYEE],
    icon: HomeOutlined,
  },
  {
    name: "PERFIL",
    path: "/profile",
    component: Profile,
    roles: [roles.ADMIN, roles.MANAGER, roles.EMPLOYEE],
    icon: UserOutlined,
  },
  {
    name: "EVALUACIONES",
    roles: [roles.ADMIN, roles.MANAGER, roles.EMPLOYEE],
    icon: UnorderedListOutlined,
    items: [
      {
        name: "NUEVA EVALUACIÓN",
        path: "/evaluations/new",
        component: NewEvaluation,
        roles: [roles.ADMIN],
        icon: FileAddOutlined,
      },
      {
        name: "ASIGNAR EVALUACIONES",
        path: "/evaluations/lits",
        component: Evaluations,
        roles: [roles.ADMIN],
        icon: SelectOutlined,
      },
      {
        name: "MIS EVALUACIONES",
        path: "/evaluations/my",
        component: MyEvaluations,
        roles: [roles.ADMIN, roles.MANAGER, roles.EMPLOYEE],
        icon: OrderedListOutlined,
      },
      {
        name: "RESPUESTA DE EVALUACION",
        path: "/evaluations/response",
        component: EvaluationResponse,
        roles: [roles.ADMIN, roles.MANAGER, roles.EMPLOYEE],
        icon: OrderedListOutlined,
        isHidden: true,
      },
    ],
  },
];

export default routes;
