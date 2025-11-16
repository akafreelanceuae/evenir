import React, { useState } from 'react';
import { NewUser } from '../types';
import { SparklesIcon } from '../components/Icons';

interface SignupPageProps {
  onSignup: (newUser: NewUser) => void;
  onNavigateToLogin: () => void;
  initialRole?: 'organizer' | 'vendor' | null;
}

const SignupPage: React.FC<SignupPageProps> = ({ onSignup, onNavigateToLogin, initialRole }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'organizer' | 'vendor'>(initialRole || 'organizer');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
        setError('Please fill in all fields.');
        return;
    }
    setError('');
    
    // In a real app, this profile photo would come from an upload.
    // Here we use a placeholder.
    const profilePhoto = `https://i.pravatar.cc/150?u=${email}`;

    onSignup({ name, email, password, role, profilePhoto });
  };

  return (
    <div className="flex items-center justify-center min-h-full py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
        <div>
          <SparklesIcon className="mx-auto h-12 w-auto text-indigo-600" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <button onClick={onNavigateToLogin} className="font-medium text-indigo-600 hover:text-indigo-500">
              log in to your existing account
            </button>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="full-name" className="sr-only">
                Full Name
              </label>
              <input
                id="full-name"
                name="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm bg-white"
                placeholder="Full Name"
              />
            </div>
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm bg-white"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm bg-white"
                placeholder="Password"
              />
            </div>
          </div>
          
          <div className="mt-6">
            <fieldset>
                <legend className="text-sm font-medium text-gray-900">I am a...</legend>
                <div className="mt-2 grid grid-cols-2 gap-3">
                    <label className={`relative border rounded-lg p-4 flex cursor-pointer focus:outline-none ${role === 'organizer' ? 'bg-indigo-50 border-indigo-200 z-10' : 'border-gray-200'}`} onClick={() => setRole('organizer')}>
                        <input type="radio" name="role" value="organizer" className="sr-only" checked={role === 'organizer'} onChange={() => setRole('organizer')} />
                        <span className="flex-1 flex flex-col">
                            <span className="block text-sm font-medium text-indigo-900">Organizer</span>
                            <span className="block text-sm text-indigo-700">I want to hire vendors.</span>
                        </span>
                         {role === 'organizer' && 
                            <svg className="h-5 w-5 text-indigo-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                         }
                    </label>
                    <label className={`relative border rounded-lg p-4 flex cursor-pointer focus:outline-none ${role === 'vendor' ? 'bg-indigo-50 border-indigo-200 z-10' : 'border-gray-200'}`} onClick={() => setRole('vendor')}>
                        <input type="radio" name="role" value="vendor" className="sr-only" checked={role === 'vendor'} onChange={() => setRole('vendor')} />
                        <span className="flex-1 flex flex-col">
                            <span className="block text-sm font-medium text-indigo-900">Vendor</span>
                            <span className="block text-sm text-indigo-700">I offer event services.</span>
                        </span>
                         {role === 'vendor' && 
                             <svg className="h-5 w-5 text-indigo-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                         }
                    </label>
                </div>
            </fieldset>
          </div>


          {error && <p className="text-sm text-red-600 text-center">{error}</p>}

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-6"
            >
              Create Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;