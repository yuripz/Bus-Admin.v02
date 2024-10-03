import { observable, action, makeObservable } from "mobx";
import { MainStore } from "./MainStore";

type errorState = {
  status: boolean;
  message: string;
  type: "error" | "warn";
};

export class ErrorStore {
    private mainStore: MainStore;

    constructor(mainStore: MainStore) {
        this.mainStore = mainStore;
        makeObservable(this);
      }

      @observable errorState: errorState = {
        status: false,
        message: "",
        type: "error"
      }

      @action setErrorState = (errorMessage?: string, type?: "error" | "warn") => {
        this.errorState = {
          status: true,
          message: errorMessage || "Ошибка сервера",
          type: type || "error",
        };

        setTimeout(this.clearErrorState, 8000)
      }

      @action setTokenErrorState = (errorMessage?: string, type?: "error" | "warn") => {
        this.errorState = {
          status: true,
          message: errorMessage || "Ошибка сервера",
          type: type || "error",
        };
      }

      @action clearErrorState = () => {
        this.errorState = {
          status: false,
          message: "",
          type: "error",
        };
      }
}