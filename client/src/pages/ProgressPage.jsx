import React,{Suspense, lazy} from 'react';
import MasterLayout from '../components/masterLayout/MasterLayout';
import LazyLoader from '../components/masterLayout/LazyLoader';
const Progress = lazy(() => import('../components/progress/Progress'));
const ProgressPage = () => {
    return (
        <div>
            <MasterLayout>
                <Suspense fallback={<LazyLoader/>}>
                <Progress/>
                </Suspense>
            </MasterLayout>
        </div>
    );
};

export default ProgressPage;