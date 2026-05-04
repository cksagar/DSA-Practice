import User from '../models/user.model.js';
import ApiResponse from '../utils/api-response.js';
import ApiError from '../utils/api-error.js';
import   { emailVerificationMailgenContent, sendEmail } from '../utils/mail.js';

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new ApiError(404, 'User not found', []);
    }
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save({validateBeforeSave: false});
    return { accessToken, refreshToken };
  } catch (error) {
    console.error('Error generating access and refresh token', error);
    throw new ApiError(500, 'Failed to generate access and refresh token', []);
  }
}


const registerController = async (req, res) => {
  try {
    const { name, email, password , role} = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json(new ApiResponse(400, { message: 'Missing required fields: name, email, password, role' }));
    }

    const existingUser = await User.findOne({
      email 
    }
    );
    if (existingUser) {
       throw new ApiError(400, 'User already exists', []);
    }
    
    const user = await User.create({ name, email, password, role });

   const { hashToken, unHashToken, tokenExpiry } = user.generateTemporaryToken();

   user.emailVerificationToken = hashToken;
   user.emailVerificationExpiry = tokenExpiry;
   await user.save({validateBeforeSave: false});

  //  await sendEmail({
  //   to: email,
  //   subject: 'Email Verification',
  //   mailgenContent: emailVerificationMailgenContent(name, `${process.env.FRONTEND_URL}/verify-email?token=${unHashToken}`),
  //  });

   const createdUser = await User.findById(user._id).select(
    '-password -salt -refreshToken -emailVerificationToken -emailVerificationExpiry -forgotPasswordToken -forgotPasswordExpiry'
   );

   if (!createdUser) {
    throw new ApiError(500, 'Failed to create user', []);
   }


    return res.status(201).json(new ApiResponse(201, { message: 'User created successfully', user: createdUser}));
  } catch (error) {
    console.error('Error registering user', error);
    if (error instanceof ApiError) {
      return res.status(error.statusCode).json(new ApiResponse(error.statusCode, { message: error.message }));
    }
    return res.status(500).json(new ApiResponse(500, { message: 'Failed to register user' }));
  }
}

export default registerController;