export const SignUp = async (req, res) => {
  const user = req.body;

  try {
    console.log(user);
  } catch (error) {
    res.status(500).json({
      status: 500,
      success: false,
      message: err,
    });
  }
};

export const LogIn = async (req, res) => {
  const user = req.body;

  try {
    console.log(user);
  } catch (error) {
    res.status(500).json({
      status: 500,
      success: false,
      message: err,
    });
  }
};

export const LogOut = async (req, res) => {
  res.send("Logout route");
};
