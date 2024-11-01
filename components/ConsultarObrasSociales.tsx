'use client';
import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

const ConsultarObrasSociales = () => {
  const [apellido, setLastName] = useState('');
  const [nombre, setFirstName] = useState('');
  const [obrasSociales, setObrasSociales] = useState<string[]>([]);
  const [error, setError] = useState('');

  const handleConsult = async () => {
    setError('');
    setObrasSociales([]);

    const { data, error } = await supabase
      .from('doctors')
      .select('obras_sociales')     // asumo que las obras sociales se guardan en la tabla del medico...
      .eq('apellido', apellido)
      .eq('nombre', nombre);

    if (error) {
      console.error('Error fetching data:', error);
      setError('Ocurrió un error al consultar al médico.');
      return;
    }

    if (data.length === 0) {
      setError('No se encontró al médico. Verifica los datos ingresados.');
    } else {
      setObrasSociales(data[0].obras_sociales); // Asumiendo que social_works es un array
    }
  };

  return (
    <div className="bg-gray-900 text-white rounded-lg p-6 shadow-md max-w-md w-full">
      <h2 className="text-2xl mb-6 text-center">Consultar Obras Sociales atendidas por un Médico</h2>
      <div className="flex flex-col">
        <div className="flex items-center mb-4">
          <label className="w-1/3">Apellido</label>
          <input
            type="text"
            placeholder="Apellido del médico"
            value={apellido}
            onChange={(e) => setLastName(e.target.value)}
            className="bg-gray-100 text-black rounded-lg px-2 py-1 w-2/3"
          />
        </div>
        <div className="flex items-center mb-4">
          <label className="w-1/3">Nombres</label>
          <input
            type="text"
            placeholder="Nombres del médico"
            value={nombre}
            onChange={(e) => setFirstName(e.target.value)}
            className="bg-gray-100 text-black rounded-lg px-2 py-1 w-2/3"
          />
        </div>
        <button
          onClick={handleConsult}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg mt-4"
        >
          Consultar
        </button>
      </div>
      {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
      {obrasSociales.length > 0 && (
        <ul className="mt-4">
          {obrasSociales.map((work, index) => (
            <li key={index} className="bg-gray-800 rounded-lg p-2 mb-2">{work}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ConsultarObrasSociales;
