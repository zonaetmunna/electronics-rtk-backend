const jsonwebtoken = require('jsonwebtoken')

// eslint-disable-next-line no-unused-vars
function issueJWT(user, expiresTime) {
  const _id = user._id

  const filteredUserData = {
    role: user.role,
    _id: _id,
    status: user.status,
    email: user.status,
  }

  const payload = {
    ...filteredUserData,
    sub: _id,
    iat: new Date().getTime() / 1000,
  }

  const signedToken = jsonwebtoken.sign(payload, process.env.JWT_SECRET_KEY, {
    algorithm: 'HS256',
  })

  return 'Bearer ' + signedToken
}

const verifyJWT = async accessToken => {
  try {
    const { sub, exp, role } = await jsonwebtoken.verify(
      accessToken,
      'thesecret',
    )
    return {
      sub: sub,
      exp: exp,
      role: role,
    }
  } catch (err) {
    return false
  }
}

module.exports.issueJWT = issueJWT
module.exports.verifyJWT = verifyJWT
