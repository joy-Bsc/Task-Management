import React,{Suspense, lazy} from 'react';
import LazyLoader from '../components/masterLayout/LazyLoader';
const Login = lazy(() => import('../components/login/Login'));
const LoginPage = () => {
    return (
        <div>
             
                <Suspense fallback={<LazyLoader/>}>
                <Login/>
                </Suspense>
            
        </div>
    );
};

export default LoginPage;