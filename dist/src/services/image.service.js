"use strict";
// const fs = require('fs');
// const path = require('path');
// import { Router, Request , Response , NextFunction } from "express";
// import { Multer } from "multer";
// module.exports.uploadImage = async (req:, res, next) => {
//   const imageUrl = `${req.file.filename}`;
//   res.json({ imagePath:`${imageUrl}` });
// };
// export const createUser = async (input: any) => {
//     const email = input.;
//     const username = input.username;
//     const password = input.password;
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user = await prisma.user.create({
//       data: {
//         username:username,
//         email:email,
//         password: hashedPassword,
//       },
//       select: {
//         id: true,
//       },
//     });
//     return user;
//   };
// module.exports.deleteImage = async (req, res, next) => {
//   const filename = req.params.filename;
//   const filePath = path.join(__dirname, '../public/images/', filename);
//   try {
//     // Check if the file exists before attempting to delete
//     fs.unlinkSync(filePath);
//     res.json({ message: 'Image deleted successfully.' });
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).json({ error: 'Failed to delete image.' });
//   }
// };
