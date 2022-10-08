import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import netflixLoginBg from '../assets/netflixLoginBg.jpg';
import netflixLogo from '../assets/netflixLogo.png';
import { useForm, SubmitHandler } from 'react-hook-form';

interface Inputs {
  email: string;
  password: string;
}

const login = () => {
  const [login, setLogin] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <div className='relative flex h-screen w-screen flex-col bg-black md:items-center md:justify-center md:bg-transparent'>
      <Head>
        <title>Netflix Login</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Image
        src={netflixLoginBg}
        layout='fill'
        className='-z-10 !hidden opacity-50 sm:!inline'
        objectFit='cover'
      />

      <Image
        src={netflixLogo}
        alt='netflix logo'
        height={135}
        width={135}
        layout='fixed'
        objectFit='contain'
        className='cursor-pointer !top-4'
      />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className='relative mt-24 space-y-8 rounded bg-black/40 py-10 px-6 md:mt-5 md:max-w-md md:px-14'
      >
        <h1 className='text-4xl font-semibold'>Sign In</h1>
        <div className='space-y-3'>
          <label className='inline-block w-full'>
            <input
              type='email'
              placeholder='Your Email'
              className='input'
              {...register('email', { required: true })}
            />
            {errors.email && (
              <span className='text-red-500 italic font-semibold'>
                Invalid Email
              </span>
            )}
          </label>
          <label className='inline-block w-full'>
            <input
              type='password'
              placeholder='Password'
              className='input'
              {...register('password', { required: true })}
            />
            {errors.password && (
              <span className='text-red-500 italic font-semibold'>
                Invalid Password
              </span>
            )}
          </label>
        </div>

        <button
          type='submit'
          className='w-full rounded bg-[#e50914] py-3 font-semibold'
        >
          Login
        </button>

        <button type='submit' className='w-full text-white hover:underline'>
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default login;
