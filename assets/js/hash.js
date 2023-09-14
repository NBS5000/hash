

async function hashData(cols){

    const pdId = prompt("PD project ID");
    console.log("pdid",pdId);
    if(!pdId){
        throw "Hash Cancelled";
    }
    /* Date & Time */
    const today = new Date();
    const dateVal = today.toLocaleDateString("en-GB").replaceAll("/","-");
    const time = today.toLocaleTimeString("en-GB").replaceAll(":","-");
    const now = dateVal+"_"+time;
    /***************/
    /* File name & document */ 
    const upload = document.getElementById("file");
    const file = upload.files[0];
    const fileName = file.name.slice(0,-4);
    const hashFileName = fileName+"_hashed_"+now;
    let secondSplit = [];
    /************************/

    (async () => {
        const fileContent = await file.text();
        const firstSplit = fileContent.split('\r\n');
        for (let i = 0; i < firstSplit.length; i++) {
            const el = firstSplit[i].split('\t');
            if(el[0]){
                const split = String(el[0]).split(",");
                secondSplit.push(split);
            }
        }
        const columnArr = cols;
        for (let i = 0; i < columnArr.length; i++) {
            const col = Number(columnArr[i]);
            const len2 = secondSplit.length;
            let i2 = 1;
            while(i2<len2){
                const oldValue = secondSplit[i2][col]+pdId;
                
                const newValue = await getSHA256Hash(oldValue);
                secondSplit[i2][col] = newValue;
                i2++;
            }
        }
        /********************************** */
        console.log("Part 2");
        /********************************** */

        const download = function (data) {
            const blob = new Blob([data], { type: 'text/csv' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.setAttribute('href', url);
            a.setAttribute('download', hashFileName+'.csv');
            a.click();
        }
        
        const csvmaker = function (data) {
            let csvRows = [];
            const headers = secondSplit[0];
            const headerLength = headers.length;
            csvRows.push(headers.join(','));
            for (let i = 1; i <= secondSplit.length; i++) {
                const values = secondSplit[i];
                csvRows.push(values)
            }
            return csvRows.join('\r\n')
        }
        
        const get = async function () {
            alert("Don't forget to delete the non-hashed file!");
            document.getElementById("downloadTick").style.display = "initial";
            const data = secondSplit;
            const csvdata = csvmaker(data);
            download(csvdata);
        }
        const btn = document.getElementById('action');
        const btn_title = document.getElementById('hashFileName');
        btn_title.innerHTML = `<span>Hashed file:</span><br/><span>${hashFileName}.csv</span>`;
        btn_title.style.display="initial";
        btn.style.display="initial";
        btn.addEventListener('click', get);
        document.getElementById("downloadSection").style.display = "flex";
    })();

    const getSHA256Hash = async (input) => {
        const textAsBuffer = new TextEncoder().encode(input);
        const hashBuffer = await window.crypto.subtle.digest("SHA-256", textAsBuffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hash = hashArray
            .map((item) => item.toString(16).padStart(2, "0"))
            .join("");
        return hash;
    };
}
