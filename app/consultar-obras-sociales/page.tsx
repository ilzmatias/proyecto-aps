import ConsultarObrasSociales from '../../components/ConsultarObrasSociales';
import Link from 'next/link';

export default function ConsultarObrasSocialesPage()  {
    return (
        <div className="bg-gray-900 min-h-screen flex flex-col justify-center items-center text-white p-6">
            <div className="w-full max-w-2xl">
                <Link href="/" className="inline-block bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-all duration-300 mb-6">
                        ← Volver a Home
                </Link>
                <main className="bg-gray-800 text-white rounded-lg shadow-md p-8">
                    <ConsultarObrasSociales />
                </main>
            </div>
        </div>
    );
}
