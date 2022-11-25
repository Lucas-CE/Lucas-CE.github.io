async function writeAnimation(DOMElement, delay, errorMargin = 0) {
  
    function wait(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }

    //You can set the speed of the animaiton in ms with the delay property
    // Put a number between 0 and 100 to set the posibility of making typos

    //'selected' elements get that blinking underscore at the end with CSS
    DOMElement.classList.add('selected')

    DOMElement.finalText = DOMElement.textContent
    DOMElement.finalINNERHTML = DOMElement.innerHTML
    DOMElement.textContent = '';
    DOMElement.style.opacity = 1;
    await wait(delay * 30)


    let i = 0;

    //animation loop.
    while (DOMElement.textContent != DOMElement.finalText) {

        if (DOMElement.finalText[i] == undefined || DOMElement.hasBeenAnimated == true) {

            //in case something goes wrong, this will prevent an infinite loop
            //you can skip the animation anytime by setting hasBeenAnimated on the dom element to true.

            DOMElement.textContent = DOMElement.finalText
            DOMElement.classList.remove('selected')
            break;
        }

        DOMElement.textContent += DOMElement.finalText[i]
        i++;




        //Sometimes there are some mistakes when you are writing. This is a little bit high to Change this to something like 0.007
        if (Math.random() < errorMargin / 100) {

            //add two random letters
            DOMElement.textContent += randomLetter();
            await wait(delay * 5);
            DOMElement.textContent += randomLetter();
            await wait(delay * 2);

            //erase them
            DOMElement.textContent = DOMElement.textContent.substring(0, DOMElement.textContent.length - 1)
            await wait(delay * 5);
            DOMElement.textContent = DOMElement.textContent.substring(0, DOMElement.textContent.length - 1)
            await wait(delay * 5);

        }
        await wait(delay)
    }
    DOMElement.innerHTML = DOMElement.finalINNERHTML;
    DOMElement.classList.remove('selected')
}

function randomLetter() {
    let letters = "abcdefghijklmnñopqrstuvwxyz";
    return letters[Math.floor(Math.random() * letters.length)]
}


const h1 = document.querySelector('h1')
const ps = document.querySelectorAll('p')
const but = document.querySelector('a')

//you can use an async function to animate one element at a time
async function animateAll () {
  await writeAnimation(h1, 70, 4)
  await writeAnimation(ps[0], 70, 2)
  await writeAnimation(ps[1], 70, 0)
};

animateAll();