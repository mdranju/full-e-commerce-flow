import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
}

interface UiState {
  isCartOpen: boolean;
  isMobileMenuOpen: boolean;
  modals: { [key: string]: boolean };
  toasts: Toast[];
}

const initialState: UiState = {
  isCartOpen: false,
  isMobileMenuOpen: false,
  modals: {},
  toasts: [],
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleCart(state) {
      state.isCartOpen = !state.isCartOpen;
    },
    setCartOpen(state, action: PayloadAction<boolean>) {
      state.isCartOpen = action.payload;
    },
    toggleMobileMenu(state) {
      state.isMobileMenuOpen = !state.isMobileMenuOpen;
    },
    openModal(state, action: PayloadAction<string>) {
      state.modals[action.payload] = true;
    },
    closeModal(state, action: PayloadAction<string>) {
      state.modals[action.payload] = false;
    },
    addToast(state, action: PayloadAction<Omit<Toast, 'id'>>) {
      const id = Date.now().toString() + Math.random().toString();
      state.toasts.push({ ...action.payload, id });
    },
    removeToast(state, action: PayloadAction<string>) {
      state.toasts = state.toasts.filter(t => t.id !== action.payload);
    }
  },
});

export const { 
  toggleCart, setCartOpen, toggleMobileMenu, openModal, closeModal, addToast, removeToast 
} = uiSlice.actions;
export default uiSlice.reducer;
