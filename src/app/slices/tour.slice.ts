import { createSlice } from '@reduxjs/toolkit';

interface TourSliceState {
    openModalUserMenu: boolean;
    openModalAnnouncements: boolean;
}

const initialState: TourSliceState  = {
    openModalUserMenu: false,
    openModalAnnouncements: false
};

const tourSlice = createSlice({
    name: 'tour',
    initialState,
    reducers: {
        setOpenModalUserMenu: (state) => {
            state.openModalUserMenu = !state.openModalUserMenu;
        },
        setOpenModalAnnouncements: (state) => {
            state.openModalAnnouncements = !state.openModalAnnouncements;
        }
    },
});

export type { TourSliceState };

export const { setOpenModalUserMenu, setOpenModalAnnouncements } = tourSlice.actions;

export default tourSlice.reducer;
