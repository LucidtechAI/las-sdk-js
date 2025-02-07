import { PaginationOptions, RequestConfig } from './common';

export const CardBrandValues = ['amex', 'diners_club', 'discover', 'jcb', 'mastercard', 'unionpay', 'visa'] as const;
export type CardBrand = (typeof CardBrandValues)[number];

export type PaymentMethodDetails = {
  brand: CardBrand;
  country: string;
  expMonth: number;
  expYear: number;
  last4: string;
  type: 'card';
};

export type PaymentMethod = {
  /* Id */
  paymentMethodId: string;
  /* Attributes */
  createdBy: string;
  createdTime: Date;
  description?: string | null;
  details?: PaymentMethodDetails | null;
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
