import React from 'react'
import { observer } from "mobx-react";
import rootStore from '../rootStore';
const { userStore } = rootStore
import ErrorPage from '../error-routes/error';
import { userRoles } from '../utils/constants';

const ProtectedRoute: React.FC<{ component: React.FC; roles: (userRoles | undefined )[] }> = observer(({ component: Component, roles: roles }) => {
    return (
        roles.includes(userStore.userRole) ?
        ( <Component /> ) :
        ( <ErrorPage/> )
    );
});

export default ProtectedRoute