import LayoutDefault from "@/layout";
import TaskHomePage from "@/pages/TaskHomePage";
import { BrowserRouter, Routes, Route } from "react-router";

export function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LayoutDefault />}>
                    <Route index element={<TaskHomePage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}