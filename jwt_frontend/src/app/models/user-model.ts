export interface User {
  _id: string,
  name: string,
  password: string,
  email: string,
  roles: [string],
  registerDate: string,
  accepted: boolean,
  acceptDeadline: string,
}
