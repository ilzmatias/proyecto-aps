'use client'
import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

const RegisterDoctor = () => {
    const [legajo, setLegajo] = useState('');
    const [documento, setDocumento] = useState('');
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [telefono, setTelefono] = useState('');
    const [direccion, setDireccion] = useState('');
    const [email, setEmail] = useState('');
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      const { data, error } = await supabase
        .from('doctors') 
        .insert([{ legajo, documento, nombre, apellido, telefono, direccion, email }]);
  
      if (error) {
        console.error('Error registrando médico:', error);
      } else {
        console.log('Médico registrado:', data);
      }
    };
  
    return (
      <div>
        <h1>Registrar Médico</h1>
        <form onSubmit={handleSubmit}>
          <input type="text" value={legajo} onChange={(e) => setLegajo(e.target.value)} placeholder="Número de Legajo" required />
          <input type="text" value={documento} onChange={(e) => setDocumento(e.target.value)} placeholder="Número de DNI" required />
          <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Nombre" required />
          <input type="text" value={apellido} onChange={(e) => setApellido(e.target.value)} placeholder="Apellido" required />
          <input type="tel" value={telefono} onChange={(e) => setTelefono(e.target.value)} placeholder="Teléfono" required />
          <input type="text" value={direccion} onChange={(e) => setDireccion(e.target.value)} placeholder="Dirección" required />
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
          <button type="submit">Registrar</button>
        </form>
      </div>
    );
  };
  
  export default RegisterDoctor;
