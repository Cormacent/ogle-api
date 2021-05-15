const AppError = require("../utils/appError");
const message = require('../helpers/message');
const Product = require('../models').Product
const sequelize = require('../models').sequelize;

const getAll = (req, res, next) => {
    try {
        Product.findAll().then(data => {
            res.json({
                data: data,
                message: `Get All Product ${message.SUCCESSFULLY}`
            });
        })
    } catch (error) {
        next(error)
    }
};

const create = async (req, res, next) => {
    const transaction = await sequelize.transaction();

    try {
        const {category_uuid, image_uuid, name, description, stock, status, price, tags} = req.body
        const newProduct = await Product.create(
            {
                category_uuid: category_uuid,
                image_uuid: image_uuid !== '' ? image_uuid : null,
                name: name,
                description: description !== '' ? description : null,
                stock: stock !== 0 ? stock : null,
                status: status !== '' ? status : null,
                price: price !== 0 ? price : null,
                tags: tags !== '' ? tags : null
            }
            , {
                transaction
            });

        if (!newProduct) {
            throw new AppError(404, message.ID_PRODUCT_NOT_FOUND);
        }

        // commit
        await transaction.commit();

        res.json({
            data: newProduct,
            message: `Product ${message.SUCCESSFULLY_CREATED}`
        });
    } catch (err) {
        await transaction.rollback()
        next(err);
    }
}

module.exports = {
    getAll,
    create
};