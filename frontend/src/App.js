import { BrowserRouter } from 'react-router-dom';
import Footer from "./Components/app/Footer";
import Header from "./Components/app/Header";
import { AuthProvider } from './Components/context/AuthProvider';
import Router from './Components/router/Router';
import './css/bootstrap.min.css';
import HttpHeadersProvider from './Components/context/HttpHeadersProvider';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <HttpHeadersProvider>
          <Header />
          <Router />
          <Footer />
        </HttpHeadersProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
