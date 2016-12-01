var selectedImages = [];

function cb(data) {
  data.items.map((itm) => {
    document.getElementById('images').innerHTML += '<img src="' + itm.media.m + '" id="' + itm.media.m + '" onclick="select(this)" alt="' + itm.tags + '">';
  });

  if (sessionStorage.length > 0) {
    setSelectedImages();
  }
}

function setSelectedImages() {
  var imageArray = Array.prototype.slice.call(document.getElementsByTagName('img'));
  var selected = JSON.parse(sessionStorage.getItem('selectedImage'));
  console.log(selected);
  imageArray.map((ele) => {
    selected.map((select) => {
      if (ele.src == select) {
        selectedImages.push(ele.getAttribute('src'));
        ele.className = 'selected';
      }
    });
  });
}

function select(ele) {
  ele.classList.toggle('selected');
  if (selectedImages.indexOf(ele.getAttribute('src')) < 0) {
    selectedImages.push(ele.getAttribute('src'));
    sessionStorage.setItem('selectedImage', JSON.stringify(selectedImages));
  } else {
    selectedImages.splice(ele.getAttribute('src'), 1);
    sessionStorage.setItem('selectedImage', JSON.stringify(selectedImages));
  }
}
