import { Annotations, JSONObject, JSONValue, PaginationOptions, RequestConfig } from './common';

export const DOCUMENT_MAX_SIZE = 64 * 1000 * 1000;
export const DOCUMENT_MIME_TYPES = ['application/pdf', 'image/jpeg', 'image/png', 'image/webp', 'image/tiff'] as const;
export type ContentType = (typeof DOCUMENT_MIME_TYPES)[number];

export type GroundTruth = Array<GroundTruthItem>;
export type GroundTruthItem = {
  label: string;
  value: boolean | number | null | string | Array<Array<GroundTruthItem>>;
  pages: Array<number>;
};

export type Document = {
  /* Id */
  documentId: string;
  /* Attributes */
  consentId?: string | null;
  content?: string | null;
  contentMD5?: string | null;
  contentType: ContentType;
  createdBy: string;
  createdTime: Date;
  datasetId?: string | null;
  description?: string | null;
  fieldValues?: Annotations | null;
  fileUrl?: string | null;
  groundTruth?: GroundTruth | null;
  metadata?: JSONObject | null;
  name?: string | null;
  retentionInDays: number;
  updatedBy?: string | null;
  updatedTime?: Date | null;
};

export type DocumentWithoutContent = Omit<Document, 'content'>;

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

export type DocumentList = {
  documents: Array<DocumentWithoutContent>;
  nextToken: string | null;
};
