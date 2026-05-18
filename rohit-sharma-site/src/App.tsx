import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import PasswordScreen from './components/PasswordScreen';
import BirthdayPage from './components/BirthdayPage';

function App() {
  const [isUnlocked, setIsUnlocked] = useState(false);

  return (
    <main className="min-h-screen text-white selection:bg-pink-500/30">
      <AnimatePresence mode="wait">
        {!isUnlocked ? (
          <PasswordScreen key="password" onUnlock={() => setIsUnlocked(true)} />
        ) : (
          <BirthdayPage key="birthday" />
        )}
      </AnimatePresence>
    </main>
  );
}

export default App;
