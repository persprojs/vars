import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav>
    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/admin">Admin</Link></li> {/* Link to Admin */}
    </ul>
  </nav>
);

export default Navbar;
