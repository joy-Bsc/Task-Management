import React,{Suspense, lazy} from 'react';
import LazyLoader from '../../components/masterLayout/LazyLoader';
const SendOTP = lazy(() => import('../../components/AccountRecover/SendOTP'));

const SendOTPPage = () => {
    return (
        <div>
            <Suspense fallback={<LazyLoader/>}>
                <SendOTP/>
                </Suspense>
        </div>
    );
};

export default SendOTPPage;