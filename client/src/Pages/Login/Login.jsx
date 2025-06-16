import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Store } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { toast } from 'sonner'

const Login = () => {
  const [formData, setFormData] = useState({
    email: 'ahad@gmail.com',
    password: '12345678',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const { signin } = useAuth()
  const navigate = useNavigate()

   const handleInputChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

    const validateForm = () => {
    const { email, password } = formData


    if (!email.trim()) {
      toast.error('email is required')
      return false
    }

    if (!password) {
      toast.error('Password is required')
      return false
    }


    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return
    setLoading(true)
    
    const result = await signin(formData)
    
    if (result.success) {
      navigate('/')
    }
    
    setLoading(false)
  }

  return (
    <div className="min-h-screen w-full lg:max-w-xl mx-auto flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-100 rounded-lg">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
         
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Or{' '}
            <Link
              to="/register"
              className="font-medium underline text-blue-600"
            >
              create a new account
            </Link>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">


             <div>
              <label htmlFor="email" className="block text-start text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"               
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 form-input"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleInputChange}

              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="text-start block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1 relative">
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
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium bg-blue-500 text-white  disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login