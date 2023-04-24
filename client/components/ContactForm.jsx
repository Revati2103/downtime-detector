import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';

const ContactForm = () => {
 
  const [showModal, setShowModal] = useState(false);
  const [websiteUrl, setWebsiteUrl] = useState('');

  const initialValues = {
    websiteUrl: '',
    contactPhone: '',
    verificationCode: ''
  };
  
  const validationSchema = Yup.object({
    websiteUrl: Yup.string().required('Required'),
    contactPhone: Yup.string().required('Required'),
    verificationCode: Yup.string().required('Please enter the code you received via text')
  });

  const onSubmit = async (values, { resetForm }) => {
    try {
      const apiUrl = process.env.API_URL || "http://localhost:5500/api/twilio/generate";

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone: values.contactPhone }),
      });
      if (response.ok) {
        setWebsiteUrl(values.websiteUrl); // Save website URL for verification
        resetForm();
        setShowModal(true);
      }
    
    } catch (error) {
      console.error(error);
    }
  };
  
  const handleVerify = async (values , { resetForm }) => {
    // handle verification code verification here

    try {
      const apiUrl = process.env.API_URL || "http://localhost:5500/api/twilio/verify";
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          phone: values.contactPhone,
          url: websiteUrl,
          code: values.verificationCode
        })
      });
  
      if (response.status === 200) {
        alert('Your website has been added for monitoring. You will receive text alerts whenever your website is down.');
        // Reset form after successful verification
        resetForm();
        setWebsiteUrl('');
        setShowModal(false);
      } else {
        alert('Verification failed. Please check the code and try again.');
      }
    } catch (error) {
      console.log(error);
    }
  }
  
  return (
    <>
      <h1 className='text-center text-gray-700 text-xl cursor-pointer m-10'>Website Downtime Detector</h1>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
  {(formik) => (
    <div className="max-w-md mx-auto">
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-4">
          <label htmlFor="websiteUrl" className="block text-gray-700 font-bold mb-2">Website URL</label>
          <Field type="text" id="websiteUrl" name="websiteUrl" placeholder="https://example.com" className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          <ErrorMessage name="websiteUrl" component="div" className="error-message text-red-500" />
        </div>

        <div className="mb-4">
          <label htmlFor="contactPhone" className="block text-gray-700 font-bold mb-2">Contact Phone</label>
          <Field type="tel" id="contactPhone" name="contactPhone" placeholder="+1 123-456-7890" className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          <ErrorMessage name="contactPhone" component="div" className="error-message text-red-500" />
        </div>

        <button type="submit" disabled={!formik.isValid || formik.isSubmitting} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline">
          Submit
        </button>
      </form>

      {/* Add a modal to enter verification code */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-4">
            <h2 className="text-lg font-bold mb-4">Enter Verification Code</h2>
            <Formik initialValues={{ verificationCode: '' }} onSubmit={handleVerify}>
              {(formik) => (
                <form onSubmit={formik.handleSubmit}>
                  <div className="mb-4">
                    <label htmlFor="verificationCode" className="block text-gray-700 font-bold mb-2">Verification Code</label>
                    <Field type="text" id="verificationCode" name="verificationCode" placeholder="Enter verification code" className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    <ErrorMessage name="verificationCode" component="div" className="error-message text-red-500" />
                  </div>
                  <button type="submit" disabled={!formik.isValid || formik.isSubmitting} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline">
                    Verify
                  </button>
                </form>
              )}
            </Formik>
          </div>
        </div>
      )}
    </div>
  )}
</Formik>

    </>
  );
  
    


}

export default ContactForm;
