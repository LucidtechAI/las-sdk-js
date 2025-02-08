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

export type PaymentMethodList = {
  paymentMethods: PaymentMethod[];
  nextToken?: string | null;
};

export type ListPaymentMethodsOptions = RequestConfig & PaginationOptions;
export type GetPaymentMethodOptions = RequestConfig;
export type CreatePaymentMethodOptions = RequestConfig & Pick<PaymentMethod, 'description' | 'name'>;
export type UpdatePaymentMethodOptions = RequestConfig &
  Pick<PaymentMethod, 'description' | 'name' | 'stripeSetupIntentSecret'>;
export type DeletePaymentMethodOptions = RequestConfig;
