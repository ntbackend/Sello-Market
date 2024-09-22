export const JwtConfig = () => ({
    jwt: {
        secret: process.env.JWT_SECRET_KEY,
        expiration: process.env.JWT_EXPIRATION,
    },
})