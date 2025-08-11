import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Dashboard() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [alertMsg, setAlertMsg] = useState('');

  useEffect(() => {
    (async () => {
      try {
        console.log("Memanggil /auth/me...");
        const res = await fetch('http://localhost:4000/auth/me', {
          credentials: 'include'
        });

        console.log("Status respon:", res.status);
        if (!res.ok) {
          console.log("Redirect karena respon tidak OK");
          router.push('/');
          return;
        }

        const data = await res.json();
        console.log("Data user dari backend:", data);

        setUsername(data.user?.username || '');

      } catch (err) {
        console.error("Error saat fetch:", err);
        router.push('/');
      }
    })();
  }, [router]);

  const handleLogout = async () => {
    await fetch('http://localhost:4000/auth/logout', {
      method: 'POST',
      credentials: 'include'
    });
    router.push('/');
  };

  return (
    <div className="container mt-5">
      <div className="card shadow">
        <div className="card-body">
          <h1 className="card-title text-center mb-4">Dashboard</h1>
          <p className="text-center">Selamat datang{username ? `, ${username}` : ''}!</p>
          <div className="text-center">
            <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </div>
    </div>
  );
}
