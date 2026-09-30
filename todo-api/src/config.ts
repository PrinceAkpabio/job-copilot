if(!process.env.JWT_SECRET) {
    throw new Error('JWT SECRET is not set');
}

export const JWT_SECRET: string = process.env.JWT_SECRET;