import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./routes/Home";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
