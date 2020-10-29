export const getOne = (model) => async (req, res) => {
    try {
      const doc = await model.findOne({ _id: req.params.id }).lean().exec();
  
      // if nothing is returned from DB
      if (!doc) {
        return res.status(400).end();
      }
  
      res.status(200).json(doc);
    } catch (e) {
      console.error(e);
      res.status(400).end();
    }
  };
  
  export const getAll = (model) => async (req, res) => {
    try {
      const docs = await model.find().lean().exec();
  
      res.status(200).json(docs);
    } catch (e) {
      console.error(e);
      res.status(400).end();
    }
  };
  
  export const createOne = (model) => async (req, res) => {
    try {
      const doc = await model.create({ ...req.body });
      res.status(201).json(doc);
    } catch (e) {
      console.error(e);
      res.status(400).end();
    }
  };
  
  export const removeOne = (model) => async (req, res) => {
    try {
      const removed = await model.findOneAndRemove({
        _id: req.params.id,
      });
  
      if (!removed) {
        return res.status(400).end();
      }
  
      return res.status(200).json(removed);
    } catch (e) {
      console.error(e);
      res.status(400).end();
    }
  };
  
  export const updateOne = (model) => async (req, res) => {
    try {
      const updatedDoc = await model
        .findOneAndUpdate(
          {
            _id: req.params.id,
          },
          req.body,
          { new: true }
        )
        .lean()
        .exec();
  
      if (!updatedDoc) {
        return res.status(400).end();
      }
  
      res.status(200).json(updatedDoc);
    } catch (e) {
      console.error(e);
      res.status(400).end();
    }
  };
  
  export const crudControllers = (model) => ({
    removeOne: removeOne(model),
    getAll: getAll(model),
    getOne: getOne(model),
    createOne: createOne(model),
    updateOne: updateOne(model),
  });
  