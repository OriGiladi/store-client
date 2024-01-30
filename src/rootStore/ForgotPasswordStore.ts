import { RootStore } from ".";
import { makeAutoObservable } from "mobx";

class ForgotPasswordStore {
    rootStore: RootStore;
    isSuchUser: boolean | undefined;
    email: string | undefined;
    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        makeAutoObservable(this);
    }
    setIsSuchUser(isSuchUser?: boolean) {
        this.isSuchUser = isSuchUser;
    }
    setEmail(email?: string) {
        this.email = email;
    }
}
export default ForgotPasswordStore
