import { PaginationOptions, RequestConfig } from './common';

export type ListPaymentMethodsOptions = RequestConfig & PaginationOptions;

export type PaymentMethodList = {
  nextToken: string | null;
  paymentMethods: Array<PaymentMethod>;
};

export type PaymentMethod = {
  createdBy: string | null;
  createdTime: string | null;
  description: string | null;
  details: Record<string, any> | null;
  name: string | null;
  paymentMethodId: string;
  stripePublishableKey?: string | null;
  stripeSetupIntentSecret?: string | null;
  updatedBy: string | null;
  updatedTime: string | null;
};

export type CreatePaymentMethodOptions = {
  description?: string;
  name?: string;
};

export type UpdatePaymentMethodOptions = {
  description?: string | null;
  name?: string | null;
  stripeSetupIntentSecret?: string;
};
