export class PredictionRequest{
    public time : string;
    public text : string;
}

export class PredictionResponse{
    public prediction : number;
    public predictionStr: string;
    public text : string;
    public time : string;
    public score : number[];
    public batchId : string;
}

export class PredictionsResponse{
    public predictions : PredictionResponse[];
    public meta : {
        total : number;
        positive : number;
        negative : number;
    }
}

export class BatchPredictionResponse{
    public filename : string;
    public timestamp : string;
    public predictions : PredictionResponse[];
    public meta : {
        total : number;
        positive : number;
        negative : number;
    }
}