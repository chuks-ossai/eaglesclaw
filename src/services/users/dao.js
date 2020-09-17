const db = require('../../db/models');


const createNewUser = async (input) => {
    try {
        if (!input) throw new Error('No Input found');
        const keysCheck = (input.hasOwnProperty('first_name') && input.hasOwnProperty('last_name') && input.hasOwnProperty('username') && input.hasOwnProperty('email') && input.hasOwnProperty('password') && input.hasOwnProperty('role_id'))
        if (!keysCheck) throw new Error('Invalid form model passed');

        const validatedRoleId = await validateRoleId(input.role_id);

        if (!validatedRoleId) throw new Error('The role id selected does not exist');

        const { first_name, last_name, username, email, password } = await input;
        const user = await db.User.create({
            first_name,
            last_name,
            username,
            email,
            role_id: validatedRoleId,
            password
        });
    
        return user;
    } catch (err) {
        throw new Error(err.message);
    }
}
const getUserByUsernameAndEmail = async (username, email) => {
    try {
        if(!(username && email)) throw new Error('Cannot get user when an invalid username and/or email is passed')
        const user = await db.User.findOne({ where: { email, username } });
        return user;
    } catch(err) {
        throw new Error(err.message);
    }
 };

const getUserByUsername = async (username) => {
    try {
        if (!username) throw new Error('Cannot get user because an invalid username is passed');
        const user = await db.User.findOne({ where: { username } });
        return user;
    } catch (err) {
        throw err.message;
    }
 };

const getUserByEmail = async (email) => {
    try {
        if (!email) throw new Error('Cannot get user because an invalid email is passed');
        const user = await db.User.findOne({ where: { email } });
        return user;
    } catch (err) {
        throw err.message;
    }
 };

const usernameExists = async (username) => {
    try {
        if (!username) throw new Error('Cannot check existence for an invalid username');

        const user = await getUserByUsername(username);
        return !!user
        
    } catch (err) {
        throw new Error(err.message)
    }
};

const emailExists = async (email) => {
    try {
        if (!email) throw new Error('Cannot check existence for an invalid email');

        const user = await getUserByEmail(email);
        return !!user
        
    } catch (err) {
        throw new Error(err.message)
    }
};

const validateRoleId = async (roleId) => {
    try {
        if (!roleId) throw new Error('No role id was passed');
        const role = await db.Role.findOne({ where: { id: roleId } });
        if (role) return role.id;

        return null;
    } catch (err) {
        throw err.message;
    }
}

module.exports = {
    createNewUser,
    getUserByUsernameAndEmail,
    getUserByUsername,
    getUserByEmail,
    usernameExists,
    emailExists,
    validateRoleId
}