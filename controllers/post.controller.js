const posts = require("../models/posts.model");

module.exports.create = (req, res) =>{
    posts.create(req.body).then((post) =>{
        res.status(201).json(post);
    }).catch((err) => {
        console.error("Error creating post:", err); // Agregar esta línea para mostrar el error en la consola
        res.status(400).json({ message: "Error creating post", error: err.message }); // Modificar el mensaje de error
    });
};

module.exports.listAll = (req, res) =>{
    posts.find().then((post)=>{
        res.json(post);
    })
};

module.exports.listId = (req, res) =>{
    posts.findById(req.params.id).then((post)=>{
        if(post){
            res.json(post); 
        }else{
            res.status(404).json({message: "Usuario no encontrado"});
        }
    })
};

module.exports.update = (req, res, next) => {
    Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
      .then((post) => {
        if (post) {
          res.json(post);
        } else {
          res.status(400).json({ error: "post not found" });
        }
      })
      .catch(next);
  };

  module.exports.delete = (req, res, next) => {
    Post.findByIdAndDelete(req.params.id)
      .then((post) => {
        if (post) {
          res.status(204).send();
        } else {
          res.status(400).json({ error: "post not found" });
        }
      })
      .catch(next);
  };