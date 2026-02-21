const Card = require('../models/card.model');
const cardCtrl = {};

//Funciones CRUD

// Obtener todas las cartas (con paginacion opcional)
cardCtrl.getCards = async (req, res) => {
    const page = Number.parseInt(req.query.page, 10);
    const limit = Number.parseInt(req.query.limit, 10);
    const usePagination = Number.isInteger(page) && Number.isInteger(limit) && page > 0 && limit > 0;

    if (!usePagination) {
        await Card.find()
            .then((data) => res.status(200).json({ status: data }))
            .catch((err) => res.status(400).json({ status: err }));
        return;
    }

    const skip = (page - 1) * limit;
    await Promise.all([
        Card.countDocuments(),
        Card.find().skip(skip).limit(limit)
    ])
        .then(([total, data]) =>
            res.status(200).json({
                status: data,
                page,
                limit,
                total,
                pages: Math.ceil(total / limit)
            })
        )
        .catch((err) => res.status(400).json({ status: err }));
};

// Obtener una carta por ID
cardCtrl.getCard = async (req, res) => {
    await Card.findById(req.params.id)
        .then((data) => {
            if (data != null) res.status(200).json({ status: data });
            else res.status(404).json({ status: 'Card not found' });
        })
        .catch((err) => res.status(400).json({ status: err }));
};

// Agregar una carta nueva
cardCtrl.addCard = async (req, res) => {
    const card = new Card(req.body);
    await card.save()
        .then(() => res.status(201).json({ status: 'Card Successfully Inserted' }))
        .catch((err) => res.status(400).json({ status: err }));
};

// Actualizar una carta
cardCtrl.updateCard = async (req, res) => {
    const card = req.body;
    await Card.findByIdAndUpdate(
        req.params.id,
        { $set: card },
        { new: true }
    )
        .then((data) => {
            if (data) res.status(200).json({ status: 'Card Successfully Updated' });
            else res.status(404).json({ status: 'Card not found' });
        })
        .catch((err) => res.status(400).json({ status: err }));
};

// Eliminar una carta
cardCtrl.deleteCard = async (req, res) => {
    await Card.findByIdAndDelete(req.params.id)
        .then((data) => {
            if (data) res.status(200).json({ status: 'Card Successfully Deleted' });
            else res.status(404).json({ status: 'Card not found' });
        })
        .catch((err) => res.status(400).json({ status: err }));
};

// Saca la Lista de colecciones
cardCtrl.getCollections = async (req, res) => {
    await Card.find().distinct('collection')
        .then((data) => {
            res.status(200).json({ status: data });
        })
        .catch((err) => res.status(400).json({ status: err }));
};

module.exports = cardCtrl;