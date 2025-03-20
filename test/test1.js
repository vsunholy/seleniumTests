const { Builder, By, Key, until } = require('selenium-webdriver');
const assert = require('assert');
const should = require('chai').should();
describe('should add new todo tests', function () {
    it('should a new to do', async function () {
        //open browser
        driver = await new Builder().forBrowser('chrome').build();
        await driver.get('https://todolist.james.am/#/')
        await driver.wait(until.elementLocated(By.className('new-todo')), 2000);
        const newTodoInput = await driver.findElement(By.className('new-todo'));
        newTodoInput.sendKeys('Buy groceries', Key.RETURN);
        await driver.sleep(1000);
        const addedTodoItem = await driver.findElement(By.xpath("//label[text()='Buy groceries']")).getText();
        // assert.strictEqual(addedTodoItem, 'Buy groceries', 'To do items not equal');
        addedTodoItem.should.equal('Buy groceries');
        // close browser
        // await driver.sleep(10000);
        await driver.quit();

    })

});