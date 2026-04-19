import jwt from 'jsonwebtoken';

export const generarJWT = (id) => {
    try {
        const payload = { usuario: id };
        const token = jwt.sign(payload, process.env.SECRETA_JWT, {expiresIn: '1h'});
        return token;
    } catch (error) {
        console.error("Error al generar JWT", error);
        throw new Error("Error al generar token");
    }
};