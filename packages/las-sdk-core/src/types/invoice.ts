import { JSONValue, PaginationOptions, RequestConfig } from './common';

export type Invoice = {
  invoiceId: string;
  amount: number;
  currency: 'USD' | 'EUR' | 'NOK';
  createdTime: Date;
  status: 'failed' | 'paid' | 'pending';
  fileUrl: string;
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
