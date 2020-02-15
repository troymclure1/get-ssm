// const axios = require('axios')

// const url = 'http://checkip.amazonaws.com/';
import getFromSSM from "./ssm";

//@todo put this in its own mock file
//const ssm = undefined; // process.env.NODE_ENV === "production" ? undefined : ssmLocal;
let response;
let parameter: string = process.env.SSM_NAME || "";
const ssmLocal = {
  getParameter: () => ({
    promise: () => ({
      Parameter: {
        Value: "xxx"
      }
    })
  })
};

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 *
 */

exports.lambdaHandler = async () => {
  console.log("////", process.env.SSM_NAME);
  try {
    const ssm = undefined; // process.env.NODE_ENV === "production" ? undefined : ssmLocal;
    const ret = await getFromSSM({ name: parameter, ssm });
    console.log(ret);
    // const ret = await axios(url);
    response = {
      statusCode: 200,
      body: JSON.stringify({
        message: "hello world from compiled",
        ret
        // location: ret.data.trim()
      })
    };
  } catch (err) {
    console.log(err);
    return err;
  }

  return response;
};
