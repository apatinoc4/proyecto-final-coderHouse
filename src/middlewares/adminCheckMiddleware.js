const isAdmin = require("../variables/isAdmin");

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

module.exports = adminCheckMiddleware;
