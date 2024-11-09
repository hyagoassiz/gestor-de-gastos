export interface IUsuario {
  uid: string;
  email: string;
  emailVerified: boolean;
  displayName: string | null;
  providerData?: IProviderData;
}

interface IProviderData {
  photoURL: File;
}
