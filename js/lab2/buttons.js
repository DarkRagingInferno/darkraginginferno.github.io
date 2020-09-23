/**
 * This JS File dynamically generates buttons mapping all the alphabets for a total of 26 respective buttons.
 * Each button has an onclick handler that alerts the window of the value of each button
 * @author John Poku
 * @since 09.23.2020
 */


 /**
  * This function waits for window and dom to finish loading and then dynamically generates
  * 26 buttons for each letter of the alphabet each with an onclick handler to print their ASCII value
  * as an alert to the window.
  */
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