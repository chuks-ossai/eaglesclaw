const { expect } = require('chai');
const { createDummyUser, destroyDummyUser } = require('./dao.test');
const { validateUserExist } = require('../../services/users/service');

describe('User Service Test Suite', () => {
    it('should validate user existence via email or username', async () => {
        const testUser = await createDummyUser();
        const existingUser = await validateUserExist(testUser.username, testUser.email);

        expect(existingUser).to.be.an('object');
        expect(existingUser.email).to.equal('test@gmail.com');
        await destroyDummyUser(testUser);
    })

    it('should throw an error when only one argument is passed', async () => {
        let testUser;
        try {
            testUser = await createDummyUser();
            const existingUser = await validateUserExist(testUser.username);
        } catch (err) {
            expect(err).to.be.an('Error');
            expect(err.message).to.equal('Cannot get user when an invalid username and/or email is passed');
            await destroyDummyUser(testUser);
        }
    }) 

    it('should throw an error when no argument is passed', async () => {
        let testUser;
        try {
            testUser = await createDummyUser();
            const existingUser = await validateUserExist();
        } catch (err) {
            expect(err).to.be.an('Error');
            expect(err.message).to.equal('Cannot get user when an invalid username and/or email is passed');
            await destroyDummyUser(testUser);
        }
    }) 
})