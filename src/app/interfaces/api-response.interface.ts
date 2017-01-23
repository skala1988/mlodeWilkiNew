export interface ApiResponseInterface {
  data: any;
  errors: Array<string>;
  status: boolean;
}

export interface ApiResponseParsedInterface {
  response: ApiResponseInterface;
  status: number;
  type: number;
  myStatus: boolean;
  headers: Array<any>;
}
