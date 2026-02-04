const API_URL = "https://jsonplaceholder.typicode.com/photos?_start=0&_limit=20";
const LOADER_ID = "loader";
const IMAGES_CONTAINER_ID = "images-container";
const BUTTON_ID = "load-images-btn";

const loaderElement = document.getElementById(LOADER_ID);
const imagesContainer = document.getElementById(IMAGES_CONTAINER_ID);
const loadButton = document.getElementById(BUTTON_ID);


function showLoader() {
    loaderElement.style.display = "block"
};

function hideLoader() {
    loaderElement.style.display = "none"
};

function clearImagesContainer() {
    imagesContainer.innerHTML = ""
};

function createImageElement(
    url
) {
    let img = document.createElement("img");
    img.src = url;
    img.alt = "Изображение";
    img.className = "gallery__image";

    return img
};

function createGalleryItem(
    url
) {
    const item = document.createElement("div");
    item.className = "gallery__item";

    const image = createImageElement(url);
    item.appendChild(image)
    
    return item
};

function appendImagesToContainer(
    images
) {
    images.forEach( (imageUrl) => {
        const galleryItem = createGalleryItem(imageUrl);
        imagesContainer.appendChild(galleryItem);
    })
};

async function loadImages() {
    try {
        showLoader();
        clearImagesContainer();

        const response = await fetch(API_URL);
    
        if (!response.ok) {
            throw new Error(`Ошибка загрузки: ${response.statusText}`);
        }

        const data = await response.json();
        const imageUrls = data.map( (item) => item.url );
    
        appendImagesToContainer(imageUrls)
    } catch (err) {
        console.log("Произошла ошибка при загрузке изображений: ", err);
        alert("Не удалось загрузить изображения. Проверьте подключение.")
    } finally {
        hideLoader()
    }
};

function handleLoadImagesClick(
    event
) {
    event.preventDefault();
    loadImages()
};

document.addEventListener(
    "DOMContentLoaded",
    () => {
        loadButton.addEventListener(
            "click",
            handleLoadImagesClick
        )
    }
);
