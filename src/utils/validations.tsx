export const MIN_LENGTH = (length: String) => {
    return `Minimum ${length} symbols`;
};

export const MAX_LENGTH = (length: String) => {
    return `Maximum ${length} symbols`;
};

export const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
export const PASSWORD_REGEX = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
export const TELEGRAM_HANDLE_REGEX = /^@[A-Za-z0-9_]{5,32}(\s+)?$/;