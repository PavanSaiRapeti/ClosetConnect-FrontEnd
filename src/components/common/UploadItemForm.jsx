import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';

const UploadItemForm = ({ onSubmit }) => {
  const initialValues = {
    description: '',
    type: '',
    clothingItemSize: '',
    name: '',
    gender: '',
    image: null,
  };

  const validationSchema = Yup.object({
    description: Yup.string().required('Description is required'),
    type: Yup.string().required('Type is required'),
    clothingItemSize: Yup.string().required('Clothing item size is required'),
    name: Yup.string().required('Name is required'),
    gender: Yup.string().required('Gender is required'),
    image: Yup.mixed().required('Image is required'),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    onSubmit(values);
    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue, isSubmitting }) => (
        <Form className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <Field
              type="text"
              name="description"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <ErrorMessage name="description" component="div" className="text-red-500 text-sm" />
          </div>
          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700">Type</label>
            <Field
              type="text"
              name="type"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <ErrorMessage name="type" component="div" className="text-red-500 text-sm" />
          </div>
          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700">Clothing Item Size</label>
            <Field
              type="text"
              name="clothingItemSize"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <ErrorMessage name="clothingItemSize" component="div" className="text-red-500 text-sm" />
          </div>
          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <Field
              type="text"
              name="name"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
          </div>
          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700">Gender</label>
            <div role="group" aria-labelledby="gender-radio-group" className="mt-1 block w-full">
              <label className="mr-4">
                <Field type="radio" name="gender" value="male" className="mr-1" />
                Male
              </label>
              <label className="mr-4">
                <Field type="radio" name="gender" value="female" className="mr-1" />
                Female
              </label>
              <label>
                <Field type="radio" name="gender" value="other" className="mr-1" />
                Other
              </label>
            </div>
            <ErrorMessage name="gender" component="div" className="text-red-500 text-sm" />
          </div>
          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700">Image</label>
            <input
              type="file"
              name="image"
              onChange={(event) => {
                setFieldValue('image', event.currentTarget.files[0]);
              }}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <ErrorMessage name="image" component="div" className="text-red-500 text-sm" />
          </div>
          <div className="col-span-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-2 w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Submit
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

UploadItemForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default UploadItemForm;