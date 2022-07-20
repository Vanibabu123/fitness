import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import ExercisesList from './components/ExercisesList';
import EditExercise from './components/EditExercise';
import CreateExercise from './components/CreateExercise';
import CreateUsers from './components/CreateUsers';
import Home from './components/Home';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>

      <div>
        <h1>Fitness Logger</h1>
        <Navbar />
        <br />

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/exerciselist' element={<ExercisesList />} />

          <Route path='/edit/:id' element={<EditExercise />} />

          <Route path='/create' element={<CreateExercise />} />

          <Route path='/user' element={<CreateUsers />} />

        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App;