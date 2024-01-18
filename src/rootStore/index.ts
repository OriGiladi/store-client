import UserStore from "./userStore";

export class RootStore {
    userStore: UserStore;
    constructor() {
        this.userStore = new UserStore(this);
    }

    reset() {
        this.userStore = new UserStore(this);
    }
}

const rootStore = new RootStore();

export default rootStore;
