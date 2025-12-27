let users = JSON.parse(localStorage.getItem('supreme_users')) || [];
let currentUser = JSON.parse(localStorage.getItem('supreme_current_user')) || null;
let cart = [];

// === LOGOS DE TARJETAS ===
const VISA_LOGO = `<div class="logo-text-visa">VISA</div>`;
const AMEX_LOGO = `<div class="logo-text-amex">AMEX</div>`;
const MASTER_LOGO = `
<svg viewBox="0 0 50 38" width="50" height="30">
    <g fill="none" fill-rule="evenodd">
        <circle cx="15" cy="19" r="15" fill="#EB001B"/>
        <circle cx="35" cy="19" r="15" fill="#F79E1B" fill-opacity="0.9"/>
    </g>
    <text x="50%" y="36" font-family="Arial" font-size="6" fill="white" text-anchor="middle" font-weight="bold" letter-spacing="0.5">mastercard</text>
</svg>`;
const GENERIC_LOGO = `<span style="font-size:1.2rem; font-weight:900; opacity:0.6; font-style:italic; letter-spacing:2px; color:white;">CARD</span>`;

// LISTA DE PRODUCTOS
const products = [
    { id: 1, name: 'Sudadera SUPREME roja', price: 14000, image: '1.jpg' },
    { id: 2, name: 'Tenis Bape Red/Green', price: 4500, image: 'baep1.jpg' },
    { id: 3, name: 'Mochila Milo BAPE', price: 12000, image: 'milo.jpg' },
    { id: 4, name: 'Supreme iPhone SE Red', price: 6720, image: 'red.jpg' },
    { id: 5, name: 'Cuadro Alec Monopoly', price: 4000, image: 'monopoly.jpg' },
    { id: 6, name: 'LEGO Speed champions Urus', price: 690, image: 'lambos.jpg' },
    { id: 7, name: 'iPad Mini 7 Gris', price: 9500, image: 'ipad.jpg' },
    { id: 8, name: 'Teclado RGB Redragon', price: 900, image: 'teclado.jpg' },
    { id: 9, name: 'Sudadera BAPE Shark', price: 10000, image: 'shark1.jpg' },
    { id: 10, name: 'Dandy x Oscar Ortiz', price: 2500, image: 'dandy.jpg' },
    { id: 11, name: 'Mochila Bape Shark', price: 6500, image: 'mochila.jpg' },
    { id: 12, name: 'Dandy x El Mago', price: 3500, image: 'mago.jpg' },
    { id: 13, name: 'LEGO Fortnite Set', price: 4500, image: 'fornite.jpg' },
    { id: 14, name: 'Playera Psycho Bunny', price: 750, image: 'bunny.jpg' },
    { id: 15, name: 'Sudadera Puma Ferrari', price: 2000, image: 'puma.jpg' },
    { id: 16, name: 'Monitor AOC 27"', price: 4100, image: 'aoc.jpg' },
    { id: 17, name: 'Tarjeta RTX 2050', price: 4500, image: '2050.jpg' },
    { id: 18, name: 'iPhone 13 Mini Red', price: 7500, image: '13.jpg' },
    { id: 19, name: 'Cinturon Supreme LV', price: 4200, image: 'lv.jpg' },
    { id: 20, name: 'LEGO Porsche Speed', price: 900, image: 'porsche.jpg' },
    { id: 21, name: 'MOCHILA BAPE SHARK COLOR ', price: 5800, image: 'shark.jpg' },
    { id: 22, name: 'Tenis lv negros', price: 1800, image: 'luis.jpg' },
    { id: 23, name: 'Controlador de dj', price: 3200, image: 'dj.jpg' },
    { id: 24, name: 'Chaqueta North Face x Supreme', price: 18500, image: 'face.jpg' },
    { id: 25, name: 'mac air m4 ', price: 2100, image: 'mac.jpg' },
    { id: 26, name: 'airpods 4 + anc', price: 3400, image: 'air.jpg' },
    { id: 27, name: 'xbox series s 512gb', price: 1200, image: 'xbox.webp' },
    { id: 28, name: 'control de xbox series s/x red', price: 2400, image: 'red1.jpg' },
    { id: 29, name: 'peluche de gengar', price: 2900, image: 'gengar.webp' },
    { id: 30, name: 'encendedor supreme recargable', price: 4800, image: 'encendedor.jpg' }
];

