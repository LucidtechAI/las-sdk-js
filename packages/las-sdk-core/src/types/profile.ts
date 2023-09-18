import { RequestConfig } from './common';

export type GetProfileOptions = RequestConfig;

export type PrivateProfile = {
  createdTime: string | null;
  email: string | null;
  familyName: string | null;
  givenName: string | null;
  locale: string | null;
  metadata: Record<string, unknown> | null;
  numberOfOrganizationsAllowed: number;
  numberOfOrganizationsCreated: number;
  picture: string | null;
  profileId: string;
  updatedTime: string | null;
};

export type UpdateProfileOptions = RequestConfig & {
  givenName?: string | null;
  familyName?: string | null;
  locale?: string | null;
  metadata?: Record<string, unknown> | null;
  picture?: string | null;
};

export type PublicProfile = Pick<PrivateProfile, 'givenName' | 'familyName' | 'picture' | 'profileId'>;
