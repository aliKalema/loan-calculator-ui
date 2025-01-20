import './App.css'
import {lazy, Suspense} from "react";
import {Route, Routes, useNavigate} from "react-router-dom";
import Login from "./features/shared/Login";
import {ErrorBoundary} from "react-error-boundary";
import ErrorFallback from "./features/shared/ErrorFallback";
import SkeletonAdmin from "./features/shared/SkeletonAdmin";
import Layout from "./features/user/Layout";
import Signup from "./features/shared/Signup";
import SetPassoword from "./features/shared/SetPassoword";
const Admin = lazy(() => import('./features/admin/admin'));
const User = lazy(() => import('./features/user/Layout'));
function App() {
    const navigate = useNavigate();
  return (
      <Routes>
          <Route path='/login' element={ <Login/> }></Route>
          <Route path='/signup' element={ <Signup/> }></Route>
          <Route path='/set-password' element={ <SetPassoword/> }></Route>

          <Route path="user" element={
              <ErrorBoundary
                  FallbackComponent={ErrorFallback}
                  onReset={() => navigate('/')}
              >
                  <Suspense fallback={<SkeletonAdmin />}>
                      <User index={0} value={0} />
                  </Suspense>
              </ErrorBoundary>}
          />

      </Routes>
  )
}

export default App
