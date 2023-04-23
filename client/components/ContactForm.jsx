import { Formik, Form, Field, ErrorMessage } from 'formik';
import {useState} from 'react'
import * as Yup from 'yup';

const ContactForm = () => {
  const [isWebsiteUp, setIsWebsiteUp] = useState(false);

  const initialValues = {
    websiteUrl: '',
    contactPhone: '',
  };

  const validationSchema = Yup.object({
    websiteUrl: Yup.string().required('Required'),
    contactPhone: Yup.string().required('Required'),
  });

  const onSubmit = async (values, { resetForm }) => {
    try {
      const apiUrl = process.env.API_URL || "http://localhost:5500/api/websites";

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
      if (response.ok) {
  
        const result = await response.json();
        console.log(result);
        setIsWebsiteUp(true);
        
      }
      setIsWebsiteUp(false); 
    } catch (error) {
      console.error(error);
    }
    resetForm();
    alert("Thank you for your submission, you will be notified via a text-alert whenever your website goes down");
  };
  
  
  return (
    <>
    <h1 className='text-center text-gray-700 text-xl cursor-pointer m-10'>Website Downtime Detector</h1>
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      {(formik) => (
        <Form className="max-w-md mx-auto">
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
        </Form>
      )}
    </Formik>
  
    </>
  );
};

export default ContactForm;
