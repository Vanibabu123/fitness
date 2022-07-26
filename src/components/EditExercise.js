import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router';
import DatePicker from 'react-datepicker'
import axios from 'axios'
import api from "../api/API"
import 'bootstrap/dist/css/bootstrap.min.css'

function EditExercise ({ exercise }) {
  const [username, setUsername] = useState('')
  const [description, setDescription] = useState('')
  const [duration, setDuration] = useState(0)
  const [startDate, setStartDate] = useState(new Date())
  const [users, setUsers] = useState([])
  const { id } = useParams()

  useEffect(() => {
    const editExer = async () => {
      const res = await axios.get(`${api}/exercises/${id}`)
      const edit = res.data
      console.log(edit)
    }

    const fetchUsers = async () => {
      const res = await axios.get(`${api}/users/`)
      const userz = res.data
      if (userz.length > 0) {
        setUsers(userz.map((usei) => usei.username))
      } else {
        window.location = '/user'
      }
    }
    fetchUsers()
    editExer()
  }, [exercise, id])

  function handleSubmit (e) {
    e.preventDefault()

    const exercise = {
      username: username,
      description: description,
      duration: duration,
      date: startDate
    }

    const postUrl = async () => {
      const res = await axios.post(`${api}/exercises/update/${id}`, exercise)
      const data = res.data
      console.log(data)
    }
    postUrl()
    window.location = '/exerciselist'
  }
  return (
    <div className='container'>
      <h3>Edit Exercise Log</h3>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label>Client: </label>
          <select required className='form-control' onChange={e => setUsername(e.target.value)} value={username}>
            {users.map((user) => {
              return (
                <option key={user} value={user}>{user}</option>
              )
            })}
          </select>
        </div>
        <div className='form-group'>
          <label>Description: </label>
          <input
            type='text'
            required
            className='form-control'
            onChange={e => setDescription(e.target.value)}
          />
        </div>
        <div className='form-group'>
          <label>Duration (in minutes): </label>
          <input
            type='number'
            className='form-control'
            onChange={e => setDuration(e.target.value)}
          />
        </div>
        <div className='form-group'>
          <label>Date: </label>
          <div>
            <DatePicker selected={startDate} onChange={date => setStartDate(date)} />
          </div>
        </div>

        <div className='form-group'>
          <input type='submit' value='Edit Exercise Log' className='btn btn-primary' />
        </div>
      </form>
    </div>
  )
}

export default EditExercise;