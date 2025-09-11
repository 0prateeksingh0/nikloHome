import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 relative max-h-[90vh] overflow-y-auto transform transition-all duration-300 scale-100">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-10 transition-colors duration-200 p-1 rounded-full hover:bg-gray-100"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        {/* Header with logo */}
        <div className="pt-8 pb-6 px-6">
          <div className="text-center mb-6">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-[#253747] rounded-full flex items-center justify-center shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
            </div>
            {isLogin ? (
              <>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
                <p className="text-gray-600 mb-6">
                  Sign in to your account to continue
                </p>
              </>
            ) : (
              <>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Join Us Today</h2>
                <p className="text-gray-600 mb-6">
                  Create your account to get started
                </p>
              </>
            )}
          </div>
        </div>
        
        {/* Form content */}
        <div className="px-6 pb-6">
          {isLogin ? (
            <Login 
              onToggleMode={() => setIsLogin(false)} 
              onSuccess={onClose}
            />
          ) : (
            <Register 
              onToggleMode={() => setIsLogin(true)} 
              onSuccess={onClose}
            />
          )}
        </div>
        
        {/* Toggle section */}
        <div className="px-6 pb-6">
          <div className="border-t border-gray-200 pt-6">
            <div className="text-center">
              {isLogin ? (
                <p className="text-sm text-gray-600">
                  Don't have an account?{' '}
                  <button
                    onClick={() => setIsLogin(false)}
                    className="font-semibold text-[#253747] hover:text-[#1a2a35] transition-colors duration-200"
                  >
                    Create one now
                  </button>
                </p>
              ) : (
                <p className="text-sm text-gray-600">
                  Already have an account?{' '}
                  <button
                    onClick={() => setIsLogin(true)}
                    className="font-semibold text-[#253747] hover:text-[#1a2a35] transition-colors duration-200"
                  >
                    Sign in here
                  </button>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
