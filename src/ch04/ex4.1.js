const eventHandler = event => {
  console.log(event.currentTarget);
};
document.addEventListener('click', eventHandler);
