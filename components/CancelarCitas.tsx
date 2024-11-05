'use client';

import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

const CancelarCita = () => {
  const [dni, setDni] = useState('');
  const [fecha, setFecha] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleCancel = async () => {
    setError('');
    setMessage('');

    try {
      const { error } = await supabase
      .from('citas')
      .delete()
      .match({ paciente_dni: dni, fecha });
    
   
    
    if (error) {
      console.error('Error al cancelar la cita:', error);
      setError('Error al cancelar la cita. Intente nuevamente.');
    
    } else {
      setMessage('Cita cancelada con éxito.');
    }
    } catch (err) {
      console.error('Error en la cancelación:', err);
      setError('Hubo un error al conectar con el servidor. Inténtelo de nuevo.');
    }
  };

  return (
    <div className="bg-gray-900 text-white rounded-lg p-6 shadow-md max-w-md w-full">
      <h2 className="text-2xl mb-4 text-center">Cancelar Cita</h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Ingrese su DNI"
          value={dni}
          onChange={(e) => setDni(e.target.value)}
          className="bg-gray-100 text-black rounded-lg px-2 py-1 w-full"
        />
      </div>
      <div className="mb-4">
        <input
          type="date"
          placeholder="Fecha de la cita"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
          className="bg-gray-100 text-black rounded-lg px-2 py-1 w-full"
        />
      </div>
      <button
        onClick={handleCancel}
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg w-full"
      >
        Cancelar Cita
      </button>
      {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
      {message && <p className="text-green-500 text-sm mt-4">{message}</p>}
    </div>
  );
};

export default CancelarCita;
