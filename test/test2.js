import { Builder, By, Key, until } from 'selenium-webdriver';
import { expect } from 'chai';

describe('Edit ToDo Item', function () {
  let driver;

  this.timeout(30000);

  before(async function () {
    driver = await new Builder().forBrowser('chrome').build();
  });

  after(async function () {
    await driver.quit();
  });

  it('should edit a todo item correctly', async function () {
   
    await driver.get('https://todolist.james.am/#/');
    
    const newTodoInput = await driver.wait(
      until.elementLocated(By.className('new-todo')), 5000
    );
    const todoTexts = [
      'Buy groceries 420',
      'Buy groceries 421',
      'Buy groceries 422',
      'Buy groceries 423',
      'Buy groceries 424',
      'Buy groceries 425'
    ];
    for (const text of todoTexts) {
      await newTodoInput.sendKeys(text, Key.RETURN);
    }
    await driver.wait(
      until.elementLocated(By.xpath("//ul[@class='todo-list']//li[contains(., 'Buy groceries 422')]")),
      5000
    );
    const editableTodo = await driver.findElement(
      By.xpath("//ul[@class='todo-list']//li[contains(., 'Buy groceries 422')]")
    );
    await driver.actions().doubleClick(editableTodo).perform();
    const editField = await editableTodo.findElement(By.css('input.edit'));
    await editField.sendKeys(Key.chord(Key.CONTROL, 'a'), Key.BACK_SPACE);
    const newText = 'Noriu miego';
    await editField.sendKeys(newText, Key.RETURN);
    const editedItem = await driver.wait(
      until.elementLocated(By.xpath(`//ul[@class='todo-list']//li[contains(., '${newText}')]`)),
      5000
    );
    const editedText = await editedItem.getText();
    expect(editedText.trim()).to.equal(newText);
  });
});
