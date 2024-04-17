import React,{Suspense, lazy} from 'react';
import MasterLayout from '../components/masterLayout/MasterLayout';
import LazyLoader from '../components/masterLayout/LazyLoader';
const Canceled = lazy(() => import('../components/canceled/Canceled'));

const CanceledPage = () => {
    return (
        <div>
           <MasterLayout>
                <Suspense fallback={<LazyLoader/>}>
                <Canceled/>
                </Suspense>
            </MasterLayout>
        </div>
    );
};

export default CanceledPage;