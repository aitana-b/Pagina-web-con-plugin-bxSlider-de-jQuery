$(document).ready(function(){

    // FORMULARIO CONTACTO
    $('#formContacto').submit(function(e){

        e.preventDefault();

        var nombre = $('#nombre').val();
        var email = $('#email').val();
        var mensaje = $('#mensaje').val();

        if(nombre == "" || email == "" || mensaje == ""){
            alert("Por favor completa todos los campos");
            return;
        }

        $('#mensajeExito')
        .hide()
        .text("Mensaje enviado correctamente. ¡Gracias por contactarnos!")
        .fadeIn(800);

        $('#formContacto')[0].reset();

        // ocultar mensaje después de 3 segundos
        setTimeout(function(){
            $('#mensajeExito').fadeOut(800);
        }, 3000);
    });

    // Slider
    $('.galeria').bxSlider({
        mode: 'fade',
        captions: false,
        slideWidth: 1200,
        responsive: true,
        auto: true,
        pause: 3000
    });

    // Reloj en tiempo real
    function updateClock() {
        var now   = new Date();
        var dias  = ['Dom','Lun','Mar','Mié','Jue','Vie','Sáb'];
        var meses = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
        var h = String(now.getHours()).padStart(2,'0');
        var m = String(now.getMinutes()).padStart(2,'0');
        var s = String(now.getSeconds()).padStart(2,'0');
        var texto = dias[now.getDay()] + ' ' + now.getDate() + ' ' + meses[now.getMonth()] + ' ' + now.getFullYear() + ' · ' + h + ':' + m + ':' + s;
        // Reemplaza el texto generado por document.write
        $('.f').first().text(texto);
    }
    updateClock();
    setInterval(updateClock, 1000);

    // Horarios - resaltar hoy y badge abierto/cerrado
    var sched = {
        0: {o:7, c:22},
        1: {o:7, c:22},
        2: {o:7, c:22},
        3: {o:7, c:21},
        4: {o:7, c:22},
        5: {o:7, c:22},
        6: {o:7, c:22}
    };

    function updateStatus() {
        var now  = new Date();
        var day  = now.getDay();
        var hour = now.getHours() + now.getMinutes() / 60;

        // Quitar resaltado anterior y resaltar hoy
        $('.hor-table tr').removeClass('hoy');
        $('#hr-' + day).addClass('hoy');

        // Badge
        var o    = sched[day].o;
        var c    = sched[day].c;
        var open = hour >= o && hour < c;
        var pill = $('#spill');
        var txt  = $('#stxt');

        if (open) {
            var min = Math.round((c - hour) * 60);
            pill.attr('class', 'status-pill open');
            if (min >= 60) {
                txt.text('Abierto · Cierra en ' + Math.floor(min/60) + 'h ' + (min%60) + 'min');
            } else {
                txt.text('Abierto · Cierra en ' + min + ' min');
            }
        } else {
            pill.attr('class', 'status-pill closed');
            txt.text('Cerrado · Abre a las ' + o + ':00');
        }
    }

    updateStatus();
    setInterval(updateStatus, 60000);

    // Menú tabs
    window.switchTab = function(id, btn) {
        $('.mpanel').removeClass('active');
        $('.mtab').removeClass('active');
        $('#' + id).addClass('active');
        $(btn).addClass('active');
    };

    // Nav highlight al hacer scroll
    $(window).scroll(function() {
        var active = 'global';
        ['nosotros', 'menu-section', 'ubicacion'].forEach(function(id) {
            var el = $('#' + id);
            if (el.length && $(window).scrollTop() >= el.offset().top - 100) {
                active = id;
            }
        });
        $('#menu a').each(function() {
            var href = $(this).attr('href').replace('#','').replace('index.html','global');
            $(this).toggleClass('active-link', href === active);
        });
    });

});
