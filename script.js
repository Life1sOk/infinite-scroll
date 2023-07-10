const imageContainer = document.getElementById("image-container");
let loader = document.getElementById("loader");

let ready = false;
let totalImages = 0;
let imagesLoaded = 0;
let store = [];

const count = 5;
const apiKey = "MYvaMnRLovIIFH66Rad6rQRBceLiCZYXkmFuU8SFz3U";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Helper function - Attributes
const setAttribute = (element, attributes) => {
  for (let key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
};

const imageLoadedHandler = () => {
  imagesLoaded++;

  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
  }
};

// Display photos chage DOM
const displayPhotos = () => {
  imagesLoaded = 0;
  totalImages = store.length;

  store.forEach((photo) => {
    // Create <a> to link
    const item = document.createElement("a");
    setAttribute(item, { href: photo.links.html, target: "_blank" });

    // Create <img> for photo
    const img = document.createElement("img");
    setAttribute(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });

    // Check if image loaded;
    img.addEventListener("load", imageLoadedHandler);

    // Put <img> inside <a> => inside Container;
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
};

// Get photos
const getPhotos = async () => {
  try {
    const response = await fetch(apiUrl);
    store = await response.json();
    displayPhotos();
  } catch (err) {
    console.log(err, "failed");
  }
};

// Scroll position
window.addEventListener("scroll", () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
    ready = false;
    getPhotos();
  }
});

// Action
getPhotos();
