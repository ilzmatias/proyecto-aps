import RegisterPatient from "../../components/RegisterPatient";
import Link from 'next/link';

export default function RegisterPatientPage() {
  return (
      <div>
          <Link href="/">
              <button style={{ marginTop: '20px' }}>Volver a Home</button>
          </Link>
          <main className="flex min-h-screen flex-col items-center justify-between p-24">
              <RegisterPatient />
          </main>
      </div> 
  );
}
