import React, {Fragment, lazy, Suspense} from 'react';
import LazyLoader from "../components/masterLayout/LazyLoader";
const ForgetPass =lazy(() => import('..'));
const ForgetPassPage = () => {
    return (
        <Fragment>
            <Suspense fallback={<LazyLoader/>}>
                <ForgetPass/>
            </Suspense>
        </Fragment>
    );
};

export default ForgetPassPage;