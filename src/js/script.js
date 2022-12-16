$(document).ready(function () {
  // Video Section Iframe
  // get youtube url
  const videoUrl = $(".youtube-iframe").attr("data-youtubeURL");
  $(".play-video").click(function () {
    // get html iframe
    const iframe = $(".youtube-iframe");
    // display iframe
    iframe.removeClass("d-none");
    // add youtube url to iframe src html attribute
    iframe.attr("src", videoUrl);
  });

  // Slider - header
  // get json data
  function loadSlides() {
    const req = new XMLHttpRequest();
    // request to open json using
    req.open("get", "../../slides.json");

    req.onload = () => {
      try {
        // store data
        const json = JSON.parse(req.responseText);
        // populate slides if json is found
        populateSlides(json);
      } catch (e) {
        // throw an error if json isn't found
        console.warn("Could not get slide data");
      }
    };

    req.send();
  }

  function populateSlides(json) {
    // for each object in json create a new slide
    json.forEach((row) => {
      // conditional rendering
      const button = row.buttonText
        ? `
        <a href="${row.buttonLink}" class="btn btn-primary">
          <i class="icon-star"></i>
            ${row.buttonText}
          </a>`
        : "";

      const title = row.title ? `<h1>${row.title}</h1>` : "";
      const description = row.description ? `<p>${row.description}</p>` : "";

      const slideBackground = row.background.backgroundImage
        ? `background-image: url(${row.background.backgroundImage})`
        : `background-color: ${row.background.backgroundColor}`;
      // end conditional rendering
      // html slide created using dynamic data from json
      const slide = `
        <div class="item" style="${slideBackground}">
          <div class="container">
            <div class="w-100 d-flex justify-content-end">
              <img class="header-shape" src="./src/img/shape.png" alt="" />
              <div class="d-flex header_social">
                <a href="#" class="social_item"
                  ><i class="icon-facebook"></i
                ></a>
                <a href="#" class="social_item"><i class="icon-twitter"></i></a>
                <a href="#" class="social_item"><i class="icon-youtube"></i></a>
                <a href="#" class="social_item"><i class="icon-gplus"></i></a>
              </div>
            </div>
            ${title}
            ${description}
            ${button}
          </div>
        </div>
      `;
      // add slides to the carousel
      $(".owl-carousel").append(slide);
    });

    // initiate the carousel after the slides are added
    $(".owl-carousel").owlCarousel({
      loop: true,
      margin: 10,
      nav: true,
      dots: false,
      responsive: {
        0: {
          items: 1,
        },
      },
    });
  }
  loadSlides();
});