function renderProducts(list = products) {
    const grid = document.getElementById('products-grid');
    
    if(list.length === 0) {
        grid.innerHTML = '<p style="color:white; text-align:center; grid-column:1/-1; padding:40px; font-size:1.2rem;">No se encontraron productos.</p>';
        return;
    }

    grid.innerHTML = list.map(p => `
        <div class="product-card">
            <div class="product-image">
                <img src="${p.image}" alt="${p.name}">
            </div>
            <div class="product-info">
                <div class="product-name">${p.name}</div>
                <div class="product-price">$${p.price.toLocaleString('es-MX')} MXN</div>
                <button class="add-btn" onclick="addToCart(${p.id})">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
                </button>
            </div>
        </div>
    `).join('');
}

function addToCart(id) {
    const p = products.find(x => x.id === id);
    cart.push(p);
    updateCartUI();
    showNotification("Agregado al carrito");
}

function updateCartUI() {
    document.getElementById('cart-count').innerText = cart.length;
    const list = document.getElementById('cart-items');
    if(cart.length === 0) {
        list.innerHTML = '<p style="padding:20px; text-align:center;">Tu carrito está vacío</p>';
        document.getElementById('cart-footer').style.display = 'none';
    } else {
        list.innerHTML = cart.map(i => `
            <div class="cart-item-row">
                <div><div>${i.name}</div><b style="color:red;">$${i.price.toLocaleString('es-MX')} MXN</b></div>
                <img src="${i.image}" class="cart-item-tiny-image" alt="${i.name}">
            </div>
        `).join('');
        const total = cart.reduce((s, i) => s + i.price, 0);
        const fmtTotal = `$${total.toLocaleString('es-MX')} MXN`;
        document.getElementById('cart-total').innerText = fmtTotal;
        document.getElementById('payment-total-amount').innerText = fmtTotal;
        document.getElementById('cart-footer').style.display = 'block';
    }
}

// ==========================================
// 6. LÓGICA DE PAGO SENIOR (VALIDACIÓN ESTRICTA)
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    const cardInput = document.getElementById('card-num');
    const expInput = document.getElementById('card-exp');
    const nameInput = document.getElementById('card-name');
    const cvvInput = document.getElementById('card-cvv');

    if(cardInput) {
        // TARJETA: Validación exacta de 16 dígitos (o 15 Amex)
        cardInput.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, ''); // Solo números
            e.target.value = value.replace(/(.{4})/g, '$1 ').trim(); // Espacio cada 4
            
            updateCardVisual();
            
            // Detectar longitud requerida (Amex 15, Resto 16)
            const isAmex = /^3[47]/.test(value);
            const requiredLength = isAmex ? 15 : 16;
            
            // Validar Luhn Y longitud exacta
            const isValid = isValidLuhn(value) && value.length === requiredLength;
            validateField(e.target, isValid);
        });

        // FECHA: Formato MM/AA
        expInput.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length >= 2) {
                e.target.value = value.substring(0, 2) + '/' + value.substring(2, 4);
            } else {
                e.target.value = value;
            }
            updateCardVisual();
            validateField(e.target, isValidDate(e.target.value));
        });

        // NOMBRE: Solo letras
        nameInput.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/[^a-zA-Z\s]/g, '');
            updateCardVisual();
            validateField(e.target, e.target.value.length > 5);
        });

        // CVV: ESTRICTAMENTE 3 DÍGITOS (O 4 para AMEX)
        cvvInput.addEventListener('input', (e) => {
            // Limpiar todo lo que no sea número
            let value = e.target.value.replace(/\D/g, '');
            
            // Detectar si la tarjeta es Amex para permitir 4 dígitos, sino solo 3
            const cardNum = document.getElementById('card-num').value.replace(/\D/g, '');
            const isAmex = /^3[47]/.test(cardNum);
            const maxLength = isAmex ? 4 : 3;

            // Recortar si se pasa del límite
            if (value.length > maxLength) {
                value = value.slice(0, maxLength);
            }
            
            e.target.value = value;
            
            // Validar que tenga la longitud exacta
            validateField(e.target, value.length === maxLength);
        });
    }
});

// Algoritmo de Luhn
function isValidLuhn(number) {
    if (number.length < 13) return false; 
    let sum = 0;
    let isEven = false;
    for (let i = number.length - 1; i >= 0; i--) {
        let digit = parseInt(number.charAt(i));
        if (isEven) {
            digit *= 2;
            if (digit > 9) digit -= 9;
        }
        sum += digit;
        isEven = !isEven;
    }
    return (sum % 10) === 0;
}

