import { HttpUtils } from "@/utils/HttpUtils";
import { Base64 } from "@/NScore/Base64";
import { Token } from "@/model/payload";
import { when } from "jest-when";

const token =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZGVudGl0eSI6eyJ1IjoiZnJlcXRyYWRlciJ9LCJleHAiOjE2MzgzNzA1MDUsImlhdCI6MTYzODM2OTYwNSwidHlwZSI6ImFjY2VzcyJ9.H285Uf9P-IABLyKobIUw2F0i5Q6-ZFUWhWbuiZyjqQA";
const tokenObject: Token = {
  identity: {
    u: "freqtrader",
  },
  exp: 1638370667,
  iat: 1638369767,
  type: "access",
};

describe("HttpUtils", () => {
  it("should return a valid token", () => {
    //given
    const fn = jest.fn();
    when(fn)
      .calledWith(token.split(".")[1])
      .mockReturnValue(JSON.stringify(tokenObject));
    Base64.decode = fn;

    //when
    const tokenResult = HttpUtils.parseJwt(token);

    //then
    expect(JSON.stringify(tokenResult)).toBe(JSON.stringify(tokenObject));
  });

  it("should detect that the token expired", () => {
    //given
    const fn = jest.fn();
    when(fn).calledWith(token).mockReturnValue(tokenObject);
    HttpUtils.parseJwt = fn;

    //when
    const result = HttpUtils.checkExpiredToken(token);

    //then
    expect(result).toBe(true);
  });
});
