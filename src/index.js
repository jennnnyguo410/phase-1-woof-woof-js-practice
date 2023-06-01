document.addEventListener('DOMContentLoaded', () => {
    const dogBar = document.getElementById('dog-bar')
    fetch('http://localhost:3000/pups')
        .then(res => res.json())
        .then(data => {
            displayPups(data)
        })
        .catch(error => {
            console.log('Error', error)
        })

    function displayPups(dogs) {
        dogs.forEach((dog) => {
            const dogName = document.createElement('span')
            dogName.innerHTML = `${dog.name}`
            dogBar.appendChild(dogName)
            dogName.addEventListener('click', () => {
                const dogInfos = document.getElementById('dog-info')
                const dogDetails = document.createElement('div')
                dogDetails.innerHTML = `
                <br></br>
                <img src = '${dog.image}'/>  
                <h4> ${dog.name}</h4>              
                `
                const goodBadBtn = document.createElement('button')

                function goodOrBad() {
                    if (dog.isGoodDog) {
                        return goodBadBtn.textContent = "Good Dog!"
                    } else {
                        return goodBadBtn.textContent = "Bad Dog!"
                    }
                }
                goodOrBad()
                dogDetails.appendChild(goodBadBtn)
                dogInfos.appendChild(dogDetails)
                // End of click & display 

                goodBadBtn.addEventListener('click', change)
                //将 JSON 数据解析为对象


                function change() {
                    const buttonObj = JSON.parse(dog.isGoodDog)
                    buttonObj.isGoodDog = !buttonObj.isGoodDog
                    console.log(buttonObj)
                    dog.isGoodDog = !dog.isGoodDog;
                    fetch(`http://localhost:3000/pups/:${dog.id}`, {
                        method: "PATCH",
                        headers:
                        {
                            "Content-Type": "application/json",
                            Accept: "application/json"
                        },
                        body: JSON.stringify({
                            "isGoodDog": dog.isGoodDog
                        })
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (data.isGoodDog) {
                                goodBadBtn.textContent = "Good Dog!";
                            } else {
                                goodBadBtn.textContent = "Bad Dog!";
                            }
                        })

                    // if (goodBadBtn.textContent === "Good Dog!") {
                    //     return goodBadBtn.textContent = "Bad Dog!"
                    // } else {
                    //     return goodBadBtn.textContent = "Good Dog!"
                    // }

                }// End of change
                console.log(dog.isGoodDog)
            })// End of dogName.addEventListener
        })
    }// End of displayPups
});//End of this project