const urlAll ='https://restcountries.com/v3.1/all';
const regionURL= 'https://restcountries.com/v3.1/region/'
const countriesContainer = document.querySelector('.grid-container')
const theme_toggler = document.querySelector('.theme-toggler')
const specificCountryContainer=document.getElementById('specific-country')
const reloadBtn = document.getElementById('back-button')
const SearchForm =  document.getElementById('search-form')
const regionSelect = document.getElementById('RegionFilter')

fetchTheCountries();

//fetching all the countires
async function fetchTheCountries(){

    const res = await fetch(urlAll)
    const data= await res.json();
    showTheCountries(data)
    const countries = document.querySelectorAll('.country')
    fetchSpecificCountry(countries)
}
//fetching country based on name
async function fetchSpecificCountry(countries){
    
   countries.forEach(country=>{
   
    country.addEventListener('click',(e)=>{
        const countryName = country.getAttribute('data-country-name');
        showSpecificCountry(countryName)
    })
   })
    

}
//Fetching countries based on Region

async function fetchCountryRegion(region){
    const res = await fetch(`${regionURL}${region}`)
    const data = await res.json();
    showTheCountries(data)
    //to show specific country based on click
    const countries = document.querySelectorAll('.country')
    fetchSpecificCountry(countries)

}
//adding specific country to dom
async function showSpecificCountry(country){

    
    //Fetching the country based on its name
    const res = await fetch(`https://restcountries.com/v3.1/name/${country}`)
    const countryInfo= await res.json();
    //Fetching the country based on its name
   
countriesContainer.style.display="none";
specificCountryContainer.style.display="block";
const countryHolder =  specificCountryContainer.querySelector('.row')
const countryData = countryInfo[0];
const {flag,name,nativeName,population,region,capital,subregion} = countryData
countryHolder.innerHTML=`     

<div class="col">
<div class="flag">
   <img src="${flag}" class="img-fluid"  alt="" id="img">
</div>
</div>
<div class="col">
<div class="country-info">
   <h1 class="country-name">${name}</h1>
  
       <div class="row row-cols-1 row-cols-lg-2">
           <div class="col">
               <p class="fw-bold">Native Name :<span class="text-muted">${nativeName}</span></p>
               <p class="fw-bold">Population:<span  class="text-muted">${population}</span></p>
               <p class="fw-bold">Region :<span  class="text-muted">${region}</span></p>
               <p class="fw-bold">Sub Region :<span  class="text-muted">${subregion}</span></p>
               <p class="fw-bold">Capital :<span  class="text-muted">${capital}</span></p>
               
           </div>
           <div class="col">
               <p class="fw-bold">Top Level Domain :<span  class="text-muted">${countryData.topLevelDomain[0]}</span></p>
               <p class="fw-bold">Currinces:<span  class="text-muted">${countryData.currencies[0].name}</span></p>
               <p class="fw-bold">Languages :<span  class="text-muted">${countryData.languages[0].name}</span></p>

       
           </div>
   </div>
   <p class="fw-bold borders">Border Countries :${addBorders(countryData.borders)} </p>
</div>
</div>
`
}
//showing all countries to dom
function showTheCountries(data){
    countriesContainer.innerHTML=''
    specificCountryContainer.style.display="none";
    countriesContainer.style.display="grid";
    for(let country=0;country<data.length;country++){
        countriesContainer.innerHTML +=
        
            `
        
            <div class="country bg-white shadow" data-country-name="${data[country].name}">
            <div class="flag">
            
                <img src=${data[country].flag} class="img-fluid" alt="" id="img">
            </div>
            <div class="country-info ps-4 py-2">
                <h3 class="country-name">${data[country].name}</h3>
                <p>Population:<span id="population">${data[country].population}</span></p>
                <p>Region: <span id="Region">${data[country].region}</span></p>
                <p>Capital: <span id="capital">${data[country].capital}</span></p>
            </div>
    
            </div>
            
            `
        
     
        }
}
//adding borders to dom
function addBorders(borders){
    if(borders.length){
    
        for(let i =0;i<borders.length;i++){
        return borders[i]
        } 
     
    }
   
    else{
      return `<span class="shadow p-2">No borders</span>`
    }
    
   

}

//* Searching for countries//
async function searchForCountry(country){
    if(country){
        const res = await fetch(`https://restcountries.com/v3.1/name/${country}`)
        const data = await res.json();
        showTheCountries(data);
           //to show specific country based on click
    const countries = document.querySelectorAll('.country')
    fetchSpecificCountry(countries)

    }
    else{
        fetchTheCountries();
    }


}



//Selection changing tracker
 regionSelect.addEventListener('change',(e)=>{
    const region = e.target.value
    if(region){
       
        fetchCountryRegion(region)
    }
    else{
        
        fetchTheCountries()
    }
   
  
    })


/*Theme toggling*/
theme_toggler.addEventListener('click',()=>{
    document.body.classList.toggle('dark')

}) 
//back to countries button 
reloadBtn.addEventListener('click',()=>{
    countriesContainer.style.display="grid";
specificCountryContainer.style.display="none";
})
//search for country 
SearchForm.addEventListener('input',(e)=>{
e.preventDefault();
searchForCountry(e.target.value)

})
