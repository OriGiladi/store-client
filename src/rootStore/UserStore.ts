import { RootStore } from ".";
import { makeAutoObservable } from "mobx";
import { BASE_URL } from "../utils/constants";
import { getHeadersWithJwt } from "../utils/sdk";

interface User {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    image: string
}

class UserStore {
    rootStore: RootStore;
    user: User | undefined;
    userJwt: string | undefined;
    isAdmin: boolean | undefined;
    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        makeAutoObservable(this);
    }
    setUser(user?: User) {
        this.user = user;
    }
    setIsAdmin(isAdmin?: boolean) {
        this.isAdmin = isAdmin;
    }
    setUserJwt(userJwt?: string) {
        this.userJwt = userJwt;
    }
    userJwtAuthentication() {
        const userJwt = localStorage.getItem("userJwt");
        if (userJwt) {
        fetch(`${BASE_URL}/users/me`, {
            headers: getHeadersWithJwt(userJwt as string),
        })
            .then((res) => res.json())
            .then((data) => {
            this.setUser((data as User));
            this.setUserJwt(userJwt as string)
            })
            .catch((error) => {
            console.error("Error fetching user data:", error);
            });
        }
    }
}
export default UserStore

