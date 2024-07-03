
const API_KEY = "5ae8c637b4c24192a05ffa5181200551";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fetchNews("India"));

function reload(){
  window.location.reload();
}

async function fetchNews(query) {
  const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
  const data = await res.json();
  console.log(data);
  bindData(data.articles);
}
function bindData(articles) {
  const cardsContainer = document.getElementById("cards-container");
  const newsCardTemplate = document.getElementById("template-news-card");
  cardsContainer.innerHTML = "";
  articles.forEach(articles => {
    if (!articles.urlToImage) return;
    const cardColne = newsCardTemplate.content.cloneNode(true);// every div in card contaner get clone for this we use 
    // above clon node funtion
    fillDataInCard(cardColne , articles);
    cardsContainer.appendChild(cardColne);
  });
}
function fillDataInCard(cardColne, article) {
  const newsImg = cardColne.querySelector('#news-img');
  const newsTitle = cardColne.querySelector('#news-title');
  const newsSource = cardColne.querySelector('#news-sourse');
  const newsDes = cardColne.querySelector('#news-des');

  newsImg.src = article.urlToImage;
  newsTitle.innerHTML = article.title;
  newsDes.innerHTML = article.description;

  
  const date = new Date(article.publisheAt).toLocaleDateString("en_us", {
    timeZone: "Asia"
  });// it is a JS lab which help to convert date into readable from
  newsSource.innerHTML = `${ article.source.name } :${date} `;
  cardColne.firstElementChild.addEventListener("click",() =>{
    window.open(article.url, "_blank");
  });
}
let curSelectedNav = null;
function onNavItemClick(id) {
  fetchNews(id);
  const navItem = document.getElementById(id);// to see which nav item  is active 
  curSelectedNav?.classList.remove('active');
  curSelectedNav = navItem;
  curSelectedNav.classList.add('active');
}
const searchButton= document.getElementById("search-button");
const searchText = document.getElementById("search-text");

searchButton.addEventListener("click", ()=> {
  const query =searchText.value;
  if(!query) return;
  fetchNews(query);
  curSelectedNav.classList.remove('active');
  curSelectedNav = null;



})


