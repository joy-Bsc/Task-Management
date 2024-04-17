import React,{Suspense, lazy} from 'react';
import MasterLayout from '../components/masterLayout/MasterLayout';
import LazyLoader from '../components/masterLayout/LazyLoader';
const Completed = lazy(() => import('../components/completed/Completed'));
const CompletedPage = () => {
    return (
        <div>
            <MasterLayout>
                <Suspense fallback={<LazyLoader/>}>
                <Completed/>
                </Suspense>
            </MasterLayout>
        </div>
    );
};

export default CompletedPage;