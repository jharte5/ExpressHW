const users = require('../models/Users');

module.exports = {
    getAllUsers: (req, res) => {
        res.json(users);
    },
    getUserById: (req, res) => {
        const userExists = users.filter(user => user.id === parseInt(req.params.id));
        if(userExists.length !== 0) {
            return res.status(200).json({ userExists });
        } else {
            return res.status(400).json({ message: `The user with id: ${req.params.id} does not exist`});
        }
    },
    createUser: (req, res) => {
        if(!req.body.name || !req.body.email) {
            return res.status(400).json({ message: 'Please enter both a name and an email' });
        }
        const newUser = {};
        newUser.id = uuid();
        newUser.name = req.body.name;
        newUser.email = req.body.email;
        users.push(newUser);
        return res.json(req.body);
    },
    updateUser: (req, res) => {
        updateUser: (req, res) => {
            const user = users.find(user => user.id === req.params.id);
                if (user) {
                    const { name, email } = req.body;
                    user.name = name ? name : user.name;
                    user.email = email ? email : user.email;
                    return res.json({ message: 'User updated', user });
                } else {
                    return res
                    .status(400)
                    .json({ message: `User with id: ${req.params.id} does not exist` });
                }
        }
    },
    deleteUser: (req, res) => {
        const userExists = users.filter(user => user.id === req.params.id);
        const user = userExists[0];
    
        if(userExists.length!==0) {
            const deletedUser = users.indexOf(user);
            users.splice(deletedUser, 1);
            return res.status(200).json({ message: 'User Deleted ! Byeeeee', user })
        } else {
            return res.status(400).json({ message: `User with id: ${req.params.id} does not exist.`});
        }
    }
};