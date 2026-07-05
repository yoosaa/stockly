import type { FoodSummary } from "../../application/summarizeFoods";
import "./FoodSummaryCards.css";

type FoodSummaryCardsProps = {
  summary: FoodSummary;
};

export function FoodSummaryCards({ summary }: FoodSummaryCardsProps) {
  return (
    <section className="food-summary-cards" aria-label="食材サマリー">
      <article className="food-summary-card food-summary-card--danger">
        <div className="food-summary-card__header">
          <span className="food-summary-card__icon" aria-hidden="true">
            ×
          </span>
          <p className="food-summary-card__value">{summary.expiredCount}</p>
        </div>
        <h2 className="food-summary-card__title">期限切れ</h2>
        <p className="food-summary-card__description">
          早めに確認したい食材です。
        </p>
      </article>

      <article className="food-summary-card food-summary-card--warning">
        <div className="food-summary-card__header">
          <span className="food-summary-card__icon" aria-hidden="true">
            !
          </span>
          <p className="food-summary-card__value">
            {summary.expiringSoonCount}
          </p>
        </div>
        <h2 className="food-summary-card__title">期限間近</h2>
        <p className="food-summary-card__description">
          3日以内に使いたい食材です。
        </p>
      </article>

      <article className="food-summary-card food-summary-card--primary">
        <div className="food-summary-card__header">
          <span className="food-summary-card__icon" aria-hidden="true">
            □
          </span>
          <p className="food-summary-card__value">{summary.totalCount}</p>
        </div>
        <h2 className="food-summary-card__title">登録食材</h2>
        <p className="food-summary-card__description">
          すべての保管場所の合計です。
        </p>
      </article>
    </section>
  );
}
