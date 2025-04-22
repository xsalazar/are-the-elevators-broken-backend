const {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} = require("@aws-sdk/client-s3");

exports.handler = async (event, context) => {
  console.log(JSON.stringify(event));
  const s3 = new S3Client();
  const dataKey = "data.json";

  // Handle GET request for current data
  if (event.requestContext.http.method === "GET") {
    const data = await (
      await s3.send(
        new GetObjectCommand({
          Bucket: process.env.ELEVATORS_DATA_S3_BUCKET,
          Key: dataKey,
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

  if (event.body && event.requestContext.http.method === "PUT") {
    const body = JSON.parse(event.body);
    const errorResponse = {
      cookies: [],
      isBase64Encoded: false,
      statusCode: 500,
      headers: {},
      body: "",
    };

    if (
      !Object.keys(body).includes("elevator") &&
      !Object.keys(body).includes("isBroken")
    ) {
      return errorResponse;
    }

    const elevator = body.elevator;
    if (elevator !== "north" && elevator !== "south") {
      return errorResponse;
    }

    const isBroken = body.isBroken;
    if (typeof isBroken !== "boolean") {
      return errorResponse;
    }

    const data = JSON.parse(
      await (
        await s3.send(
          new GetObjectCommand({
            Bucket: process.env.ELEVATORS_DATA_S3_BUCKET,
            Key: dataKey,
          })
        )
      ).Body.transformToString()
    );

    if (elevator === "north") {
      data.north.isBroken = isBroken;
      data.north.timestampUpdated = Math.floor(Date.now() / 1000);
    } else if (elevator === "south") {
      data.south.isBroken = isBroken;
      data.south.timestampUpdated = Math.floor(Date.now() / 1000);
    }

    await s3.send(
      new PutObjectCommand({
        Bucket: process.env.ELEVATORS_DATA_S3_BUCKET,
        Key: dataKey,
        Body: JSON.stringify(data),
        ContentType: "application/json",
      })
    );
  }
};
