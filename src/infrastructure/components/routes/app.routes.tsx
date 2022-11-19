import { Navigate, Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';

const Home = lazy(() => import('../../../features/home/page/home.page'));
export function AppRoutes() {
    return (
        <Suspense>
            <Routes>
                <Route path="home" element={<Home></Home>}></Route>
            </Routes>
        </Suspense>
    );
}
