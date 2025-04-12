import axios from "axios";
import useGerenciarProjetos from "../../@core/services/gerenciaProjetos/useGerenciarProjetos";
import defaultConfig from "../defaultConfig";

const axiosIns = axios.create({
  baseURL: defaultConfig.baseUrlService,
  headers: {},
});

const { gerenciarProjetos } = useGerenciarProjetos(axiosIns);
export default gerenciarProjetos;
