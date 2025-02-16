"use client"

import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client (ensure you set these environment variables)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

type FormData = {
  name: string;
  age: number;
  gender: string;
  email: string;
  interests: string;
  lookingFor: string;
  idealDate?: string;
  dealBreakers?: string;
};

const ValentineForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    console.log('Form data submitted: ', data);
    setIsLoading(true);
    setError(null);
    
    try {
      const { error: supabaseError } = await supabase
        .from('valentine_profiles')
        .insert([data]);

      if (supabaseError) throw supabaseError;
      
      setSubmitted(true);
    } catch (err) {
      setError('Failed to submit form. Please try again.');
      console.error('Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="w-full max-w-xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <div className="text-center">
          <Heart className="w-16 h-16 mx-auto text-pink-500 mb-4" />
          <h2 className="text-2xl font-bold text-pink-600 mb-4">Thank You!</h2>
          <p className="text-gray-600">
            Your love quest has begun! We'll carefully review your profile and get back to you with potential matches.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-xl mx-auto bg-white rounded-lg shadow-lg">
      <div className="p-6">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-pink-600 flex items-center justify-center">
            <Heart className="w-6 h-6 mr-2" />
            Find Your Valentine
          </h1>
          <p className="text-gray-600 mt-2">
            Fill out this form to find your perfect match this Valentine's Day
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Name Field */}
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Your name"
              {...register('name', { required: 'Name is required' })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            {errors.name && <span className="text-red-500 text-xs">{errors.name.message}</span>}
          </div>

          {/* Age and Gender Fields */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="age" className="block text-sm font-medium text-gray-700">
                Age
              </label>
              <input
                id="age"
                type="number"
                placeholder="Your age"
                {...register('age', {
                  required: 'Age is required',
                  min: { value: 18, message: 'Minimum age is 18' },
                  max: { value: 120, message: 'Maximum age is 120' },
                  valueAsNumber: true,
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
              {errors.age && <span className="text-red-500 text-xs">{errors.age.message}</span>}
            </div>

            <div className="space-y-2">
              <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                Gender
              </label>
              <select
                id="gender"
                {...register('gender', { required: 'Gender is required' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="non-binary">Non-binary</option>
                <option value="other">Other</option>
              </select>
              {errors.gender && <span className="text-red-500 text-xs">{errors.gender.message}</span>}
            </div>
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="your.email@example.com"
              {...register('email', {
                required: 'Email is required',
                pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' },
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}
          </div>

          {/* Interests Field */}
          <div className="space-y-2">
            <label htmlFor="interests" className="block text-sm font-medium text-gray-700">
              Your Interests
            </label>
            <textarea
              id="interests"
              placeholder="Tell us about your hobbies and interests..."
              {...register('interests', { required: 'This field is required' })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 h-24"
            />
            {errors.interests && <span className="text-red-500 text-xs">{errors.interests.message}</span>}
          </div>

          {/* Looking For Field */}
          <div className="space-y-2">
            <label htmlFor="lookingFor" className="block text-sm font-medium text-gray-700">
              What You're Looking For
            </label>
            <textarea
              id="lookingFor"
              placeholder="Describe your ideal match..."
              {...register('lookingFor', { required: 'This field is required' })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 h-24"
            />
            {errors.lookingFor && <span className="text-red-500 text-xs">{errors.lookingFor.message}</span>}
          </div>

          {/* Ideal Date Field (Optional) */}
          <div className="space-y-2">
            <label htmlFor="idealDate" className="block text-sm font-medium text-gray-700">
              Ideal First Date
            </label>
            <textarea
              id="idealDate"
              placeholder="Describe your perfect first date..."
              {...register('idealDate')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 h-24"
            />
          </div>

          {/* Deal Breakers Field (Optional) */}
          <div className="space-y-2">
            <label htmlFor="dealBreakers" className="block text-sm font-medium text-gray-700">
              Deal Breakers
            </label>
            <textarea
              id="dealBreakers"
              placeholder="Any absolute deal breakers?"
              {...register('dealBreakers')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 h-24"
            />
          </div>

          {/* Submit Button */}
          <button 
            type="submit"
            disabled={isLoading}
            className="w-full px-4 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 flex items-center justify-center disabled:opacity-50"
          >
            {isLoading ? (
              'Submitting...'
            ) : (
              <>
                <Heart className="w-4 h-4 mr-2" /> Submit
              </>
            )}
          </button>
        </form>
        {error && <p className="mt-2 text-red-500 text-sm">{error}</p>}
      </div>
    </div>
  );
};

export default ValentineForm;
