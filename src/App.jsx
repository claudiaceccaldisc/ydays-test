import { Routes, Route, Navigate } from "react-router-dom";
import Introduction from "./pages/Introduction";
import Quiz from "./pages/Quiz";
import Situation from "./pages/Situation";
import Action from "./pages/Action";
import Resume from "./pages/Resume";

// Navigation du parcours. Les routes suivent l'ordre des étapes (voir parcours.js).
function App() {
  return (
    <Routes>
      <Route path="/" element={<Introduction />} />
      <Route path="/quiz" element={<Quiz />} />
      <Route path="/situation" element={<Situation />} />
      <Route path="/action" element={<Action />} />
      <Route path="/resume" element={<Resume />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
