const navbar = document.body.querySelector('#navbar');
const navigationList = navbar.querySelectorAll('#navigationList > li > a');
const btnGoUp = document.getElementById("btn-go-up");

if (navbar) {
    new bootstrap.ScrollSpy(document.body, {
        target: '#navbar',
        offset: 72,
    });
};

var goUp = function () {
    var html = document.querySelector(':root');
    html.classList.add('scroll-behavior-auto');

    let intervaId = setInterval(function() {
        var scrollY = window.scrollY || window.pageYOffset;

        if (scrollY === 0) {
            clearInterval(intervaId);
            html.classList.remove('scroll-behavior-auto');
        }

        window.scroll(0, scrollY - 100);
    }, 16.66);
}

var onscroll = function () {
    var scrollY = window.scrollY || window.pageYOffset
    var show = scrollY > navbar.offsetHeight;

    if (show) 
        btnGoUp.classList.remove("d-none");
    else
        btnGoUp.classList.add("d-none");
}

var redirectTo = function () {
    var queryParams = new URLSearchParams(location.search)
    if (queryParams.has("sent") || queryParams.has("fail")) {
        var element = document.querySelector('#contacto')
        if (element)
            window.scrollTo(0, element.offsetTop);
    }
}

navigationList.forEach(item => {
    item.addEventListener('click', event => {
        navigationList.forEach(item => item.classList.remove('active'));
        event.target.classList.toggle('active');
    })
});

var navbarShadow = function () {
    const navbar = document.body.querySelector('#navbar');
    if (!navbar)
        return;

    if (window.scrollY === 0) 
        navbar.classList.remove('navbar-shrink', 'shadow-lg');
    else 
        navbar.classList.add('navbar-shrink', 'shadow-lg');
};

var hiddenSpinner = function () {
    setTimeout(function () {
        document.body.classList.remove("overflow-hidden");
    
        const spinner = document.body.querySelector("#spinner")

        if (spinner) {
            spinner.classList.add("d-none");
    }
    }, 600);
}

var showSpinner = function () {
    document.getElementById("spinner").classList.remove("d-none");
}

var form_valid = function () {
    var isValid = false;

    var expRegEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    var form = document.querySelector("#form-email");
    var nombre = document.getElementById('nombre');
    var email = document.getElementById('email');
    var mensaje = document.getElementById('mensaje');

    nombre.classList.remove('is-invalid', 'is-valid');
    email.classList.remove('is-invalid', 'is-valid');
    mensaje.classList.remove('is-invalid', 'is-valid');

    if (!nombre.value.length)
        nombre.classList.add('is-invalid');
    else
        nombre.classList.add('is-valid');

    if (!expRegEmail.test(email.value)) 
        email.classList.add('is-invalid');
    else
        email.classList.add('is-valid');

    if (!mensaje.value.length) 
        mensaje.classList.add('is-invalid');
    else
        mensaje.classList.add('is-valid');

    if (form.querySelectorAll('.is-invalid').length == 0)
        isValid = true;

    if (isValid) {
        document.querySelector("body").classList.add("overflow-hidden");
        showSpinner();
        form.submit()
        return true;
    }

    return false;
}

var showModal = function (e) {
    var cardId = e.target.id.replace("link", "card");
    var card = document.getElementById(cardId);
    var modal = document.getElementById('modalServicios');
    var cardTitle = card.querySelector('.card-title');
    var modalTitle = modal.querySelector('.modal-title');
    var cardTContent = card.querySelector('.card-text');
    var modalBody = modal.querySelector('.modal-body');

    modalTitle.innerHTML = cardTitle.innerHTML;
    modalBody.innerHTML = cardTContent.innerHTML

    modal.classList.add('d-block');
    
}

var triggerClickModal = function () {
    var links = document.querySelectorAll("[id^=link-]");
    links.forEach(link => link.addEventListener('click', showModal));
}

document.getElementById("btn-enviar-correo").addEventListener('click', form_valid);
document.addEventListener('scroll', navbarShadow);
btnGoUp.addEventListener('click', goUp);

onscroll();
navbarShadow();
hiddenSpinner();
redirectTo();  
triggerClickModal();