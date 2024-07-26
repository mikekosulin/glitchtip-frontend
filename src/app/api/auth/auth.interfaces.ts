export type ValidAuth = "TOTP" | "FIDO2";

export interface LoginResponse {
  requires_mfa: boolean;
  valid_auth: ValidAuth[];
}

interface AllAuthUser {
  id: number;
  display: string;
  has_usable_password: boolean;
  email: string;
}

export interface AllAuthSessionResponse {
  status: number;
  data: {
    user?: AllAuthUser;
    methods?: any;
    flows?: any;
  };
  meta: {
    is_authenticated: boolean;
  };
}
