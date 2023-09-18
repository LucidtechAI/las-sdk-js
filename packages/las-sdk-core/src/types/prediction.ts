import { PaginationOptions, RequestConfig } from './common';

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

export type ArrayPrediction = {
  label: string;
  value: Array<Array<ArrayPrediction | Prediction>>;
};

export type Prediction = {
  confidence: number;
  label: string;
  page: number;
  value: boolean | string | number | null;
};

export type PredictionResponse = {
  createdBy: string | null;
  createdTime: string | null;
  documentId: string;
  inferenceTime: number;
  modelId: string;
  predictionId: string;
  predictions: Array<ArrayPrediction | Prediction>;
  trainingId: string | null;
};

export type ListPredictionsOptions = RequestConfig &
  PaginationOptions & {
    order?: 'ascending' | 'descending';
    sortBy?: 'createdTime';
    modelId?: string;
  };

export type PredictionList = {
  predictions: Array<PredictionResponse>;
  nextToken: string | null;
};
