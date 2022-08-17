import dotenv from "dotenv";
dotenv.config();

const isAdmin = Boolean(process.env.IS_ADMIN);

const adminCheckMiddleware = (route, method) => {
  return (req, res, next) => {
    const error = {
      error: -1,
      descripcion: `ruta: ${route} y método: ${method} no autorizados`,
    };

    if (!isAdmin) {
      return res.status(401).send(error);
    }

    next();
  };
};

export default adminCheckMiddleware;
