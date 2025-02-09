
import citizenRouter from "./modules/citizen/citizen.routes.js";
import medicalRecordRouter from "./modules/medical-record/medicalRecord.routes.js";
import radiologyRouter from "./modules/radiology/radiology.routes.js";
import cors from 'cors'
import { globalErrorHandling } from "./utils/errors/error.response.js";
import { DBConnection } from "./Database/DBConnection.js";

export const bootstrap = (app, express) => {
  app.use(cors())
  app.use('/uploads', express.static('./src/uploads'))
  app.use(express.json());
  DBConnection()

  app.use("/citizens", citizenRouter)
  app.use("/medical-record", medicalRecordRouter)
  app.use('/radiology', radiologyRouter)


  app.get("/", (req, res) => res.send("Hello World!"));
  app.all("*", (req, res, next) => {
    return res.status(404).json({ message: "Invalid Routing" });
  });
  app.use(globalErrorHandling)
};

export default bootstrap;   
