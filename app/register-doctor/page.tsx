import RegisterDoctor from '../../components/RegisterDoctor';
import Link from 'next/link';

export default function RegisterDoctorPage()  {
    return (
        <div>
            <Link href="/">
                <button style={{ marginTop: '20px' }}>Volver a Home</button>
            </Link>
            <main className="flex min-h-screen flex-col items-center justify-between p-24">
                <RegisterDoctor />
            </main>
        </div>
  );
}

