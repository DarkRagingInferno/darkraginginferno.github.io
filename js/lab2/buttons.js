window.onload = () => {
    let alphaArr = [...Array(26).keys()].map( alpha => String.fromCharCode(65 + alpha));

    console.log(alphaArr);
    for (alpha of alphaArr)
     {
        let alphabet = alpha
        let button = document.createElement('button');
        button.innerHTML = alpha;
        button.setAttribute('class', 'button');
        button.onclick = () => { alert(alphabet) };
        button.style.cssText = 'width: 35px; height: 35px; font-size: 24px; text-align: center;'
        document.getElementById('container').appendChild(button);
    }
}