import path from 'path';
import s3 from '../../aws.config'


export const checkBucket = async ( bucket: string) => {
  try {
    const res = await s3.headBucket({ Bucket: bucket }).promise();

    console.log("Bucket already Exist", res.$response.data);

    return { success: true, message: "Bucket already Exist", data: {} };
  } catch (error) {
    console.log("Error bucket don't exsit", error);

    return { success: false, message: "Error bucket don't exsit", data: error };
  }
};


export const uploadToS3 = async (fileData?: Express.Multer.File) => {
  console.log('file data',fileData)
  try {

      const params = {
        Bucket: process.env.BUCKET_NAME as string,
        Key: Date.now() + path.extname(fileData!.originalname),
        Body: fileData?.buffer
      };

      try {
        const res = await s3.upload(params).promise();

        console.log("File Uploaded with Successfull", res.Location);

        return {success: true, message: "File Uploaded with Successfull", data: res.Key};
      } catch (error) {
        console.log(error)
        return {success: false, message: "Unable to Upload the file", error: error};
      }

  } catch (error) {
    console.log(error)
  return {success:false, message: "Unalbe to access this file", data: {}};
  }
  }