import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import { getSortedPostsData } from "../lib/posts";
//
import Link from "next/link";
import Date from "../components/date";

// 型定義のインポート
import { GetStaticProps } from "next";

//サーバーサイドレンダリングでも表示可能
// export async function getServerSideProps(context) {
export const getStaticProps: GetStaticProps = async () => {
  //dataでソートされた投稿データ
  const allPostsData = getSortedPostsData();
  console.log("allPostsData", allPostsData);
  return {
    props: {
      allPostsData,
    },
  };
};

// 下のHomefunctionのpropsの型定義（allPostsDataの中にid等のキーが入っている）
type Props = {
  allPostsData: {
    id: string;
    title: string;
    date: string;
  }[];
};
export default function Home({ allPostsData }: Props) {
  // console.log(allPostsData);
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>[Your Self Introduction]</p>
        <p>
          (This is a sample website - you’ll be building a site like this on{" "}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              {/* Dynamic Routesを使ってタイトルをリンク化 */}
              <Link href="/posts/[id]" as={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}
