import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col justify-center items-center">
      <h1 className="text-6xl font-bold text-primary">404</h1>
      <h2 className="text-2xl font-semibold mt-4 mb-6">Lehte ei leitud</h2>
      <p className="text-gray-600 mb-8">
        Kahjuks ei leitud lehte, mida otsisid.
      </p>
      <Link
        to="/"
        className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition"
      >
        Tagasi avalehele
      </Link>
    </div>
  );
}