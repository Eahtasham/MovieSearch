// src/components/Navbar.jsx
import { Link } from 'react-router-dom';
import { Film } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Film className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">MovieSearch</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;