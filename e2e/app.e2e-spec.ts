import { MlodeWilkiPage } from './app.po';

describe('mlode-wilki App', function() {
  let page: MlodeWilkiPage;

  beforeEach(() => {
    page = new MlodeWilkiPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
