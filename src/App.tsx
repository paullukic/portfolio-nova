import Home from './pages/Home';
import NotFound from './pages/NotFound';

// One real page plus a themed 404, so a router would only add weight.
function App() {
  const path = window.location.pathname.replace(/\/+$/, '') || '/';
  return path === '/' || path === '/index.html' ? <Home /> : <NotFound />;
}

export default App;
