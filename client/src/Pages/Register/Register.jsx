import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, } from 'lucide-react'
import {toast} from 'sonner'
import { useAuth } from '../../context/AuthContext'

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const { signup } = useAuth()
  const navigate = useNavigate()

  const handleInputChange = (e) => {

    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }


  const validateForm = () => {
    const { name, password, email } = formData

    if (!name.trim()) {
      toast.error('name is required')
      return false
    }

    if (!email.trim()) {
      toast.error('email is required')
      return false
    }

    if (name.length < 3) {
      toast.error('name must be at least 3 characters')
      return false
    }

    if (!password) {
      toast.error('Password is required')
      return false
    }

    if (password.length < 8) {
      toast.error('Password must be at least 8 characters')
      return false
    }
    
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return
    setLoading(true)
    const result = await signup({
      name: formData?.name.trim(),
      password: formData?.password,
      email: formData?.email
    })
    if (result?.success) {
      navigate('/login')
    }
  

    
    setLoading(false)
  }

  return (
    <div className="min-h-screen w-full lg:max-w-xl mx-auto flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-100 rounded-lg">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
         
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Or{' '}
            <Link
              to="/login"
              className="font-medium text-blue-600 underline"
            >
              sign in to your existing account
            </Link>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* name */}
            <div>
              <label htmlFor="name" className="block text-start text-sm font-medium text-gray-700">
                name
              </label>
              <input
                id="name"
                name="name"
                type="text"                
                className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 form-input"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>

                    <div>
              <label htmlFor="email" className="block text-start text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="text"               
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 form-input"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleInputChange}

              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-start text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-2 relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  
                  className="block w-full px-3 py-2 pr-10 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 form-input"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </button>
              </div>
           
            </div>

          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 border bg-blue-500 border-transparent rounded-md shadow-sm text-sm font-medium text-white  disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register