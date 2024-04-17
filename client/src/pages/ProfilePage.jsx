import React,{Suspense, lazy} from 'react';
import MasterLayout from '../components/masterLayout/MasterLayout';
import LazyLoader from '../components/masterLayout/LazyLoader';
const Profile = lazy(() => import('../components/profile/Profile'));
const ProfilePage = () => {
    return (
        <div>
           <MasterLayout>
                <Suspense fallback={<LazyLoader/>}>
                <Profile/>
                </Suspense>
            </MasterLayout> 
        </div>
    );
};

export default ProfilePage;