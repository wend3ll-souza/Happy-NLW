// create map

const map = L.map('mapid').setView([-22.9103016, -47.0595007], 16);

// create and add tileLayer

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

// create icon

const icon = L.icon({
    iconUrl: "/images/map-marker.svg",
    iconSize: [58, 68],
    iconAnchor: [29, 68],
})

let marker;


map.on('click', (event) => {
    const lat = event.latlng.lat;
    const lng = event.latlng.lng;

    //date latlng
    document.querySelector('[name=lat]').value = lat;
    document.querySelector('[name=lng]').value = lng;

    // remove icon
    marker && map.removeLayer(marker)


    // add icon layer 
    marker = L.marker([lat, lng], { icon }).addTo(map)

})

// add photo field 

function addPhotoField() {
    //take #images
    const container = document.querySelector('#images')
        //take .new-upload
    const fieldsContainer = document.querySelectorAll('.new-upload')
        //clone last image added
    const newFieldContainer = fieldsContainer[fieldsContainer.length - 1].cloneNode(true)
        // query if field are empty
    const input = newFieldContainer.children[0];

    if (input.value == "") {
        return
    }
    // clean the field before add into container
    input.value = ""
        //add clone into 
    container.appendChild(newFieldContainer)
}

function deleteField(event) {

    const span = event.currentTarget;

    const fieldsContainer = document.querySelectorAll('.new-upload');

    if (fieldsContainer.length < 2) {
        //clean field value
        span.parentNode.children[0].value = "";
        return
    }

    //del field

    span.parentNode.remove();

}

// select yes or no

function toggleSelect(event) {
    // remove active class of the buttons

    document.querySelectorAll('.button-select button').forEach(function(button) {
        button.classList.remove('active')
    })

    // put active class into button clicked
    const button = event.currentTarget
    button.classList.add('active')

    // actualize the input hidden with the select value

    const input = document.querySelector('[name="open_on_weekends"]');

    // query if value is yes or no

    input.value = button.dataset.value


}

//function validate(event) {

// validar se lat e lng estão preenchidos
//  const needsLatAndLng = true;
// if (needsLatAndLng) {
//     event.preventDefault()
//     alert("Preencha todos os campos no formulário")
// }
//}