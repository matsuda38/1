# Authentication POC Plan

## Clerk POC
- **目的**: `/login` でのサインイン、`/logout` でのサインアウト、認証済みユーザーのみアクセス可能な `/me` ルートを実装する。
- **実装方針**:
  1. ClerkのJavaScript SDKを`frontend`に導入し、`ClerkProvider`でアプリ全体をラップ。
  2. `/login` ページで `<SignIn/>` コンポーネントを利用し、Emailリンク・OAuthのフローを有効化。
  3. `/logout` は`signOut()`を呼ぶ軽量なページ（またはボタン）で実装し、完了後はトップページへリダイレクト。
  4. `/me` では`withAuth`/`useUser`を用いてユーザー情報を表示。未認証の場合は`<RedirectToSignIn/>`で`/login`へ誘導。
  5. ルーティングは既存のフレームワーク（例: Next.js/React Router）に従い、SSRが不要な箇所はクライアントコンポーネントとして実装。
- **導入手順**:
  1. Clerkダッシュボードでアプリを作成し、`Publishable Key`と`Secret Key`を取得。
  2. `.env.local` に `VITE_CLERK_PUBLISHABLE_KEY` 等を設定（フロントエンドビルドが参照できる形式）。
  3. `npm install @clerk/clerk-react` を実行。
  4. エントリーポイントで`ClerkProvider`を設定し、ルートガードを構成。
  5. `cd frontend && npm run build` を実行し、POC範囲がビルド可能であることを確認。

## Supabase POC
- **目的**: Clerkと同様に`/login`、`/logout`、保護された`/me`を構築し、SupabaseのAuthとPostgreSQLを最小限接続する。
- **実装方針**:
  1. Supabase JavaScriptクライアントを導入し、`createClient`で`SUPABASE_URL`と`SUPABASE_ANON_KEY`を設定。
  2. `/login` では`signInWithOtp`（メールリンク/OTP）と`signInWithOAuth`をサポート。認証リンク確認用の`/auth/callback`ルートを用意。
  3. `/logout` ページ/ボタンで`signOut()`を呼び、完了後にトップへリダイレクト。
  4. `/me` では`supabase.auth.getUser()`を利用してユーザー情報を取得。未認証時は`/login`へ遷移。
  5. Supabaseのテーブル例（`profiles`）を作成し、Row Level Security (RLS) ポリシーで`auth.uid()`に紐づくレコードのみ閲覧できるよう構成。これによりアプリ側での権限制御が簡素化される。
- **導入手順**:
  1. Supabaseプロジェクトを作成し、`Project URL`と`anon/public key`を取得。
  2. `.env.local` に `VITE_SUPABASE_URL` と `VITE_SUPABASE_ANON_KEY` を設定。
  3. `npm install @supabase/supabase-js` を実行。
  4. アプリ初期化コードにSupabaseクライアントを組み込み、Authリスナーで状態を管理。
  5. PostgreSQLで`profiles`テーブルとRLSポリシーを設定し、`/me`で自身のプロフィール情報を表示。
  6. `cd frontend && npm run build` を実行し、変更がビルド可能なことを確認。

> **制約**: いずれのPOCもフロントエンドのみの変更で完結し、`cd frontend && npm run build` が成功する範囲を超えるバックエンド改修は行わない。
