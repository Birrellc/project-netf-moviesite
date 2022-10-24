import { CheckIcon } from '@heroicons/react/solid';
import { Product } from '@stripe/firestore-stripe-payments';
import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import netflixLogo from '../assets/netflixLogo.png';
import useAuth from '../customHooks/useAuth';
import Table from './Table';
import Loader from './Loader';
import { loadCheckout } from '../lib/stripe';

// Product[] - type in stripe/firestore package
interface Props {
  products: Product[];
}

const SubPlans = ({ products }: Props) => {
  //
  const { logout, user } = useAuth();
  // on default premium will be highlighted
  const [activePlan, setActivePlan] = useState<Product | null>(products[2]);
  const [stripeLoading, setStripeLoading] = useState(false);

  const subToPlan = () => {
    // return if no user
    if (!user) return;

    loadCheckout(activePlan?.prices[0].id!);
    setStripeLoading(true);
  };

  return (
    <div>
      <Head>
        <title>Netflix Subscription Plans</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <header className='border-b border-white/20 bg-[#181818]'>
        <Link href='/'>
          <Image
            src={netflixLogo}
            alt='netflix logo'
            height='50'
            width='50'
            objectFit='contain'
            className='cursor-pointer'
          />
        </Link>
        <button
          className='text-lg font-medium hover:underline'
          onClick={logout}
        >
          Sign Out
        </button>
      </header>

      <main className='mx-auto max-w-5xl px-5 pt-32 pb-12 transition-all md:px-10'>
        <h1 className='mb-4 text-3xl font-semibold'>
          Choose your subscription plan
        </h1>
        <ul>
          <li className='flex items-center gap-x-2 text-lg'>
            <CheckIcon className='h-7 w-7 text-[#E50914]' /> Ad-free viewing.
          </li>
          <li className='flex items-center gap-x-2 text-lg'>
            <CheckIcon className='h-7 w-7 text-[#E50914]' /> Personalized
            recommendations.
          </li>
          <li className='flex items-center gap-x-2 text-lg'>
            <CheckIcon className='h-7 w-7 text-[#E50914]' /> Change or cancel
            your plan at anytime.
          </li>
        </ul>

        <div className='mt-4 pt-6 flex flex-col space-y-4'>
          <div className='flex w-full items-center justify-end self-end md:w-3/5"'>
            {products.map((product) => (
              <div
                className={`planContainer ${
                  activePlan?.id === product.id ? 'opacity-100' : 'opacity-50'
                }`}
                key={product.id}
                onClick={() => setActivePlan(product)}
              >
                {product.name}
              </div>
            ))}
          </div>

          <Table products={products} activePlan={activePlan} />

          <button
            disabled={!activePlan || stripeLoading}
            className={`mx-auto w-11/12 rounded bg-[#E50914] py-4 text-xl shadow hover:bg-[#f6121d] md:w-[420px] ${
              stripeLoading && 'opacity-60'
            }`}
            onClick={subToPlan}
          >
            {stripeLoading ? (
              <Loader color='dark:fill-gray-300' />
            ) : (
              'Subscribe'
            )}
          </button>
          <p className='flex justify-center italic text-xs'>
            (can take a few moments)
          </p>
        </div>
      </main>
    </div>
  );
};

export default SubPlans;
