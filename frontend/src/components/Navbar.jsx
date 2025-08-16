import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Wallet, LogIn } from "lucide-react";


const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-20 bg-white/80 backdrop-blur border-b">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Brand */}
        <Link to="/welcome" className="flex items-center gap-2 font-bold text-lg text-gray-900">
          <Wallet className="w-6 h-6 text-emerald-600" />
          Budget Tracker
        </Link>

        {/* Center links (hide on small screens) */}
        <div className="hidden sm:flex items-center gap-6 text-sm text-gray-700">
          <Link to="/" className="hover:text-gray-900">Features</Link>
          <Link to="/" className="hover:text-gray-900">Security</Link>
          <Link to="/" className="hover:text-gray-900">Pricing</Link>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <Link
                to="/dashboard"
                className="hidden sm:inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-900 ring-1 ring-gray-200 hover:bg-gray-50"
              >
                Dashboard
              </Link>
              <Link
                to="/profile"
                className="hidden sm:inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-900 ring-1 ring-gray-200 hover:bg-gray-50"
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold bg-emerald-700 text-white hover:bg-emerald-800"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="hidden sm:inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-900 ring-1 ring-gray-200 hover:bg-gray-50"
              >
                <LogIn className="w-4 h-4" /> Log in
              </Link>
              <Link
                to="/register"
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold bg-emerald-700 text-white hover:bg-emerald-800"
              >
                Get started
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
