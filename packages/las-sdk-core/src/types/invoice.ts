import { PaginationOptions, RequestConfig } from './common';

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

export type InvoiceList = {
  invoices: Invoice[];
  nextToken?: string | null;
};

export type ListInvoicesOptions = RequestConfig & PaginationOptions;
export type GetInvoiceOptions = RequestConfig;
