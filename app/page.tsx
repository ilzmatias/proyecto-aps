import Link from 'next/link';

export default function Home() {
  return (
    <div className="bg-gray-900 min-h-screen flex flex-col justify-center items-center text-white p-6">
      <h1 className="text-4xl font-bold mb-8">Bienvenido</h1>
      <p className="text-xl mb-6">Elija una opción para continuar</p>
      <ul className="space-y-4">
        <li>
          <Link href="/register-doctor" className="block bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg shadow-md text-center transition-all duration-300">
              Registrar Médico
          </Link>
        </li>
        <li>
          <Link href="/register-patient" className="block bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg shadow-md text-center transition-all duration-300">
              Registrar Paciente
          </Link>
        </li>
        <li>
          <Link href="/consultar-obras-sociales" className="block bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg shadow-md text-center transition-all duration-300">
              Consultar obras sociales atendidas
          </Link>
        </li>
        <li>
          <Link href="/calendario-doctor" className="block bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg shadow-md text-center transition-all duration-300">
              Consultar calendario médico
          </Link>
        </li>
        <li>
          <Link href="/medico-del-mes" className="block bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg shadow-md text-center transition-all duration-300">
              Consultar Médico del mes
          </Link>
        </li>
        <li>
          <Link href="/consultar-citas" className="block bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg shadow-md text-center transition-all duration-300">
            Portal Paciente
          </Link>
        </li>
        
      </ul>
    </div>
  );
}
