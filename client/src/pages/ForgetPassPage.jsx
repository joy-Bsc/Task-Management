import React,{Suspense, lazy} from 'react';
import LazyLoader from '../components/masterLayout/LazyLoader';
const ForgetPass = lazy(() => import('../components/AccountRecover/SendOTP'));
const ForgetPassPage = () => {
    return (
        <div>
            
                <Suspense fallback={<LazyLoader/>}>
                <ForgetPass/>
                </Suspense>
           
        </div>
    );
};

export default ForgetPassPage;