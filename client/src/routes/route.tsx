import { ProtectedRoutes } from "@/components/ProtectedRoutes";
import LayoutDefault from "@/layout";
import { LoginPage } from "@/pages/LoginPage";
import TaskHomePage from "@/pages/TaskHomePage";
import { BrowserRouter, Routes, Route } from "react-router";

export function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<ProtectedRoutes><LayoutDefault /></ProtectedRoutes>}>
                    <Route index element={<TaskHomePage />} />
                </Route>    

                <Route path="/login" element={<ProtectedRoutes publicRoute><LoginPage /></ProtectedRoutes>} />
            </Routes>
        </BrowserRouter>
    );
}