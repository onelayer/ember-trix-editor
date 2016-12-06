module.exports = {
  afterInstall() {
    return this.addBowerPackageToProject("trix", "~0.9.7");
  }
};
