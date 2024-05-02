class ItemService {
  constructor(itemRepository) {
    this.itemRepository = itemRepository;
  }

  addItem(newArticle) {
    return this.itemRepository.addItem(newArticle);
  }

  getItems() {
    return this.itemRepository.getItems();
  }
  
  getItemsByCategory(itemRepository){
    return this.itemRepository.getItemsByCategory(itemRepository);
  }

  getItemById(id){
    return this.itemRepository.getItemById(id)[0];
  }

  getItemsByFilter(filtro){
    return this.itemRepository.getItemsByFilter(filtro)
  }

  updateItem(id, newArticle){
    return this.itemRepository.updateItem(id, newArticle)
    
  }

  removeItem(id) {
    this.itemRepository.removeItem(id);
  }

  removeAll(){
    this.itemRepository.removeAll();
  }
}