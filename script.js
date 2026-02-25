document.addEventListener('DOMContentLoaded', function () {
            const menuBtn = document.getElementById('mobileMenuBtn');
            const navLinks = document.getElementById('navbarLinks');
            const links = document.querySelectorAll('.nav-link');

            menuBtn.addEventListener('click', () => {
                navLinks.classList.toggle('active');
                menuBtn.classList.toggle('open');
            });

            links.forEach(link => {
                link.addEventListener('click', () => {
                    navLinks.classList.remove('active');
                    menuBtn.classList.remove('open');
                });
            });

            const observerOptions = { threshold: 0.1 };
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            }, observerOptions);

            document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

            const accordions = document.querySelectorAll('.accordion-header');
            accordions.forEach(acc => {
                acc.addEventListener('click', function () {
                    this.classList.toggle('active');
                    const body = this.nextElementSibling;
                    if (body.style.maxHeight) {
                        body.style.maxHeight = null;
                    } else {
                        body.style.maxHeight = body.scrollHeight + "px";
                    }
                });
            });

            const phoneInput = document.querySelector("#phone");
            if (phoneInput && window.intlTelInput) {
                window.intlTelInput(phoneInput, {
                    preferredCountries: ["uz", "kz", "ru"],
                    initialCountry: "uz",
                    separateDialCode: true,
                    utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
                });
            }

            const header = document.querySelector("header");
            window.addEventListener("scroll", () => {
                if (window.innerWidth > 992) {
                    let offset = window.scrollY;
                    header.style.backgroundPositionY = offset * 0.5 + "px";
                }
            });

            if (typeof am5 !== 'undefined') {
                am5.ready(function () {
                    var root = am5.Root.new("chartdiv");
                    root.setThemes([am5themes_Animated.new(root)]);
                    var chart = root.container.children.push(am5map.MapChart.new(root, {
                        panX: "rotateX",
                        panY: "none",
                        projection: am5map.geoMercator(),
                        homeGeoPoint: { longitude: 64.5, latitude: 41.3 }
                    }));
                    var polygonSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {
                        geoJSON: am5geodata_worldLow,
                        exclude: ["AQ"],
                        fill: am5.color(0x282828),
                        stroke: am5.color(0x000000)
                    }));
                    polygonSeries.mapPolygons.template.setAll({
                        tooltipText: "{name}",
                        interactive: true,
                        fill: am5.color(0x282828),
                        templateField: "polygonSettings"
                    });
                    polygonSeries.mapPolygons.template.states.create("hover", { fill: am5.color(0x2424fa) });
                    var bubbleSeries = chart.series.push(am5map.MapPointSeries.new(root, {
                        valueField: "value",
                        calculateAggregates: true,
                        polygonIdField: "id"
                    }));
                    bubbleSeries.bullets.push(function (root, series, dataItem) {
                        return am5.Bullet.new(root, {
                            sprite: am5.Circle.new(root, {
                                radius: 8,
                                fill: am5.color(0x2424fa),
                                stroke: am5.color(0xffffff),
                                strokeWidth: 2,
                                tooltipText: "{name}"
                            })
                        });
                    });
                    bubbleSeries.data.setAll([
                        { id: "UZ", name: "UZBEKISTAN", value: 100, latitude: 41.3775, longitude: 64.5853 },
                        { id: "KZ", name: "KAZAKHSTAN", value: 100, latitude: 48.0196, longitude: 66.9237 },
                        { id: "KG", name: "KYRGYZSTAN", value: 100, latitude: 41.2044, longitude: 74.7661 },
                        { id: "TJ", name: "TAJIKISTAN", value: 100, latitude: 38.861, longitude: 71.2761 },
                        { id: "RU", name: "RUSSIA", value: 100, latitude: 61.5240, longitude: 105.3188 }
                    ]);
                    chart.appear(1000, 100);
                });
            }
        });










document.querySelector('.contact-form').addEventListener('submit', async function(e) {
    e.preventDefault();

    const name = this.querySelector('input[placeholder="Ismingizni kiriting"]').value;
    const email = this.querySelector('input[type="email"]').value;
    
    const phoneInput = document.querySelector("#phone");
    const iti = window.intlTelInputGlobals.getInstance(phoneInput);
    const phone = iti.getNumber(); 

    const data = { name, phone, email }; // O'zgaruvchi nomi 'data'

    try {
        const response = await fetch('/api/contact', {  // Endpoint server.js bilan bir xil bo'lishi kerak
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data) // 'formData' emas, 'data'
        });

        if (response.ok) {
            alert("Xabar yuborildi!");
            this.reset();
        } else {
            alert("Xatolik yuz berdi.");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Server bilan bog'lanishda xato!");
    }
});