// Validar Fecha
function isValidDate(dateString) {
    if (dateString.length !== 5) return false;
    const [month, year] = dateString.split('/').map(Number);
    if (!month || !year) return false;
    
    const now = new Date();
    const currentYear = parseInt(now.getFullYear().toString().substr(-2));
    const currentMonth = now.getMonth() + 1;

    if (month < 1 || month > 12) return false;
    if (year < currentYear) return false;
    if (year === currentYear && month < currentMonth) return false;
    return true;
}

// Helper visual (Verde/Rojo)
function validateField(input, isValid) {
    if (isValid) {
        input.classList.add('valid');
        input.classList.remove('invalid');
    } else {
        if(input.value.length > 0) {
            input.classList.add('invalid');
            input.classList.remove('valid');
        } else {
            input.classList.remove('valid', 'invalid');
        }
    }
    return isValid;
}

function updateCardVisual() {
    const numInput = document.getElementById('card-num');
    const nameInput = document.getElementById('card-name');
    const expInput = document.getElementById('card-exp');

    const rawNum = numInput.value.replace(/\s/g, ''); 
    
    document.getElementById('visual-number').textContent = numInput.value || '•••• •••• •••• ••••';
    document.getElementById('visual-name').textContent = nameInput.value.toUpperCase() || 'NOMBRE APELLIDO';
    document.getElementById('visual-exp').textContent = expInput.value || 'MM/AA';

    const logoContainer = document.getElementById('visual-logo');
    
    if (/^4/.test(rawNum)) { logoContainer.innerHTML = VISA_LOGO; }
    else if (/^5[1-5]/.test(rawNum)) { logoContainer.innerHTML = MASTER_LOGO; }
    else if (/^3[47]/.test(rawNum)) { logoContainer.innerHTML = AMEX_LOGO; }
    else { logoContainer.innerHTML = GENERIC_LOGO; }
}

