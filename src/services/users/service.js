const { getUserByUsernameAndEmail } = require('./dao');

const validateUserExist = async (username, email) => {
    try {
        const user = await getUserByUsernameAndEmail(username, email)
        // const userByEmail = await getUserByEmail(email)

        if (user) {
            return user;
        }

        return null;

    } catch (err) {
        throw new Error(err.message);
    }
};

module.exports = { validateUserExist };