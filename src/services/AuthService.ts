import {myFetch, ErrorHandler, HttpMethod} from './baseService';

export type GeneralResponse = {
  success: boolean;
  message: string;
};

type GeneralResponseHandler = (response: GeneralResponse) => void;

interface RequestLogin {
  name: string;
  email: string;
}
interface RequestQuestion {
  username: string;
  type: string;
  chronometer: string;
  question: string;
  response: string;
}
export const loginService = async (
  form: RequestLogin,
  resultHandler: GeneralResponseHandler,
  errorHandler: ErrorHandler,
) =>
  myFetch<GeneralResponse>(
    'teachers/store',
    JSON.stringify(form),
    resultHandler,
    errorHandler,
    HttpMethod.POST,
  );
export const uploadQuestion = async (
  form: RequestQuestion,
  resultHandler: GeneralResponseHandler,
  errorHandler: ErrorHandler,
) =>
  myFetch<GeneralResponse>(
    'teachers/question',
    JSON.stringify(form),
    resultHandler,
    errorHandler,
    HttpMethod.POST,
  );
