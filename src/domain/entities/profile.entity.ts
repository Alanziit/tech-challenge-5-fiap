export interface StylePreferences {
    focusMode: boolean;
    contrast: 'normal' | 'high';
    spacing: 'normal' | 'compact' | 'spacious';
    fontSize: 'normal' | 'small' | 'large';
    teaMode: boolean;
    dyslexiaMode: boolean;
}

export interface Profile {
    id: string;
    userName?: string;
    dataCriacao?: Date;
    stylePreferences?: StylePreferences;
}