interface UsePermissionReturn {
  checkPermission(permission: string): boolean;
}

export const usePermission = (): UsePermissionReturn => {
  function checkPermission(permission: string): boolean {
    if (permission === "") {
      return true;
    }

    return false;
  }

  return { checkPermission };
};
