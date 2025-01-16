const initialusers = [
    {
    name: {
      first: "first",
      middle: "",
      last: "first",
    },
    image: {
      url: "https://th.bing.com/th/id/OIP.0uaGrLEY_HxDEyklFhqGXgAAAA?rs=1&pid=ImgDetMain",
      alt: "profile image",
    },
    isBusiness: false,
    isAdmin: false,
    phone: "0501112323",
    email: "first@gmail.com",
    password: "Ff1234",
    address: {
      state: "",
      country: "UK",
      city: "London",
      street: "London city",
      houseNumber: 45123,
      zip: 12345,
    },
  },
  {
    name: {
      first: "second",
      middle: "",
      last: "second",
    },
    image: {
      url: "https://th.bing.com/th/id/OIP.0uaGrLEY_HxDEyklFhqGXgAAAA?rs=1&pid=ImgDetMain",
      alt: "profile image",
    },
    isBusiness: true,
    isAdmin: false,
    phone: "0503034444",
    email: "second@gmail.com",
    password: "Ss1234",
    address: {
      state: "",
      country: "USA",
      city: "LA",
      street: "LA city",
      houseNumber: 330,
      zip: 12345,
    },
  },
  {
    name: {
      first: "admin",
      middle: "",
      last: "admin",
    },
    image: {
      url: "https://th.bing.com/th/id/OIP.0uaGrLEY_HxDEyklFhqGXgAAAA?rs=1&pid=ImgDetMain",
      alt: "profile image",
    },
    isBusiness: true,
    isAdmin: true,
    phone: "0501234567",
    email: "admin@gmail.com",
    password: "Aa123456123456",
    address: {
      state: "",
      country: "Israel",
      city: "Ashdod",
      street: "Ashdod city",
      houseNumber: 130,
    },
  },
];

module.exports = initialusers;