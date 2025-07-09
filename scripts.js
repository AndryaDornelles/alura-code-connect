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

        reader.readAsDataURL(file);
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

tagsList.addEventListener('click', (event) => {
	if(event.target.classList.contains("remove-tag")) {
        const removeTag = event.target.parentElement;
        tagsList.removeChild(removeTag);
	}
});

const tagsAvailable = ["Front-end", "Back-end", "Full-stack", "DevOps", "Mobile", "Data Science", "UI/UX Design", "Machine Learning"];

async function verifyTags(tagValue) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(tagsAvailable.includes(tagValue));
        }, 1000);
    })
}

tagsInput.addEventListener("keypress", async (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        const tagValue = tagsInput.value.trim();
        if ( tagsAvailable.includes(tagValue) && tagValue !== "" && !Array.from(tagsList.children).some(li => li.textContent.includes(tagValue))) {
            try {
                const tagExists = await verifyTags(tagValue);
                if(tagExists) {
                    const newTag = document.createElement("li");
                    newTag.innerHTML = `<p>${tagValue}</p> <img src="img/close-black.svg" class="remove-tag">`;
                    tagsList.appendChild(newTag)
                    tagsInput.value = "";
                } else {
                    alert.error("Tag inválida ou já existente.");
                }
            } catch (error) {
                console.error("Erro ao verificar a tag:", error);
                alert("Erro ao verificar a tag. Por favor, tente novamente.");
            }
        }
    }
});

const publishBtn = document.querySelector(".publish-button");

publishBtn.addEventListener('click', async (event) => {
    event.preventDefault();

    const projectName = document.getElementById('name').value;
    const projectDescription = document.getElementById('description').value;
    const projectTags = Array.from(tagsList.querySelectorAll("p")).map((category) => category.textContent);

});