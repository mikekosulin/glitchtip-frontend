interface AllAuthUser {
  id: number;
  display: string;
  has_usable_password: boolean;
  email: string;
}

interface AuthenticationMethod {
  method: "password" | "socialaccount";
  at: number;
  email?: string;
  provider?: string;
  uid?: string;
}

interface AllAuthResponse {
  status: number;
}

interface Flow {
  id: string;
  providers?: string[];
  is_pending?: true;
}

interface Provider {
  id: string;
  name: string;
  client_id?: string;
  flows: string[];
}

interface ProviderAccount {
  uid: string;
  display: string;
  provider: Provider;
}

interface AuthenticationMeta {
  is_authenticated: boolean;
}

interface Authenticated {
  user: AllAuthUser;
  methods: AuthenticationMethod[];
}

export interface AllAuthSessionResponse extends AllAuthResponse {
  data: Authenticated | { flows: Flow[] };
  meta: AuthenticationMeta;
}

export interface AllAuthLoginResponse extends AllAuthResponse {
  user?: AllAuthUser;
  methods?: any;
  meta: AuthenticationMeta;
}

export interface AllAuthProvidersResponse extends AllAuthLoginResponse {
  data: ProviderAccount[];
}

export interface AllAuthGetEmailVerificationResponse extends AllAuthResponse {
  data: any;
  meta: any;
}
