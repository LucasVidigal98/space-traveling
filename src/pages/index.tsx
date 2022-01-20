/* eslint-disable prettier/prettier */
import { GetStaticProps } from 'next';
import { FaCalendar, FaUser } from 'react-icons/fa';

import Prismic from '@prismicio/client';
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

export default function Home({ postsPagination }: HomeProps): JSX.Element {
  return (
    <main className={styles.homeContainer}>
      <section className={styles.homeContent}>
        {postsPagination.results.map(post => (
          <div key={post.uid} className={styles.post}>
            <h1> {post.data.title} </h1>
            <p>{post.data.subtitle}</p>
            <div>
              <time>
                <FaCalendar className={styles.icon} /> { post.first_publication_date }
              </time>
              <span>
                <FaUser className={styles.icon} />
                {post.data.author}
              </span>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();
  const postsResponse = await prismic.query(
    [Prismic.predicates.at('document.type', 'post')],
    {
      fetch: ['post.slug', 'post.title', 'post.subtitle', 'post.author'],
      pageSize: 100,
    }
  );

  const postsPagination: PostPagination = {
    next_page: postsResponse.next_page,
    results: [],
  };

  postsPagination.results = postsResponse.results.map(postData => {
    return {
      uuid: postData.uid,
      first_publication_date: new Date(postData.first_publication_date.toString()).toLocaleString('pt-BR', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
      data: {
        title: postData.data.title,
        subtitle: postData.data.subtitle,
        author: postData.data.author,
      },
    };
  });

  return {
    props: {
      postsPagination,
    },
  };
};
