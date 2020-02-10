const express = require('express');
const scratch = express();
const uuid = require('uuid/v4')
const port = process.env.PORT || '3000';

const userRoutes = require('./routes/userRoutes')
scratch.use(express.json());
scratch.use(express.urlencoded({ extended: true}));
scratch.use('/api/users');

// scratch.get('/api/users', useController.getAllUsers);
scratch.get('/api/users', (req, res) => {
    res.json(users);
});

scratch.post('/', (req, res) => {
    if(!req.body.name || !req.body.email) {
        return res.status(400).json({ message: 'Please enter both a name and an email' });
    }
    const newUser = {};
    newUser.id = uuid();
    newUser.name = req.body.name;
    newUser.email = req.body.email;
    users.push(newUser);
    return res.json(req.body);
});

scratch.put('/api/users/:id',(req, res) => {
    const userExists = users.filter(user => user.id === req.params.id);
        if (userExists.length !==0) {
            const updatedUser = req.body;
            if (userExists[0].id === req.params.id) {
                userExists[0].name = updatedUser.name ? updatedUser.name : userExists[0].name;
                userExists[0].email = updatedUser.email ? updatedUser.email : userExists[0].email;
                return res.status(200).json({message: 'User updated', user: userExists[0] });
            } 
        }
        else {
        return res.status(400).json({message: `User with id ${req.params.id} does not exist`});
        }
});
scratch.delete('/api/users/:id', (req, res) => {
    const userExists = users.filter(user => user.id === req.params.id);
    const user = userExists[0];

    if(userExists.length!==0) {
        const deletedUser = users.indexOf(user);
        users.splice(deletedUser, 1);
        return res.status(200).json({ message: 'User Deleted ! Byeeeee', user })
    } else {
        return res.status(400).json({ message: `User with id: ${req.params.id} does not exist.`});
    }
});

scratch.listen(port, () => {
    console.log(`Listening on ${port}`)
});

