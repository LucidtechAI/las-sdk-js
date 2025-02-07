import { JSONObject, PaginationOptions, RequestConfig } from './common';

export type PaymentMethod = {
  /* Id */
  paymentMethodId: string;
  /* Attributes */
  createdBy: string;
  createdTime: Date;
  description?: string | null;
  details?: JSONObject | null;
  name?: string | null;
  stripePublishableKey?: string | null;
  stripeSetupIntentSecret?: string | null;
  updatedBy?: string | null;
  updatedTime?: Date | null;
};

export type ListPaymentMethodsOptions = RequestConfig & PaginationOptions;

export type PaymentMethodList = {
  nextToken: string | null;
  paymentMethods: Array<PaymentMethod>;
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
