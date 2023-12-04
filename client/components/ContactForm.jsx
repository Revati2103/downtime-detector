import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';


const ContactForm = () => {

  const [showModal, setShowModal] = useState(false);
  const [verificationSid, setVerificationSid] = useState("");
  const [inputUrl, setInputUrl] = useState("");
  const [phone, setPhone] = useState("");



  const initialValues = {
    websiteUrl: '',
    contactPhone: '',
  };

  const validationSchema = Yup.object({
    websiteUrl: Yup.string().required('Required'),
    contactPhone: Yup.string()
      .matches(/^\+1\d{10}$/, 'Please enter the no as +1xxxxxxxxxx')
      .required('Required'),
  });

  const onSubmit = async (values, { resetForm }) => {
    try {


      const response = await fetch('/api/twilio/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ contactPhone: values.contactPhone }),
      });
      if (response.ok) {
        const data = await response.json();
        setVerificationSid(data.sid); // store the verification SID in state
        setInputUrl(values.websiteUrl);
        setPhone(values.contactPhone);
        resetForm();
        setShowModal(true);
      }

    } catch (error) {
      console.error(error);
    }
  };


  const handleVerify = async (values, { resetForm }) => {
    try {
      const response = await fetch(`/api/twilio/verify?sid=${verificationSid}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          code: values.verificationCode,
          websiteUrl: inputUrl,
          contactPhone: phone

        })
      });

      if (response.status === 200) {
        alert('Your website has been added for monitoring. You will receive text alerts whenever your website is down.');
        // Reset form after successful verification
        resetForm();
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
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {(formik) => (
          <div className="max-w-md mx-auto">
            <Form>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="flex mb-3 text-sm text-dark dark:text-white"
                >
                  Website URL
                </label>
                <Field type="text"
                  id="websiteUrl"
                  name="websiteUrl"
                  placeholder="https://example.com"
                  className="border-stroke dark:text-body-color-dark dark:shadow-two w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none" />
                <ErrorMessage name="websiteUrl" component="div" className="flex error-message text-red-500" />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="flex mb-3 text-sm text-dark dark:text-white"
                >
                  Contact Phone(USA only)
                </label>
                <Field type="tel" id="contactPhone" name="contactPhone" placeholder="+11234567890" className="border-stroke dark:text-body-color-dark dark:shadow-two w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none" />
                <div className='flex'>
                  <ErrorMessage name="contactPhone" component="div" className="error-message text-red-500" />
                </div>
              </div>

              <button type="submit" disabled={!formik.isValid || formik.isSubmitting} className="cursor-pointer shadow-submit dark:shadow-submit-dark flex w-full items-center justify-center rounded-sm bg-primary px-9 py-4 text-base font-medium text-white duration-300 hover:bg-primary/90">
                Submit
              </button>
            </Form>

            {/* Add a modal to enter verification code */}
            {showModal && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                <div className="bg-white rounded-lg p-4">
                  <h2 className="text-lg font-bold mb-4">Enter Verification Code</h2>
                  <Formik initialValues={{ verificationCode: '' }} onSubmit={handleVerify}>
                    {(formik) => (
                      <Form>
                        <div className="mb-4">
                          <label htmlFor="verificationCode" className="block text-white font-bold mb-2">Verification Code</label>
                          <Field type="text" id="verificationCode" name="verificationCode" placeholder="Enter verification code" className="w-full border rounded-md py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline" />
                          <ErrorMessage name="verificationCode" component="div" className="flex error-message text-red-500" />
                        </div>

                        <button type="submit" disabled={!formik.isValid || formik.isSubmitting} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline">
                          Verify
                        </button>
                      </Form>
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
