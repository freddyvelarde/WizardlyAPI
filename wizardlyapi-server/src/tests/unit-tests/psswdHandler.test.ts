import PasswordHandler, {
  EncryptResponse,
  VerifyResponse,
} from "../../helpers/passwordHandler";

describe("PasswordHandler", () => {
  let passwordHandler: PasswordHandler;
  const userPassword = "mypassword";
  let hashedPassword: string;

  beforeEach(() => {
    passwordHandler = new PasswordHandler();
  });

  describe("encryptPassword", () => {
    it("should encrypt the user password and return a hashed password", async () => {
      const expectedResult: EncryptResponse = {
        failed: false,
        hashedPassword: expect.any(String),
      };
      const result = await passwordHandler.encryptPassword(userPassword);
      expect(result).toEqual(expectedResult);
      hashedPassword = result.hashedPassword;
    });
  });

  describe("mathPassword", () => {
    it("should return a message indicating that the password is valid if it matches the user password", async () => {
      const newPassword = "mypassword";

      const expectedResult: VerifyResponse = {
        validPassword: true,
        message: "Password valid",
      };
      const result = await passwordHandler.mathPassword(
        newPassword,
        hashedPassword
      );
      expect(result).toEqual(expectedResult);
    });

    it("should return a message indicating that the password is not valid if it does not match the user password", async () => {
      const newPassword = "otherpassword";
      const expectedResult: VerifyResponse = {
        validPassword: false,
        message: "You password is not valid, please try again.",
      };
      const result = await passwordHandler.mathPassword(
        newPassword,
        userPassword
      );
      expect(result).toEqual(expectedResult);
    });
  });
});
