import { User } from "firebase/auth";
import userActionTypes from "./action-types";

const initialState: User = {
  uid: "",
  displayName: "",
  email: "",
  emailVerified: false,
  isAnonymous: false,
  metadata: { creationTime: undefined, lastSignInTime: undefined },
  photoURL: "",
  phoneNumber: null,
  providerData: [],
  providerId: "",
  refreshToken: "",
  tenantId: null,
  delete: async () => Promise.resolve(),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getIdToken: async (_forceRefresh?: boolean) => Promise.resolve(""),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getIdTokenResult: async (_forceRefresh?: boolean) =>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Promise.resolve({} as any),
  reload: async () => Promise.resolve(),
  toJSON: () => ({}),
};

interface UserAction {
  type: string;
  payload?: User;
}

const userReducer = (state = initialState, action: UserAction): User => {
  switch (action.type) {
    case userActionTypes.REMOVE:
      return {
        ...initialState,
      };
    case userActionTypes.ADD:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
