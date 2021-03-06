const User = require('../../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 6;

module.exports = {
  signup,
  login
};

async function signup(req, res) {
  try {
    // NOTE: here we are storing a plaintext password. VERY VERY DANGEROUS. We will replace this in a second:
    const hashedPass = await bcrypt.hash(req.body.password, SALT_ROUNDS)
    // console.log(hashedPass)
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: hashedPass
    });

    // creating a jwt:
    // the first parameter specifies what we want to put into the token (in this case, our user document)
    // the second parameter is a "secret" code. This lets our server verify if an incoming jwt is legit or not.
    const token = jwt.sign({ user }, process.env.SECRET, { expiresIn: "24h" });
    console.log(token)
    res.status(200).json(token); // send it to the frontend
  } catch (err) {
    res.status(400).json(err);
  }
}

async function login(req, res) {
  try {
    const user = await User.findOne({ email: req.body.email });
    // check password. if it's bad throw an error.
    console.log(user.password)
    let checkpass = await bcrypt.compare(req.body.password,user.password)
    console.log("checkpass",checkpass)
    if (!(await bcrypt.compare(req.body.password,user.password))) throw new Error();

    // if we got to this line, password is ok. give user a new token.
    console.log("reached token creation")
    const token = jwt.sign({ user }, process.env.SECRET, { expiresIn: "24h" });
    console.log(token)
    res.status(200).json(token);
  } catch {
    res.status(400).json("Bad Credentials");
  }
}


