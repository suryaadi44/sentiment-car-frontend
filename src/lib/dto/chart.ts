export class DailyChartResponse {
    public date: string;
    public count : number;
}

export class ChartResponse {
    public total : number;
    public positive : number;
    public negative : number;
    public dailyPositive : DailyChartResponse[];
    public dailyNegative : DailyChartResponse[];
}