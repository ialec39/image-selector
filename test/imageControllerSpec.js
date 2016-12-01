var getById = id => {
  return document.getElementById(id);
};

describe('Image controller', () => {
  var jsoncallback, fixture;
  beforeEach(() => {
    fixture = '<div id="images"></div>';

    jsoncallback = {
      items: [{
        media: {
          m: 'image.jpg'
        },
        tags: 'image tag'
      },
      {
        media: {
          m: 'imageTwo.jpg'
        },
        tags: 'image two tag'
      }]
    };

    document.body.insertAdjacentHTML(
      'afterbegin',
      fixture);

    cb(jsoncallback);
  });

  afterEach(() => {
    document.body.removeChild(getById('images'));
  });

  it('should add image to DOM', () => {
    expect(getById('images').innerHTML).toContain('<img src="image.jpg" id="image.jpg" onclick="select(this)" alt="image tag">');
  });
  it('should add ALL images received to DOM', () => {
    expect(getById('images').getElementsByTagName('img').length).toBe(2);
  });

  describe('clicking an image', () => {
    afterEach(() => {
      if(getById('image.jpg').className == 'selected') {
        getById('image.jpg').click();
      };
    });
    it('should highlight image as selected', () => {
      getById('image.jpg').click(); //select image
      expect(getById('image.jpg').className).toBe('selected');
    });
    it('should UNhighlight image if already selected', () => {
      getById('image.jpg').click(); //select image
      getById('image.jpg').click(); //unselect image
      expect(getById('image.jpg').className).toBe('');
    });
  });

  describe('on page refresh', () => {
    afterEach(() => {
      if(getById('image.jpg').className == 'selected') {
        getById('image.jpg').click();
      };
    });
    it('should save image to session', () => {
      getById('image.jpg').click(); //select image
      var expected = JSON.stringify(['image.jpg']);
      expect(sessionStorage.getItem('selectedImage')).toBe(expected);
    });
    it('should save multiple images to session', () => {
      getById('image.jpg').click(); //select image
      getById('imageTwo.jpg').click(); //select image
      var expected = JSON.stringify(['image.jpg','imageTwo.jpg']);
      expect(sessionStorage.getItem('selectedImage')).toBe(expected);
    });
  })
});
