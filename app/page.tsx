import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h1>Home</h1>
      <ul>
        <li>
          <Link href="/register-doctor">Registrar médico</Link>
        </li>
        <li>
          <Link href="/register-patient">Registrar paciente</Link>
        </li>
      </ul>
    </div>
  );
}

