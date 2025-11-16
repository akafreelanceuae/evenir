import React from 'react';
import { SparklesIcon, UserCircleIcon, LogoutIcon } from './Icons';
import { User } from '../types';

interface HeaderProps {
  onLogoClick: () => void;
  currentUser: User | null;
  onLoginClick: () => void;
  onSignupClick: () => void;
  onJoinVendorClick: () => void;
  onFindVendorClick: () => void;
  onLogout: () => void;
  onDashboardClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLogoClick, currentUser, onLoginClick, onSignupClick, onLogout, onDashboardClick, onFindVendorClick, onJoinVendorClick }) => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div 
          className="flex items-center space-x-2 cursor-pointer"
          onClick={onLogoClick}
        >
          <SparklesIcon className="w-8 h-8 text-indigo-600" />
          <span className="text-2xl font-bold text-gray-800 tracking-tight">Evenir</span>
        </div>
        <nav className="hidden md:flex items-center space-x-6">
          <button onClick={onFindVendorClick} className="text-gray-600 font-medium hover:text-indigo-600 transition-colors">Find a Vendor</button>
          <button onClick={onJoinVendorClick} className="text-gray-600 hover:text-indigo-600 transition-colors">Join as a Vendor</button>
          {currentUser ? (
            <>
              <button onClick={onDashboardClick} className="flex items-center text-gray-600 hover:text-indigo-600 transition-colors">
                <UserCircleIcon className="w-5 h-5 mr-1" />
                Dashboard
              </button>
              <button onClick={onLogout} className="flex items-center text-gray-600 hover:text-indigo-600 transition-colors">
                 <LogoutIcon className="w-5 h-5 mr-1" />
                 Log Out
              </button>
              <img src={currentUser.profilePhoto} alt={currentUser.name} className="w-10 h-10 rounded-full" />
            </>
          ) : (
            <>
              <button onClick={onLoginClick} className="text-gray-600 hover:text-indigo-600 transition-colors">Log In</button>
              <button onClick={onSignupClick} className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors">Sign Up</button>
            </>
          )}
        </nav>
        <button className="md:hidden text-gray-600">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header;
