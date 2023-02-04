import { HomeScreen } from '@screens';
import { Route, Routes } from 'react-router-dom';

function AppRouter() {
  return (
    <Routes>
      <Route index element={<HomeScreen />} />
    </Routes>
  );
}

export { AppRouter };
