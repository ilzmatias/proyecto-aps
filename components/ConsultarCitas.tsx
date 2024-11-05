'use client';
import {  useState } from 'react';
import { supabase } from '../lib/supabaseClient';
interface Cita {
  id: number;
  medico_legajo: string;
  paciente_dni: string;
  fecha: string;
  hora: string;
}
const ConsultarCitas = () => {
  const [citas, setCitas] = useState<Cita[]>([]);
  const [dni, setDni] = useState('');
  const [error, setError] = useState('');

  const handleConsult = async () => {
    setError('');
    setCitas([]);

    try {
      const { data, error } = await supabase
        .from('citas')
        .select('*')
        .eq('paciente_dni', dni);

      if (error) {
        console.error('Error al obtener citas:', error);
        setError('Error al consultar citas. Intente nuevamente.');
      } else if (data.length === 0) {
        setError('No se encontraron citas para el DNI ingresado.');
      } else {
        setCitas(data);
      }
    } catch (err) {
      console.error('Error en la consulta:', err);
      setError('Hubo un error al conectar con el servidor. Inténtelo de nuevo.');
    }
  };

  return (
    <div className="bg-gray-900 text-white rounded-lg p-6 shadow-md max-w-md w-full">
      <h2 className="text-2xl mb-4 text-center">Consultar Citas</h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Ingrese su DNI"
          value={dni}
          onChange={(e) => setDni(e.target.value)}
          className="bg-gray-100 text-black rounded-lg px-2 py-1 w-full"
        />
      </div>
      <button
        onClick={handleConsult}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg w-full"
      >
        Consultar
      </button>
      {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
      {citas.length > 0 && (
        <ul className="mt-4 space-y-2">
          {citas.map((cita) => (
            <li key={cita.id} className="bg-gray-800 p-3 rounded-lg">
              <p><strong>Fecha:</strong> {cita.fecha}</p>
              <p><strong>Hora:</strong> {cita.hora}</p>
              <p><strong>Médico Legajo:</strong> {cita.medico_legajo}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ConsultarCitas;
