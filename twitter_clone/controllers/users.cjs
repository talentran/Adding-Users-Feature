const User = require('../models/User.cjs');
const bcrypt = require('bcrypt');

class UsersController {
    async createUser(req, res) {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: 'Both email and password fields are required.',
            });
        }

        try {
            const encryptedPassword = bcrypt.hashSync(password, 7);

            // To check when login
            // bcrypt.compareSync(password, DBPassword);

            const newUser = User.create({
                email,
                password: encryptedPassword,
            });

            res.status(201).json(newUser);
        } catch (e) {
            return res.status(500).json({
                message: 'Unexpected Error',
            });
        }
    }
}

module.exports = new UsersController();