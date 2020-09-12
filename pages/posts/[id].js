import Layout from "../../components/layout";
import { getAllPostIds, getPostData } from "../../lib/posts";
import Head from "next/head";

export default function Post({ postData }) {
  // postDataはgetStaticPropsがリターンしている値
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      {postData.title}
      <br />
      {/* idはファイル名自身 */}
      {postData.id}
      <br />
      {postData.date}
      <br />
      <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
    </Layout>
  );
}
//①動的ルートでパス一覧（どんなページを表示する可能性があるのか）を取得
export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

//そのページのIDに基づいたデータを返す。propsにして、function Postに渡す
export async function getStaticProps({ params }) {
  // libディレクトリ内のgetPostDataメソッドでtitle,dataを取得
  // 呼び出している、getPostDataメソッドがasync/awaitなので、awaitをつける必要がある。
  const postData = await getPostData(params.id);
  return {
    // 必ずpropsを返す必要がある。
    props: {
      postData,
    },
  };
}
