/**
 * ! This function parses the headers of the uploaded file
 * ! and generates a checkbox set for the user to select 
 * ! the columns to hash
 */

async function colSelect(){
    try {
        const upload = document.getElementById("file");
        const file = upload.files[0];
        const fileContent = await file.text();
        const firstSplit = fileContent.split('\r\n');
        const chk_headers = document.getElementById("headerList");
        const headers = firstSplit[0];
        const arr_headers = String(headers).split(",");
        let chk_string = `<form action="hashData()" id="headerForm"><h2 id="header_h2">SELECT COLUMNS TO HASH</h2>`;
        for (let i = 0; i < arr_headers.length; i++) {
            const el = arr_headers[i];
            chk_string = chk_string+`<div class="wrapper_headerChk"><input class="headerChk" type="checkbox" name='chk_${i}_${el}' id='chk_${i}_${el}' value=${i}> <label class="chk_label" for='chk_${i}_${el}'>${el}</label></div>`;
        }
        chk_string = chk_string+`<button id="btn_headerForm"><span>Hash</span></button></form>`;
        chk_headers.innerHTML = chk_string;
        return true;
    } catch (error) {
        return false;
    }

}   