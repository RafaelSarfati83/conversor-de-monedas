class Experience {
  constructor(experienceContainer, githubUser, imagesUrl) {
    this.experienceContainer = experienceContainer;
    this.githubUser = githubUser;
    this.imagesUrl = imagesUrl;
    this.getGithubData().then(async (data) => {
      this.selfStarredRepos = data;
      this.reposInfo = await this.getReposInfo();
      this.articles = [];
      this.createArticlesFromRepos();
    });
  }

  createArticlesFromRepos() {
    this.reposInfo.forEach((repo) => {
      const article = document.createElement("article");
      article.classList.add("experience__article");
      let name = repo.name.replaceAll("-", " ");
      name = name.replaceAll("_", " - ");
      article.innerHTML = `
<div class="experience__img-container">
    <img class="experience__img" src="${this.imagesUrl}/${
        repo.name
      }.png" alt="${name} image">
  </div>
  <div class="experience__info">
    <h2 class="experience__title">${name}</h2>
    <h3 class="experience__subtitle">${repo.description}</h3>
    <h4 class="experience__subtitle"><ul class="experience__language-list">Lenguajes: ${this.createLanguagesLI(
      repo.languages
    )}</ul></h4>
    <div class="experience__description">
      <span class="experience__repo"><a
          href="${repo.html_url}"><span
            class="experience__link btn btn--light">
            Repositorio
          </span></a></span>
      <span class="experience__demo">
        <a href="${
          repo.homepage
        }" class="experience__link btn btn--dark">Ver demo</a>
      </span>
    </div>
  </div>
`;
      this.articles.push(article);
      this.experienceContainer.append(article);
    });
  }

  async getReposInfo() {
    return Promise.all(
      this.selfStarredRepos.map(async (repo) => {
        const { name, description, html_url, homepage, languages_url } = repo;
        const languages = await this.getLanguages(languages_url);
        return {
          name,
          description,
          html_url,
          homepage,
          languages,
        };
      })
    );
  }

  async getGithubData() {
    const response = await fetch(
      `https://api.github.com/users/${this.githubUser}/starred`
    );
    const data = await response.json();
    return data.filter(
      (repo) =>
        repo.owner.login.toLowerCase() == this.githubUser.toLowerCase() &&
        repo.homepage
    );
  }

  async getLanguages(languagesUrl) {
    const response = await fetch(languagesUrl);
    const data = await response.json();
    return data;
  }

  createLanguagesLI(languages) {
    return Object.keys(languages)
      .map((language) => {
        return `<li class="experience__language-item">${language}</li>`;
      })
      .join("\n");
  }
}
const container = document.querySelector(".experience__content");
const experience = new Experience(container, "cmoros", "./assets/repos");
