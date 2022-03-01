

// get phones 
const getResult = () => {
    const inputText = document.getElementById("input-text");
    const inputValue = inputText.value;
    const url = `https://openapi.programming-hero.com/api/phones?search=${inputValue}`;
    fetch(url)
        .then(res => res.json())
        .then(data => showPhones(data.data))
}

// show phones 
const showPhones = phones => {
    phones.forEach(phone => {
        console.log(phone)
        const phonesContainer = document.getElementById("phones-container");
        // phonesContainer.textContent = '';
        const div = document.createElement("div");
        div.innerHTML = `
        <div class="col">
        <div class="card">
            <img src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body d-flex justify-content-between align-items-end">
                <div>
                    <h5 class="card-title">${phone.phone_name}</h5>
                    <p class="card-text">Brand name: ${phone.brand}</p>
                </div>
                <div>
                    <button class="btn btn-primary" type="button">Explore</button>
                </div>
            </div>
        </div>
    </div>
        `
        phonesContainer.appendChild(div)
    })
}