import { Link } from "react-router-dom";
export default function NotFound() {
  return (
    <section>
      <h1>404</h1>
      <p>ページが見つかりません。</p>
      <p><Link to="/">ホームに戻る</Link></p>
    </section>
  );
}
