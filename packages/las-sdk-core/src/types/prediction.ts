import { Annotations, PaginationOptions, RequestConfig } from './common';

export type Prediction = {
  /* Id */
  predictionId: string;
  /* Attributes */
  createdBy: string;
  createdTime: Date;
  documentId: string;
  inferenceTime: number;
  modelId: string;
  trainingId?: string | null;
  fieldValues?: Annotations | null;
};

export type BestFirst = {
  strategy: 'BEST_FIRST';
};

export type BestNPages = {
  strategy: 'BEST_N_PAGES';
  parameters: {
    n: 1 | 2 | 3;
    collapse?: boolean;
  };
};

export type PostprocessConfig = BestFirst | BestNPages;

export type ListPredictionsOptions = RequestConfig &
  PaginationOptions & {
    order?: 'ascending' | 'descending';
    sortBy?: 'createdTime';
    modelId?: string;
  };

export type PredictionList = {
  predictions: Prediction[];
  nextToken: string | null;
};

export type CreatePredictionsOptions = RequestConfig & {
  maxPages?: number;
  autoRotate?: boolean;
  imageQuality?: 'LOW' | 'HIGH';
  postprocessConfig?: PostprocessConfig;
  trainingId?: string;
};

export type PostPredictions = CreatePredictionsOptions & {
  documentId: string;
  modelId: string;
};
