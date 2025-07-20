let currentUser = null;
let users = {};

function showPage(pageId) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById(pageId).classList.add('active');
}

function register() {
  const phone = document.getElementById('register-phone').value;
  const pass = document.getElementById('register-password').value;
  const agree = document.getElementById('agree-policy').checked;

  if (!phone || !pass || !agree) {
    alert('Vui lòng nhập đầy đủ thông tin và đồng ý điều khoản.');
    return;
  }

  if (users[phone]) {
    alert('Số điện thoại đã tồn tại.');
    return;
  }

  users[phone] = {
    password: pass,
    balance: 20000 // nhận 20k khi đăng ký
  };

  alert('Đăng ký thành công! Đăng nhập để tiếp tục.');
  showPage('login-page');
}

function login() {
  const phone = document.getElementById('login-phone').value;
  const pass = document.getElementById('login-password').value;

  if (!users[phone] || users[phone].password !== pass) {
    alert('Sai số điện thoại hoặc mật khẩu.');
    return;
  }

  currentUser = phone;
  updateBalance();
  showPage('home-page');
}

function deposit() {
  const amount = parseInt(document.getElementById('deposit-amount').value);
  if (!amount || amount <= 0) {
    alert('Vui lòng nhập số tiền hợp lệ.');
    return;
  }

  users[currentUser].balance += amount;
  alert('Xác nhận nạp tiền thành công!');
  updateBalance();
  showPage('home-page');
}

function withdraw() {
  const amount = parseInt(document.getElementById('withdraw-amount').value);
  const balance = users[currentUser].balance;

  if (!amount || amount <= 0) {
    alert('Nhập số tiền rút hợp lệ.');
    return;
  }

  if (balance < 50000) {
    document.getElementById('withdraw-msg').innerText = 'Chỉ rút khi số dư ≥ 50.000đ';
    return;
  }

  if (amount > balance) {
    document.getElementById('withdraw-msg').innerText = 'Số dư không đủ để rút.';
    return;
  }

  users[currentUser].balance -= amount;
  document.getElementById('withdraw-msg').innerText = 'Yêu cầu rút tiền đã được gửi. Vui lòng chờ duyệt.';
  updateBalance();
}

function updateBalance() {
  document.getElementById('balance').innerText = users[currentUser].balance.toLocaleString();
}