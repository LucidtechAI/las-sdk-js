import { JSONValue, PaginationOptions, RequestConfig } from './common';

export type ContentType = 'application/pdf' | 'image/jpeg' | 'image/png' | 'image/tiff';

export type GroundTruth = Array<GroundTruthItem>;
export type GroundTruthItem = {
  label: string;
  value: boolean | number | null | string | Array<Array<GroundTruthItem>>;
  pages: Array<number>;
};

export type LasDocument = {
  consentId?: string;
  content: string | null;
  contentMD5: string | null;
  contentType: ContentType;
  createdBy: string | null;
  createdTime: string | null;
  datasetId?: string;
  description: string | null;
  documentId: string;
  groundTruth?: GroundTruth;
  fileUrl: string | null;
  metadata: Record<string, unknown> | null;
  name: string | null;
  retentionInDays: number;
  updatedBy: string | null;
  updatedTime: string | null;
};

export type LasDocumentWithoutContent = Omit<LasDocument, 'content'>;

export type CreateDocumentOptions = RequestConfig & {
  consentId?: string;
  datasetId?: string;
  description?: string | null;
  groundTruth?: GroundTruth;
  metadata?: Record<string, JSONValue> | null;
  name?: string | null;
  retentionInDays?: number;
};

export type UpdateDocumentOptions = RequestConfig & {
  groundTruth?: GroundTruth | null;
  retentionInDays?: number;
  name?: string | null;
  description?: string | null;
  metadata?: Record<string, JSONValue> | null;
};

export type GetDocumentOptions = RequestConfig;

export type DeleteDocumentsOptions = RequestConfig &
  PaginationOptions & {
    consentId?: string | Array<string>;
    datasetId?: string | Array<string>;
  };

export type ListDocumentsOptions = RequestConfig &
  PaginationOptions & {
    consentId?: string | Array<string>;
    datasetId?: string | Array<string>;
    order?: 'ascending' | 'descending';
    sortBy?: 'createdTime';
  };

export type DeleteDocumentOptions = RequestConfig;

export type LasDocumentList = {
  documents: Array<LasDocumentWithoutContent>;
  nextToken: string | null;
};
