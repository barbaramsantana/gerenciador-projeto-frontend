import type { AxiosInstance } from "axios";
import type { IProjeto } from "./interfaces/IGerenciarProjetos";

export default class GerenciarProjetosService {
  axiosIns: AxiosInstance;

  constructor(axiosIns: AxiosInstance) {
    this.axiosIns = axiosIns;
  }

  requestGetProjetos(): Promise<IProjeto[]> {
    return new Promise((resolve) => {
        const projetos = localStorage.getItem('projetos') || '[]';
        const projetosArray = JSON.parse(projetos);
        resolve(projetosArray);
    })
  }

  requestCreateProjeto(projeto: IProjeto): Promise<boolean> {
    const projetos = localStorage.getItem('projetos') || '[]';
    const projetosArray = JSON.parse(projetos);
    projeto.id = Math.random();
    projetosArray.push(projeto);
    localStorage.setItem('projetos', JSON.stringify(projetosArray));
    return new Promise((resolve) => {
      resolve(true);
    });
  }

  requestUpdateProjeto(projeto: IProjeto): Promise<boolean> {
    const projetos = localStorage.getItem('projetos') || '[]';
    const projetosArray = JSON.parse(projetos);
    const index = projetosArray.findIndex((p: IProjeto) => p.id === projeto.id);
    if (index !== -1) {
      projetosArray[index] = projeto;
      localStorage.setItem('projetos', JSON.stringify(projetosArray));
    }
    return new Promise((resolve) => {
      resolve(true);
    });
  }

  requestUpdateFavoritarProjeto(id: number): Promise<boolean> {
    const projetos = localStorage.getItem('projetos') || '[]';
    const projetosArray = JSON.parse(projetos);
    const index = projetosArray.findIndex((p: IProjeto) => p.id === id);
    if (index !== -1) {
      projetosArray[index].favorito = !projetosArray[index].favorito;
      localStorage.setItem('projetos', JSON.stringify(projetosArray));
    }
    return new Promise((resolve) => {
      resolve(true);
    });
  }

  requestDeleteProjeto(id: number): Promise<boolean> {
    const projetos = localStorage.getItem('projetos') || '[]';
    const projetosArray = JSON.parse(projetos);
    const index = projetosArray.findIndex((p: IProjeto) => p.id === id);
    if (index !== -1) {
      projetosArray.splice(index, 1);
      localStorage.setItem('projetos', JSON.stringify(projetosArray));
    }
    return new Promise((resolve) => {
      resolve(true);
    });
  }

}
