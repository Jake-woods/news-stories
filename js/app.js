const form = document.querySelector('.form');
const mainContainer = document.querySelector('#rss-feed-container');
const prefix = 'https://api.rss2json.com/v1/api.json?rss_url=';
const apiKey = 'bteteipgchej5m4qkguymuknuzdm5aln4vxxqpt1'

const createItem = (input, href) => {
   const itemCont = document.createElement('article');
   const itemHeading = document.createElement('a');

   itemHeading.textContent = input;
   itemHeading.setAttribute('href', href)
   itemHeading.setAttribute('target', '_blank')

   itemCont.appendChild(itemHeading);
   mainContainer.appendChild(itemCont);
}

const returnRss = (e) => {
   const rssInput = document.querySelector('#input-location');
   const url = `${prefix}http://feeds.bbci.co.uk/news/world/${rssInput.value}/rss.xml&api_key=${apiKey}`;

   fetch(url)
      .then(resp => resp.json())
      .then(data => {
         if (mainContainer.lastChild) {
            mainContainer.innerHTML = '';
         }
         data.items.forEach((item) => createItem(item.title, item.link))
      });
   e.preventDefault();
}


form.addEventListener('submit', returnRss)