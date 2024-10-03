import { observable, makeObservable } from "mobx";
import { AuthStore } from "./AuthStore";
import { StorageStore } from "./StorageStore";
import { ErrorStore } from "./ErrorStore";

class MainStore {

    public authStore: AuthStore;

    public storageStore: StorageStore;

    public errorStore: ErrorStore;

    constructor() {
      this.authStore = new AuthStore(this);
      this.storageStore = new StorageStore(this);
      this.errorStore = new ErrorStore(this);

      makeObservable(this);
    }

    @observable test: boolean = false;
}

export { MainStore };