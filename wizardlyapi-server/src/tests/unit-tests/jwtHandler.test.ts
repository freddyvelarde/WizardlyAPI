import JwtHandler from "../../middlewares/jwt.handler";

describe("Json Web Token - unit tests", () => {
  let jwtHandler: JwtHandler = new JwtHandler();

  describe("JWT generator", () => {
    it("should generate a JWT token with the user ID and return it", () => {
      const result = jwtHandler.generateJWT(123);
      expect(result.failed).toBe(false);
      expect(result.message).toBe("Token generated successfully");
      expect(result.token).toBeDefined();
    });
  });
});
