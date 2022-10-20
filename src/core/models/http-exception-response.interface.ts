export interface HttpExceptionResponse {
    statusCode: number;
    //maybe create enum for errors to handle on backand and frontend
    error: string;
}

export interface CustomHttpExceptionResponse extends HttpExceptionResponse {
    path: string;
    method: string;
    timeStamp: Date;
}