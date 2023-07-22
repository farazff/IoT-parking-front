export type ConfirmDataModalProps = {
  modalText: string;
  confirmFunc: () => void;
  setShowModal: (state: boolean) => void;
  showModal: boolean;
};
