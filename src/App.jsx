import { BrowserRouter as Router,Routes,Route } from "react-router-dom"
import HomePage from './Pages/HomePage'
import SearchFeed from './Pages/SearchFeed'
import WatchPage from './Pages/WatchPage'
import Navbar from "./components/Navbar"

function App() {

  return (
    <>
     
      <Router>
      <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search/:searchTerm" element={<SearchFeed />} />
          <Route path="/watch/:id" element={<WatchPage />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
