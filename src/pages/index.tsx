import { GetStaticProps } from 'next';
import { FaCalendar, FaUser } from 'react-icons/fa';

import { getPrismicClient } from '../services/prismic';

import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';

interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

export default function Home(): JSX.Element {
  return (
    <main className={styles.homeContainer}>
      <section className={styles.homeContent}>
        <div className={styles.post}>
          <h1> Como utilizar Hooks </h1>
          <p>Pensando em sincronização em vez de ciclos de vida</p>
          <div>
            <time>
              <FaCalendar className={styles.icon} /> 15 Mar 2021
            </time>
            <span>
              <FaUser className={styles.icon} />
              Lucas
            </span>
          </div>
        </div>

        <div className={styles.post}>
          <h1> Como utilizar Hooks </h1>
          <p>Pensando em sincronização em vez de ciclos de vida</p>
          <div>
            <time>
              <FaCalendar className={styles.icon} /> 15 Mar 2021
            </time>
            <span>
              <FaUser className={styles.icon} />
              Lucas
            </span>
          </div>
        </div>

        <div className={styles.post}>
          <h1> Como utilizar Hooks </h1>
          <p>Pensando em sincronização em vez de ciclos de vida</p>
          <div>
            <time>
              <FaCalendar className={styles.icon} /> 15 Mar 2021
            </time>
            <span>
              <FaUser className={styles.icon} />
              Lucas
            </span>
          </div>
        </div>
      </section>
    </main>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  // const prismic = getPrismicClient();
  // const postsResponse = await prismic.query(TODO);
  // TODO

  return {
    props: {},
  };
};
