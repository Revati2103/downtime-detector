import Link from 'next/link';
import ContactForm from '../components/ContactForm';
import stat from "../public/stat.jpg";
import Image from 'next/image';

const HomePage = () => {
  return (
    <div >
      <div className=" bg-gradient-to-r from-purple-400 relative h-screen w-screen">
        <img
          className="absolute inset-0 w-full h-full object-cover mix-blend-multiply filter brightness-50"
          alt="main background image"
          fallback={stat}
          src="https://images.unsplash.com/photo-1584291527935-456e8e2dd734?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8c3RhdGlzdGljc3xlbnwwfHwwfHx8MA%3D%3D"
        />

        <div className="absolute inset-0 flex flex-col justify-center items-center max-w-xl mx-auto text-center backdrop-blur-sm w-100">
          <div className="space-y-8">
            <h1 className="font-primary font-extrabold text-white text-4xl sm:text-4xl md:text-5xl md:leading-tight">
              Downtime Detector
            </h1>
            <section className="relative z-10 overflow-hidden">
              <div className="container">
                <div className="-mx-4 flex flex-wrap">
                  <div className="w-full px-4">
                    <div className="shadow-three mx-auto max-w-[500px] rounded bg-white backdrop-blur-xl px-6 py-10 dark:bg-dark sm:p-[60px]">
                      <div className="mb-8 flex items-center justify-center">
                        <span className="hidden h-[1px] w-full max-w-[70px] bg-body-color/50 sm:block"></span>
                        <p className="w-full px-5 text-center text-base font-medium text-body-color">
                          Fill the form below
                        </p>
                        <span className="hidden h-[1px] w-full max-w-[70px] bg-body-color/50 sm:block"></span>
                      </div>
                      <ContactForm />
                    </div>
                  </div>
                </div>
              </div>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
