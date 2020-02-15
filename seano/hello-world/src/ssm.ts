import { SSM } from "aws-sdk";

type TypeParams = {
  name: string;
  ssm?:
    | SSM
    | {
        getParameter: () => {
          promise: () => {
            Parameter: {
              Value: string;
            };
          };
        };
      };
};

export default async (config: TypeParams) => {
  const ssm = config.ssm || new SSM({ region: "ap-southeast-2" });
  const params = {
    Name: config.name,
    WithDecryption: false
  };
  let result;
  try {
    result = await ssm.getParameter(params).promise();
  } catch (ex) {
    result = {
      Parameter: {
        Value: `Error: ${ex}`
      }
    };
  }
  return result?.Parameter?.Value;
};
