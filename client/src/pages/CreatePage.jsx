import React,{Suspense, lazy} from 'react';
import MasterLayout from '../components/masterLayout/MasterLayout';
import LazyLoader from '../components/masterLayout/LazyLoader';
const Create = lazy(() => import('../components/create/Create'));
const CreatePage = () => {
    return (
        <div>
            <MasterLayout>
                <Suspense fallback={<LazyLoader/>}>
                <Create/>
                </Suspense>
            </MasterLayout>
        </div>
    );
};

export default CreatePage;