// error text display
const errorText = display => {
    document.getElementById("error-text").style.display = display;
}
// spinner display
const spinner = display => {
    document.getElementById("spinner").style.display = display;
}
// single phone with details display
const singlePhoneDisplay = display => {
    document.getElementById("photo-details-display").style.display = display;
}

// get phones 
const getResult = () => {
    const inputText = document.getElementById("input-text");
    const inputValue = inputText.value;
    inputText.value = '';
    const url = `https://openapi.programming-hero.com/api/phones?search=${inputValue}`;
    fetch(url)
        .then(res => res.json())
        .then(data => showPhones(data.data))
    // single phone with details display none
    singlePhoneDisplay("none")
}

// show phones 
const showPhones = phones => {
    const phonesContainer = document.getElementById("phones-container");
    spinner("block")
    phonesContainer.textContent = '';
    // if result no found 
    if (phones.length === 0) {
        errorText("block")
        spinner("none")
    }
    // if found 
    phones?.forEach(phone => {
        const div = document.createElement("div");
        div.innerHTML = `
        <div class="col">
        <div class="card">
            <img src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body d-flex justify-content-between align-items-end">
                <div>
                    <h5 class="card-title">${phone.phone_name}</h5>
                    <p class="card-text">Brand : ${phone.brand}</p>
                </div>
                <div>
                    <button onclick="photoDetails('${phone.slug}')" class="btn btn-primary" type="button">Explore</button>
                </div>
            </div>
        </div>
    </div>
        `
        phonesContainer.appendChild(div)
        // error text and spinner 
        errorText("none")
        spinner("none")
    })
}

// get single phone details 
const photoDetails = id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`
    fetch(url)
        .then(res => res.json())
        .then(phone => singlePhone(phone.data))
}
// show single phone details 
const singlePhone = details => {
    const detailsPhone = document.getElementById("photo-details");
    detailsPhone.textContent = '';
    const div = document.createElement("div");
    div.innerHTML = `
        <div id="photo-details-display" class="card mb-3 rounded-3" style="max-width: 1000px;">
            <div class="row g-0">
                <div class="col-md-4 py-1 my-1 py-md-5 my-md-5">
                    <div class="d-flex flex-column align-items-center">
                        <img src="${details.image}" class="img-fluid rounded-start" alt="...">
                        <h5 class="card-title my-3">${details.name}</h5>
                        <p class="card-text"><small class="text-muted">${details.releaseDate ? details.releaseDate : 'No release date found'}</small></p>
                    </div>
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h6>Main Features : </h6>
                            <p>Storage: ${details.mainFeatures.storage}</p>
                            <p>Display Size: ${details.mainFeatures.displaySize}</p>
                            <p>Chip Set: ${details.mainFeatures.chipSet}</p>
                            <p>Memory: ${details.mainFeatures.memory}</p>
                            <p>Sensors: ${details.mainFeatures.sensors}</p>
                        <h6>Others : </h6>
                            <p>
                            WLAN: ${details.others?.WLAN ? details.others.WLAN : 'Not found'}
                            <br>
                            Bluetooth: ${details.others?.Bluetooth ? details.others.Bluetooth : 'Not found'}
                            <br>
                            GPS: ${details.others?.GPS ? details.others.GPS : 'Not found'}
                            <br>
                            NFC: ${details.others?.NFC ? details.others.NFC : 'Not found'}
                            <br>
                            Radio: ${details.others?.Radio ? details.others.Radio : 'Not found'}
                            <br>
                            USB: ${details.others?.USB ? details.others.USB : 'Not found'}
                            </p>
                    </div>
                </div>
            </div>
        </div>
    `
    detailsPhone.appendChild(div);
}