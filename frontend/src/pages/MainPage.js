import React from "react";

export default function MainPage() {
  return (
    <div className="bg-white text-primary font-sans">
      <div className="pb-16 pt-32">

        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-bold sm:text-5xl">
            Ticket Submission Portal
          </h1>
          <p className="mt-6 text-xl text-gray-600">
            Your gateway to professional client support
          </p>
        </div>

        <section className="w-full mt-24 text-center bg-primary text-white py-32">
          <h2 className="text-3xl font-semibold">Welcome to TicketsPro</h2>
          <p className="mt-6 text-lg text-gray-200">
            Experience a seamless ticketing process with our state-of-the-art
            platform. We provide solutions that cater to your every need. Get
            started today and elevate your support system to new heights.
          </p>
          <div className="mt-10 flex justify-center">
            <a
              href="#services"
              className="bg-white text-primary font-semibold py-3 px-10 rounded hover:bg-emerald-800 focus:outline-none"
              rel="noreferrer"
            >
              Explore Services
            </a>
          </div>
        </section>

        <section id="services" className="max-w-7xl mx-auto mt-32">
          <h2 className="text-3xl font-semibold text-center">
            Services We Offer
          </h2>
          <div className="mt-10 grid gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white rounded-lg shadow-xl p-8 flex flex-col items-center">
              <i className="fas fa-headset fa-4x text-primary mb-6"></i>
              <h3 className="mb-3 font-semibold">24/7 Support</h3>
              <p className="text-md text-gray-600 text-center">
                Our team is available around the clock to assist you with any
                issues.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-xl p-8 flex flex-col items-center">
              <i className="fas fa-cogs fa-4x text-primary mb-6"></i>
              <h3 className="mb-3 font-semibold">Technical Help</h3>
              <p className="text-md text-gray-600 text-center">
                Get expert technical support for complex issues and
                troubleshooting.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-xl p-8 flex flex-col items-center">
              <i className="fas fa-users fa-4x text-primary mb-6"></i>
              <h3 className="mb-3 font-semibold">Customer Service</h3>
              <p className="text-md text-gray-600 text-center">
                Our friendly customer service team is here to ensure your
                satisfaction.
              </p>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto text-gray-600 body-font mt-40">
          <h2 className="text-3xl font-semibold text-center text-primary">
            How this works
          </h2>

          <div className="container px-5 pb-24 pt-14 mx-auto flex flex-wrap">
            <div className="flex relative pt-10 pb-20 sm:items-center md:w-2/3 mx-auto">
              <div className="h-full w-6 absolute inset-0 flex items-center justify-center">
                <div className="h-full w-1 bg-gray-200 pointer-events-none"></div>
              </div>
              <div className="flex-shrink-0 w-6 h-6 rounded-full mt-10 sm:mt-0 inline-flex items-center justify-center bg-primary text-white relative z-10 title-font font-medium text-sm">
                1
              </div>
              <div className="flex-grow md:pl-8 pl-6 flex sm:items-center items-start flex-col sm:flex-row">
                <div className="flex-shrink-0 w-[70px] h-[70px] bg-emerald-700/30 text-primary rounded-full inline-flex items-center justify-center">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-9 h-9"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
                <div className="flex-grow sm:pl-6 mt-6 sm:mt-0">
                  <h2 className="font-bold title-font text-primary mb-1 text-xl">
                    Log in
                  </h2>
                  <p className="leading-relaxed">
                    Sign in to your account, or create one if you're new here.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex relative pb-20 sm:items-center md:w-2/3 mx-auto">
              <div className="h-full w-6 absolute inset-0 flex items-center justify-center">
                <div className="h-full w-1 bg-gray-200 pointer-events-none"></div>
              </div>
              <div className="flex-shrink-0 w-6 h-6 rounded-full mt-10 sm:mt-0 inline-flex items-center justify-center bg-primary text-white relative z-10 title-font font-medium text-sm">
                2
              </div>
              <div className="flex-grow md:pl-8 pl-6 flex sm:items-center items-start flex-col sm:flex-row">
                <div className="flex-shrink-0 w-[70px] h-[70px] bg-emerald-700/30 text-primary rounded-full inline-flex items-center justify-center">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-9 h-9"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                  </svg>
                </div>
                <div className="flex-grow sm:pl-6 mt-6 sm:mt-0">
                  <h2 className="font-bold title-font text-primary mb-1 text-xl">
                    What's bothering you
                  </h2>
                  <p className="leading-relaxed">
                    Create your ticket, tell us what is wrong and we will do our
                    best to fix it.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex relative pb-20 sm:items-center md:w-2/3 mx-auto">
              <div className="h-full w-6 absolute inset-0 flex items-center justify-center">
                <div className="h-full w-1 bg-gray-200 pointer-events-none"></div>
              </div>
              <div className="flex-shrink-0 w-6 h-6 rounded-full mt-10 sm:mt-0 inline-flex items-center justify-center bg-primary text-white relative z-10 title-font font-medium text-sm">
                3
              </div>
              <div className="flex-grow md:pl-8 pl-6 flex sm:items-center items-start flex-col sm:flex-row">
                <div className="flex-shrink-0 w-[70px] h-[70px] bg-emerald-700/30 text-primary rounded-full inline-flex items-center justify-center">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-9 h-9"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  </svg>
                </div>
                <div className="flex-grow sm:pl-6 mt-6 sm:mt-0">
                  <h2 className="font-bold title-font text-primary mb-1 text-xl">
                    Get our help
                  </h2>
                  <p className="leading-relaxed">
                    Our team will work tirelessly to solve your problem, even if
                    it takes time.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex relative pb-10 sm:items-center md:w-2/3 mx-auto">
              <div className="h-full w-6 absolute inset-0 flex items-center justify-center">
                <div className="h-full w-1 bg-gray-200 pointer-events-none"></div>
              </div>
              <div className="flex-shrink-0 w-6 h-6 rounded-full mt-10 sm:mt-0 inline-flex items-center justify-center bg-primary text-white relative z-10 title-font font-medium text-sm">
                4
              </div>
              <div className="flex-grow md:pl-8 pl-6 flex sm:items-center items-start flex-col sm:flex-row">
                <div className="flex-shrink-0 w-[70px] h-[70px] bg-emerald-700/30 text-primary rounded-full inline-flex items-center justify-center">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-9 h-9"
                    viewBox="0 0 24 24"
                  >
                    <circle cx="12" cy="5" r="3"></circle>
                    <path d="M12 22V8M5 12H2a10 10 0 0020 0h-3"></path>
                  </svg>
                </div>
                <div className="flex-grow sm:pl-6 mt-6 sm:mt-0">
                  <h2 className="font-bold title-font text-primary mb-1 text-xl">
                    Finishing up
                  </h2>
                  <p className="leading-relaxed">
                    Mark your ticket as solved, and maybe leave us a nice review
                    :p
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto my-20 text-center">
          <h2 className="text-3xl font-semibold">Need Assistance?</h2>
          <p className="mt-6 text-lg text-gray-600">
            Submit a ticket and our team will get back to you shortly.
          </p>
          <button className="mt-10 bg-primary text-white font-semibold py-3 px-10 rounded hover:bg-emerald-800 focus:outline-none">
            Submit a Ticket
          </button>
        </section>
      </div>

      <button
        id="chat-btn"
        className="fixed bottom-4 right-4 bg-primary text-white p-4 rounded-full shadow-xl z-50 hover:bg-emerald-800 focus:outline-none"
      >
        <i className="fas fa-comment-alt fa-lg"></i>
      </button>
    </div>
  );
}
