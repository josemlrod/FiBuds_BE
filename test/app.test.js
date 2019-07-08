jest.mock('express');

jest.mock('body-parser', () => {
    return {
        json: () => 'test',
    };
});

jest.mock('../routes/user');
jest.mock('../routes/expense');
jest.mock('../routes/statement');
jest.mock('../routes/goal');

const {UserRouter,} = require('../routes/user');
const {ExpenseRouter,} = require('../routes/expense');
const {StatementRouter,} = require('../routes/statement');
const {GoalRouter,} = require('../routes/goal');

const express = require('express');
const bodyParser = require('body-parser');
const {getApp,} = require('../app');

test('getApp tests', done => {
    const mockUse = jest.fn();
    const mockApp = {
        use: mockUse,
    };

    express.mockImplementation(() => {
        return mockApp;
    });

    const app = getApp();

    expect(app).toEqual(mockApp);
    expect(mockUse.mock.calls[0][0]).toBe('test');
    expect(mockUse.mock.calls.length).toEqual(6);
    done();
});