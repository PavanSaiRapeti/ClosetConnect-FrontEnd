import React from 'react'
import { useFormik } from 'formik'
import Link from 'next/link'

const LoginContent = () => {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: (values, { setSubmitting }) => {
      setTimeout(() => {
        console.log('Login form submitted:', values.email, values.password)
        setSubmitting(false)
      }, 400)
    },
  })

  return (
    <div id='login' className='tab-pane active'>
      <h2 className='text-2xl font-bold mb-4'>Login to Closet Connect</h2>
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <div className='flex flex-col space-y-2'>
          <label htmlFor='email' className='block'>
            Email
          </label>
          <input
            type='email'
            id='email'
            className='bg-gray-100 rounded p-2 w-full'
            placeholder='example@email.com'
            value={formik.values.email}
            onChange={formik.handleChange}
            required
          />
        </div>
        <div className='flex flex-col space-y-2'>
          <label htmlFor='password' className='block'>
            Password
          </label>
          <input
            type='password'
            id='password'
            className='bg-gray-100 rounded p-2 w-full'
            placeholder='●●●●●●●●●●'
            value={formik.values.password}
            onChange={formik.handleChange}
            required
          />
        </div>
        <button
          type='submit'
          className='bg-ccPink hover:bg-ccBlack text-ccWhite font-bold py-2 px-4 rounded mt-4 mr-4'
          disabled={formik.isSubmitting}>
          {formik.isSubmitting ? 'Logging in...' : 'Login'}
        </button>
        <a href='#' className='text-sm text-gray-600 hover:text-gray-900'>
          Forgot password?
        </a>
      </form>
    </div>
  )
}

export default LoginContent
