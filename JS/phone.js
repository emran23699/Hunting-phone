

const loadPhone = async (searchText, isShowAll) => {
  const res = await fetch(` https://openapi.programming-hero.com/api/phones?search=${searchText}`);
  const data = await res.json();
  const phones = data.data;

  displayPhones(phones, isShowAll);

}

const displayPhones = (phones, isShowAll) => {
  // console.log(phones);
  const phoneContainer = document.getElementById('phone-container');

  //clear phone container card before adding new cards
  phoneContainer.textContent = '';

  //display show all button if theare are more than 5 phones 
  const showAllContainer = document.getElementById('show-all-container')
  if (phones.length > 5 && !isShowAll) {
    showAllContainer.classList.remove('hidden')
  }
  else {
    showAllContainer.classList.add('hidden');
  }
  //console.log('is show all', isShowAll)
  //display only first 5 phones is not show All
  if (!isShowAll) {

    phones = phones.slice(0, 5);

  }
  phones.forEach(phone => {
    // console.log(phone);
    // 2 create a div
    const phoneCard = document.createElement('div');
    phoneCard.classList = `card  bg-gray-100 p-4 shadow-xl`
    // 3: set inner html
    phoneCard.innerHTML = `
    <figure><img src="${phone.image}" alt="Shoes" />
    </figure>
    <div class="card-body">
      <h2 class="card-title">${phone.
        phone_name
      }</h2>
      <p>If a dog chews shoes whose shoes does he choose?</p>
      <div class="card-actions justify-center">
        <button onclick="handleShowALlDetail('${phone.slug}')" class="btn btn-primary">Show Details</button>
      </div>
    </div>
</div>
`;
    // 4 append child
    phoneContainer.appendChild(phoneCard);

  });
  //hiden loading spinner 
  toggleloadingSpinner(false);
}
//
const handleShowALlDetail = async (id) => {
  //console.log('clicked show details', id)
  //load single phone data
  const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
  const data = await res.json();
  const phone = data.data;

  showPhoneDetails(phone)
}
const showPhoneDetails = (phone) => {
  console.log(phone);
  const phoneName = document.getElementById('show-detail-phoner-name');
  phoneName.innerText = phone.name;
  
  const showDetailContainer = document.getElementById('show-detail-container');
  showDetailContainer.innerHTML = `<img src="${phone.image}" alt="" />
  <p class:""><span>Storage:</span>${phone.mainFeatures.storage}</p>
  <p class:""><span>Memory:</span>${phone.mainFeatures.memory}</p>
  <p class:""><span>GPS:</span>${phone?.others?.GPS}</p>
  <p class:""><span>WLAN:</span>${phone?.others?.WLAN}</p>
  <p class:""><span>Bluetooth:</span>${phone?.others?.Bluetooth}</p>
  <p class:""><span>USB:</span>${phone?.others?.USB}</p>



  `;
  
 
  
  
  
  //show the modal
  show_details_modal.showModal();

}
// 

// handle search button
const handleSearch = (isShowAll) => {
  toggleloadingSpinner(true);
  const searchField = document.getElementById('search-field');
  const searchText = searchField.value;
  console.log(searchText);
  loadPhone(searchText, isShowAll);
}

const toggleloadingSpinner = (isLoading) => {
  const loadingSpinner = document.getElementById('loading-spinner');
  if (isLoading) {
    loadingSpinner.classList.remove('hidden')
  }
  else {
    loadingSpinner.classList.add('hidden');
  }
}

//handle show all

const handleShowALl = () => {
  handleSearch(true);


}


//loadPhone();