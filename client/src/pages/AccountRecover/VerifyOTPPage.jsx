import React,{Suspense, lazy} from 'react';
import LazyLoader from '../../components/masterLayout/LazyLoader';
const VerifyOTP = lazy(() => import('../../components/AccountRecover/VerifyOTP'));

const VerifyOTPPage = () => {
    return (
        <div>
            <Suspense fallback={<LazyLoader/>}>
                <VerifyOTP/>
                </Suspense>
        </div>
    );
};

export default VerifyOTPPage;