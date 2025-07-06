const uploadBtn = document.getElementById('upload-btn');
const inputUpload = document.getElementById('image-upload');

uploadBtn.addEventListener('click', () => {
    inputUpload.click();
});

function readFileContent(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            resolve({url: reader.result, name: file.name});
        }

        reader.onerror = () => {
            reject(`Error reading file ${file.name}`);
        }

        return reader.readAsDataURL(file);
    })
}

const imageContainer = document.querySelector('.main-image');
const imageName = document.querySelector('.container-image-name p');

inputUpload.addEventListener('change', async (event) => {
    const file = event.target.files[0];

    if (file) {
        try {
            const fileConntent = await readFileContent(file);
            imageContainer.src = fileConntent.url;
            imageName.textContent = fileConntent.name;
        } catch (error) {
            console.error("Error reading file:", error);
        }

    }
});