import { createContext, useContext } from 'react';

interface User {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    image: string
}

export const DashboardContext = createContext<User | undefined>(undefined);

export function useUserContext() {
    const user = useContext(DashboardContext);

    if (user === undefined) {
        throw new Error('useUserContext must be used with a DashboardContext');
    }

    return user;
}