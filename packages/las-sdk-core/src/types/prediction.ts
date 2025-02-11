import { OrderParam, PaginationOptions, PostprocessConfig, PreprocessConfig, RequestConfig } from './common';

export type Prediction = {
  /* Id */
  predictionId: string;
  /* Attributes */
  createdBy: string;
  createdTime: Date;
  documentId: string;
  fileUrl: string;
  inferenceTime?: number | null;
  modelId: string;
  postprocessConfig?: PostprocessConfig | null;
  preprocessConfig?: PreprocessConfig | null;
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
  Pick<Prediction, 'documentId' | 'modelId' | 'postprocessConfig' | 'preprocessConfig'>;
export type DeletePredictionOptions = RequestConfig;
