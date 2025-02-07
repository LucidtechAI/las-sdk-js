import { PaginationOptions, RequestConfig } from './common';

export type Asset = {
  /* Id */
  assetId: string;
  /* Attributes */
  content: string;
  contentMD5?: string | null;
  createdBy?: string | null;
  createdTime?: Date | null;
  description?: string | null;
  name?: string | null;
  updatedBy?: string | null;
  updatedTime?: Date | null;
};

export type AssetWithoutContent = Omit<Asset, 'content'>;

export type AssetList = {
  assets: Array<AssetWithoutContent>;
  nextToken: string | null;
};

export type UpdateAssetOptions = RequestConfig & {
  content?: string | Buffer;
};

export type CreateAssetOptions = RequestConfig;

export type DeleteAssetOptions = RequestConfig;

export type ListAssetsOptions = RequestConfig & PaginationOptions;

export type GetAssetOptions = RequestConfig;
