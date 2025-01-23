export type TerrorSourse = {
  path: number | string;
  message: string;
};

export type TGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorSources: TerrorSourse[];
};
