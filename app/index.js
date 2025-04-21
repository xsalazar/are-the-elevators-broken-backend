const { GetObjectCommand, S3Client } = require("@aws-sdk/client-s3");

exports.handler = async (event, context) => {
  console.log(JSON.stringify(event));
  const s3 = new S3Client();

  // Handle GET request for current data
  if (event.requestContext.http.method === "GET") {
    const data = await (
      await s3.send(
        new GetObjectCommand({
          Bucket: process.env.ELEVATORS_DATA_S3_BUCKET,
          Key: "data.json",
        })
      )
    ).Body.transformToString();

    return {
      cookies: [],
      isBase64Encoded: false,
      statusCode: 200,
      headers: { "content-type": "application/json" },
      body: data,
    };
  }
};
