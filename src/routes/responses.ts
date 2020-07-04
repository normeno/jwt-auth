export interface IResponse {
  status: number;
  message: string;
  data?: any;
  stacktrace?: any;
}

export function responses(internalNumber: number, attrs?: any) {
  let resp: IResponse;

  switch (internalNumber) {
    case 20001: {
      resp = {
        status: 200,
        message: 'Successful authentication',
      };

      if (attrs) {
        resp.data = attrs;
      }

      break;
    }
    case 40001: {
      resp = {
        status: 400,
        message: 'Required parameters are not provided',
      };
      break;
    }
    case 40002: {
      resp = {
        status: 404,
        message: 'User does not exists',
      };
      break;
    }
    case 40003: {
      resp = {
        status: 404,
        message: 'Invalid Token',
      };
      break;
    }
    default: {
      resp = {
        status: 500,
        message: 'Internal response error',
      };
      break;
    }
  }

  return resp;
}
