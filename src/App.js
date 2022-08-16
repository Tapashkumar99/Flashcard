import Navbar from "./components/navbar/Navbar";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Heading from "./components/headingbtns/Heading";
import FlashCardGroup from "./components/flashcards/FlashGroup";
import FlashCards from "./components/flashcards/FlashCards";
import { useSelector } from "react-redux";
import CreateG2 from "./components/mainflashcards/CreateG2";

function App() {

  const flashstate = useSelector(state => state.Reducer.showNum)
  return (
    <BrowserRouter>
      <div className="h-screen">
        <Navbar />
        <div className='px-0 lg:px-40 sm:px-8'>
          <Heading />
          <Routes>
            <Route path="/" element={<CreateG2 />} />
            <Route path="/flashcardgroup" element={<FlashCardGroup />} />
            <Route path={`/flashCard${flashstate}`} element={<FlashCards />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
