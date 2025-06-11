class AboutPage {
  async render() {
    return `
      <section id="about" class="about-page">
        <h1>Tentang Aplikasi</h1>
        <p>Ini adalah aplikasi untuk menampilkan dan menambah cerita.</p>
      </section>
    `;
  }

  async afterRender() {}
}

export default AboutPage;
