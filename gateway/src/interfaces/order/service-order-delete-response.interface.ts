export interface IServiceOrderDeleteResponse {
  status: number;
  message: string;
  errors: {[key: string]: any};
}
