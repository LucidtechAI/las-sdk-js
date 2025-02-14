import { JSONObject, RequestConfig } from './common';

export type Profile = {
  /* Id */
  profileId: string;
  /* Attributes */
  createdTime: Date;
  email: string;
  familyName?: string | null;
  givenName?: string | null;
  locale?: string | null;
  metadata: JSONObject;
  numberOfOrganizationsAllowed?: number | null;
  numberOfOrganizationsCreated?: number | null;
  pictureUrl?: string | null;
  updatedTime?: Date | null;
};

export type UpdateProfileOptions = RequestConfig &
  Pick<Partial<Profile>, 'familyName' | 'givenName' | 'locale' | 'metadata'>;
export type GetProfileOptions = RequestConfig;
