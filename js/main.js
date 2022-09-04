
const loadCategoryData = async () => {
    // Load All Category using api
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    try{
        const res = await fetch(url);
        const data = await res.json();
        categoryData(data.data.news_category);
    }catch(err){
        console.log(err);
    }

}
loadCategoryData();

const preloader = (displayStyle) => {
    const preloaderId = document.getElementById('preloader');
    preloaderId.style.display = displayStyle;
}
const modalPreloader = (modalPreloader) => {
    const modalPreloaderId = document.getElementById('modal-preloader');
    modalPreloaderId.style.display = modalPreloader;

}
const categoryData = (listData) => {
    const categoryListDiv = document.getElementById('category');
    listData.forEach(categoryList => {
        const createNavDiv = document.createElement('div')
        createNavDiv.classList.add('sub__nav__link');
        createNavDiv.innerHTML = `

        <a class="category__nav" onclick='singleCategoryNews("${categoryList.category_id}")' >${categoryList.category_name}</a>
        `;

        categoryListDiv.appendChild(createNavDiv);

    });
}
const singleCategoryNews = (categoryId) => {
    const categoryNameSpan = document.getElementById('category-name');
    // Load Categories
    fetch('https://openapi.programming-hero.com/api/news/categories')
        .then(res => res.json())
        .then(data => categoryDataDetail(data.data.news_category));

    const categoryDataDetail = (categoryDetailId) => {
        categoryDetailId.forEach(detailId => {
            if (detailId.category_id === categoryId) {
                categoryNameSpan.innerHTML = detailId.category_name;
            }
        })

    }

    // Load Single Category Id
    fetch(`https://openapi.programming-hero.com/api/news/category/${categoryId}`)
        .then(res => res.json())
        .then(data => allNews(data.data));
    preloader('block');
}


const allNewsArticle = () =>{
    // Load all news 
    fetch(`https://openapi.programming-hero.com/api/news/category/08`)
        .then(res => res.json())
        .then(data => allArticle(data.data));
    preloader('block');
}
allNewsArticle();
const allArticle = (allNewsDataShow) =>{
    const categoryCount = document.getElementById('category-count');
    categoryCount.innerHTML = allNewsDataShow.length;
    const newsDataDiv = document.getElementById('news-container');
    newsDataDiv.innerHTML = '';
    allNewsDataShow.forEach(allNewsData => {
        const newsCardDiv = document.createElement('div');
        newsCardDiv.classList.add('card-news-div');
        newsCardDiv.innerHTML = `
        <div class="news__card shadow rounded my-3">
        <div class="card border-0">
            <div class="card-body">
                <div class="feature__img">
                    <img class="rounded me-3" src=${allNewsData.thumbnail_url} alt="">
                </div>
                <div class="news__detail p-3">
                    <h2 class="news__title">The best fashion influencers to follow for sartorial inspiration</h2>
                    <p class="news__body">
                        ${allNewsData.details.slice(0, 250)} ...
                    </p>
                    <div class="news__detail__content pt-5">
                        <div class="news__author d-flex align-items-center">
                            <img class="author__img me-2" src=${allNewsData.author.img} alt="">
                            <div class="news__author__detail">
                                <h4>${allNewsData.author.name ? allNewsData.author.name : 'User'}</h4>
                                <p>${allNewsData.author.published_date ? allNewsData.author.published_date : 'Not Found'}</p>
                            </div>
                        </div>
                        <div class="news__view">
                            <span><i class="fa-regular fa-eye"></i></span>
                            <span class="view__count">${allNewsData.total_view ? allNewsData.total_view : 'Not Found'}</span>
                        </div>
                        <div class="news__rating">
                            <span>${allNewsData.rating.number}</span>
                            <span><i class="fa-regular fa-star"></i></span>
                            <span><i class="fa-regular fa-star"></i></span>
                            <span><i class="fa-regular fa-star"></i></span>
                            <span><i class="fa-regular fa-star"></i></span>
                            <span><i class="fa-regular fa-star"></i></span>
                            
                        </div> 
                        <div class="news__read__more">
                        <a onClick='singlePost("${allNewsData._id}")' data-bs-toggle="modal" data-bs-toggle="modal" data-bs-target="#staticBackdrop"><i class="fa-solid fa-arrow-right"></i></a>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    </div>
        `;
        newsDataDiv.appendChild(newsCardDiv);
    })
}


