import LayoutDefault from "@/layout";
import { BrowserRouter, Routes, Route } from "react-router";

export function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LayoutDefault />}>
                    <Route index element={<h1>Home</h1>} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}