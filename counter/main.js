class Counter {
  #result = 0;
  #per = 1;

  constructor() {
    this.$result = document.getElementById('counter-result');
    this.$formBtns = document.querySelectorAll('[data-btn]');
    this.$input = document.querySelector('.ipt-per');
    this.$themeToggle = document.getElementById('theme-toggle');

    this.init();
  }

  init() {
    this.set_per();
    this.display_result();

    this.$formBtns.forEach(btn =>
      btn.addEventListener('click', this.on_click)
    );

    this.$input.addEventListener('change', () => this.set_per());
    document.addEventListener('keydown', this.on_key);
    this.$themeToggle.addEventListener('click', this.toggle_theme);
  }

  set_per() {
    this.#per = this.$input.value;
  }

  display_result() {
    this.$result.textContent = this.#result;
    this.$result.classList.add('bump');
    setTimeout(() => this.$result.classList.remove('bump'), 150);
  }

  on_click = e => {
    const action = e.target.dataset.btn;
    if (!action) return;
    e.preventDefault();

    if (action === 'min') this.#result -= Number(this.#per);
    if (action === 'pls') this.#result += Number(this.#per);
    if (action === 'rst') {
      this.#result = 0;
      this.$input.value = 1;
      this.set_per();
    }

    this.display_result();
  };

  on_key = e => {
    if (e.key === 'ArrowUp') this.#result += Number(this.#per);
    if (e.key === 'ArrowDown') this.#result -= Number(this.#per);
    if (e.key.toLowerCase() === 'r') {
      this.#result = 0;
      this.$input.value = 1;
      this.set_per();
    }
    this.display_result();
  };

  toggle_theme = () => {
    document.body.classList.toggle('dark');
    this.$themeToggle.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
  };
}

new Counter();
