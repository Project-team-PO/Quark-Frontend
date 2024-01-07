import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LanguageState {
    currentLanguage: string;
    Languages: string[];
}

const getInitialLanguage = (): string => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage !== "") return 'en';
    return savedLanguage ? savedLanguage : 'en';
};

const languageSlice = createSlice({
    name: 'language',
    initialState: {
        currentLanguage: getInitialLanguage(),
        Languages: ['de', 'en', 'pl']
    } as LanguageState,
    reducers: {
        changeLanguage: (state, action: PayloadAction<string>) => {
            state.currentLanguage = action.payload;
            localStorage.setItem('language', action.payload);
        },
    },
});

export const { changeLanguage } = languageSlice.actions;

export const selectLanguage = (state: { language: LanguageState }) =>
    state.language.currentLanguage;
export default languageSlice.reducer;
