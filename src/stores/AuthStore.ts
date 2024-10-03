import { observable, action, makeObservable, runInAction } from "mobx";
import * as agent from "../services/ConnectionsServices";
import { MainStore } from "./MainStore";
import { PureTokenType } from "../globalTypes/globalTypes";
import { WorkerPlaceLockResponsePayLoadType } from "../services/ConnectionsServices.types";

type IsAuthorizedType = boolean;
type IsAuthorizedProgressType = boolean;
type CheckStatusInProgressType = boolean;
type AuthErrorType = string | undefined;
type LoggerType = string | undefined;
type IsPausedType = boolean;

export class AuthStore {
    private mainStore: MainStore;

    constructor(mainStore: MainStore) {
        this.mainStore = mainStore;
        makeObservable(this);
      }

    @observable public token: PureTokenType = undefined; 

    @observable public isAuthorized: IsAuthorizedType = false;

    @observable public isPaused: IsPausedType = false;
    
    @observable public logged: LoggerType = undefined;

    @observable public userData: any = {
        Usr_Name: "",
        Role_Name: ""
    };
    
    @observable public worker: WorkerPlaceLockResponsePayLoadType | null= null;

    @observable public authError: AuthErrorType = undefined;

    @observable public isAuthorizedProgress: IsAuthorizedProgressType = false;

    @observable public checkStatusInProgress: CheckStatusInProgressType = true;

    @action errorHandler = (resultMessage: string, resultCode: string | number) => {        
        const { errorStore: { setErrorState } } = this.mainStore;

        setErrorState(resultMessage, resultCode === 77777 ? 'error' : 'warn');
    }

    @action errorTokenHandler = (resultMessage: string, resultCode: string | number) => {        
        const { errorStore: { setTokenErrorState } } = this.mainStore;

        setTokenErrorState(resultMessage, resultCode === 77777 ? 'error' : 'warn');
    }

    @action clearErrorHandler = () => {
        const { errorStore: { clearErrorState } } = this.mainStore;

        clearErrorState()
    }

    @action setIsAuthorized = (value: IsAuthorizedType) => {
        this.isAuthorized = value;
    }

    @action setToken = (value: PureTokenType): void => {
        this.token = value;
    }
    
    @action setLogged = (value: LoggerType): void => {
        this.logged = value;
    }

    @action setWorker = (value: WorkerPlaceLockResponsePayLoadType | null): void => {
        this.worker = value;
    }

    @action setAuthError = (value: AuthErrorType): void => {
        this.authError = value;
    }

    @action setUserData = (payload: any) => {
        this.userData = payload;
    }

    @action signIn = (username: string, payload: any) => {
        this.setLogged(username);
        this.setToken(payload.token);
        this.setUserData(payload);
      }
    
    @action lockWorker = (worker: WorkerPlaceLockResponsePayLoadType | null) => {
        this.setWorker(worker);
      }
    
     @action signOut = () => {
        const {
            storageStore: { clearToken },
         } = this.mainStore;

        clearToken().then(() => {
            this.setLogged(undefined);
            this.setToken(undefined);
            this.setWorker(null);
        })
      }

    @action login = (userName: string, password: string) => {
        const {
            storageStore: { storeToken },
         } = this.mainStore;

         this.isAuthorizedProgress = true;
         this.clearErrorHandler();

        return agent.Auth.login(userName, password)
        .then((data) => {
            const { payLoad, resultCode, resultMessage} = data;

            if (payLoad && resultCode === 0) {
                storeToken(payLoad._usrToken).then(() => 
                    this.signIn(userName, payLoad)
                )
            } else if (resultCode !== 0) {
                runInAction(() => {
                    this.errorHandler(resultMessage, resultCode);
                })
            }
        })
        .catch((error) => {
            console.error(error);
            const {resultMessage, resultCode} = error;
            runInAction(() => {
                this.errorHandler(resultMessage, resultCode);
            })
        })
        .finally(() => {
            runInAction(() => {
                this.isAuthorizedProgress = false;
            })
        })
    }

    @action logout = () => {
        const { 
            errorStore: { clearErrorState }
        } = this.mainStore;

        clearErrorState();

        if (this.token) {
            this.isAuthorizedProgress = true;
            this.authError = undefined;
            const { usrId } = this.userData; 

            return agent.Auth.logout(this.token, usrId)
            .then((data) => {
            const { payLoad, resultCode, resultMessage} = data;

                if (payLoad && resultCode === 0) {
                    this.signOut();
                    this.isAuthorizedProgress = false;
                } else if (resultCode !== 0) {
                    runInAction(() => {
                        this.errorHandler(resultMessage, resultCode);
                    })
                }

            })
            .catch((error) => {
                console.error(error);
                const {resultMessage, resultCode} = error;
                runInAction(() => {
                    this.errorHandler(resultMessage, resultCode);
                })
            })
        } else {
            throw new Error;
        }
    }

    @action checkUserRoleStatusAction = () => {
        if (this.token) {
            return agent.Auth.checkUserRoleStatus(this.token)
            .then((response) => {
                if (response && response.resultCode === 0) {
                    const { payLoad: { Pause_Dt: pauseDate } } = response;
                    runInAction(() => {
                        this.isPaused = pauseDate !== "";
                    })
                } else if (response && response.resultCode !== 0) {
                    const {resultCode, resultMessage} = response;

                    this.logout();

                    this.errorTokenHandler(resultMessage, resultCode);

                }
                return response
            })
            .catch((error) => {
                const {resultMessage, resultCode} = error;
                runInAction(() => {
                    this.errorHandler(resultMessage, resultCode);
                })
            })
        } else {
            throw new Error;
        }
    }

    @action checkAuthStatus = () => {
        const {
            storageStore: { getToken },
        } = this.mainStore;

        getToken().then((storedToken) => {
            if (storedToken) {
                agent.Auth.checkToken(storedToken)
                .then((res) => {
                    const { 
                        // payLoad: { Usr_Name: UsrName }, 
                        payLoad, 
                        resultCode, 
                        resultMessage
                    } = res;

                    if (payLoad && payLoad.Usr_Name && resultCode === 0) {
                        this.signIn(payLoad.Usr_Name, payLoad)
                    } else {
                        this.errorHandler(resultMessage, resultCode);
                        this.signOut();
                    }
                })
                .catch((error) => {
                    const {resultMessage, resultCode} = error;
                    runInAction(() => {
                        this.errorHandler(resultMessage, resultCode);
                    })
                })
                .finally(() => {
                    runInAction(() => {
                        this.isAuthorizedProgress = false;
                    })
                })
            }
        }
            ).finally(() => {
            runInAction(() => {
                this.checkStatusInProgress = false;
            })
        });
    }
}