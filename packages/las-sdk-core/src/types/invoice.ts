import { JSONValue, PaginationOptions, RequestConfig } from './common';

export const CurrencyValues = ['USD', 'EUR', 'NOK'] as const;
export type Currency = (typeof CurrencyValues)[number];

export const InvoiceStatusValues = ['failed', 'paid', 'pending'] as const;
export type InvoiceStatus = (typeof InvoiceStatusValues)[number];

export type Invoice = {
  /* Id */
  invoiceId: string;
  /* Attributes */
  amount: number;
  createdTime: Date;
  currency: Currency;
  fileUrl: string;
  status: InvoiceStatus;
};

export type CreateInvoiceOptions = RequestConfig & {
  description?: string;
  metadata?: Record<string, JSONValue> | null;
  name?: string;
};

export type UpdateInvoiceOptions = RequestConfig & {
  description?: string;
  metadata?: Record<string, JSONValue> | null;
  name?: string;
};

export type InvoiceList = {
  functions: Array<Invoice>;
  nextToken: string | null;
};

export type GetInvoiceOptions = RequestConfig;

export type ListInvoicesOptions = RequestConfig & PaginationOptions;

export type DeleteInvoiceOptions = RequestConfig;
