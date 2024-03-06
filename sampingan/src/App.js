import Home from "./pages/Home";
import Article from "./pages/Article";
import AllArticle from "./pages/AllArticle";
import Writer from "./pages/Writer";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/article/:articleId" element={<Article />} />
          <Route path="/article/all-article" element={<AllArticle />} />
          <Route path="/writer" element={<Writer />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
