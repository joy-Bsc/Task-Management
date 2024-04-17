import React,{Suspense, lazy} from 'react';
import MasterLayout from '../components/masterLayout/MasterLayout';
import LazyLoader from '../components/masterLayout/LazyLoader';
const New = lazy(() => import('../components/new/New'));
const NewPage = () => {
    return (
        <div>
            <MasterLayout>
                <Suspense fallback={<LazyLoader/>}>
                <New/>
                </Suspense>
            </MasterLayout>
        </div>
    );
};

export default NewPage;