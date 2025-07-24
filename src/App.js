import React, { useEffect, useState } from 'react';

const STRIPE_URL = 'https://buy.stripe.com/test_checkout_url'; // Replace with your real Stripe URL

function getRefFromQuery() {
  const params = new URLSearchParams(window.location.search);
  return params.get('ref');
}

function getStoredRef() {
  return localStorage.getItem('ref');
}

function storeRef(ref) {
  if (ref) localStorage.setItem('ref', ref);
}

function buildStripeUrl(base, ref) {
  if (!ref) return base;
  const url = new URL(base);
  url.searchParams.set('ref', ref);
  return url.toString();
}

function App() {
  const [ref, setRef] = useState(getStoredRef() || getRefFromQuery() || '');

  useEffect(() => {
    const queryRef = getRefFromQuery();
    if (queryRef) {
      storeRef(queryRef);
      setRef(queryRef);
    }
  }, []);

  const stripeUrl = buildStripeUrl(STRIPE_URL, ref);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white px-4 py-8 text-center">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
        Unlock Your Earning Potential on Social Media
      </h1>
      <p className="text-base sm:text-lg text-gray-700 mb-8 max-w-md">
        Join our step-by-step online course and discover how to make real money by working on social media. Get lifetime access to our private Discord community for support, networking, and exclusive tips.
      </p>
      <a
        href={stripeUrl}
        className="inline-block w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg shadow transition-colors duration-200 text-lg"
        target="_blank"
        rel="noopener noreferrer"
      >
        Enroll Now
      </a>
    </main>
  );
}

export default App;
