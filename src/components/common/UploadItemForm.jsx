import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { createUserItemEndpoint, enums } from 'config/env';
import { createUserItem, updateUserItem, uploadItemImage } from 'utils/utils';
import { useSelector, useDispatch } from 'react-redux';
import { createClothingItemRequest, updateClothingItemRequest } from 'store/actions/ItemAction';
import { setPopup } from 'store/actions/commonAction';

const UploadItemForm = ({ onSubmit, initialData,isUpdate=false }) => {
  const userId = useSelector(state => state.user.userId);
  const token = useSelector(state => state.user.token);
  const item = useSelector(state => state.item.item);
  const [error, setError] = useState(false);
  const dispatch = useDispatch();
  const initialValues = {
    description: initialData?.description || '',
    type: initialData?.type || '',
    clothingItemSize: initialData?.clothingItemSize || '',
    name: initialData?.name || '',
    gender: initialData?.gender || '',
    id: initialData?.id || '',
    image: null,
  };

  const validationSchema = Yup.object({
    description: Yup.string().required('Description is required'),
    type: Yup.string().required('Type is required'),
    clothingItemSize: Yup.string().required('Clothing item size is required'),
    name: Yup.string().required('Name is required'),
    gender: Yup.string().required('Gender is required'),
    image: isUpdate? '' : Yup.mixed().required('Image is required'),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    const { image, id, ...formData } = values;
    let response;
    try {
      if (initialData) {
        dispatch(updateClothingItemRequest(id, formData));
      } else {
        // Create mode
        const res = await fetch(createUserItemEndpoint(userId), {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        });
        response = await res.json();
      }
      if(image){
      const formDataImage = new FormData();
      formDataImage.append('file', image);
      const responseImage = await uploadItemImage(id ? id : response?.id, formDataImage, token);
      }
      if (responseImage) {
        setSubmitting(false);
        dispatch(setPopup({ title: 'success', content: 'Item uploaded successfully' }));
      }
    } catch (error) {
      setError(true);
      setSubmitting(false);
      dispatch(setPopup({ title: 'failed', content: 'Item failed to upload' }));
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      encType="multipart/form-data"
    >
      {({ setFieldValue, isSubmitting }) => (
        <Form className="space-y-6">
          <div>
            <label className="block text-lg font-medium text-gray-700 text-left">Description</label>
            <Field
              type="text"
              name="description"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg"
            />
            <ErrorMessage name="description" component="div" className="text-red-500 text-sm mt-1" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Type</label>
            <Field
              as="select"
              name="type"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">Select type</option>
              {enums.itemTypes.map((itemType) => (
                <option key={itemType} value={itemType}>{itemType}</option>
              ))}
            </Field>
            <ErrorMessage name="type" component="div" className="text-red-500 text-sm mt-1" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Clothing Item Size</label>
            <Field
              as="select"
              name="clothingItemSize"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">Select size</option>
              {enums.sizes.map((size) => (
                <option key={size} value={size}>{size}</option>
              ))}
            </Field>
            <ErrorMessage name="clothingItemSize" component="div" className="text-red-500 text-sm mt-1" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <Field
              type="text"
              name="name"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Gender</label>
            <div role="group" aria-labelledby="gender-radio-group" className="mt-1">
              {enums.gender.map((g) => (
                <label key={g} className="inline-flex items-center mr-4">
                  <Field type="radio" name="gender" value={g} className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out" />
                  <span className="ml-2">{g.charAt(0) + g.slice(1).toLowerCase()}</span>
                </label>
              ))}
            </div>
            <ErrorMessage name="gender" component="div" className="text-red-500 text-sm mt-1" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Image</label>
            <input
              type="file"
              name="image"
              onChange={(event) => {
                setFieldValue('image', event.currentTarget.files[0]);
              }}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <ErrorMessage name="image" component="div" className="text-red-500 text-sm mt-1" />
          </div>
          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {initialData ? 'Update' : 'Submit'}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

UploadItemForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  initialData: PropTypes.object,
};

export default UploadItemForm;