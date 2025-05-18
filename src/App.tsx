import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './layout/Layout'
import AppRouter from './router/AppRouter'

function App() {
  return (
    <BrowserRouter>
    <Layout>
      <AppRouter />
    </Layout>
    </BrowserRouter>
  )
}

export default App
