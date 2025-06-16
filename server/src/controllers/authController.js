const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Generate JWT token
const generateToken = (userId) => {
  const expiresIn = process.env.JWT_EXPIRES_IN;
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn });
};

// Set cookie with token
const setTokenCookie = (res, token) => {
  
res.cookie('token', token, {
  httpOnly: true,
  secure: true,
  sameSite: 'None',
  path: '/',
  maxAge: 30 * 60 * 1000,
  domain: process.env.NODE_ENV === 'production'
        ? ''
        : '.localhost',
});

};

const signup = async (req, res) => {
  try {
   
    const errors = validationResult(req);
    // console.log(errors.array().map(v=> v.msg))
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: errors.array().map(v=> v.msg),
       
      });
    }

    const {name, email, password } = req.body;

    const existingUser = await prisma.user.findUnique({
      where: { email }
    });
    

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'email already exists'
      });
    }
    


    // Hash password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const result = await prisma.$transaction(async (prisma) => {
    const user = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword
        }
      });

      return { user };
    });

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      user: {
        id: result.user.id,
        email: result.user.email,
        name: result.user.name
       
      }
    });

  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

const signin = async (req, res) => {
  try {
   
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { email, password} = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
    
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'User not found'
      });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Incorrect password'
      });
    }

    // Generate token
    const token = generateToken(user.id);
    setTokenCookie(res, token );

    res.json({
      success: true,
      message: 'Login successful',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        token
      }
    });

  } catch (error) {
    console.error('Signin error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie('token', {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
      domain: process.env.NODE_ENV === 'production'
        ? ''
        : '.localhost',
      path: '/'
    });

    res.json({
      success: true,
      message: 'Logged out successfully'
    });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

const verifyToken = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.userId }
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
      }
    });
  } catch (error) {
    console.error('Token verification error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

module.exports = {
  signup,
  signin,
  logout,
  verifyToken
};