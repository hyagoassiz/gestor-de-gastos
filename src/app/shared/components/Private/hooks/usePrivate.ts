import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { IRootState } from "../../../interfaces";
import { setLoading } from "../../../redux/loading/actions";
import {
  adicionarUserData,
  removerUserData,
} from "../../../redux/user/actions";
import * as PATHS from "../../../../routes/paths";
import { onAuthStateChanged, sendEmailVerification } from "firebase/auth";
import { auth } from "../../../../../FirebaseConnection";

interface IUsePrivate {
  signed: boolean;
}

const usePrivate = (): IUsePrivate => {
  const [signed, setSigned] = useState<boolean>(false);

  const userReducer = useSelector((state: IRootState) => state.user);
  const loadingReducer = useSelector((state: IRootState) => state.loading);

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      dispatch(setLoading(true));
      if (user) {
        dispatch(adicionarUserData(user));

        if (!user.emailVerified) {
          navigate(PATHS.AUTENTICACAO.CHECK);
        } else {
          if (!user.displayName) {
            navigate(PATHS.AUTENTICACAO.CREATE_NAME);
          }
          if (
            (location.pathname === PATHS.AUTENTICACAO.CHECK ||
              location.pathname === PATHS.AUTENTICACAO.CREATE_NAME) &&
            user.displayName
          ) {
            navigate(PATHS.DASHBOARD.LIST);
          }
        }

        setSigned(true);
      } else {
        dispatch(removerUserData());
        setSigned(false);
        navigate(PATHS.AUTENTICACAO.LOGIN);
      }
      dispatch(setLoading(false));
    });

    return () => unsub();
  }, [navigate, location.pathname, dispatch]);

  useEffect(() => {
    if (!loadingReducer.open && signed) {
      if (!userReducer.emailVerified) {
        sendEmailVerification(auth.currentUser!)
          .then(() => {
            console.log("E-mail de verificação enviado");
          })
          .catch((error) => {
            console.error("Erro ao enviar e-mail de verificação:", error);
          });
      }
    }
  }, [loadingReducer, signed, userReducer]);

  return { signed };
};

export default usePrivate;
