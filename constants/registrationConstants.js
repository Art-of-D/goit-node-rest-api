export const REGISTRATION_SUBJECT = 'Registration Contact service';
export const BASE_URL = 'http://localhost:3000';
export const REGISTRATION_LINK = data =>
  `
<h1>Verify your email</h1>
<p>Click the link below to verify your email</p>
<a target="_blank" href="${BASE_URL}/api/users/verify/${data}">Verify</a>
`;
