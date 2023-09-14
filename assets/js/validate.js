

function validate() {
    const upload = document.getElementById("file");
    const file = upload.files[0];
    const fileRegex = new RegExp("(.*?).(csv)$");
    if (!(fileRegex.test(file.name.toLowerCase()))) {
        alert('Please select correct file format');
        document.getElementById("hashForm").reset();
        return Promise.reject("File");
    }

    const the_return = document.getElementById("fileName");
    const str = `<br/><span id="selectedFileName">${file.name}</span>`;
    the_return.innerHTML = str;
    document.getElementById("downloadSection").style.display = "none";

    return Promise.resolve();;
}