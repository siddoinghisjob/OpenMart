import Header from "./components/header";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Footer from "./components/footer";
import Product from "./pages/product";
import AdPost from "./pages/ad";
import ReqPost from "./pages/request";
import E404 from "./pages/e404";
import PrivateRoute from "./pages/protected";
import Error from "./pages/error";
import Test from "./pages/test";

function App() {
  return (
    <div className="min-h-screen h-full flex flex-col justify-between">
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/search/:id" element={<Home />}></Route>
        <Route path="/post/ad" element={<AdPost />}></Route>
        <Route element={<PrivateRoute />}>
          <Route path="/post/request" element={<ReqPost />}></Route>
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="/product/:id" element={<Product />}></Route>
        </Route>
        <Route path="/test" element={<Test />}></Route>
        <Route path="*" element={<E404 />}></Route>
        <Route path="/error" element={<Error />}></Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
