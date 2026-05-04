import { Category } from "@/types";

export const defaultCategories: Category[] = [
  // 支出一级分类
  { id: 'cat_food', name: '餐饮', icon: 'bakery', type: 'expense', level: 1, isDefault: true },
  { id: 'cat_transport', name: '交通', icon: 'bus', type: 'expense', level: 1, isDefault: true },
  { id: 'cat_shopping', name: '购物', icon: 'shopping-bag', type: 'expense', level: 1, isDefault: true },
  { id: 'cat_housing', name: '居住', icon: 'home', type: 'expense', level: 1, isDefault: true },
  { id: 'cat_entertainment', name: '娱乐', icon: 'gamepad-2', type: 'expense', level: 1, isDefault: true },
  { id: 'cat_health', name: '医疗', icon: 'heart-pulse', type: 'expense', level: 1, isDefault: true },
  { id: 'cat_education', name: '教育', icon: 'book-open', type: 'expense', level: 1, isDefault: true },
  { id: 'cat_other_expense', name: '其他', icon: 'more-horizontal', type: 'expense', level: 1, isDefault: true },

  // 收入一级分类
  { id: 'cat_salary', name: '工资', icon: 'briefcase', type: 'income', level: 1, isDefault: true },
  { id: 'cat_parttime', name: '兼职', icon: 'wrench', type: 'income', level: 1, isDefault: true },
  { id: 'cat_investment', name: '投资', icon: 'trending-up', type: 'income', level: 1, isDefault: true },
  { id: 'cat_gift', name: '礼物', icon: 'gift', type: 'income', level: 1, isDefault: true },
  { id: 'cat_other_income', name: '其他', icon: 'more-horizontal', type: 'income', level: 1, isDefault: true },
];

export const defaultExpenseCategories: Category[] = [
  { id: 'cat_food_breakfast', name: '早餐', icon: 'bakery', type: 'expense', parentId: 'cat_food', level: 2, isDefault: true },
  { id: 'cat_food_lunch', name: '午餐', icon: 'utensils', type: 'expense', parentId: 'cat_food', level: 2, isDefault: true },
  { id: 'cat_food_dinner', name: '晚餐', icon: 'chef-hat', type: 'expense', parentId: 'cat_food', level: 2, isDefault: true },
  { id: 'cat_food_snack', name: '零食', icon: 'candy', type: 'expense', parentId: 'cat_food', level: 2, isDefault: true },
  { id: 'cat_transport_bus', name: '公交', icon: 'bus', type: 'expense', parentId: 'cat_transport', level: 2, isDefault: true },
  { id: 'cat_transport_subway', name: '地铁', icon: 'train-track', type: 'expense', parentId: 'cat_transport', level: 2, isDefault: true },
  { id: 'cat_transport_taxi', name: '打车', icon: 'taxi', type: 'expense', parentId: 'cat_transport', level: 2, isDefault: true },
  { id: 'cat_shopping_clothes', name: '服装', icon: 'tshirt', type: 'expense', parentId: 'cat_shopping', level: 2, isDefault: true },
  { id: 'cat_shopping_groceries', name: '日用品', icon: 'shopping-cart', type: 'expense', parentId: 'cat_shopping', level: 2, isDefault: true },
  { id: 'cat_housing_rent', name: '房租', icon: 'building', type: 'expense', parentId: 'cat_housing', level: 2, isDefault: true },
  { id: 'cat_housing_utility', name: '水电', icon: 'plug', type: 'expense', parentId: 'cat_housing', level: 2, isDefault: true },
  { id: 'cat_entertainment_movie', name: '电影', icon: 'film', type: 'expense', parentId: 'cat_entertainment', level: 2, isDefault: true },
  { id: 'cat_entertainment_travel', name: '旅游', icon: 'plane', type: 'expense', parentId: 'cat_entertainment', level: 2, isDefault: true },
];

export const defaultIncomeCategories: Category[] = [
  { id: 'cat_salary_monthly', name: '月薪', icon: 'briefcase', type: 'income', parentId: 'cat_salary', level: 2, isDefault: true },
  { id: 'cat_salary_bonus', name: '奖金', icon: 'trophy', type: 'income', parentId: 'cat_salary', level: 2, isDefault: true },
  { id: 'cat_parttime_freelance', name: '自由职业', icon: 'laptop', type: 'income', parentId: 'cat_parttime', level: 2, isDefault: true },
  { id: 'cat_parttime_fix', name: '零工', icon: 'hammer', type: 'income', parentId: 'cat_parttime', level: 2, isDefault: true },
  { id: 'cat_investment_stock', name: '股票', icon: 'activity', type: 'income', parentId: 'cat_investment', level: 2, isDefault: true },
  { id: 'cat_investment_fund', name: '基金', icon: 'pie-chart', type: 'income', parentId: 'cat_investment', level: 2, isDefault: true },
];
