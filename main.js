import 'bootstrap/dist/css/bootstrap.min.css';

document.querySelector('#app').innerHTML = `
<div class="container">
  <h1 class="display-4 text-center mb-5">Vite + Bootstrap</h1>
  <div class="row">
    <div class="col-md-6">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Card title</h5>
          <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <div class="alert alert-primary" role="alert">
        A simple primary alert with <a href="#" class="alert-link">an example link</a>. Check it out!
      </div>
    </div>
  </div>
</div>
`;

