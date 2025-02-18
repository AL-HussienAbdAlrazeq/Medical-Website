// import multer from "multer";
// import { CloudinaryStorage } from "multer-storage-cloudinary";
// import { cloud } from "./cloudinary.multer.js"; // ✅ Ensure Cloudinary is correctly configured


// // export const fileTypes = {
// //     image: ['image/jpeg', 'image/png', 'image/gif', "image/dcm", "image/dicom"],
// //     document: ['application/pdf', 'application/msword', "application/octet-stream", "application/dicom",]
// // };
// export const fileTypes = {
//     allowedAttachments: [
//         "image/jpeg",
//         "image/png",
//         "image/gif",
//         "image/dcm",
//         "image/dicom",
//         "application/dicom",
//         "application/pdf",
//         "application/msword",
//         "application/octet-stream"
//     ]
// };

// export const uploadCloudFile = (fileValidation = []) => {

//     const storage = new CloudinaryStorage({
//         cloudinary: cloud,

//         params: async (req, file) => {
//             let format = "jpg"||'jpeg'||'png'; // Default format

//             // ✅ Correctly detect DICOM format
//             if (file.mimetype.includes("dicom") || file.mimetype.includes("dcm") || file.mimetype === "application/dicom") {
//                 format = "dcm";

//             } else if (file.mimetype.includes("pdf")) {
//                 format = "pdf";
//             } else if (file.mimetype.includes("msword")) {
//                 format = "doc";
//             }

//             return {
//                 folder: "NFC/Radiology_Image",
//                 format: format,
//                 resource_type: "auto" // ✅ Allows all file types (DICOM, PDF, Images)
//             };
//         }
//     });
//     // const storage = multer.diskStorage({});
//     function fileFilter(req, file, cb) {
//         if (fileValidation.includes(file.mimetype)) {
//             cb(null, true);
//         } else {
//             cb(new Error("Invalid Format"), false);
//         }
//     }

//     return multer({ storage, fileFilter });
// };



import multer from "multer";

export const fileTypes = {
    image: ['image/jpeg', 'image/png', 'image/gif'],
    document: ['application/pdf', 'application/msword']
};

export const uploadCloudFile = (fileValidation = []) => {

    const storage = multer.diskStorage({});

    function fileFilter(req, file, cb) {
        if (fileValidation.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error("Invalid Format"), false);
        }
    }

    return multer({ storage, fileFilter });
};
