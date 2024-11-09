import LoadingActionTypes from "./action-types";

export const setLoading = (loading: boolean) => ({
  type: loading ? LoadingActionTypes.SHOW : LoadingActionTypes.HIDE,
});
