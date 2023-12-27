export class ExportJob{
    public id : string;
    public status : number;
    public filename : string;
    public url : string;
    public createdAt : string;
    public filter : {
        search : string;
        page : number;
        limit : number;
        userId : string;
        ip: string;
        deviceId: string;
        actionNumberGt: number;
        containActions: string[];
        timestampStart: string;
        timestampEnd: string;
        orderBy: string;
        orderDirection: number;
    }
}