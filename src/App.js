// import logo from './logo.svg';
// import './App.css';
import ContactForm from './views/ContactForm';
import ContactsList from './views/ContactsList';
import { PersonProvider } from './providers/personProvider';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      {/* set up routes */}
      <Router>
        <PersonProvider>
          <Routes>
            <Route path="/" element={<ContactsList />} />
            <Route path="/contact/:id" element={<ContactForm />} />
            <Route path="/new" element={<ContactForm />} />
          </Routes>
        </PersonProvider>
      </Router>
    </>
  );
}

export default App;
