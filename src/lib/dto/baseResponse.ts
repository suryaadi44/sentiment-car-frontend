export class BaseResponse<Data> {
	public message: string;
    public status: number;
	public data: Data;
}
