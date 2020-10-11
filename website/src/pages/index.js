import React from 'react';
import classnames from 'classnames';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

const features = [
  {
    title: <>Fully Configurable</>,
    imageUrl: 'img/undraw_selecting_1lx3.svg',
    description: (
      <>Through theming, plugins and styles, make the right decisions for your product.</>
    ),
  },
  {
    title: <>Built Using React</>,
    imageUrl: 'img/undraw_react_y7wq.svg',
  },
  {
    title: <>TypeScript Support</>,
    imageUrl: 'img/ts.png',
  },
];

function Feature({ imageUrl, title, description }) {
  const imgUrl = useBaseUrl(imageUrl);
  return (
    <div className={classnames('col col--4', styles.feature)}>
      {imgUrl && (
        <div className="text--center">
          <img className={styles.featureImage} src={imgUrl} alt={title} />
        </div>
      )}
      <h3 className="text--center">{title}</h3>
      <p className="text--center">{description}</p>
    </div>
  );
}

function Home() {
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Description will go into a meta tag in <head />"
    >
      <header className={classnames(styles.heroBanner, styles.hero)}>
        <div className="container">
          <h1 className={styles.heroProjectTagline}>
            A <span className={styles.heroProjectKeywords}>super</span> charged{' '}
            <span className={styles.heroProjectKeywords}>rich</span> content editor with an{' '}
            <span className={styles.heroProjectKeywords}>extensible</span> plugin system
          </h1>
          <div className={styles.indexCtas}>
            <Link
              className={styles.indexCtasGetStartedButton}
              to={useBaseUrl('docs/ricos/quick-start')}
            >
              Get Started
            </Link>
            <span className={styles.indexCtasGitHubButtonWrapper}>
              <iframe
                className={styles.indexCtasGitHubButton}
                src="https://ghbtns.com/github-btn.html?user=wix-incubator&amp;repo=rich-content&amp;type=star&amp;count=true&amp;size=large"
                width={160}
                height={30}
                title="GitHub Stars"
              />
            </span>
          </div>
        </div>
      </header>
      <main>
        {features && features.length && (
          <section className={styles.features}>
            <div className="container">
              <div className="row">
                {features.map((props, idx) => (
                  <Feature key={idx} {...props} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </Layout>
  );
}

export default Home;
