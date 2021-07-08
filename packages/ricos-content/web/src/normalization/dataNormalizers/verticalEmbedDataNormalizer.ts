const verticalEmbedDataNormalizer = componentData => {
  const { selectedProduct, type } = componentData;
  const { html, description, ...rest } = selectedProduct;
  if (html) {
    const pageUrl = selectedProduct.html.match(/href="[^"]*/g)?.[0]?.slice(6);
    let newData;
    if (type === 'event') {
      const scheduling = selectedProduct.description.match(/[^|]+/)?.[0];
      const location = selectedProduct.description.match(/[^|]*$/)?.[0];
      newData = { scheduling, location, pageUrl, ...rest };
    } else {
      newData = { description, pageUrl, ...rest };
    }
    return {
      ...componentData,
      selectedProduct: newData,
    };
  } else {
    return componentData;
  }
};

export default verticalEmbedDataNormalizer;