async function processPayment(e) {
    e.preventDefault();
    if(cart.length === 0) return showNotification("Tu carrito está vacío", "error");
    
    const rawNum = document.getElementById('card-num').value.replace(/\s/g, '');
    const exp = document.getElementById('card-exp').value;
    const cvv = document.getElementById('card-cvv').value;

    // VALIDACIONES FINALES ANTES DE PROCESAR
    const isAmex = /^3[47]/.test(rawNum);
    const requiredLength = isAmex ? 15 : 16;
    const requiredCvvLength = isAmex ? 4 : 3;

    if (!isValidLuhn(rawNum) || rawNum.length !== requiredLength) {
        return showNotification(`Tarjeta inválida. Debe tener ${requiredLength} dígitos.`, "error");
    }
    if (!isValidDate(exp)) return showNotification("Fecha incorrecta", "error");
    if (cvv.length !== requiredCvvLength) return showNotification(`CVV inválido. Debe ser de ${requiredCvvLength} dígitos.`, "error");

    const btn = document.querySelector('.payment-form button[type="submit"]');
    const originalText = "CONFIRMAR PAGO";
    
    // Animación PROCESANDO
    btn.innerHTML = `⏳ PROCESANDO...`;
    btn.disabled = true;
    btn.style.opacity = "0.8";
    btn.style.cursor = "not-allowed";

    try {
        await new Promise(resolve => setTimeout(resolve, 2500)); 

        // Animación ÉXITO
        btn.style.background = "#2ecc71"; 
        btn.style.opacity = "1";
        btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> PAGO EXITOSO`;

        showNotification("¡Compra exitosa!", "success");

        setTimeout(() => {
            cart = [];
            updateCartUI();
            closePaymentModal();
            document.querySelector('.payment-form').reset();
            
            // Limpiar clases visuales
            document.querySelectorAll('.input-group input').forEach(i => i.classList.remove('valid', 'invalid'));
            updateCardVisual();

            btn.style.background = ""; 
            btn.innerHTML = originalText;
            btn.disabled = false;
            btn.style.cursor = "pointer";
        }, 2000);

    } catch (error) {
        showNotification("Error en el pago", "error");
        btn.innerHTML = originalText;
        btn.disabled = false;
    }
}

// ==========================================
// SISTEMA DE LOGIN Y MODALES
// ==========================================
function openUserModal() {
    const modal = document.getElementById('user-modal');
    modal.classList.add('active');
    renderAuth(); 
}

function closeUserModal() {
    document.getElementById('user-modal').classList.remove('active');
}

function renderAuth() {
    const container = document.getElementById('auth-container');
    if (currentUser) {
        container.innerHTML = `
            <div style="text-align:center; padding: 20px;">
                <div style="font-size:3rem; margin-bottom:10px;">👤</div>
                <h3>HOLA, ${currentUser.user.toUpperCase()}</h3>
                <p style="opacity:0.7;">Bienvenido al club.</p>
                <br>
                <button class="action-btn black-btn" onclick="logout()">CERRAR SESIÓN</button>
            </div>
        `;
    } else {
        showLoginForm();
    }
}

function showLoginForm() {
    document.getElementById('auth-container').innerHTML = `
        <h3 style="text-align:center; margin-bottom:20px;">INICIAR SESIÓN</h3>
        <form onsubmit="handleLogin(event)">
            <div class="input-group">
                <label>USUARIO</label>
                <input type="text" id="login-user" required placeholder="Usuario">
            </div>
            <div class="input-group">
                <label>CONTRASEÑA</label>
                <input type="password" id="login-pass" required placeholder="••••••">
            </div>
            <button type="submit" class="action-btn red-btn">ENTRAR</button>
        </form>
        <span class="link-text" onclick="showRegisterForm()">Crear cuenta nueva</span>
    `;
}

function showRegisterForm() {
    document.getElementById('auth-container').innerHTML = `
        <h3 style="text-align:center; margin-bottom:20px;">CREAR CUENTA</h3>
        <form onsubmit="handleRegister(event)">
            <div class="input-group">
                <label>NUEVO USUARIO</label>
                <input type="text" id="reg-user" required placeholder="Elige un usuario">
            </div>
            <div class="input-group">
                <label>CONTRASEÑA</label>
                <input type="password" id="reg-pass" required placeholder="Crea una contraseña">
            </div>
            <button type="submit" class="action-btn black-btn">REGISTRARSE</button>
        </form>
        <span class="link-text" onclick="showLoginForm()">Ya tengo cuenta</span>
    `;
}

function handleRegister(e) {
    e.preventDefault();
    const u = document.getElementById('reg-user').value;
    const p = document.getElementById('reg-pass').value;

    if (users.find(x => x.user === u)) {
        showNotification("El usuario ya existe", "error");
        return;
    }

    users.push({ user: u, pass: p });
    localStorage.setItem('supreme_users', JSON.stringify(users));
    showNotification("Cuenta creada. Inicia sesión.");
    showLoginForm();
}

function handleLogin(e) {
    e.preventDefault();
    const u = document.getElementById('login-user').value;
    const p = document.getElementById('login-pass').value;
    
    const found = users.find(x => x.user === u && x.pass === p);
    
    if (found) {
        currentUser = found;
        localStorage.setItem('supreme_current_user', JSON.stringify(currentUser));
        showNotification(`Bienvenido, ${u.toUpperCase()}`);
        renderAuth();
    } else {
        showNotification("Datos incorrectos", "error");
    }
}

function logout() {
    currentUser = null;
    localStorage.removeItem('supreme_current_user');
    showNotification("Sesión cerrada");
    renderAuth();
}

// UTILIDADES
function filterProducts() {
    const term = document.getElementById('search-input').value.toLowerCase();
    renderProducts(products.filter(p => p.name.toLowerCase().includes(term)));
}
function toggleTheme() { document.body.classList.toggle('dark-mode'); }
function toggleMenu() { document.getElementById('sidebar').classList.toggle('active'); document.getElementById('sidebar-overlay').classList.toggle('active'); }
function showNotification(m, type='success') { 
    const c = document.getElementById('notification-container');
    const t = document.createElement('div'); t.className = 'toast'; t.innerText = m;
    if(type==='error') t.style.borderLeftColor = 'red';
    c.appendChild(t); setTimeout(() => t.remove(), 3000);
}

function openCartModal() { document.getElementById('cart-modal').classList.add('active'); }
function closeCartModal() { document.getElementById('cart-modal').classList.remove('active'); }
function openPaymentModal() { closeCartModal(); document.getElementById('payment-modal').classList.add('active'); updateCardVisual(); }
function closePaymentModal() { document.getElementById('payment-modal').classList.remove('active'); }
function scrollToShop() { document.getElementById('products-grid').scrollIntoView({behavior:'smooth'}); }

// CARRUSEL
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
function moveSlide(n) {
    if(slides.length === 0) return;
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + n + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
}
setInterval(() => moveSlide(1), 5000);

// INICIAR
renderProducts();