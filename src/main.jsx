import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import './index.css'
import Home from './pages/home'
import NotasAdicionadas from './pages/NotasAdicionadas'
import NotasExcluidas from './pages/NotasExcluidas'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
)

// esqueci como passa dados pelas rotas kkkk desculpa

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/notas-adicionadas" element={<NotasAdicionadas/>} />
      <Route path="/notas-excluidas" element={<NotasExcluidas/>} />
    </Routes>
  )
}