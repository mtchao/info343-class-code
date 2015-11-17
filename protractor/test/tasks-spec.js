/* Test script for the Tasks List app */

describe('the tasks app', function() {

    beforeEach(function() {
        browser.get('http://localhost:8000');
    });

    it('must have the proper page title', function() {
        expect(browser.getTitle()).toEqual('My Tasks');
    });
});