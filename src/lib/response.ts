import type { PredictionsResponse, PredictionResponse, BatchPredictionResponse } from './dto/prediction';
import { writable } from 'svelte/store';
import { persist, createLocalStorage } from "@macfja/svelte-persistent-store"

export const singlePrediction = persist(writable<PredictionResponse>(undefined), createLocalStorage(), "singlePrediction");
export const batchPrediction = persist(writable<PredictionsResponse>(undefined), createLocalStorage(), "batchPrediction");
export const batchPredictionFile = persist(writable<BatchPredictionResponse>(undefined), createLocalStorage(), "batchPredictionFile");