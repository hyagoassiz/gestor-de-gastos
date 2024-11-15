export interface IPage {
  TITLE?: string;
  SUBTITLE?: string;
  DATA_TABLE?: {
    TEXT_FOR_EMPTY_DATA?: string;
  };
  MODALS: {
    MODAL_CREATE: {
      ADD: string;
      EDIT: string;
    };
    MODAL_DEACTIVATE: {
      DESCRIPTION: string;
    };
  };
}
