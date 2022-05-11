import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import ArticleInfo from "./routes/ArticleInfo";
import Home from "./routes/Home";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/article:idinfo" element={< ArticleInfo />} />
      </Route>
    </Routes>
  );
}

export default App;
