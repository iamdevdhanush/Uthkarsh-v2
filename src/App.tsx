import { Routes, Route } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import { Home } from './pages/Home'
import { Register } from './pages/Register'
import { ContactUs } from './pages/ContactUs'
import { ThreeGlobe } from './components/effects/ThreeGlobe'
import { BackgroundSystem } from './components/effects/BackgroundSystem'
import { GlobalLighting } from './components/effects/GlobalLighting'

function App() {
  return (
    <>
      <BackgroundSystem />
      <GlobalLighting />
      <ThreeGlobe />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/contact" element={<ContactUs />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
