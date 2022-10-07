import { useRef, useState } from 'react';
import Thumbnail from './Thumbnail';
import { Movie } from '../typings';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';

interface Props {
  title: string;
  movies: Movie[];
}

const Row = ({ title, movies }: Props) => {
  // ref to target the div for chevron scrolling (carousel)
  const rowRef = useRef<HTMLDivElement>(null);
  // state for tracking if row scrolls
  const [isMoved, setIsMoved] = useState(false);

  // https://morayodeji.com/creating-a-carousel-component-using-react-hooks-and-sass
  const clickHandler = (direction: string) => {
    setIsMoved(true);
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;

      const scrollTo =
        direction === 'left'
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;
      //https://stackoverflow.com/questions/15935318/smooth-scroll-to-top
      rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <div className='h-40 space-y-0.5 md:space-y-2'>
      <h2 className='w-56 cursor-pointer text-sm font-semibold md:text-2xl text-[#d8d8d8c9] transition duration-200 hover:text-white'>
        {title}
      </h2>
      <div className='group relative md:-ml-2'>
        <ChevronLeftIcon
          // when scroll is at the start(default position hide left chevron)
          className={`chevron left-2 ${!isMoved && 'hidden'}`}
          onClick={() => clickHandler('left')}
        />

        <div
          ref={rowRef}
          className='flex scrollbar-hide items-center space-x-0.5 overflow-x-scroll md:space-x-2 md:p-2'
        >
          {movies.map((movie) => (
            <Thumbnail key={movie.id} movie={movie} />
          ))}
        </div>

        <ChevronRightIcon
          className='chevron right-2'
          onClick={() => clickHandler('right')}
        />
      </div>
    </div>
  );
};

export default Row;
