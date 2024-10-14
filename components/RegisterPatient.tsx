'use client'
import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'

const RegisterPatient = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const { data, error } = await supabase
      .from('patients')
      .insert([{ name, email, phone }])

    if (error) {
      console.error('Error registrando paciente:', error)
    } else {
      console.log('Paciente registrado:', data)
      // Puedes redirigir o mostrar un mensaje de éxito
    }
  }

  return (
    <div>
      <h1>Registrar Paciente</h1>
      <form className='justify-center' onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nombre"
          required
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Teléfono"
        />
        <button type="submit">Registrar</button>
      </form>
    </div>
  )
}

export default RegisterPatient
