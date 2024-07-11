import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const RegisterContent = () => {
  const [showErrors, setShowErrors] = useState(false);
  const formik = useFormik({
    initialValues: {
      userName: '',
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
      topSize: '',
      bottomSize: '',
      gender: '',
      role: '',
    },
    validationSchema: Yup.object({
      userName: Yup.string()
        .min(2, 'Must be at least 2 characters!')
        .max(15, 'Must be 15 characters or less!')
        .required('Required'),
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string()
        .min(8, 'Must be at least 8 characters!')
        .required('Required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Required'),
      name: Yup.string()
        .min(2, 'Must be at least 2 characters!')
        .max(15, 'Must be 15 characters or less!')
        .required('Required'),
      topSize: Yup.string().required('Required'),
      bottomSize: Yup.string().required('Required'),
      gender: Yup.string().required('Required'),
      role: Yup.string().required('Required'),
    }),
    onSubmit: (values, { setSubmitting }) => {
      setTimeout(() => {
        console.log('Register form submitted:', values);
        setSubmitting(false);
      }, 400);
    },
  });

  const handleRegister = () => {
    if (formik.isValid) {
      formik.handleSubmit();
    } else {
      setShowErrors(true);
    }
  };

  return (
    <div id="register" className="tab-pane active">
      <h2 className="text-2xl font-bold mb-4">Create an Account</h2>
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <div className="flex flex-col space-y-2">
          <label htmlFor="userName" className="block">
            Username
          </label>
          <input
            type="text"
            id="userName"
            className="bg-gray-100 rounded p-2 w-full"
            placeholder="johnDoe"
            value={formik.values.userName}
            onChange={(e) => {
              formik.setValues({ ...formik.values, userName: e.target.value, name: e.target.value });
              formik.handleChange(e);
            }}
            required
          />
          {showErrors && formik.errors.userName && <div className="alert alert-pink text-red-500" role="alert">{formik.errors.userName}</div>}
        </div>
        <div className="flex flex-col space-y-2">
          <label htmlFor="email" className="block">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="bg-gray-100 rounded p-2 w-full"
            placeholder="example@email.com"
            value={formik.values.email}
            onChange={formik.handleChange}
            required
          />
          {showErrors && formik.errors.email && <div className="alert alert-pink text-red-500" role="alert">{formik.errors.email}</div>}
        </div>
        <div className="flex flex-col space-y-2">
          <label htmlFor="password" className="block">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="bg-gray-100 rounded p-2 w-full"
            placeholder="●●●●●●●●●●"
            value={formik.values.password}
            onChange={formik.handleChange}
            required
          />
          {showErrors && formik.errors.password && <div className="alert alert-pink text-red-500" role="alert">{formik.errors.password}</div>}
        </div>
        <div className="flex flex-col space-y-2">
          <label htmlFor="confirmPassword" className="block">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            className="bg-gray-100 rounded p-2 w-full"
            placeholder="●●●●●●●●●●"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            required
          />
          {showErrors && formik.errors.confirmPassword && <div className="alert alert-pink text-red-500" role="alert">{formik.errors.confirmPassword}</div>}
        </div>
       
        <div className="flex flex-row space-x-4">
          <div className="flex flex-col space-y-2 mr-4">
            <label htmlFor="topSize" className="block text-sm font-medium text-gray-700">
              Top Size
            </label>
            <div className="flex flex-row space-x-4">
              <div className="flex items-center">
                <input
                  id="SMALL"
                  name="topSize"
                  type="radio"
                  value="SMALL"
                  checked={formik.values.topSize === "SMALL"}
                  onChange={formik.handleChange}
                  required
                  className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                />
                <label htmlFor="SMALL" className="ml-2 block text-xs font-medium text-gray-700">
                  SMALL
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="MEDIUM"
                  name="topSize"
                  type="radio"
                  value="MEDIUM"
                  checked={formik.values.topSize === "MEDIUM"}
                  onChange={formik.handleChange}
                  required
                  className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                />
                <label htmlFor="MEDIUM" className="ml-2 block text-xs font-medium text-gray-700">
                  MEDIUM
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="LARGE"
                  name="topSize"
                  type="radio"
                  value="LARGE"
                  checked={formik.values.topSize === "LARGE"}
                  onChange={formik.handleChange}
                  required
                  className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                />
                <label htmlFor="LARGE" className="ml-2 block text-xs font-medium text-gray-700">
                  LARGE
                </label>
              </div>
            </div>
            {showErrors && formik.errors.topSize && <div className="alert alert-pink text-red-500" role="alert">{formik.errors.topSize}</div>}
          </div>
          <div className="flex flex-col space-y-2 mr-4">
            <label htmlFor="bottomSize" className="block text-sm font-medium text-gray-700 ">
              Bottom Size
            </label>
            <div className="flex flex-row space-x-4">
              <div className="flex items-center">
                <input
                  id="SMALL"
                  name="bottomSize"
                  type="radio"
                  value="SMALL"
                  checked={formik.values.bottomSize === "SMALL"}
                  onChange={formik.handleChange}
                  required
                  className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                />
                <label htmlFor="SMALL" className="ml-2 block text-xs font-medium text-gray-700">
                  SMALL
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="MEDIUM"
                  name="bottomSize"
                  type="radio"
                  value="MEDIUM"
                  checked={formik.values.bottomSize === "MEDIUM"}
                  onChange={formik.handleChange}
                  required
                  className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                />
                <label htmlFor="MEDIUM" className="ml-2 block text-xs font-medium text-gray-700">
                  MEDIUM
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="LARGE"
                  name="bottomSize"
                  type="radio"
                  value="LARGE"
                  checked={formik.values.bottomSize === "LARGE"}
                  onChange={formik.handleChange}
                  required
                  className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                />
                <label htmlFor="LARGE" className="ml-2 block text-xs font-medium text-gray-700">
                  LARGE
                </label>
              </div>
            </div>
            {showErrors && formik.errors.bottomSize && <div className="alert alert-pink text-red-500" role="alert">{formik.errors.bottomSize}</div>}
          </div>
        </div>
        <div className="flex flex-row space-x-4">
          <div className="flex flex-col space-y-2 mr-4">
            <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
              Gender
            </label>
            <div className="flex flex-row space-x-4">
              <div className="flex items-center">
                <input
                  id="MALE"
                  name="gender"
                  type="radio"
                  value="MALE"
                  checked={formik.values.gender === "MALE"}
                  onChange={formik.handleChange}
                  required
                  className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                />
                <label htmlFor="MALE" className="ml-2 block text-xs font-medium text-gray-700">
                  MALE
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="FEMALE"
                  name="gender"
                  type="radio"
                  value="FEMALE"
                  checked={formik.values.gender === "FEMALE"}
                  onChange={formik.handleChange}
                  required
                  className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                />
                <label htmlFor="FEMALE" className="ml-2 block text-xs font-medium text-gray-700">
                  FEMALE
                </label>
              </div>
            </div>
            {showErrors && formik.errors.gender && <div className="alert alert-pink text-red-500" role="alert">{formik.errors.gender}</div>}
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="role" className="block text-sm font-medium text-gray-700">
              Role
            </label>
            <div className="flex flex-row space-x-4">
              <div className="flex items-center">
                <input
                  id="USER"
                  name="role"
                  type="radio"
                  value="USER"
                  checked={formik.values.role === "USER"}
                  onChange={formik.handleChange}
                  required
                  className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                />
                <label htmlFor="USER" className="ml-2 block text-xs font-medium text-gray-700">
                  USER
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="ADMIN"
                  name="role"
                  type="radio"
                  value="ADMIN"
                  checked={formik.values.role === "ADMIN"}
                  onChange={formik.handleChange}
                  required
                  className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                />
                <label htmlFor="ADMIN" className="ml-2 block text-xs font-medium text-gray-700">
                  ADMIN
                </label>
              </div>
            </div>
            {showErrors && formik.errors.role && <div className="alert alert-pink text-red-500" role="alert">{formik.errors.role}</div>}
          </div>
        </div>
        <button type="button" onClick={handleRegister} className="bg-ccPink hover:bg-ccBlack text-ccWhite font-bold py-2 px-4 rounded" disabled={formik.isSubmitting}>
          {formik.isSubmitting ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
};

export default RegisterContent;
