export interface LoginResponseModel {
  accessToken: string;
  refreshToken: string;
  roles: [string];
}
