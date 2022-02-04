import React from 'react';

export const NotLoggedIn = () => {
  return (
    <section className="body-font">
      <div className="container flex flex-col items-center justify-center px-5 py-24 pb-0 mx-auto">
        <img className="object-cover object-center w-5/6 mb-10 rounded lg:w-2/6 md:w-3/6" alt="hero" src="https://dummyimage.com/720x600"/>
        <span className="ml-3 text-3xl">Lungo App</span>
        <div className="flex flex-col items-center w-full pb-1 mb-1 text-center md:w-2/3">
          <p className="pb-1 mb-1 leading-relaxed">Hi guess, we're glad you visited us. Please, take a look.</p>
        </div>
      </div>
    </section>
  );
}
