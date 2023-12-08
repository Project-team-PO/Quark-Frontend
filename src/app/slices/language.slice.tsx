import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LanguageState {
    currentLanguage: string;
}

const languageSlice = createSlice({
    name: 'language',
    initialState: {
        currentLanguage: 'de', 
    } as LanguageState,
    reducers: {
        setLanguage: (state, action: PayloadAction<string>) => {
            state.currentLanguage = action.payload;
        },
    },
});

export const { setLanguage } = languageSlice.actions;
export const selectLanguage = (state: { language: LanguageState }) =>
    state.language.currentLanguage;
export default languageSlice.reducer;
