import * as bcrypt from 'bcrypt';

export const isPasswordMatched = async (userPassword: string, currentPassword: string) => {
    return await bcrypt.compare(currentPassword, userPassword);
};