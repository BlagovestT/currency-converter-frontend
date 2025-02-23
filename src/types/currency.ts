export interface Currency {
  id: number;
  code: string;
  created_at: string;
  updated_at: string;
  exchange_rates: {
    id: number;
    currency_id: number;
    rate: number;
    created_at: string;
    updated_at: string;
  }[];
}
