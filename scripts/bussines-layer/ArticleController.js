class AppLogic {
  constructor(itemService) {
    this.itemService = itemService;
  }

  addItem(article) {
    const articleInstance = mapToArticle(article);
    return this.itemService.addItem(articleInstance);
  }

  getItemById(id) {
    return this.itemService.getItemById(id);
  }

  getItemsByCategory(category){
    return this.itemService.getItemsByCategory(category);
  }

  getItemsByFilter(filtro){
    return this.itemService.getItemsByFilter(filtro)
  }

  updateItem(id, newArticle) {
    return this.itemService.updateItem(id, newArticle);
  }

  getImportantItems() {
    return this.itemService.getItems();
  }

  removeItem(id) {
    return this.itemService.removeItem(id);
  }

  removeAll() {
    return this.itemService.removeAll();
  }
}
