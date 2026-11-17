import {
  JSONObject,
  OrderParam,
  PaginationOptions,
  PostprocessConfig,
  PreprocessConfig,
  RequestConfig,
} from './common';

export const PredictionStatusValues = ['pending', 'suceeded', 'failed'] as const;
export type PredictionStatus = (typeof PredictionStatusValues)[number];

export type Prediction = {
  /* Id */
  predictionId: string;
  /* Attributes */
  createdBy: string;
  createdTime: Date;
  documentId: string;
  error?: string | null;
  fileUrl: string;
  inferenceTime?: number | null;
  modelId: string;
  postprocessConfig?: PostprocessConfig | null;
  preprocessConfig?: PreprocessConfig | null;
  status: PredictionStatus;
};

export type PredictionList = {
  predictions: Prediction[];
  nextToken?: string | null;
};

export type ListPredictionsOptions = RequestConfig &
  PaginationOptions &
  OrderParam & {
    sortBy?: 'createdTime';
    modelId?: string;
  };
export type GetPredictionOptions = RequestConfig;
export type CreatePredictionOptions = RequestConfig &
  Pick<Prediction, 'documentId' | 'modelId' | 'postprocessConfig' | 'preprocessConfig'> & {
    agentRunId?: string | null;
    /* Respond right away, with the prediction pending, rather than when it's done */
    async?: boolean;
    description?: string | null;
    metadata?: JSONObject;
    name?: string | null;
  };
export type DeletePredictionOptions = RequestConfig;
