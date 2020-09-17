const { expect } = require('chai');
const { usernameExists, emailExists, createNewUser, getUserByUsername, getUserByEmail, validateRoleId } = require('../../services/users/dao');
const db = require('../../db/models');

describe('User DAO Test Suite', () => {

    it('should get user by username', async () => { 
        const testUser = await createDummyUser();
        const user = await getUserByUsername(testUser.username);
        destroyDummyUser(testUser)
        expect(user).to.be.an('object');
        expect(user.username).to.equal(testUser.username)
    });

    it('should get user by email', async () => { 
        const testUser = await createDummyUser();
        const user = await getUserByEmail(testUser.email);
        destroyDummyUser(testUser)
        expect(user).to.be.an('object');
        expect(user.email).to.equal(testUser.email)
    });

    it('should return null for non-existent username', async () => { 
        const user = await getUserByUsername('nonExistenttestUsername');
        expect(user).to.be.null;
    });

    it('should return null for non-existent email', async () => { 
        const user = await getUserByEmail('nonExistenttest@gmail.com');
        expect(user).to.be.null;
    });

    it('should throw an error if an invalid username is passed', async () => { 
        let user;
        try {
            user = await getUserByUsername('');
        } catch (err) {
            // expect(err).to.be.an('Error');
            expect(err).to.equal('Cannot get user because an invalid username is passed')
            expect(user).to.be.undefined
        }

    });

    it('should throw an error if an invalid email is passed', async () => { 
        let user;
        try {
            user = await getUserByEmail('');
        } catch (err) {
            // expect(err).to.be.an('Error');
            expect(err).to.equal('Cannot get user because an invalid email is passed')
            expect(user).to.be.undefined
        }
    });

    it('should check a non-existent username in db', async () => {
        const result = await usernameExists('testYusername');
        expect(result).to.be.false;
        expect(result === undefined).to.be.false;
        expect(result === null).to.be.false;
    });

    it('should return error if no username is passed', async () => {
        try {
            const result = await usernameExists();
        } catch (e) {
            expect(e).to.be.an('Error');
            expect(e.message).to.equal('Cannot check existence for an invalid username')
        }
    });

    it('should check if user existence in db by username', async () => {
        const testUser = await createDummyUser();

        const result = await usernameExists('testUsername');
        expect(result).to.be.true;
        await destroyDummyUser(testUser)
            
    })

    it('should check if user email exists in db', async () => {
        const result = await emailExists('testify@test.com');
        expect(result).to.be.false;
        expect(result === undefined).to.be.false;
        expect(result === null).to.be.false;
    });

    it('should return error if no email is passed', async () => {
        try {
            const result = await emailExists();
        } catch (e) {
            expect(e).to.be.an('Error');
            expect(e.message).to.equal('Cannot check existence for an invalid email')
        }
    });

    it('should check if user existence in db by email', async () => {
        const testUser = await createDummyUser();

        const result = await emailExists('test@gmail.com');
        expect(result).to.be.true;
        destroyDummyUser(testUser)
            
    });

    it('should successfully create new user in db', async () => {
        const userInput = {
            first_name: 'testName',
            last_name: 'testLastName',
            username: 'testUsername',
            password: 'testPassword',
            email: 'test@gmail.com',
            role_id: 1
        };
        const testUser = await createNewUser(userInput);

        destroyDummyUser(testUser);

        expect(testUser.first_name).to.equal(userInput.first_name);
        expect(testUser.last_name).to.equal(userInput.last_name);
        expect(testUser.username).to.equal(userInput.username);
        expect(testUser.email).to.equal(userInput.email);
        expect(testUser.password).to.equal(userInput.password);
        expect(testUser.role_id).to.equal(userInput.role_id);
    })

    it('should throw an error if an invalid role id is passed', async () => {
        try {
            const userInput = {
                first_name: 'testName',
                last_name: 'testLastName',
                username: 'testUsername',
                password: 'testPassword',
                email: 'test@gmail.com',
                role_id: 5
            };
            const testUser = await createNewUser(userInput);
    
            destroyDummyUser(testUser);
        } catch (err) {
            expect(err.message).to.equal('The role id selected does not exist')
        }
    })

    it('should throw an error if no input value is passed', async () => {
        try {
            const testUser = await createNewUser();
            destroyDummyUser(testUser);
        } catch (err) {
            expect(err).to.be.an('Error');
            expect(err.message).to.equal('No Input found')
        }
    })

    it('should throw an error if incorrect input model is passed', async () => {
        try {
            const userInput = {
                first_name: 'testName',
                last_name: 'testLastName',
                password: 'testPassword',
                role_id: 1
            };
            const testUser = await createNewUser(userInput);
            destroyDummyUser(testUser);
        } catch (err) {
            expect(err).to.be.an('Error');
            expect(err.message).to.equal('Invalid form model passed')
        }
    })

    it('should throw an error if empty object is passed as  input model', async () => {
        try {
            const testUser = await createNewUser({});
            destroyDummyUser(testUser);
        } catch (err) {
            expect(err).to.be.an('Error');
            expect(err.message).to.equal('Invalid form model passed')
        }
    });

    it('should return a valid role id if role id validation is successful', async () => {
        const roleId = await validateRoleId(1);
        expect(roleId).to.be.greaterThan(0);
        expect(roleId).to.equal(1);

    }) 

    it('should return null if role id validation fails', async () => {
        const roleId = await validateRoleId(50);
        expect(roleId).to.be.null;
    }) 

    it('should throw an error if no role id is passed', async () => {
        try {
            const roleId = await validateRoleId();
        } catch (err) {
            expect(err).to.equal('No role id was passed');
        }
    }) 
});

const createDummyUser = async () => {
    const user = await db.User.create({
        first_name: 'testName',
        last_name: 'testLastName',
        username: 'testUsername',
        password: 'testPassword',
        email: 'test@gmail.com',
        role_id: 1
    });

    return user;
}

const destroyDummyUser = async (user) => {
   return await user.destroy({ force: true });
}

module.exports = {
    createDummyUser,
    destroyDummyUser
}