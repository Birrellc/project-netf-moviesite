import React from 'react';
import { Movie } from '../typings';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';

interface Props {
  title: string;
  movies: Movie[];
}

const Row = ({ title, movies }: Props) => {
  return (
    <div className='h-40 space-y-0.5 md:space-y-2'>
      <h2 className='w-56 cursor-pointer text-sm font-semibold md:text-2xl text-[#d8d8d8c9] transition duration-200 hover:text-white'>
        {title}
      </h2>
      <div className='group relative md:-ml-2'>
        <ChevronLeftIcon className='chevron' />

        <div>{/* thumbnail */}</div>

        <ChevronRightIcon className='chevron' />
      </div>
    </div>
  );
};

export default Row;
