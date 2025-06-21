import React from 'react'
import Login from './pages/Login'
const App = () => {
  return (
   <>
    <Route
  path="/room/waiting"
  element={
    <ProtectRoute>
      <Waiting />
    </ProtectRoute>
  }
    />

   </>
  )
}

export default App