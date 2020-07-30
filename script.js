'use strict'
const apiKey = "r8eyCXf0BCTp3DlPOANozZS0HjhNv0Y6JbEIj2uE"
const searchURL = `https://developer.nps.gov/api/v1/parks`

function formatQueryParams(params) {
     const queryItems = Object.keys(params)
     .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
     return queryItems.join('&');
}

function displayResults(responseJson){
     console.log(responseJson);
     $('#js-list').empty();
     for (let i = 0; i <responseJson.data.length; i++) {
          $('#js-list').append(`<li> <p class="heading">${responseJson.data[i].fullName} </p>
          <p>${responseJson.data[i].description}</p> 
          <p><a href="${responseJson.data[i].url}">${responseJson.data[i].url}</a></p></li>`)

     }
     $('#js-list-section').removeClass('hidden');
}


function getParkList(query, maxResults=10) {
     const params = {
          api_key: apiKey,
          stateCode: query,
          limit: maxResults
     };
     const queryString = formatQueryParams(params)
     const url = searchURL + '?' + queryString;

     fetch(url)
          .then(response => {
               console.log(response)
               if (response.ok) {
                    return response.json();
               }
               throw new Error(response.statusText);
          })
          .then(responseJson => displayResults(responseJson))
          .catch(err => {
               $('#js-error-message').text(`Something went wront: ${err.message}`);
          });
     }

function watchForm() {
     $('#js-form').submit(event => {
          event.preventDefault();
          const searchTerm = $('#js-state').val();
          let maxResults = $('#js-max-results').val();
          if (maxResults === "") {
               maxResults = 10;
          }
          console.log(searchTerm, maxResults)
          getParkList(searchTerm, maxResults)
     });
}

$(watchForm);