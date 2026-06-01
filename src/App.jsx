import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Introduction from "./pages/Introduction";
import Quiz from "./pages/Quiz";
import Situation from "./pages/Situation";
import Action from "./pages/Action";
import Resume from "./pages/Resume";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Introduction />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/situation" element={<Situation />} />
        <Route path="/action" element={<Action />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
