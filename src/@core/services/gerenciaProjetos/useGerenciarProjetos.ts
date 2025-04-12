import type { AxiosInstance } from "axios";
import GerenciarProjetosService from "./gerenciarProjetosService";

export default function useGerenciarProjetos(
  axiosIns: AxiosInstance,
) {
  const gerenciarProjetos = new GerenciarProjetosService(axiosIns);

  return {
    gerenciarProjetos,
  };
}
