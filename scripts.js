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

const tagsInput = document.getElementById("category");
const tagsList = document.getElementById("tags-list");
tagsInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        const tagValue = tagsInput.value.trim();
        if (tagValue !== ""){
            const newTag = document.createElement("li");
            newTag.innerHTML = `<p>${tagValue}</p> <img src="img/close-black.svg" class="remove-tag">`;
            tagsList.appendChild(newTag)
            tagsInput.value = "";
        }
        
    }
});

tagsList.addEventListener('click', (event) => {
  // Verifica se o clique veio de um <li>
	if(event.target.classList.contains("remove-tag")) {
        const removeTag = event.target.parentElement;
        tagsList.removeChild(removeTag);
	}
});

const tagsAvailable = ["Front-end", "Back-end", "Full-stack", "DevOps", "Mobile", "Data Science", "UI/UX Design", "Machine Learning"];

async function fetchTags() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(tagsAvailable.includes(tagValue));
        }, 1000);
    })
}