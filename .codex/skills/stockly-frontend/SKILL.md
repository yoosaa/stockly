---
name: stockly-frontend
description: Stockly frontend / React / TypeScript / vanilla CSS / feature-based clean architecture の実装・レビュー時に使う。Tailwindなし、Server Stateなし、React local state中心のStockly専用ルール。
---

# Stockly Frontend Skill

この Skill は、Stockly リポジトリでフロントエンド実装またはレビューを行うときに使う。

Stockly は、家庭の食材在庫・賞味期限・買い物リスト・献立管理を扱う React アプリ。

## 基本技術スタック

- React
- TypeScript
- Vite
- バニラ CSS
- Tailwind CSS は使わない
- CSS Modules は今のところ使わない
- feature-based 構成
- feature 内では軽めのクリーンアーキテクチャを採用する

## 現在のディレクトリ構成

基本構成は以下。

```txt
src/
  app/
    App.tsx
    App.css
    styles/
      global.css
      layers.css
      tokens.css

  features/
    foods/
      domain/
      application/
      presentation/
        components/
        fixtures/
        hooks/

  shared/
    components/
    utils/
```

## レイヤーの責務

### domain

Stockly 固有の中心概念・業務ルールを置く。

置いてよいもの:

- Entity / 型定義
- Value Object 的な型
- 業務ルール関数
- 純粋関数

例:

- `FoodItem`
- `FoodCategory`
- `StorageLocation`
- `ExpiryStatus`
- `getExpiryStatus`

import してはいけないもの:

- React
- CSS
- DOM API
- component files
- hooks

### application

ユースケース寄りの処理、データ加工、domain ルールの組み合わせを置く。

置いてよいもの:

- フィルタ処理
- ソート処理
- 集計処理
- domain データを画面用途に加工する純粋関数

例:

- `summarizeFoods`
- `filterFoods`
- `sortFoodsByExpiryDate`

import してはいけないもの:

- React components
- CSS files
- UI 専用のブラウザ処理

### presentation

React コンポーネント、コンポーネント CSS、表示用ラベル、React hooks、プロトタイピング用 mock data を置く。

置いてよいもの:

- React components
- local UI state
- event handlers
- component-level CSS imports
- 表示用ラベル
- 一時的な mock data

例:

- `FoodSummaryCards`
- `FoodFilters`
- `FoodTable`
- `FoodTableRow`
- `mockFoods`
- `foodLabels`

## CSS ルール

Stockly では意図的にバニラ CSS を使う。

追加してはいけないもの:

- Tailwind CSS
- Tailwind config
- utility class library
- CSS Modules
- styled-components
- emotion

使うもの:

- 通常の `.css` ファイル
- コンポーネント横に CSS を配置
- feature CSS では `@layer features` を使う
- `src/app/styles/tokens.css` のデザイントークンを使う
- BEM 風のクラス命名を使う

良い例:

```css
@layer features {
  .food-table {
  }
  .food-table__header {
  }
  .food-table__row {
  }
}
```

可能な限り既存の CSS 変数を使う。

```css
var(--color-primary)
var(--color-surface)
var(--color-border-subtle)
var(--space-4)
var(--radius-lg)
var(--shadow-card)
```

色・余白・角丸・影を直接ハードコードしない。  
必要な場合は、まず `tokens.css` に再利用可能なトークンを追加する。

## React state ルール

まずは一番単純な状態管理から始める。

local UI state には基本的に `useState` を使う。

複数の関連 state や状態遷移が複雑になってきた場合のみ、後から `useReducer` を検討する。

明示的に依頼されない限り、以下は導入しない。

- Zustand
- TanStack Query
- MSW
- React Router
- backend / API code

## 派生データは state に持たない

既存の state や props から計算できる値は、React state に保存しない。

Stockly では、たとえば `filteredFoods` は `foods` と `filters` から計算できる。

そのため、以下のように `filteredFoods` 自体を state に持たない。

悪い例:

```tsx
const [filters, setFilters] = useState(initialFilters);
const [filteredFoods, setFilteredFoods] = useState(mockFoods);
```

良い例:

```tsx
const [filters, setFilters] = useState(initialFilters);
const filteredFoods = filterFoods(mockFoods, filters, today);
```

`filteredFoods` のような派生データは、基本的に render 中に計算する。  
明確なパフォーマンス上の理由がある場合のみ `useMemo` を検討する。

## 現在の実装フェーズ

現在は、React local state とバニラ CSS を中心に学ぶフェーズ。

やってよい作業:

- food filters
- food table UI
- food summary cards
- controlled inputs
- filtering logic
- sorting logic
- add/delete food using local state
- `application` 配下の小さな純粋関数
- 軽微な CSS polish

今は避ける作業:

- API integration
- persistence
- auth
- database
- server state
- optimistic updates
- Zustand
- TanStack Query
- routing
- 大きな design system 抽象化

## ラベルと表示文言

表示用ラベルは domain ではなく presentation に置く。

例:

```ts
foodCategoryLabels;
storageLocationLabels;
expiryStatusLabels;
```

domain は安定した値だけを返す。

```ts
"expired" | "expiringSoon" | "safe";
```

それをどう表示するかは presentation が決める。

## 日付処理

`YYYY-MM-DD` を扱う場合は、shared date utility を優先して使う。

使うもの:

```ts
parseYmdToLocalDate;
differenceInCalendarDays;
startOfLocalDay;
```

避けるもの:

```ts
new Date(expiryDate);
```

date-only string はタイムゾーンによって意図しない挙動になる可能性があるため、直接 parse しない。

## PR 作成前の期待値

作業完了前に、可能なら以下を実行する。

```bash
pnpm build
pnpm lint
```

実行できなかった場合は、その理由を PR 本文または完了報告に書く。

## PR スコープ

PR は小さく保つ。

避けること:

- 関係ないリファクタを混ぜる
- 新しい依存関係を黙って追加する
- 設計方針を勝手に変える
- Tailwind を導入する
- Zustand / TanStack Query / MSW を前倒しで導入する

## PR タイトルの例

良い例:

```txt
feat: add food filtering state
feat: add food table UI
refactor: extract food filtering logic
style: polish inventory dashboard layout
```

避ける例:

```txt
fix
update
filter導入
```

## Codex への重要な指示

実装時は、以下を必ず守る。

1. Tailwind を追加しない
2. CSS Modules を追加しない
3. Zustand / TanStack Query / MSW を勝手に追加しない
4. domain に React や CSS を混ぜない
5. application に React component や CSS を混ぜない
6. 表示ラベルは presentation に置く
7. 派生データを state に持たない
8. 既存の tokens.css を優先して使う
9. 変更後に可能なら `pnpm build` と `pnpm lint` を実行する
10. 実行したチェック結果を報告する
