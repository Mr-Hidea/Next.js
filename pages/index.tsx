import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Ad-vantage - Home</title>
        <meta name="description" content="Welcome to Ad-vantage" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to Ad-vantage
        </h1>

        <p className={styles.description}>
          Get started by registering an account
        </p>

        <div className={styles.grid}>
          <Link href="/register">
            <a className={styles.card}>
              <h2>Register &rarr;</h2>
              <p>Create an account to start using Ad-vantage.</p>
            </a>
          </Link>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            Ad-vantage
          </span>
        </a>
      </footer>
    </div>
  );
};

export default Home;




