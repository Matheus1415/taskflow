import { BrowserRouter, Routes, Route } from "react-router";


export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>Task Flow</h1>}/>
      </Routes>
    </BrowserRouter>
  );
}