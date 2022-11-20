import { Navigate, Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';

// const Home = lazy(() => import('../../../features/home/page/home.page'));
const Robots = lazy(() => import('../../../features/robots/page/robots.page'));
export function AppRoutes() {
    return (
        <Suspense>
            <Routes>
                <Route path="home" element={<Robots></Robots>}></Route>
            </Routes>
        </Suspense>
    );
}
