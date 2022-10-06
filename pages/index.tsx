import Head from 'next/head';
import Image from 'next/image';
import Header from '../components/Header';
import Banner from '../components/Banner';
import styles from '../styles/Home.module.css';
import requests from '../utils/requests';
import { Movie } from '../typings';
import Row from '../components/Row';

interface Props {
  // netflixOriginals of type Movie - typings.d.ts
  netflixOriginals: Movie[];
  trendingNow: Movie[];
  topRated: Movie[];
  actionMovies: Movie[];
  comedyMovies: Movie[];
  horrorMovies: Movie[];
  romanceMovies: Movie[];
  documentaries: Movie[];
}

const Home = ({
  netflixOriginals,
  actionMovies,
  comedyMovies,
  documentaries,
  horrorMovies,
  romanceMovies,
  topRated,
  trendingNow,
}: Props) => {
  console.log(netflixOriginals);

  return (
    <div className='relative h-screen bg-gradient-to-b from-gray-900/10 to-[#010811]'>
      <Head>
        <title>Netflix Clone</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      {/* Header */}
      <Header />
      <main className='relative pl-4 pb-24 lg:space-y-24 lg:pl-16'>
        {/* Banner */}
        <Banner netflixOriginals={netflixOriginals} />
        <section>
          {/* Movie Rows */}
          <Row title='Top Rated' movies={topRated} />
          <Row title='Trending Now' movies={trendingNow} />
          {/* MyList Component */}
          <Row title='Action/Thrillers' movies={actionMovies} />
          <Row title='Comedies' movies={comedyMovies} />
          <Row title='Horror' movies={horrorMovies} />
          <Row title='Romance' movies={romanceMovies} />
          <Row title='Docmentaries' movies={documentaries} />
        </section>
      </main>
      {/* Modal */}
    </div>
  );
};

export default Home;

export const getServerSideProps = async () => {
  const [
    netflixOriginals,
    trendingNow,
    topRated,
    actionMovies,
    comedyMovies,
    horrorMovies,
    romanceMovies,
    documentaries,
  ] = await Promise.all([
    // promise.all to avoid individual awaits due to many requests
    fetch(requests.fetchNetflixOriginals).then((res) => res.json()),
    fetch(requests.fetchTrending).then((res) => res.json()),
    fetch(requests.fetchTopRated).then((res) => res.json()),
    fetch(requests.fetchActionMovies).then((res) => res.json()),
    fetch(requests.fetchComedyMovies).then((res) => res.json()),
    fetch(requests.fetchHorrorMovies).then((res) => res.json()),
    fetch(requests.fetchRomanceMovies).then((res) => res.json()),
    fetch(requests.fetchDocumentaries).then((res) => res.json()),
  ]);

  // need to return probs for serverside rendering
  // https://nextjs.org/docs/basic-features/data-fetching/get-server-side-props
  return {
    props: {
      // fetch requests return id & results objects
      netflixOriginals: netflixOriginals.results,
      trendingNow: trendingNow.results,
      topRated: topRated.results,
      actionMovies: actionMovies.results,
      comedyMovies: comedyMovies.results,
      horrorMovies: horrorMovies.results,
      romanceMovies: romanceMovies.results,
      documentaries: documentaries.results,
    },
  };
};
