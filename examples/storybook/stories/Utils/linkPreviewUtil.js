export const mockFetchUrlPreviewData = authorization => {
  let index = 0;
  return async () => {
    return new Promise(resolve => {
      setTimeout(() => resolve(mockOembedResults[index++ % mockOembedResults.length]), 1);
    });
  };
};

const authorization = `D0nawxcVUD5MtaQ8yKCNagHIWvpDGTRGqUfKfaqtKok.eyJpbnN0YW5jZUlkIjoiZDM0MDgzYTItNTlhYi00MTJjLWI0NjItNzk1NTk0MWMxOWQwIiwiYXBwRGVmSWQiOiIxNGJjZGVkNy0wMDY2LTdjMzUtMTRkNy00NjZjYjNmMDkxMDMiLCJtZXRhU2l0ZUlkIjoiYmM0ZjIzODEtMzY1Mi00MTE4LWIxOGItY2NmNDE2MmZkZTA3Iiwic2lnbkRhdGUiOiIyMDIwLTAxLTE0VDE2OjMwOjEyLjY2OVoiLCJkZW1vTW9kZSI6ZmFsc2UsIm9yaWdpbkluc3RhbmNlSWQiOiI2N2RkZDA5ZS00YWU5LTQ5NWMtOWE4OS0wZGZiZGY4MTQ4ZTYiLCJhaWQiOiIyMWY2NzFiZS05OGZlLTQxMTctYjg4ZC02YzI2ZTJjN2YxNzkiLCJiaVRva2VuIjoiNmYwZmEwMjMtNmZmOS0wMDM0LTA1ZTktYjVhMTgyMzNjN2Q3Iiwic2l0ZU93bmVySWQiOiI4MTk2ZGM1Ni1kNDVjLTRkZWYtYTc2Ny0zMDAyNDZhYjBiN2EifQ`;

const mockOembedResults = [
  {
    title: 'A mock title',
    description: 'A mock description',
    thumbnail_url:
      'https://image.insider.com/5de5784979d757159d0b6838?width=1100&format=jpeg&auto=webp', //eslint-disable-line
    provider_url: 'www.mockUrl.com',
  },
  {
    title: 'Free Website Builder | Create a Free Website | Wix.com',
    description:
      '	Create a free website with Wix.com. Choose a stunning template and customize anything with the Wix website builder—no coding skills needed. Create yours today!', //eslint-disable-line
    thumbnail_url:
      'https://static.wixstatic.com/media/5305c5_5f112df56dcd40a29e855baae08f19ce~mv2.jpg/v1/fill/w_600,h_315,al_c/5305c5_5f112df56dcd40a29e855baae08f19ce~mv2.jpg', //eslint-disable-line
    provider_url: 'www.wix.com',
  },
  {
    title: '9 Yummy Snacks From South Korea That Make Great Souvenirs for Everyone',
    description:
      '	Its the holiday season now and many people are either on vacation already or prepping for their next trip during this time. One of the popular destinations that Malaysians love to visit would be Seoul,', //eslint-disable-line
    thumbnail_url:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg/220px-Good_Food_Display_-_NCI_Visuals_Online.jpg', //eslint-disable-line
    provider_url: 'https://www.worldofbuzz.com/',
  },
  {
    title:
      'Fiesta Latina 2019 - Maluma, Luis Fonsi, Ozuna, J Balvin, CNCO, J Balvin - Latin Hits Mix 2019', //eslint-disable-line
    thumbnail_url: 'https://i.ytimg.com/vi/W9aEdHf6cA0/maxresdefault.jpg', //eslint-disable-line
    provider_url: 'https://www.youtube.com',
  },
];
