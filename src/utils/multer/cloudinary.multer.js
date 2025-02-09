import path from "node:path";

import * as dotenv from "dotenv";
dotenv.config({ path: path.resolve("./src/config/.env") });
import cloudinary from "cloudinary"

cloudinary.v2.config({
    cloud_name:"dakpezmhz",
    api_key:"272798734248383",
    api_secret:"BoEO1pvnZXTmxin7krq1gsO27wY",
    secure: true
})

export const cloud = cloudinary.v2