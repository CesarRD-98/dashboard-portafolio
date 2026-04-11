export const isEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/.test(email)
}