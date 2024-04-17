import React ,{Suspense, lazy} from 'react';
import MasterLayout from '../components/masterLayout/MasterLayout';
import LazyLoader from '../components/masterLayout/LazyLoader';
const Dashboard = lazy(() => import('../components/dashboard/Dashboard'));
const DashBoardPage = () => {
    return (
        <div>
            <MasterLayout>
                <Suspense fallback={<LazyLoader/>}>
                <Dashboard/>
                </Suspense>
            </MasterLayout>
        </div>
    );
};

export default DashBoardPage;