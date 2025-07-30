import { JSONObject, OptionsOmit, OrderParam, PaginationOptions, RequestConfig } from './common';

export const DOCUMENT_MAX_SIZE = 64 * 1000 * 1000;
export const DOCUMENT_MIME_TYPES = [
  'application/pdf',
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/tiff',
  'message/rfc822',
] as const;
export type DocumentContentType = (typeof DOCUMENT_MIME_TYPES)[number];

export type Document = {
  /* Id */
  documentId: string;
  /* Attributes */
  annotationFileUrl: string;
  consentId?: string | null;
  contentLength?: number | null;
  contentMD5?: string | null;
  contentType?: DocumentContentType | null;
  createdBy: string;
  createdTime: Date;
  description?: string | null;
  fileUrl: string;
  metadata: JSONObject;
  name?: string | null;
  agentRunId?: string | null;
  retentionInDays: number;
  updatedBy?: string | null;
  updatedTime?: Date | null;
};

export type DocumentList = {
  documents: Document[];
  nextToken?: string | null;
};

export type ListDocumentsOptions = RequestConfig &
  PaginationOptions &
  OrderParam & {
    consentId?: string | Array<string>;
    datasetId?: string | Array<string>;
    sortBy?: 'createdTime';
  };

export type GetDocumentOptions = RequestConfig;
export type CreateDocumentOptions = RequestConfig & OptionsOmit<Document, 'documentId'>;
export type UpdateDocumentOptions = RequestConfig &
  Pick<Partial<Document>, 'description' | 'metadata' | 'name' | 'retentionInDays'>;
export type DeleteDocumentOptions = RequestConfig;
