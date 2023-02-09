import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Web3Service from "src/app/services/web3/Web3Service";
import { Modal } from "src/app/types/types";

interface ModalState {
  [key: string]: Modal
}

interface GlobalState {
  web3Service: Web3Service | null,
  modals: ModalState,
}

const initialState: GlobalState = {
  web3Service: null,
  modals: {}
};

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setWeb3Service(state, action: PayloadAction<Web3Service>) {
      state.web3Service = action.payload;
    },
    registerModal(state, action: PayloadAction<Modal>) {
      let modal = action.payload;
      modal.active = true;
      state.modals[modal.key] = modal;
    },
    openModal(state, action: PayloadAction<string>) {
      state.modals[action.payload].active = true;
    },
    closeModal(state, action: PayloadAction<string>) {
      state.modals[action.payload].active = false;
    },
    closeAllModals(state) {
      Object.values(state.modals).map((modal: Modal) => modal.active = false);
    }
  }
});

export const {
  setWeb3Service,
  registerModal,
  openModal,
  closeModal,
  closeAllModals,
} = globalSlice.actions;

export const globalReducer = globalSlice.reducer;