import dotenv from 'dotenv'
dotenv.config();
import redis from './redis.js';


// options for cookie
const accessTokenExpire = Number(process.env.ACCESS_TOKEN_EXPIRE || '300', 10);
const refreshTokenExpire = Number(process.env.REFRESH_TOKEN_EXPIRE || '1200', 10);
export const accessTokenOptions = {
  expires: new Date(Date.now() + accessTokenExpire * 60 * 1000),
  maxAge: accessTokenExpire * 60 * 1000,
  httpOnly: true,
  sameSite: 'lax'
}
export const refreshTokenOptions = {
  expires: new Date(Date.now() + refreshTokenExpire * 24 * 60 * 60 * 1000),
  maxAge: refreshTokenExpire * 24 * 60 * 60 * 1000,
  httpOnly: true,
  sameSite: 'lax'
}




export const sendToken = (user, statusCode, res) => {
  const accessToken = user.signAccessToken();
  const refreshToken = user.signRefreshToken();

  // set refresh token in redis
  redis.set(user._id, JSON.stringify(user));





  //Only set secure to true in production
  if (process.env.NODE_ENV === 'production') {
    accessTokenOptions.secure = true;
  }


  res.cookie("access_token", accessToken, accessTokenOptions);
  res.cookie("refresh_token", refreshToken, refreshTokenOptions);

  res.status(statusCode).json({
    success: true,
    user,
    accessToken
  })

}