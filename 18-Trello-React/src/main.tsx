import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './App.css'
import App from './App.tsx'
import { BrowserRouter, Routes, Route } from 'react-router'
import Auth from './screens/Auth.tsx'
import Board from './screens/Board.tsx'
import Dashboard from './screens/Dashboard.tsx'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DndProvider backend={HTML5Backend}>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path='/signin' element={<Auth/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/board/:boardId' element={<Board/>}/>
      </Routes>
    </BrowserRouter>
    </DndProvider>
  </StrictMode>,
)   
