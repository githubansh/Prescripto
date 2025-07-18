import  express  from "express";
import { addDoctor,allDoctors,loginAdmin,appointmentsAdmin,appointmentCancel,adminDashboard } from "../controllers/adminController.js";
import upload from "../middlewares/multer.js";
import authAdmin from "../middlewares/authAdmin.js";
import { changeAvailablity } from '../controllers/doctorController.js';

const adminRouter = express.Router()

adminRouter.post('/add-doctor', authAdmin,upload.single('image'),addDoctor )
// this will call addDoctor coontroller function  on request at //localhost:port/api/admin/add-doctor
// and this above is way of writing Router functions
// ie router.METHOD(PATH, MIDDLEWARE(S), HANDLERfunction)
// upload.single('image'):
/* Multer middleware — expects a single file upload under the name="image" field in the HTML form.
addDoctor:
The actual controller function that handles the rest of the request — saves doctor details, stores file info, etc.
*/
adminRouter.post('/login', loginAdmin )
adminRouter.get('/all-doctors',authAdmin,allDoctors)
adminRouter.post("/change-availability", authAdmin, changeAvailablity)
adminRouter.get("/appointments",authAdmin,appointmentsAdmin)
adminRouter.post("/cancel-appointment", authAdmin, appointmentCancel)
adminRouter.get("/dashboard", authAdmin, adminDashboard)


export default adminRouter