const _ = require('lodash');
const mongoose = require('mongoose');

const category = mongoose.model('category');

const { ObjectId } = mongoose.Types;
class categoryService {
  static getDetail() {
    return category.find().exec();
  }
  
  static addCategory({type,brand,model,year}){
    return category.create({
      transportType: type, transportModel:model, transportYear: year, transportManufacture: brand
    });
  }

  static deleteCategory(id){
    return category.findByIdAndDelete(id).exec();
  }
}
module.exports = categoryService;
