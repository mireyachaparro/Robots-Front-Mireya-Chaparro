import { Navigate, Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';

const Robots = lazy(() => import('../../../features/robots/page/robots.page'));
export function AppRoutes() {
    return (
        <Suspense>
            <Routes>
                <Route path="home" element={<Robots></Robots>}></Route>
                <Route path="" element={<Robots></Robots>}></Route>
                <Route path="*" element={<Navigate replace to="" />}></Route>
            </Routes>
        </Suspense>
    );
}
