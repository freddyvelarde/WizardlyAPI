import JwtHandler from "../middlewares/jwt.handler";

describe("JwtHandler", () => {
  let jwtHandler: JwtHandler;

  beforeEach(() => {
    jwtHandler = new JwtHandler();
  });

  describe("generateJWT", () => {
    it("should generate a JWT token with the user ID and return it", () => {
      const result = jwtHandler.generateJWT(123);
      expect(result.failed).toBe(false);
      expect(result.message).toBe("Token generated successfully");
      expect(result.token).toBeDefined();
    });
  });
});
