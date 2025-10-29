import pkg from 'jsonwebtoken';
const { sign } = pkg;

export function generateToken(user) {
    return sign({ id: user.id, tokenVersion: user.tokenVersion }, process.env.JWT_SECRET, {
        expiresIn: '7d',
    });
}