const allNews = (newsData) => {
    preloader('none');

    const categoryCount = document.getElementById('category-count');
    if(newsData.length === 0){
        categoryCount.innerHTML = "No";
    }else{
        categoryCount.innerHTML = newsData.length;
    }
    
    const newsDataDiv = document.getElementById('news-container');
    newsDataDiv.innerHTML = '';

    newsData.sort((a,b) =>{
        if(a.total_view < b.total_view){
            return 1;
        }else{
            return -1;
        }
    })

    newsData.forEach(allNewsData => {
        const newsCardDiv = document.createElement('div');
        newsCardDiv.classList.add('card-news-div');
        newsCardDiv.innerHTML = `
        <div class="news__card shadow rounded my-3">
        <div class="card border-0">
            <div class="card-body">
                <div class="feature__img">
                    <img class="rounded me-3" src=${allNewsData.thumbnail_url} alt="">
                </div>
                <div class="news__detail p-3">
                    <h2 class="news__title">The best fashion influencers to follow for sartorial inspiration</h2>
                    <p class="news__body">
                        ${allNewsData.details.slice(0, 250)} ...
                    </p>
                    <div class="news__detail__content pt-5">
                        <div class="news__author d-flex align-items-center">
                            <img class="author__img me-2" src=${allNewsData.author.img} alt="">
                            <div class="news__author__detail">
                                <h4>${allNewsData.author.name ? allNewsData.author.name : 'User'}</h4>
                                <p>${allNewsData.author.published_date ? allNewsData.author.published_date : 'Not Found'}</p>
                            </div>
                        </div>
                        <div class="news__view">
                            <span><i class="fa-regular fa-eye"></i></span>
                            <span class="view__count">${allNewsData.total_view ? allNewsData.total_view : 'Not Found'}</span>
                        </div>
                        <div class="news__rating">
                            <span>${allNewsData.rating.number}</span>
                            <span><i class="fa-regular fa-star"></i></span>
                            <span><i class="fa-regular fa-star"></i></span>
                            <span><i class="fa-regular fa-star"></i></span>
                            <span><i class="fa-regular fa-star"></i></span>
                            <span><i class="fa-regular fa-star"></i></span>
                            
                        </div> 
                        <div class="news__read__more">
                        <a onClick='singlePost("${allNewsData._id}")' data-bs-toggle="modal" data-bs-toggle="modal" data-bs-target="#staticBackdrop"><i class="fa-solid fa-arrow-right"></i></a>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    </div>
        `;
        newsDataDiv.appendChild(newsCardDiv);
    })
}

const singlePost = (postId) => {
    // Load single post using api and news id
    fetch(`https://openapi.programming-hero.com/api/news/${postId}`)
        .then(res => res.json())
        .then(data => singlePostDetail(data.data[0]));

    modalPreloader('block');
}

const singlePostDetail = (singlePostDetail) => {
    modalPreloader('none');
    const modalContent = document.getElementById('modal-content');
    modalContent.innerHTML = '';
    const modalDiv = document.createElement('div');
    modalDiv.classList.add('modal-content');
    modalDiv.innerHTML = `
    <div class="modal-body">
        <div class="close__button d-flex justify-content-end mb-3">
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="news__cover__image">
            <img class="w-100" src=${singlePostDetail.image_url} alt="">
        </div>
        <div class="news__author my-3">
            <div class="author__details d-flex">
                <img src=${singlePostDetail.author.img} alt="">
                <div class="author__details__main">
                    <p class="author__name">${singlePostDetail.author.name ? singlePostDetail.author.name : 'User'}</p>
                    <p class="news__date">${singlePostDetail.author.published_date ? singlePostDetail.author.published_date : 'Not Found'}</p>
                </div>
            </div>
        </div>
        <div class="news__title my-2">
            <h2>${singlePostDetail.title}</h2>
        </div>
        <hr>
        <div class="news__article">
            <p>${singlePostDetail.details}</p>
        </div>
    </div>
    <div class="modal-footer d-flex justify-content-between">
        <div class="news__rating">
            <span>${singlePostDetail.rating.number ? singlePostDetail.rating.number : 'Not Found'}</span>
            <span><i class="fa-regular fa-star"></i></span>
            <span><i class="fa-regular fa-star"></i></span>
            <span><i class="fa-regular fa-star"></i></span>
            <span><i class="fa-regular fa-star"></i></span>
            <span><i class="fa-regular fa-star"></i></span>

        </div>
        <div class="news__view">
            <span><i class="fa-regular fa-eye"></i></span>
            <span class="view__count">${singlePostDetail.total_view ? singlePostDetail.total_view : 'Not Found'}</span>
        </div>
    </div>
    `;

    modalContent.appendChild(modalDiv)
}