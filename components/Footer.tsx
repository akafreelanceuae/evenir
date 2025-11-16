
import React from 'react';
import { SparklesIcon } from './Icons';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 border-t border-gray-200">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          <div className="col-span-2 lg:col-span-1">
            <div className="flex items-center space-x-2">
              <SparklesIcon className="w-7 h-7 text-indigo-600" />
              <span className="text-xl font-bold text-gray-800">Evenir</span>
            </div>
            <p className="text-gray-500 mt-2 text-sm">Your one-stop marketplace for event services in Dubai.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-700">Organizers</h3>
            <ul className="mt-4 space-y-2">
              <li><a href="#" className="text-gray-500 hover:text-indigo-600 text-sm">How It Works</a></li>
              <li><a href="#" className="text-gray-500 hover:text-indigo-600 text-sm">Find Vendors</a></li>
              <li><a href="#" className="text-gray-500 hover:text-indigo-600 text-sm">Sign Up</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-700">Vendors</h3>
            <ul className="mt-4 space-y-2">
              <li><a href="#" className="text-gray-500 hover:text-indigo-600 text-sm">Join as Vendor</a></li>
              <li><a href="#" className="text-gray-500 hover:text-indigo-600 text-sm">Pricing</a></li>
              <li><a href="#" className="text-gray-500 hover:text-indigo-600 text-sm">Dashboard Login</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-700">Company</h3>
            <ul className="mt-4 space-y-2">
              <li><a href="#" className="text-gray-500 hover:text-indigo-600 text-sm">About Us</a></li>
              <li><a href="#" className="text-gray-500 hover:text-indigo-600 text-sm">Contact</a></li>
              <li><a href="#" className="text-gray-500 hover:text-indigo-600 text-sm">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">&copy; {new Date().getFullYear()} Evenir. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            {/* Add social icons here if needed */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
