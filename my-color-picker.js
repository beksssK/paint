const palette = [
    {name: 'white', code: '#FFFFFF'},
    {name: 'silver', code: '#C0C0C0'},
    {name: 'gray', code: '#808080'},
    {name: 'black', code: '#000000'},
    {name: 'red', code: '#FF0000'},
    {name: 'maroon', code: '#800000'},
    {name: 'yellow', code: '#FFFF00'},
    {name: 'olive', code: '#808000'},
    {name: 'lime', code: '#00FF00'},
    {name: 'green', code: '#008000'},
    {name: 'aqua', code: '#00FFFF'},
    {name: 'teal', code: '#008080'},
    {name: 'blue', code: '#0000FF'},
    {name: 'navy', code: '#000080'},
    {name: 'fuchsia', code: '#FF00FF'},
    {name: 'purple', code: '#800080'},

    {name: 'bone', code: '#E7DFCC'},
    {name: 'latte', code: '#E9C17B'},
    {name: 'gold', code: '#F9A602'},
    {name: 'fire', code: '#DD561C'},
    {name: 'ruby', code: '#900603'},
    {name: 'flamingo', code: '#FDA4B8'},
    {name: 'lilac', code: '#B660CD'},
    {name: 'ocean', code: '#016064'},

    {name: 'soot', code: '#150E06'},
    {name: 'smoke', code: '#59515E'},
    {name: 'caramel', code: '#65350F'},
    {name: 'mint', code: '#98EDC3'},
    {name: 'sapphire', code: '#52B2C0'},
    {name: 'orchid', code: '#AF69EE'},
    {name: 'rosewood', code: '#A04242'},
    {name: 'lipstick', code: '#9C1003'},
    {name: 'carrot', code: '#ED7117'},
    {name: 'dijon', code: '#C29200'},
    {name: 'biscotti', code: '#E3C565'},
    {name: 'snow', code: '#F5FEFD'},
];

function createCol(i) {
    return (`<td class="my-color" data-color_name=${palette[i].name} data-color=${palette[i].code} style="background: ${palette[i].code}"></td>`)
}

function createRow(content) {
    return (`<tr>${content}</tr>`)
}

function appendChildren() {
    const cells = [];
    const rows = [];
    for (let i = 0; i< palette.length; i++){
        cells.push(createCol(i));
    }
    for (let k = 0; k < 3; k++){
        if (k === 0){
            rows.push(createRow(cells.slice(0,12).join('')));
        }
        if (k === 1){
            rows.push(createRow(cells.slice(12,24).join('')));
        }
        if (k === 2){
            rows.push(createRow(cells.slice(-12).join('')));
        }
    }
    const tableContent = rows.join('');
    const table = document.querySelector('#color-table');
    table.innerHTML = tableContent;
}



appendChildren();
