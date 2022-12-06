const bcrypt = require('bcrypt');
// npm i --save bcrypt
const jwt = require('jsonwebtoken');
// npm i --save jsonwebtoken

const User = require('../models/User');


exports.signup = (req, res, next) => {
    // 10 => tours de chiffrement
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        const user = new User({
            email: req.body.email,
            password: hash
        });
        user.save()
            .then(() => res.status(201).json({message: 'Utilisateur créé !'}))
            .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
    //récupération email dans la bdd
    User.findOne({email: req.body.email})
    //défini un user
    .then(user => {
        //si user est strictement égale à null
        if (user === null) {
            res.status(401).json({ message : 'Paire identifiant/mot de passe incorrect'});
        } else {
            bcrypt.compare(res.body.password, user.password)
            .then(valid => {
                if(!valid) {
                    res.status(401).json({ message: 'Paire identifiant/mot de passe incorrect' });
                } else {
                   res.status(200).json({
                    userId: user._id,
                    token: jwt.sign(
                        { userId: user._id },
                        'RANDOM_TOKEN_SECRET',
                        // Temps de connection
                        { expiresIn: '24h'}
                    )
                   }); 
                }
            })
            .catch(error => {
                res.status(500).json({ error });
            })
        }
    })
    .catch(error => {
        res.status(500).json({ error });
    })
};