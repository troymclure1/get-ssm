const { SSM } = require("aws-sdk");
import getFromSSM from "./ssm";

jest.mock("aws-sdk");

const ssm = undefined;

const ssmGetParameterPromise = jest.fn().mockReturnValue({
  promise: jest.fn().mockResolvedValue({
    Parameter: {
      Name: "NAME",
      Type: "SecureString",
      Value: "VALUE",
      Version: 1,
      LastModifiedDate: 1546551668.495,
      ARN: "arn:aws:ssm:ap-southeast-2:123:NAME"
    }
  })
});
describe("getFromSSM", () => {
  beforeEach(() => {
    SSM.mockImplementation(() => ({
      getParameter: ssmGetParameterPromise
    }));
  });

  test("it should decrypt string from ssm", async () => {
    expect.assertions(1);

    await expect(getFromSSM({ name: "NAME", ssm })).resolves.toBe("VALUE");
  });
  test("it should decrypt string from ssm when using mock SSM", async () => {
    expect.assertions(1);

    await expect(
      getFromSSM({
        name: "NAME",
        ssm: {
          getParameter: () => ({
            promise: () => ({
              Parameter: {
                Value: "x"
              }
            })
          })
        }
      })
    ).resolves.toBe("x");
  });
});
