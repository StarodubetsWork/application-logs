import HomePage from "@pages/HomePage";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="h-full bg-gray-50 overflow-hidden">
      <HomePage />
      <Toaster />
    </div>
  );
}

export default App;
