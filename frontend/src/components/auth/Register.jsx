import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../contexts/AuthContext';

export default function Register() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register: registerUser, error: authError } = useAuth();
  const navigate = useNavigate();

  const password = watch('password', '');

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    const success = await registerUser(data.name, data.email, data.password);
    setIsSubmitting(false);
    
    if (success) {
      navigate('/login', { state: { message: 'Konto on loodud. Palun logi sisse.' } });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Loo uus konto
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Või{' '}
          <Link to="/login" className="font-medium text-primary hover:text-primary-dark">
            logi olemasoleva kontoga sisse
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {authError && (
            <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded">
              {authError}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Nimi
              </label>
              <div className="mt-1">
                <input
                  id="name"
                  type="text"
                  {...register('name', { 
                    required: 'Nimi on kohustuslik',
                    minLength: {
                      value: 2,
                      message: 'Nimi peab olema vähemalt 2 märki pikk'
                    }
                  })}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                )}
              </div>
            </div>