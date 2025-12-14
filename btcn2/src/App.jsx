import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Main } from "./components/Main";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white dark:bg-slate-900 flex flex-col max-w-[1200px] mx-auto w-full transition-colors">
        <Header />
        <Main />
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
