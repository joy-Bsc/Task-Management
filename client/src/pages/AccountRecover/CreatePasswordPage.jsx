import React,{Suspense, lazy} from 'react';
import LazyLoader from '../../components/masterLayout/LazyLoader';
const CreatePassword = lazy(() => import('../../components/AccountRecover/CreatePassword'));

const CreatePasswordPage = () => {
    return (
        <div>
             <Suspense fallback={<LazyLoader/>}>
                <CreatePassword/>
                </Suspense>
        </div>
    );
};

export default CreatePasswordPage;