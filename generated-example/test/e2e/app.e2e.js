// Change from protractor to puppeeter
import { expect } from 'chai';
import { protractor, browser, $ } from 'protractor';
import { beforeAndAfter, app } from './../environment';

describe('React application', () => {
  beforeAndAfter();

  describe('open page', () => {
    it('should display title', async () => {
      await browser.get(app.getUrl('/'));
      await browser.wait(protractor.ExpectedConditions.presenceOf($('h2')));
      expect(await $('h2').getText()).to.equal('Hello World!');
    });
  });
});
