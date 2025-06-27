import { useDispatch } from "react-redux";
import { onAuthStateChanged, User } from "firebase/auth";
import { useEffect, useState } from "react";
import { clearUser, setUser } from "../../../redux/userSlice";
import { useLocation, useNavigate } from "react-router-dom";
import * as PATHS from "../../../routes/paths";
import { IUser } from "../../../interfaces";
import { sendEmailVerificationToUser } from "../../../api/Auth/sendEmailVerificationToUser";
import { useLoading } from "../../../hooks/useLoading";
import { usePermission } from "../../../hooks/usePermission";
import { auth } from "../../../FirebaseConnection";

interface IUseLoginProps {
  permission: string;
}

interface IUseLoginReturn {
  signed: boolean;
}

export const useProtectedRoute = ({
  permission,
}: IUseLoginProps): IUseLoginReturn => {
  const [signed, setSigned] = useState<boolean>(false);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const location = useLocation();

  const { setLoading } = useLoading();

  const { checkPermission } = usePermission();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      handleNavigate(user);

      setSigned(false);

      if (user) {
        dispatch(setUser(extractUserData(user)));

        setSigned(true);
        return;
      }

      dispatch(clearUser());
      setSigned(false);
    });

    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  function extractUserData(user: User): IUser {
    return {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      emailVerified: user.emailVerified,
      photoURL: user.photoURL,
      phoneNumber: user.phoneNumber,
      providerId: user.providerId,
    };
  }

  function handleNavigate(user: IUser | null): void {
    if (!user) {
      navigate(PATHS.AUTH.LOGIN);
      return;
    }

    if (!user.emailVerified) {
      navigate(PATHS.AUTH.VERIFICATION);

      sendEmailVerification();

      return;
    }

    if (!user.displayName) {
      navigate(PATHS.AUTH.INFO);
      return;
    }

    if (!checkPermission(permission)) {
      navigate(PATHS.AUTH.LOGIN);
      return;
    }

    const { pathname } = location;

    if (pathname === PATHS.AUTH.VERIFICATION || pathname === PATHS.AUTH.INFO) {
      navigate(PATHS.DASHBOARD.LIST);
    }
  }

  async function sendEmailVerification(): Promise<void> {
    try {
      setLoading(true);
      await sendEmailVerificationToUser(auth);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return {
    signed,
  };
};
