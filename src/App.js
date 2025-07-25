import React, { useEffect, useState } from 'react';
// If using React Router, import useLocation
// import { useLocation } from 'react-router-dom';

const STRIPE_URL = 'https://buy.stripe.com/test_9B65kD5YdaTb6MzaPW6J200'; // Updated Stripe URL

function getReferralFromQuery(search) {
  const params = new URLSearchParams(search || window.location.search);
  return params.get('ref');
}

function getStoredReferral() {
  return localStorage.getItem('referral');
}

function storeReferral(referral) {
  if (referral) localStorage.setItem('referral', referral);
}

function buildStripeUrl(base, referral) {
  if (!referral) return base;
  const url = new URL(base);
  url.searchParams.set('ref', referral);
  return url.toString();
}

function App() {
  // Uncomment the next line if using React Router
  // const location = useLocation();
  // const search = location ? location.search : window.location.search;
  const search = window.location.search; // fallback for no router

  const [referral, setReferral] = useState(getStoredReferral() || getReferralFromQuery(search) || '');

  useEffect(() => {
    const existingReferral = getStoredReferral();
    if (!existingReferral) {
      const queryReferral = getReferralFromQuery(search);
      if (queryReferral) {
        storeReferral(queryReferral);
        setReferral(queryReferral);
      }
    } else {
      setReferral(existingReferral);
    }
    // If using React Router, add [search] as a dependency
  }, [search]);

  const stripeUrl = buildStripeUrl(STRIPE_URL, referral);

  return (
    <div className="min-h-screen bg-background flex flex-col justify-between font-sans">
      {/* Hero Section */}
      <section className="flex flex-1 flex-col items-center justify-center px-6 py-12 md:py-24 w-full text-center">
        <div className="flex flex-col items-center max-w-xl mx-auto w-full space-y-6">
          <span className="font-extrabold text-lg tracking-wide uppercase text-orange-600 mb-0">Course + Community</span>
          <h1 className="font-display font-extrabold text-4xl md:text-5xl text-gray-900 leading-tight md:leading-tight tracking-tight">
            Your Creator Career Starts Here
          </h1>
          <p className="text-gray-700 text-base md:text-lg max-w-md mx-auto">
            Our step-by-step online course shows you how to turn your social media skills into income. Get lifetime access to our private Discord community for support, networking, and exclusive tips.
          </p>
          <a
            href={stripeUrl}
            className="transition-all duration-200 ease-in-out bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-8 rounded-2xl shadow-lg hover:shadow-xl text-lg md:text-xl focus:outline-none focus:ring-2 focus:ring-primary-dark focus:ring-offset-2 w-full max-w-xs"
            target="_blank"
            rel="noopener noreferrer"
          >
            Get Access Now
          </a>
          <span className="text-xs text-gray-400">Secure checkout • Instant access</span>
        </div>
      </section>
      {/* Footer */}
      <footer className="text-center text-gray-400 text-xs py-6">
        &copy; {new Date().getFullYear()} Earn on Social Media. All rights reserved.
        <span className="ml-2">
          <a href="#" className="hover:text-primary transition-colors underline underline-offset-2">Terms</a> ·
          <a href="#" className="hover:text-primary transition-colors underline underline-offset-2 ml-1">Privacy</a>
        </span>
      </footer>
    </div>
  );
}

export default App;
