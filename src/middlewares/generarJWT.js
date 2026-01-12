import jwt from 'jsonwebtoken';

export const generarJWT = (id) => {
    try {
        const payload = { id };
        const token = jwt.sign(payload, process.env.SECRETA_JWT, {
            expiresIn: '1h'
        });
        return token;
    } catch (error) {
        console.error(error);
        return new Error('Error al generar el token');
    }
}
