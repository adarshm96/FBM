import { environment } from '../../environments/environment';
export const APP_CONT = {
    baseUrl: environment.baseUrl,
    login  : environment.baseUrl + '/v1/users/login',
};
