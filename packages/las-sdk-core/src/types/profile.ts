import { JSONObject, RequestConfig } from './common';

export type GetProfileOptions = RequestConfig;

export type Profile = {
  /* Id */
  profileId: string;
  /* Attributes */
  createdTime?: Date | null;
  email: string;
  familyName?: string | null;
  givenName?: string | null;
  locale?: string | null;
  metadata?: JSONObject | null;
  numberOfOrganizationsAllowed?: number | null;
  numberOfOrganizationsCreated?: number | null;
  picture?: string | null;
  updatedTime?: Date | null;
};

export type UpdateProfileOptions = RequestConfig & {
  givenName?: string | null;
  familyName?: string | null;
  locale?: string | null;
  metadata?: Record<string, unknown> | null;
  picture?: string | null;
};

export type PublicProfile = Pick<Profile, 'email' | 'givenName' | 'familyName' | 'picture' | 'profileId'>;
