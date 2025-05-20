import './App.css'
import { BrowserRouter } from 'react-router-dom'
import Layout from './layout/Layout'
import AppRouter from './router/AppRouter'
import { Suspense } from 'react'

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Layout>
          <AppRouter />
        </Layout>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
