/* eslint-disable class-methods-use-this */
import { action, makeObservable } from "mobx";
import { MainStore } from "./MainStore";
import { PureTokenType } from "../globalTypes/globalTypes";

export class StorageStore {
    private mainStore: MainStore;

    constructor(mainStore: MainStore) {
        this.mainStore = mainStore;
        makeObservable(this);
      }

    @action setSessionItem = (key: string, item: unknown) => 
         Promise.resolve().then(() => {
            sessionStorage.setItem(key, JSON.stringify(item));
        });

    @action getSessionItem = (key: string): Promise<string> => {
        const value = sessionStorage.getItem(key);
        return Promise.resolve().then(() => 
            (value ? JSON.parse(value) || "": "")
        );
    }
         
    @action clearSessionItem = (key: string) => 
        Promise.resolve().then(() => 
            sessionStorage.removeItem(key)
        );
    

    @action storeToken = (token: PureTokenType) => 
        this.setSessionItem("token", token);

    @action getToken = () => 
        Promise.resolve().then(() => 
            this.getSessionItem("token")
        );

    @action clearToken = () => 
        this.clearSessionItem("token");
}