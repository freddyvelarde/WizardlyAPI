import bcrypt from "bcryptjs";


export interface EncryptResponse {
  hashedPassword: string;
  failed: boolean;
  message?: string;
}

export interface VerifyResponse {
  validPassword: boolean;
  message?: string;
}

export class PasswordHandler {
  public async encryptPassword(userPassword: string): Promise<EncryptResponse> {
    try {
      const psswd = await bcrypt.hash(userPassword, 10);
      return { failed: false, hashedPassword: psswd };
    } catch (error) {
      console.log(error);
      return {
        hashedPassword: "",
        failed: true,
        message: "An error occurred while password were hashed",
      };
    }
  }

  public async mathPassword(
    newPassword: string,
    userPassword: string
  ): Promise<VerifyResponse> {
    const password = await bcrypt.compare(newPassword, userPassword);
    if (!password) {
      return {
        validPassword: false,
        message: "You password is not valid, please try again.",
      };
    }

    return { validPassword: true, message: "Password valid" };
  }
}
export default PasswordHandler;
