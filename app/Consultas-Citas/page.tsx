'use client';

import ConsultarCitas from './ConsultarCitas';
import CancelarCita from './CancelarCita';
import { useState } from 'react';

const PortalPaciente = () => {
  const [activeSection, setActiveSection] = useState<'consultar' | 'cancelar' | null>(null);

  return (
    <div className="bg-gray-900 text-white rounded-lg p-6 shadow-md max-w-lg w-full mx-auto">
      <h1 className="text-3xl mb-6 text-center">Portal del Paciente</h1>
      <div className="flex justify-around mb-6">
        <button
          onClick={() => setActiveSection('consultar')}
          className={`px-4 py-2 rounded-lg ${activeSection === 'consultar' ? 'bg-blue-600' : 'bg-gray-700'} text-white`}
        >
          Consultar Citas
        </button>
        <button
          onClick={() => setActiveSection('cancelar')}
          className={`px-4 py-2 rounded-lg ${activeSection === 'cancelar' ? 'bg-red-600' : 'bg-gray-700'} text-white`}
        >
          Cancelar Cita
        </button>
      </div>
      {activeSection === 'consultar' && <ConsultarCitas />}
      {activeSection === 'cancelar' && <CancelarCita />}
      {!activeSection && (
        <p className="text-center">Seleccione una opción para comenzar.</p>
      )}
    </div>
  );
};

export default PortalPaciente;
