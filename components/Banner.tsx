import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Movie } from '../typings';
import { baseUrl } from '../constants/movie';
import { FaPlay } from 'react-icons/fa';
import { InformationCircleIcon } from '@heroicons/react/solid';

interface Props {
  netflixOriginals: Movie[];
}

const Banner = ({ netflixOriginals }: Props) => {
  // display random movie on page refresh
  const [movie, setMovie] = useState<Movie | null>(null);
  console.log(netflixOriginals);

  useEffect(() => {
    setMovie(
      //generate a random index
      netflixOriginals[Math.floor(Math.random() * netflixOriginals.length)]
    );
  }, [netflixOriginals]);

  console.log('movie', movie);

  return (
    <div className='flex flex-col space-y-3 py-16 md:space-x-5 lg:h-[65vh] lg:justify-end lg:pb-12'>
      <div className='absolute top-0 left-0 h-[95vh] w-screen -z-10'>
        {/* movie backdrop image */}
        <Image
          src={`${baseUrl}${movie?.backdrop_path || movie?.poster_path}`}
          layout='fill'
          objectFit='cover'
        />
      </div>

      <h1 className='text-2xl md:text-4-xl lg:text-6xl '>
        {movie?.title || movie?.name || movie?.original_name}
      </h1>
      <p className='max-w-xs text-shadow-lg text-xs md:max-w-lg md:text-lg lg:max-w-2xl lg:text-2xl'>
        {movie?.overview}
      </p>
      <div className='flex space-x-3'>
        <button className='bannerBtn bg-white text-black'>
          <FaPlay className='h-4 w-4 text-black md:h-7 md:w-7' />
          Play
        </button>
        <button className='bannerBtn bg-[gray]/50'>
          More Info <InformationCircleIcon className='h-5 w-5 md:h-8 md:w-8' />
        </button>
      </div>
    </div>
  );
};

export default Banner;
