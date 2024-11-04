'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

const MedicoDelMes = () => {
  const [topDoctor, setTopDoctor] = useState<{ legajo: string; nombre: string; apellido: string } | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchTopDoctor = async () => {
      try {
        const { data, error } = await supabase
          .from('Citas')
          .select('medico_legajo, fecha')
          .eq('fecha', new Date().toISOString().slice(0, 7)); // Filtrar por mes actual

        if (error) throw error;

        // Contar citas por médico
        const citasPorMedico = data.reduce((acc: any, cita: any) => {
          acc[cita.medico_legajo] = (acc[cita.medico_legajo] || 0) + 1;
          return acc;
        }, {});

        // Encontrar el legajo con la mayor cantidad de citas
        const legajoMaximo = Object.keys(citasPorMedico).reduce((a, b) => citasPorMedico[a] > citasPorMedico[b] ? a : b);

        // Obtener el nombre y apellido del médico con más citas
        if (legajoMaximo) {
          const { data: doctorData, error: doctorError } = await supabase
            .from('Doctores')
            .select('nombre, apellido')
            .eq('legajo', legajoMaximo)
            .single();

          if (doctorError) throw doctorError;

          setTopDoctor({
            legajo: legajoMaximo,
            nombre: doctorData.nombre,
            apellido: doctorData.apellido,
          });
        }
      } catch (error) {
        console.error('Error fetching top doctor:', error);
        setErrorMessage('Error al cargar los datos del médico. Intente nuevamente.');
      }
    };

    fetchTopDoctor();
  }, []);

  return (
    <div className="bg-gray-900 text-white rounded-lg p-6 shadow-md max-w-md w-full mx-auto">
      <h2 className="text-2xl mb-4 text-center">Médico con más citas este mes</h2>
      {errorMessage ? (
        <p className="text-red-500 text-sm">{errorMessage}</p>
      ) : topDoctor ? (
        <div>
          <p className="mb-2"><strong>Legajo:</strong> {topDoctor.legajo}</p>
          <p className="mb-2"><strong>Nombre:</strong> {topDoctor.nombre}</p>
          <p className="mb-2"><strong>Apellido:</strong> {topDoctor.apellido}</p>
        </div>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
};

export default MedicoDelMes;
