let pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

export function isEmailAddress(email: string) {
  return email.match(pattern);
}
