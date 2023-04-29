import SignIn from './screens/SignIn';
import Dashboard from './screens/Dashboard';
import { useAuthStore } from './store';

function App() {
  const userSignedIn = useAuthStore((state) => state.userSignedIn);

  return userSignedIn ? <Dashboard /> : <SignIn />;
}

export default App;
