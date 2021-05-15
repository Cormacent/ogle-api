const AppError = require('../utils/appError');

// IMPORT ROUTER
const productRoutes = require('./product')
// END IMPORT ROUTER

module.exports = function (app, express) {
    /*Definisikan semua route dihalaman ini*/
    const routes = express.Router();

    // Use Import other Router
    routes.use(
        '/product',
        productRoutes
    );
    // End Import other Router

    // Set Global baseUrl
    app.use('/', routes);

    /*ERROR HANDLING*/
    app.all('*', (req, res, next) => {
        throw new AppError(404, `Request URL ${req.path} not Found!`);
    });

    app.use((err, req, res, next) => {
        const statusCode = err.statusCode || 500;
        res.status(statusCode).json({
            error: statusCode,
            message: err.message,
            // stack: err.stack
        });
    });
    /*END ERROR HANDLING*/
};
