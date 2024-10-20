const express = require('express');
const { resolve } = require('path');
let cors = require('cors');
const hotels = require('./hotels');

const app = express();
const port = 3000;

app.use(cors());

app.use(express.static('static'));

const sortLowToHighPrice = (hotels) => {
  return hotels.sort((a, b) => a.price - b.price);
};

// Function to sort hotels by price in decreasing order
const sortHighToLowPrice = (hotels) => {
  return hotels.sort((a, b) => b.price - a.price);
};

//1.API Endpoint -Sorting according to price

app.get('/hotels/sort/pricing', (req, res) => {
  const { pricing } = req.query;

  let sortedHotels;

  if (pricing === 'low-to-high') {
    sortedHotels = sortLowToHighPrice(hotels);
  } else if (pricing === 'high-to-low') {
    sortedHotels = sortHighToLowPrice(hotels);
  } else {
    return res.status(400).json({
      message: 'Invalid sorting parameter. Use low-to-high or high-to-low.',
    });
  }

  res.json({ hotels: sortedHotels });
});

//API 2. Sorting based on the Rating

const sortLowToHighRatings = (hotels) => {
  return hotels.sort((a, b) => a.rating - b.rating);
};

const sortHighToLowRatings = (hotels) => {
  return hotels.sort((a, b) => b.rating - a.rating);
};

app.get('/hotels/sort/rating', (req, res) => {
  const { rating } = req.query;

  let sortedHotels;

  if (rating === 'low-to-high') {
    sortedHotels = sortLowToHighRatings(hotels);
  } else if (rating === 'high-to-low') {
    sortedHotels = sortHighToLowRatings(hotels);
  } else {
    return res.status(400).json({
      message: 'Invalid sorting parameter. Use low-to-high or high-to-low.',
    });
  }

  res.json({ hotels: sortedHotels });
});

//API Endpoint -3 : By Review

const sortLowToHighReviews = (hotels) => {
  return hotels.sort((a, b) => a.reviews - b.reviews);
};

// Function to sort hotels by price in decreasing order
const sortHighToLowReviews = (hotels) => {
  return hotels.sort((a, b) => b.reviews - a.reviews);
};

app.get('/hotels/sort/reviews', (req, res) => {
  const { reviews } = req.query;

  let sortedHotels;

  if (reviews === 'least-to-most') {
    sortedHotels = sortLowToHighReviews(hotels);
  } else if (reviews === 'most-to-least') {
    sortedHotels = sortHighToLowReviews(hotels);
  } else {
    return res.status(400).json({
      message: 'Invalid sorting parameter. Use low-to-high or high-to-low.',
    });
  }

  res.json({ hotels: sortedHotels });
});

//API Endpoint 4 ;Filter by Amenity

const filterByAmenity = (hotels, amenity) => {
  return hotels.filter(
    (hotel) => hotel.amenity.toLowerCase() === amenity.toLowerCase()
  );
};


app.get('/hotels/filter/amenity', (req, res) => {
  const { amenity } = req.query;

  if (!amenity) {
    return res
      .status(400)
      .json({ message: 'Please provide an amenity to filter by.' });
  }

  const filteredHotels = filterByAmenity(hotels, amenity);

  if (filteredHotels.length === 0) {
    return res
      .status(404)
      .json({ message: `No hotels found with amenity: ${amenity}` });
  }

  res.json({ hotels: filteredHotels });
});

const filterByCountry = (hotels, country) => {
  return hotels.filter(hotel => hotel.country.toLowerCase() === country.toLowerCase());
};


//API Endpint 5: Filter by Country 
app.get('/hotels/filter/country', (req, res) => {
  const { country } = req.query;

  if (!country) {
    return res.status(400).json({ message: 'Please provide a country to filter by.' });
  }

  const filteredHotels = filterByCountry(hotels, country);

  if (filteredHotels.length === 0) {
    return res.status(404).json({ message: `No hotels found in country: ${country}` });
  }

  res.json({ hotels: filteredHotels });
});



//API Endpoint 6: Filter by Category

const filterByCategory = (hotels, category) => {
  return hotels.filter(hotel => hotel.category.toLowerCase() === category.toLowerCase());
};

// Define the endpoint to filter hotels by category
app.get('/hotels/filter/category', (req, res) => {
  const { category } = req.query;

  if (!category) {
    return res.status(400).json({ message: 'Please provide a category to filter by.' });
  }

  const filteredHotels = filterByCategory(hotels, category);

  if (filteredHotels.length === 0) {
    return res.status(404).json({ message: `No hotels found in category: ${category}` });
  }

  res.json({ hotels: filteredHotels });
});

//API Endpoint 7 :All Hotels

app.get('/hotels', (req, res) => {
  res.json({ hotels: hotels });
});














app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
