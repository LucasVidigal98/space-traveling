import { GetStaticPaths, GetStaticProps } from 'next';
import { FaCalendar, FaUser } from 'react-icons/fa';

import Prismic from '@prismicio/client';
import { getPrismicClient } from '../../services/prismic';

import commonStyles from '../../styles/common.module.scss';
import styles from './post.module.scss';

interface Post {
  first_publication_date: string | null;
  data: {
    title: string;
    banner: {
      url: string;
    };
    author: string;
    content: {
      heading: string;
      body: {
        text: string;
      }[];
    }[];
  };
}

interface PostProps {
  post: Post;
}

export default function Post({ post }: PostProps): JSX.Element {
  return (
    <section className={styles.postContainer}>
      <header>
        <img src={post.data.banner.url} alt="Banner" />
      </header>

      <main className={styles.postContent}>
        <div className={styles.postHeading}>
          <h1>{post.data.title}</h1>

          <div className={commonStyles.info}>
            <time>
              {' '}
              <FaCalendar className={commonStyles.icon} />{' '}
              {post.first_publication_date}{' '}
            </time>

            <span>
              <FaUser className={commonStyles.icon} /> {post.data.author}
            </span>
          </div>
        </div>

        <div className={styles.content}>
          <h2>{post.data.content[0].body[0].text}</h2>
          <p>{post.data.content[0].heading}</p>
        </div>

        <div className={styles.content}>
          {post.data.content.map(paragraph =>
            paragraph.body.map(({ text }) => <p>{text}</p>)
          )}
        </div>
      </main>
    </section>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const prismic = getPrismicClient();
  const posts = await prismic.query(
    [Prismic.predicates.at('document.type', 'post')],
    {
      fetch: ['post.slug'],
      pageSize: 100,
    }
  );

  // TODO
  return {
    paths: posts.results.map(postData => `/post/${postData.uid}`),
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async context => {
  const prismic = getPrismicClient();
  const response = await prismic.getByUID(
    'post',
    context.params.slug.toString(),
    {}
  );

  const post: Post = {
    first_publication_date: new Date(
      response.first_publication_date
    ).toLocaleString('pt-BR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }),
    data: {
      title: response.data.title,
      banner: {
        url: response.data.main.url,
      },
      author: response.data.author,
      content: response.data.content,
    },
  };

  return {
    props: {
      post,
    },
  };
};
