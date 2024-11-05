'use client';
import ConsultarCitas from '../../components/ConsultarCitas';
import { useState } from 'react';
import CancelarCita from '../../components/CancelarCitas';
import Link from 'next/link';

const PortalPaciente = () => {
  const [activeSection, setActiveSection] = useState<'consultar' | 'cancelar' | null>(null);

  return (
    <div className="bg-gray-900 text-white rounded-lg p-6 shadow-md max-w-lg w-full mx-auto">
      <div className= "flex justify-center">
      <Link href="/" className="inline-block bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-all duration-300 justify-center mb-6 ">
                  ← Volver a Home
      </Link>
      </div>
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
